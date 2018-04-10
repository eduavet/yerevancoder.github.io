import React from 'react';
import format from 'date-fns/format';
import Link from 'gatsby-link';

import { SPACER_20_W, EMAIL_REGEX, EMAIL_NEW_JOB_SUBJECT } from '../utils/constants';
import { email_new_job_body } from '../utils/funcs';

export default ({
  creation_time,
  job_location,
  salary_from: from,
  salary_to: to,
  payment_currency,
  post_author,
  job_description,
  short_job_description,
  contact_info,
  post_key,
}) => {
  const is_email_address = contact_info.match(EMAIL_REGEX);
  let contact_element = null;
  if (is_email_address !== null) {
    contact_element = (
      <a
        href={`mailto:${contact_info}?subject=${EMAIL_NEW_JOB_SUBJECT}&body=${email_new_job_body(
          short_job_description
        )}`}>
        {contact_info}
      </a>
    );
  } else {
    // Then I guess it was some kind of phone number?
    contact_element = <span>{contact_info}</span>;
  }
  return (
    <div className={'FreelancerTable__Freelancer'}>
      <div className={'FreelancerTable__FreelancerColumnDescription FullWidth'}>
        <span className={'FreelancerTable__FreelancerName'}>{short_job_description}</span>
        <span>Post date: {format(new Date(creation_time), 'DD/MMM/YYYY')}</span>
        <Link className={'FreelancerTable__DedicatedLink'} to={`/hiring-board/job/${post_key}`}>
          Dedicated Link
        </Link>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Posted by:</label>
            {SPACER_20_W}
            <span>{post_author}</span>
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Location:</label>
            {SPACER_20_W}
            <span>{job_location}</span>
          </div>
        </div>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Salary Range:</label>
            {SPACER_20_W}
            <span>{`from: ${from} to: ${to} ${payment_currency}`}</span>
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Contact Information:</label>
            {SPACER_20_W}
            {contact_element}
          </div>
        </div>
        <div className={'TextSubmissionWrapper'}>
          <textarea
            className={'TextSubmissionArea OneHundredMinusFifteen'}
            rows={12}
            readOnly={true}
            value={job_description}
          />
        </div>
      </div>
    </div>
  );
};
