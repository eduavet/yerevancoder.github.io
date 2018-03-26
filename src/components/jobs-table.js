import React from 'react';
import format from 'date-fns/format';

import { SPACER_20_W } from '../utils/constants';

const Posting = ({
  creation_time,
  job_location,
  salary_from: from,
  salary_to: to,
  payment_currency,
  post_author,
  job_description,
  short_job_description,
  contact_info,
}) => (
  <div className={'FreelancerTable__Freelancer'}>
    <div className={'FreelancerTable__FreelancerColumnDescription'}>
      <span className={'FreelancerTable__FreelancerName'}>{short_job_description}</span>
      <span>Post date: {format(new Date(creation_time), 'DD/MMM/YYYY')}</span>
      <div className={'FreelancerTable__FlexColumn'}>
        <div className={'PlainFlexRow FlexSpaceBetween'}>
          <label>Posted by:</label>
          {SPACER_20_W}
          <span>{post_author}</span>
        </div>
        <div className={'PlainFlexRow FlexSpaceBetween'}>
          <label>Location</label>
          {SPACER_20_W}
          <span>{job_location}</span>
        </div>
      </div>
      <div className={'FreelancerTable__FlexColumn'}>
        <div className={'PlainFlexRow FlexSpaceBetween'}>
          <label>Salary Range</label>
          {SPACER_20_W}
          <span>{`from: ${from} to: ${to} ${payment_currency}`}</span>
        </div>
        <div className={'PlainFlexRow FlexSpaceBetween'}>
          <label>Contact Information</label>
          {SPACER_20_W}
          <span>{contact_info}</span>
        </div>
      </div>
      <textarea
        className={'TextSubmissionArea FullWidth'}
        rows={10}
        readOnly={true}
        value={job_description}
      />
    </div>
  </div>
);

const no_jobs = (
  <p style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
    No jobs posted at this time
  </p>
);

export default ({ all_jobs }) => {
  const content =
    all_jobs.length >= 1
      ? all_jobs.map(s => (
          <Posting {...s} key={`${s.job_description}/${s.post_author}/${s.job_location}`} />
        ))
      : no_jobs;
  return <section>{content}</section>;
};
