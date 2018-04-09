import React from 'react';
import Spinner from 'react-spinkit';

import Posting from './job-post';

const no_jobs = (
  <p style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
    No jobs posted at this time
  </p>
);

export default ({ all_jobs, loadedJobs }) => {
  const content =
    all_jobs.length >= 1
      ? all_jobs.map(s => (
          <Posting {...s} key={`${s.job_description}/${s.post_author}/${s.job_location}`} />
        ))
      : no_jobs;

  return (
    <section className={'JobsList'}>
      {loadedJobs ? content : <Spinner fadeIn={'quarter'} name={'ball-scale-ripple-multiple'} />}
    </section>
  );
};
