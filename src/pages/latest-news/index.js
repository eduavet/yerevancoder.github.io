import React from 'react';
import PropTypes from 'prop-types';

import PageControl from '../../components/page-control';
import { PAGE_CONTENT, MODAL_CONTENT, MODAL_PROFILE_CONTENT } from '../../utils/constants';
import { obj_to_array, no_op } from '../../utils/funcs';
import { news_postings_ref, total_news_posting_count_ref } from '../../utils/db';

const INIT_STATE = {
  total_news_count: 0,
  all_news_postings: [],
  modal_content: MODAL_CONTENT.SIGNIN_VIEW,
  page_content: PAGE_CONTENT.NEWS_LISTINGS,
};

const TEMP_DATA = [
  { poster: 'display name', title: '' },
  { poster: 'display name', title: '' },
  { poster: 'display name', title: '' },
];

export default class NewsPage extends React.Component {
  state = { ...INIT_STATE };

  query_total_news_postings_count = () =>
    total_news_posting_count_ref.once('value').then(snap_shot => Number(snap_shot.val()));

  query_all_news_postings = () =>
    total_news_posting_count_ref.once('value').then(snap_shot => {
      const data = snap_shot.val();
      if (data) return obj_to_array(data);
      else return TEMP_DATA;
    });

  componentDidMount() {
    const { location } = this.props;
    const search_params = new URLSearchParams(location.search);
    const query_params = Array.from(search_params.entries()).map(([k, v]) => ({ [k]: v }));
    if (query_params.length === 0) {
      // Then we are on home page
      this.query_total_news_postings_count().then(count => {
        // Decide the total page count
      });
    } else {
      // Paginate
    }
  }

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
        news_count={this.state.total_news_count}
        new_postings={this.state.all_news_postings}
        signup_handler={this.signup_handler}
        signin_handler={this.signin_handler}
        banner_title={'Latest news'}
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
