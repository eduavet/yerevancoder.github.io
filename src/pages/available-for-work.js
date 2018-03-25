import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../components/page-control';

import { MODAL_PROFILE_CONTENT, PAGE_CONTENT, MODAL_CONTENT } from '../utils/constants';
import { freelancers_posts_ref, db, firebase } from '../utils/db';
import { query_my_freelance_submission, obj_to_array, no_op } from '../utils/funcs';

const ADD_YOURSELF = 'Add yourself';

export default class AvailableForWorkPage extends React.Component {
  state = {
    freelancers: [],
    self_freelance_posting: null,
    modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
    modal_content: MODAL_CONTENT.SIGNIN_VIEW,
    page_content: PAGE_CONTENT.FREELANCER_TABLE,
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

  post_signin_in_query = () =>
    query_my_freelance_submission()
      .catch(error => console.log(error))
      .then(self_freelance_posting => this.setState(() => ({ self_freelance_posting })));

  freelancer_post_did_finish = () => {
    this.query_data().then(rows =>
      query_my_freelance_submission().then(self_freelance_posting =>
        this.setState(() => ({
          self_freelance_posting,
          freelancers: rows ? obj_to_array(rows) : [],
        }))
      )
    );
  };

  toggle_freelancer_content = () =>
    this.setState(({ page_content }) => ({
      page_content:
        page_content === PAGE_CONTENT.FREELANCER_TABLE
          ? PAGE_CONTENT.NEW_FREELANCER
          : PAGE_CONTENT.FREELANCER_TABLE,
    }));

  already_signed_in_page_handler = () => {
    query_my_freelance_submission().then(self_freelance_posting =>
      this.setState(() => ({
        self_freelance_posting,
        modal_profile_content: MODAL_PROFILE_CONTENT.FREELANCER_POSTING,
      }))
    );
  };

  render() {
    return (
      <PageControl
        freelancers={this.state.freelancers}
        page_content={this.state.page_content}
        modal_content={this.state.modal_content}
      />
    );
  }
}
