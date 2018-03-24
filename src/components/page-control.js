import React from 'react';
import PropTypes from 'prop-types';

import Signin from './modal-content/signin';
import Signup from './modal-content/signup';
import ProfileControl from './modal-content/profile-control';
import WithModalControl from './page-content/content-control';
import NewFreelancer from './new-freelancer';
import FreelancerTable from './freelancer-table';
import JobsTable from './jobs-table';
import NewJobPosting from './new-job-posting';

import {
  MODAL_TRANSITION,
  MODAL_PROFILE_CONTENT,
  modal_s,
  MODAL_CONTENT,
  PAGE_CONTENT,
} from '../utils/constants';

export default class PageControl extends React.Component {
  static propTypes = {
    page_content: PropTypes.oneOf(Object.values(PAGE_CONTENT)),
    modal_profile_content: PropTypes.oneOf(Object.values(MODAL_PROFILE_CONTENT)),
    self_freelance_posting: PropTypes.object,
    post_sigin_in_query: PropTypes.func,
    my_hiring_submissions: PropTypes.array,
    delete_my_freelance_posting: PropTypes.func,
    jobs: PropTypes.array,
    new_tech_job_post_did_finish: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
    freelancers: PropTypes.array,
    freelancer_post_did_finish: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
    banner_title: PropTypes.string,
    set_page_content: PropTypes.func,
    custom_input_handler_signedout: PropTypes.func,
    custom_input_signed_in_name: PropTypes.string,
    custom_input_signed_out_name: PropTypes.string,
    post_signin_in_query: PropTypes.func,
  };

  state = {
    modal_show: false,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    page_content: this.props.page_content,
    modal_profile_content: this.props.modal_profile_content,
  };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
  };

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  user_did_sign_in = () => {
    const { post_signin_in_query } = this.props;
    return post_signin_in_query().then(page_content =>
      this.setState(() => ({ modal_show: false, page_content }))
    );
  };

  user_did_sign_up = () => {
    this.setState(() => ({ modal_show: false }));
  };

  modal_content = () => {
    let content = null;
    const { modal_profile_content } = this.state;
    const {
      self_freelance_posting,
      my_hiring_submissions,
      delete_my_freelance_posting,
    } = this.props;
    switch (this.state.modal_content) {
      case MODAL_CONTENT.SIGNIN_VIEW:
        content = (
          <Signin
            login_message={'Sign in'}
            sign_user_in={this.context.sign_user_in}
            user_did_sign_in={this.user_did_sign_in}
          />
        );
        break;
      case MODAL_CONTENT.PROFILE_VIEW:
        content = (
          <ProfileControl
            authenticated_user={this.context.authenticated_user()}
            profile_content={modal_profile_content}
            self_freelance_posting={self_freelance_posting}
            my_hiring_submissions={my_hiring_submissions}
            delete_my_freelance_posting={delete_my_freelance_posting}
          />
        );
        break;
      case MODAL_CONTENT.SIGNUP_VIEW:
        content = <Signup user_did_sign_up={this.user_did_sign_up} />;
        break;
      default:
        throw new Error(`Unknown modal content requested: ${this.state.modal_content}`);
    }
    return <div className={'ModalContentWrapper'}>{content}</div>;
  };

  signin_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    }));

  signup_handler = () =>
    this.setState(() => ({
      modal_show: true,
      modal_content: MODAL_CONTENT.SIGNUP_VIEW,
    }));

  show_my_profile = () => {
    this.setState(() => ({ modal_show: true, modal_content: MODAL_CONTENT.PROFILE_VIEW }));
  };

  page_content = () => {
    const {
      jobs,
      new_tech_job_post_did_finish,
      submit_new_hiring_post,
      freelancers,
      freelancer_post_did_finish,
      submit_new_freelancer_post,
    } = this.props;
    switch (this.state.page_content) {
      case PAGE_CONTENT.HIRING_TABLE:
        return <JobsTable all_jobs={jobs} />;
      case PAGE_CONTENT.NEW_HIRING_POST:
        return (
          <NewJobPosting
            new_tech_job_post_did_finish={new_tech_job_post_did_finish}
            submit_new_hiring_post={submit_new_hiring_post}
          />
        );
      case PAGE_CONTENT.FREELANCER_TABLE:
        return <FreelancerTable freelancers={freelancers} />;
      case PAGE_CONTENT.NEW_FREELANCER:
        return (
          <NewFreelancer
            freelancer_post_did_finish={freelancer_post_did_finish}
            submit_new_freelancer_post={submit_new_freelancer_post}
          />
        );

      default:
        throw new Error(`Unhandled page requested ${this.state.page_content}`);
    }
  };

  render() {
    const {
      banner_title,
      set_page_content,
      custom_input_handler_signedout,
      custom_input_signed_in_name,
      custom_input_signed_out_name,
    } = this.props;
    const { modal_show, modal_content, page_content } = this.state;
    const { authenticated_user, sign_user_out } = this.context;
    const user = authenticated_user();
    return (
      <WithModalControl
        close_timeout={MODAL_TRANSITION}
        modal_show={modal_show}
        on_modal_request_close={this.toggle_modal}
        modal_style={modal_s}
        modal_content={this.modal_content}
        banner_title={banner_title}
        signin_handler={this.signin_handler}
        signup_handler={this.signup_handler}
        signout_handler={sign_user_out}
        signed_in_handler={this.show_my_profile}
        is_signed_in={user !== null}
        when_active_name={user ? user.email : ''}
        custom_input_handler_signedin={set_page_content}
        custom_input_handler_signedout={custom_input_handler_signedout}
        custom_input_signed_in_name={custom_input_signed_in_name}
        custom_input_signed_out_name={custom_input_signed_out_name}
        page_content={this.page_content}
      />
    );
  }
}
