import React from 'react';
import Spinner from 'react-spinkit';

import { hiring_table_posts_ref } from '../../../utils/db';
import JobPost from '../../../components/job-post';
import { SPACER_10_H } from '../../../utils/constants';

const JOB_WRAPPER_CLASSES =
  'PlainFlexColumn PlainFlexCentered FifteenPaddingLeft MobileRemoveFifteenPaddingLeft';

export default class DedicatedNewsPost extends React.Component {
  state = { news_posting: null };

  componentDidMount() {
    const [, , , posting_id] = this.props.location.pathname.split('/');
    // hiring_table_posts_ref
    //   .child(posting_id)
    //   .once('value')
    //   .then(snap_shot => {
    //     const job = snap_shot.val();
    //     // If data is null, then you got a gibberish, nonexistent job
    //     console.log({ data: job });
    //     if (job !== null) {
    //       this.setState(() => ({ job }));
    //     }
    //   })
    //   .catch(err => {
    //     // Error can't happen
    //   });
  }

  render() {
    let content = null;
    if (this.state.news_posting === null) {
      content = <Spinner fadeIn={'quarter'} name={'ball-scale-ripple-multiple'} />;
    } else {
      content = <JobPost {...this.state.job} />;
    }
    return (
      <div className={JOB_WRAPPER_CLASSES}>
        <p>hi</p>
      </div>
    );
  }
}
