import React from 'react';

import { SPACER_10_H } from '../../utils/constants';

export default ({ self_freelance_posting, delete_posting_handler }) => {
  if (self_freelance_posting) {
    const { post_key, self_description, ...freelance_posting } = self_freelance_posting;
    return (
      <div className={'FreelanceProfileSubmission'}>
        <span className={'FreelanceProfileSubmission__PostingBanner'}>
          My Freelancer Submission
        </span>
        <pre className={'FreelanceProfileSubmission__MonoText'}>
          <span>{JSON.stringify(freelance_posting, null, 4)}</span>
        </pre>
        {SPACER_10_H}
        <textarea
          className={'FreelanceProfileSubmission__SelfDescription'}
          defaultValue={self_description}
        />
        <input
          className={'NewFreelancerFormContainer__SubmitButton'}
          value={'Delete'}
          onClick={delete_posting_handler}
          type={'button'}
        />
      </div>
    );
  } else {
    return <span style={{ textAlign: 'center' }}>You haven't posted yet</span>;
  }
};
