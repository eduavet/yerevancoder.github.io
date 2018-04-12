import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Signin from './modal-content/signin';
import Signup from './modal-content/signup';
import ProfileControl from './modal-content/profile-control';
import NewFreelancer from './new-freelancer';
import FreelancerTable from './freelancer-table';
import News from './news/news';
import JobsTable from './jobs-table';
import NewJobPosting from './new-job-posting';
import SigninBar from './signin-bar';

import {
  MODAL_TRANSITION,
  MODAL_PROFILE_CONTENT,
  modal_s,
  MODAL_CONTENT,
  PAGE_CONTENT,
} from '../utils/constants';

export default class PageControl extends React.Component {
  state = { modal_show: false, error: null };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
  };

  toggle_modal = () => this.setState(({ modal_show }) => ({ modal_show: !modal_show }));

  user_did_sign_in = () => {
    const { post_signin_action } = this.props;
    this.setState(() => ({ modal_show: false }), post_signin_action);
  };

  user_did_sign_up = () => {
    this.setState(() => ({ modal_show: false }));
  };

  modal_content = () => {
    let content = null;
    const {
      delete_hiring_record,
      self_freelance_posting,
      my_hiring_submissions,
      delete_my_freelance_posting,
      modal_content,
      modal_profile_content,
    } = this.props;
    switch (modal_content) {
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
            delete_hiring_record={delete_hiring_record}
            delete_my_freelance_posting={delete_my_freelance_posting}
          />
        );
        break;
      case MODAL_CONTENT.SIGNUP_VIEW:
        content = <Signup user_did_sign_up={this.user_did_sign_up} />;
        break;
      default:
        throw new Error(`Unknown modal content requested: ${modal_content}`);
    }
    return <div className={'ModalContentWrapper'}>{content}</div>;
  };

  submit_post_lifecycle = (useful_data, clear_out_form, error_handling, e) => {
    const { submit_new_freelancer_post } = this.context;
    const { did_finish_submit_post_lifecycle, page_content } = this.props;
    e.preventDefault();

    const { error, ...data } = useful_data;
    for (const k of Object.keys(data)) {
      data[k] = data[k].trim();
      if (data[k] === '') {
        error_handling(new Error(`"${k}" field cannot be empty`));
        return;
      }
    }

    if (page_content === PAGE_CONTENT.NEW_FREELANCER) {
      submit_new_freelancer_post(data)
        .then(() => {
          clear_out_form(() => {
            did_finish_submit_post_lifecycle();
          });
        })
        .catch(error_handling);
    }
  };

  page_content = () => {
    const {
      jobs,
      loadedJobs,
      new_tech_job_post_did_finish,
      submit_new_hiring_post,
      freelancers,
      loadedLancers,
      page_content,
      news_count,
      new_postings,
    } = this.props;
    // Then need to add the HN style news thing here
    switch (page_content) {
      case PAGE_CONTENT.HIRING_TABLE:
        return <JobsTable all_jobs={jobs} loadedJobs={loadedJobs} />;
      case PAGE_CONTENT.NEW_HIRING_POST:
        return (
          <NewJobPosting
            new_tech_job_post_did_finish={new_tech_job_post_did_finish}
            submit_new_hiring_post={submit_new_hiring_post}
          />
        );
      case PAGE_CONTENT.FREELANCER_TABLE:
        return <FreelancerTable freelancers={freelancers} loadedLancers={loadedLancers}/>;
      case PAGE_CONTENT.NEW_FREELANCER:
        return <NewFreelancer submit_post_lifecycle={this.submit_post_lifecycle} />;
      case PAGE_CONTENT.NEWS_LISTINGS:
        return <News news_count={news_count} new_postings={new_postings} />;
      default:
        throw new Error(`Unhandled page requested ${page_content}`);
    }
  };

  already_signed_in_handler = () => {
    const { already_signed_in_page_handler } = this.props;
    already_signed_in_page_handler(() => this.setState(() => ({ modal_show: true })));
  };

  signin_handler = () => {
    const { signin_handler } = this.props;
    signin_handler();
    this.setState(() => ({ modal_show: true }));
  };

  signout_handler = () => {
    const { sign_user_out } = this.context;
    const { user_did_sign_out } = this.props;
    sign_user_out(user_did_sign_out);
  };

  signup_handler = () => {
    const { signup_handler } = this.props;
    signup_handler(() => this.setState(() => ({ modal_show: true })));
  };

  custom_input_handler_signedout_wrapper = () => {
    const { custom_input_handler_signedout } = this.props;
    custom_input_handler_signedout(() => this.setState(() => ({ modal_show: true })));
  };

  render() {
    const {
      banner_title,
      custom_input_signed_in_name,
      custom_input_signed_out_name,
      custom_input_handler_signedin,
    } = this.props;
    const { modal_show } = this.state;
    const { authenticated_user } = this.context;
    const user = authenticated_user();
    return (
      <div className={'AvailableForWorkContainer'}>
        <Modal
          closeTimeoutMS={MODAL_TRANSITION}
          isOpen={modal_show}
          onRequestClose={this.toggle_modal}
          ariaHideApp={false}
          style={modal_s}
          contentLabel="yerevancoder">
          {this.modal_content()}
        </Modal>
        <nav className={'AvailableForWorkContainer__NavTopRow'}>
          <h4 className={'AvailableForWorkContainer__PageBanner'}>{banner_title}</h4>
          <SigninBar
            signin_handler={this.signin_handler}
            signup_handler={this.signup_handler}
            signout_handler={this.signout_handler}
            already_signed_in_handler={this.already_signed_in_handler}
            is_signed_in={user !== null}
            when_active_name={user ? user.email : ''}
            custom_input_handler_signedin={custom_input_handler_signedin}
            custom_input_handler_signedout={this.custom_input_handler_signedout_wrapper}
            custom_input_signed_in_name={custom_input_signed_in_name}
            custom_input_signed_out_name={custom_input_signed_out_name}
          />
        </nav>
        {this.page_content()}
      </div>
    );
  }
}
