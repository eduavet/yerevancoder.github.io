import React from 'react';
import Spinner from 'react-spinkit';

import { updateByPropertyName } from '../../utils/funcs';
import { FANCY_INPUT_BOXES, LOADING_STATE, SPACER_30_H, SPACER_10_H } from '../../utils/constants';
import SubmitInput from '../submit-input';
import WithEffectInput from '../with-effect-input';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading_state: LOADING_STATE.NOT_STARTED_YET,
  remember_me_checked: false,
};

const with_20_h = { height: '20px', display: 'flex', justifyContent: 'center' };

export default class SignInForm extends React.Component {
  state = { ...INITIAL_STATE };

  on_submit = event => {
    const { email, password, remember_me_checked } = this.state;
    const { user_did_sign_in, sign_user_in } = this.props;
    event.preventDefault();
    this.setState(
      () => ({ loading_state: LOADING_STATE.CURRENTLY_LOADING }),
      () =>
        sign_user_in(email, password, remember_me_checked, user_did_sign_in)
          .catch(error => this.setState(updateByPropertyName('error', error)))
          .then(() => this.setState(() => ({ ...INITIAL_STATE })))
          .then(() => {
            const { error } = this.state;
            this.setState(() => ({ ...INITIAL_STATE, error }));
          })
    );
  };

  make_remember_forget_row() {
    const remember_me_update = event => {
      this.setState(updateByPropertyName('remember_me_checked', event.target.checked));
    };
    const { remember_me_checked } = this.state;

    return (
      <div className={'PlainFlexRow FlexSpaceBetween PlainFlexCentered RememberMeRow'}>
        <span className={'PlainFlexColumn'}>
          <span style={with_20_h}>
            <input
              type={'checkbox'}
              style={with_20_h}
              onChange={remember_me_update}
              checked={remember_me_checked}
            />
          </span>
          <span
            className={
              remember_me_checked
                ? 'RememberMeRow__RememberMe--Checked'
                : 'RememberMeRow__RememberMe--Unchecked'
            }>
            Remember me
          </span>
        </span>
        <span className={'RememberMeRow__ForgotPassword'}>Forgot Password</span>
      </div>
    );
  }
  render() {
    const { email, password, error } = this.state;
    const is_invalid = password === '' || email === '';
    const top_message = error ? (
      <pre className={'AuthingErrorMessage'}>{error.message}</pre>
    ) : (
      <span className={'AuthingWelcomeMessage'}>{this.props.login_message}</span>
    );
    const extra_css_classname =
      this.state.loading_state === LOADING_STATE.CURRENTLY_LOADING
        ? 'ProfileContainer__SpinningCentered'
        : 'ModalContainer__Form';
    const content =
      this.state.loading_state === LOADING_STATE.CURRENTLY_LOADING ? (
        <div className={'Profile__Container__LoadingSpinner'}>
          <Spinner fadeIn={'quarter'} name={'ball-scale-ripple-multiple'} />
        </div>
      ) : (
        <fieldset>
          <div className={'PlainFlexColumn FullHeight FlexSpaceAround'}>
            <section className={'PlainFlexColumn FormTopEntry'}>
              {top_message}
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.SIGNIN_EMAIL}
                query_field={() => this.state.email}
                on_change={event =>
                  this.setState(updateByPropertyName('email', event.target.value))
                }
                label={'Email'}
                input_type={'email'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.SIGNIN_PASSWORD}
                query_field={() => this.state.password}
                on_change={event =>
                  this.setState(updateByPropertyName('password', event.target.value))
                }
                label={'Password'}
                input_type={'password'}
              />
              {SPACER_30_H}
              {this.make_remember_forget_row()}
            </section>
            {SPACER_10_H}
            <SubmitInput
              value={'Sign In'}
              ballon_position={'right'}
              ballon_caption={'Sign in to post'}
              disabled={is_invalid}
            />
          </div>
        </fieldset>
      );
    return (
      <form
        onSubmit={this.on_submit}
        className={`ReactModal__Content--after-open Profile__Container ${extra_css_classname}`}>
        {content}
      </form>
    );
  }
}
