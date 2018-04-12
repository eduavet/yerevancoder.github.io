import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';

import { PAGE_CONTENT, MODAL_CONTENT, MODAL_PROFILE_CONTENT } from '../utils/constants';
import { freelancers_posts_ref, db, firebase } from '../utils/db';
import { query_my_freelance_submission, obj_to_array, no_op } from '../utils/funcs';

const ADD_YOURSELF = 'Add yourself';

const NEW_FREELANCER = 'New freelancer';

const INIT_STATE = {
  freelancers: [],
  loadedLancers: false,
  self_freelance_posting: null,
  modal_content: MODAL_CONTENT.SIGNIN_VIEW,
  page_content: PAGE_CONTENT.FREELANCER_TABLE,
  modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
};

export default class AvailableForWorkPage extends React.Component {
  state = { ...INIT_STATE };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
  };

  query_data = () => freelancers_posts_ref.once('value').then(snap_shot => snap_shot.val());

  componentDidMount() {
    this.query_data().then(rows =>
      this.setState(() => ({ 
        freelancers: rows ? obj_to_array(rows) : [],
        loadedLancers: true,
      }))
    );
  }

  delete_my_freelance_posting = () => {
    if (this.state.self_freelance_posting) {
      const { post_key } = this.state.self_freelance_posting;
      const current_user = firebase.auth().currentUser;
      db
        .ref(`users/${current_user.uid}/my-freelance-submission`)
        .remove()
        .then(() => freelancers_posts_ref.child(post_key).remove())
        .then(() =>
          this.query_data().then(rows =>
            this.setState(() => ({
              self_freelance_posting: null,
              page_content: PAGE_CONTENT.FREELANCER_TABLE,
              freelancers: rows ? obj_to_array(rows) : [],
            }))
          )
        )
        .catch(error => console.log(error));
    }
  };

  all_freelance_data = () =>
    this.query_data().then(rows => {
      return query_my_freelance_submission().then(self_freelance_posting => ({
        freelancers: rows ? obj_to_array(rows) : [],
        self_freelance_posting,
      }));
    });

  post_signin_action = () => {
    this.all_freelance_data()
      .then(({ freelancers, self_freelance_posting }) => {
        this.setState(() => ({
          freelancers,
          self_freelance_posting,
          page_content: PAGE_CONTENT.FREELANCER_TABLE,
        }));
      })
      .catch(error => console.log(error));
  };

  freelancer_post_did_finish = () => {
    this.all_freelance_data().then(({ freelancers, self_freelance_posting }) => {
      this.setState(() => ({
        page_content: PAGE_CONTENT.FREELANCER_TABLE,
        self_freelance_posting,
        freelancers,
      }));
    });
  };

  toggle_freelancer_content = () =>
    this.setState(({ page_content }) => ({
      page_content:
        page_content === PAGE_CONTENT.FREELANCER_TABLE
          ? PAGE_CONTENT.NEW_FREELANCER
          : PAGE_CONTENT.FREELANCER_TABLE,
    }));

  already_signed_in_page_handler = after_cb => {
    query_my_freelance_submission().then(self_freelance_posting =>
      this.setState(
        () => ({
          self_freelance_posting,
          modal_content: MODAL_CONTENT.PROFILE_VIEW,
          modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
        }),
        after_cb
      )
    );
  };

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

  user_did_sign_out = () => {
    this.setState(() => ({ ...INIT_STATE }));
  };

  custom_input_handler_signedin = () => {
    this.setState(prev_state => ({
      page_content:
        prev_state.page_content === PAGE_CONTENT.FREELANCER_TABLE
          ? PAGE_CONTENT.NEW_FREELANCER
          : PAGE_CONTENT.FREELANCER_TABLE,
    }));
  };

  custom_input_handler_signedout = after_cb => {
    this.setState(
      () => ({
        page_content: PAGE_CONTENT.FREELANCER_TABLE,
        modal_content: MODAL_CONTENT.SIGNIN_VIEW,
      }),
      after_cb
    );
  };

  render() {
    return (
      <PageControl
        signup_handler={this.signup_handler}
        signin_handler={this.signin_handler}
        banner_title={'Freelancer coders in Armenia'}
        jobs={[]}
        user_did_sign_out={this.user_did_sign_out}
        new_tech_job_post_did_finish={no_op}
        did_finish_submit_post_lifecycle={this.freelancer_post_did_finish}
        submit_new_hiring_post={no_op}
        freelancers={this.state.freelancers}
        loadedLancers={this.state.loadedLancers}
        page_content={this.state.page_content}
        modal_content={this.state.modal_content}
        modal_profile_content={this.state.modal_profile_content}
        already_signed_in_page_handler={this.already_signed_in_page_handler}
        custom_input_handler_signedin={this.custom_input_handler_signedin}
        custom_input_handler_signedout={this.custom_input_handler_signedout}
        custom_input_signed_in_name={
          this.state.page_content === PAGE_CONTENT.NEW_FREELANCER ? 'Freelancers' : ADD_YOURSELF
        }
        custom_input_signed_out_name={ADD_YOURSELF}
        self_freelance_posting={this.state.self_freelance_posting}
        my_hiring_submissions={[]}
        delete_my_freelance_posting={this.delete_my_freelance_posting}
        post_signin_action={this.post_signin_action}
      />
    );
  }
}
