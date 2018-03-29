import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';

import { MODAL_PROFILE_CONTENT, PAGE_CONTENT, MODAL_CONTENT } from '../utils/constants';
import { hiring_table_posts_ref, db, firebase } from '../utils/db';
import { query_my_hiring_post_submissions, obj_to_array, no_op } from '../utils/funcs';

const SUBMIT_NEW_JOB = 'Submit new Job';

const INIT_STATE = {
  jobs: [],
  my_hiring_submissions: [],
  modal_content: MODAL_CONTENT.SIGNIN_VIEW,
  modal_profile_content: MODAL_PROFILE_CONTENT.HIRING_BOARD_LISTINGS,
  page_content: PAGE_CONTENT.HIRING_TABLE,
};

export default class HiringBoardPage extends React.Component {
  state = { ...INIT_STATE };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
  };

  query_data = () => hiring_table_posts_ref.once('value').then(snap_shot => snap_shot.val());

  componentDidMount() {
    this.query_data().then(rows => this.setState(() => ({ jobs: rows ? obj_to_array(rows) : [] })));
  }

  delete_a_job_posting = post_key => {
    const current_user = firebase.auth().currentUser;
    const updates = {};
    updates[`/hiring-table-posts/${post_key}`] = null;
    updates[`/users/${current_user.uid}/my-hiring-board-submissions/${post_key}`] = null;
    return db
      .ref()
      .update(updates)
      .then(reply =>
        this.query_data().then(rows =>
          query_my_hiring_post_submissions().then(my_hiring_submissions =>
            this.setState(() => ({
              jobs: rows ? obj_to_array(rows) : [],
              my_hiring_submissions: my_hiring_submissions
                ? obj_to_array(my_hiring_submissions)
                : [],
            }))
          )
        )
      )
      .catch(error => console.warn(error));
  };

  user_did_sign_in = () => {
    query_my_hiring_post_submissions()
      .then(rows => {
        return this.setState(() => ({
          my_hiring_submissions: rows ? obj_to_array(rows) : [],
          page_content: PAGE_CONTENT.HIRING_TABLE,
        }));
      })
      .catch(error => console.log(error));
  };

  new_tech_job_post_did_finish = () => {
    return this.query_data().then(rows =>
      query_my_hiring_post_submissions().then(my_submissions =>
        this.setState(() => ({
          page_content: PAGE_CONTENT.HIRING_TABLE,
          jobs: rows ? obj_to_array(rows) : [],
          my_hiring_submissions: my_submissions ? obj_to_array(rows) : [],
        }))
      )
    );
  };

  toggle_hiring_content = () =>
    this.setState(prev_state => ({
      page_content:
        prev_state.page_content === PAGE_CONTENT.NEW_HIRING_POST
          ? PAGE_CONTENT.HIRING_TABLE
          : PAGE_CONTENT.NEW_HIRING_POST,
    }));

  post_signin_in_query = () => {
    return query_my_hiring_post_submissions()
      .catch(error => console.log(error))
      .then(rows => {
        this.setState(() => ({ jobs: rows ? obj_to_array(rows) : [] }));
        return PAGE_CONTENT.HIRING_TABLE;
      });
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
    this.setState(({ jobs }) => ({ ...INIT_STATE, jobs }));
  };

  already_signed_in_page_handler = after_cb => {
    query_my_hiring_post_submissions().then(rows =>
      this.setState(
        () => ({
          modal_content: MODAL_CONTENT.PROFILE_VIEW,
          my_hiring_submissions: rows ? obj_to_array(rows) : [],
          modal_profile_content: MODAL_PROFILE_CONTENT.HIRING_BOARD_LISTINGS,
        }),
        after_cb
      )
    );
  };

  custom_input_handler_signedin = () => {
    this.setState(prev_state => ({
      page_content:
        prev_state.page_content === PAGE_CONTENT.NEW_HIRING_POST
          ? PAGE_CONTENT.HIRING_TABLE
          : PAGE_CONTENT.NEW_HIRING_POST,
    }));
  };

  custom_input_handler_signedout = after_cb => {
    this.setState(
      () => ({
        page_content: PAGE_CONTENT.HIRING_TABLE,
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
        banner_title={'Get hired'}
        jobs={this.state.jobs}
        user_did_sign_out={this.user_did_sign_out}
        new_tech_job_post_did_finish={this.new_tech_job_post_did_finish}
        did_finish_submit_post_lifecycle={no_op}
        submit_new_hiring_post={this.context.submit_new_hiring_post}
        freelancers={[]}
        page_content={this.state.page_content}
        modal_content={this.state.modal_content}
        modal_profile_content={this.state.modal_profile_content}
        already_signed_in_page_handler={this.already_signed_in_page_handler}
        custom_input_handler_signedin={this.custom_input_handler_signedin}
        custom_input_handler_signedout={this.custom_input_handler_signedout}
        custom_input_signed_in_name={
          this.state.page_content === PAGE_CONTENT.HIRING_TABLE ? SUBMIT_NEW_JOB : 'Jobs'
        }
        custom_input_signed_out_name={SUBMIT_NEW_JOB}
        self_freelance_posting={null}
        my_hiring_submissions={this.state.my_hiring_submissions}
        delete_my_freelance_posting={no_op}
        delete_hiring_record={this.delete_a_job_posting}
        post_signin_action={no_op}
      />
    );
  }
}
