import React from 'react';
import Spinner from 'react-spinkit';

import { hiring_table_posts_ref } from '../utils/db';
import JobPost from './job-post';

const JOB_WRAPPER_CLASSES =
  'PlainFlexColumn PlainFlexCentered FifteenPaddingLeft MobileRemoveFifteenPaddingLeft';

export default class DedicatedJobPost extends React.Component {
  state = { job: null };

  componentDidMount() {
    const { job_id } = this.props;
    hiring_table_posts_ref
      .child(job_id)
      .once('value')
      .then(snap_shot => {
        const job = snap_shot.val();
        // If data is null, then you got a gibberish, nonexistent job
        console.log({ data: job });
        if (job !== null) {
          this.setState(() => ({ job }));
        }
      });
  }

  render() {
    let content = null;
    if (this.state.job === null) {
      content = <Spinner fadeIn={'quarter'} name={'ball-scale-ripple-multiple'} />;
    } else {
      content = <JobPost {...this.state.job} />;
    }
    return <div className={JOB_WRAPPER_CLASSES}>{content}</div>;
  }
}
