import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';

import { MODAL_PROFILE_CONTENT, PAGE_CONTENT } from '../utils/constants';
import { hiring_table_posts_ref, db, firebase } from '../utils/db';
import { query_my_hiring_post_submissions, obj_to_array, no_op } from '../utils/funcs';

const SUBMIT_NEW_JOB = 'Submit new Job';

export default class HiringBoardPage extends React.Component {
  state = {
    modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
    page_content: PAGE_CONTENT.HIRING_TABLE,
    jobs: [],
    my_hiring_submissions: [],
  };

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
    this.query_data().then(rows =>
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

  render() {
    const { authenticated_user, sign_user_out } = this.context;
    const user = authenticated_user();
    return (
      <PageControl
        page_content={this.state.page_content}
        modal_profile_content={this.state.modal_profile_content}
        self_freelance_posting={null}
        my_hiring_submissions={this.state.my_hiring_submissions}
        delete_my_freelance_posting={no_op}
        jobs={this.state.jobs}
        new_tech_job_post_did_finish={this.no_op}
        submit_new_hiring_post={no_op}
        freelancers={[]}
        freelancer_post_did_finish={no_op}
        submit_new_freelancer_post={no_op}
        banner_title={'Get hired now'}
        set_page_content={this.toggle_hiring_content}
        custom_input_handler_signedout={no_op}
        custom_input_signed_in_name={
          this.state.page_content === PAGE_CONTENT.NEW_HIRING_POST ? 'Jobs' : SUBMIT_NEW_JOB
        }
        custom_input_signed_out_name={SUBMIT_NEW_JOB}
        post_signin_in_query={this.post_signin_in_query}
      />
    );
  }
}
