import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';

import { MODAL_PROFILE_CONTENT, MODAL_CONTENT, PAGE_CONTENT } from '../utils/constants';
import { freelancers_posts_ref, db, firebase } from '../utils/db';
import { query_my_freelance_submission, obj_to_array, no_op } from '../utils/funcs';

const ADD_YOURSELF = 'Add yourself';

export default class AvailableForWorkPage extends React.Component {
  state = {
    page_content: PAGE_CONTENT.FREELANCER_TABLE,
    modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
    freelancers: [],
    self_freelance_posting: null,
  };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
  };

  query_data = () => freelancers_posts_ref.once('value').then(snap_shot => snap_shot.val());

  componentDidMount() {
    this.query_data().then(rows =>
      this.setState(() => ({ freelancers: rows ? obj_to_array(rows) : [] }))
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
              freelancers: rows ? obj_to_array(rows) : [],
            }))
          )
        )
        .catch(error => console.log(error));
    }
  };

  post_signin_in_query = () => {
    return query_my_freelance_submission()
      .catch(error => console.log(error))
      .then(self_freelance_posting => {
        this.setState(() => ({ self_freelance_posting }));
        return PAGE_CONTENT.FREELANCER_TABLE;
      });
  };

  freelancer_post_did_finish = () => {
    this.query_data().then(rows =>
      query_my_freelance_submission().then(self_freelance_posting =>
        this.setState(() => ({
          self_freelance_posting,
          page_content: PAGE_CONTENT.FREELANCER_TABLE,
          freelancers: rows ? obj_to_array(rows) : [],
        }))
      )
    );
  };

  toggle_freelancer_content = () => {
    // this.setState(prev_state => ({
    //   page_content:
    //     prev_state.page_content === PAGE_CONTENT.NEW_FREELANCER
    //       ? PAGE_CONTENT.FREELANCER_TABLE
    //       : PAGE_CONTENT.NEW_FREELANCER,
    // }));
  };

  show_my_posting = () => {
    this.setState(() => ({ modal_show: true, modal_content: MODAL_CONTENT.PROFILE_VIEW }));
  };

  render() {
    const {
      authenticated_user,
      sign_user_out,
      sign_user_in,
      submit_new_freelancer_post,
    } = this.context;
    const user = authenticated_user();
    return (
      <PageControl
        page_content={this.state.page_content}
        modal_profile_content={this.state.modal_profile_content}
        self_freelance_posting={this.state.self_freelance_posting}
        my_hiring_submissions={[]}
        delete_my_freelance_posting={this.delete_my_freelance_posting}
        jobs={[]}
        new_tech_job_post_did_finish={no_op}
        submit_new_hiring_post={no_op}
        freelancers={this.state.freelancers}
        freelancer_post_did_finish={this.freelancer_post_did_finish}
        submit_new_freelancer_post={submit_new_freelancer_post}
        banner_title={'Freelance programmers in Armenia'}
        set_page_content={this.toggle_freelancer_content}
        custom_input_handler_signedout={no_op}
        custom_input_signed_in_name={
          this.state.page_content === PAGE_CONTENT.NEW_FREELANCER ? 'Freelancers' : ADD_YOURSELF
        }
        custom_input_signed_out_name={ADD_YOURSELF}
        post_signin_in_query={this.post_signin_in_query}
      />
    );
  }
}
