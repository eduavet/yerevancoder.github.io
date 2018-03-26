import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';
import { PAGE_CONTENT, MODAL_CONTENT, MODAL_PROFILE_CONTENT } from '../utils/constants';
import { obj_to_array, no_op } from '../utils/funcs';

const INIT_STATE = {
  modal_content: MODAL_CONTENT.SIGNIN_VIEW,
  page_content: PAGE_CONTENT.NEWS_LISTINGS,
};

export default class NewsPage extends React.Component {
  state = { ...INIT_STATE };
  signin_handler = () => {
    this.setState(() => ({
      modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    }));
  };

  signup_handler = after_cb => {
    this.setState(
      () => ({
        modal_content: MODAL_CONTENT.SIGNUP_VIEW,
      }),
      after_cb
    );
  };

  already_signed_in_page_handler = after_cb => {
    //
  };

  render() {
    return (
      <PageControl
        signup_handler={this.signup_handler}
        signin_handler={this.signin_handler}
        banner_title={'News'}
        jobs={[]}
        user_did_sign_out={this.user_did_sign_out}
        new_tech_job_post_did_finish={no_op}
        did_finish_submit_post_lifecycle={this.freelancer_post_did_finish}
        submit_new_hiring_post={no_op}
        freelancers={[]}
        page_content={this.state.page_content}
        modal_content={this.state.modal_content}
        modal_profile_content={this.state.modal_profile_content}
        already_signed_in_page_handler={this.already_signed_in_page_handler}
        custom_input_handler_signedin={this.custom_input_handler_signedin}
        custom_input_handler_signedout={this.custom_input_handler_signedout}
        custom_input_signed_in_name={null}
        custom_input_signed_out_name={null}
        self_freelance_posting={null}
        my_hiring_submissions={[]}
        delete_my_freelance_posting={no_op}
        post_signin_action={this.post_signin_action}
      />
    );
  }
}
