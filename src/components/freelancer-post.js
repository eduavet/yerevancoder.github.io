import React from 'react';

import { SPACER_20_W } from '../utils/constants';

export default ({
  name,
  github_link,
  linkedin_link,
  resume_link,
  self_description,
  known_technologies,
}) => {
  const maybe_link = link =>
    link !== null && link !== undefined && link !== '' ? (
      <a className={'FreelancerTable__FreelancerProfileLink'} href={link}>
        {link}
      </a>
    ) : (
      <span>not provided</span>
    );
  return (
    <div className={'FreelancerTable__Freelancer'}>
      <div className={'FreelancerTable__FreelancerColumnDescription'}>
        <span className={'FreelancerTable__FreelancerName'}>{name}</span>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween FreelancerTable__CredRow'}>
            <label>Github:</label>
            {SPACER_20_W}
            {maybe_link(github_link)}
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween FreelancerTable__CredRow'}>
            <label>Linkedin:</label>
            {SPACER_20_W}
            {maybe_link(linkedin_link)}
          </div>
        </div>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween FreelancerTable__CredRow'}>
            <label>Resume/Personal Site:</label>
            {SPACER_20_W}
            {maybe_link(resume_link)}
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween FreelancerTable__CredRow'}>
            <label>Known Technologies:</label>
            {SPACER_20_W}
            <span>{known_technologies}</span>
          </div>
        </div>
        <textarea
          className={'TextSubmissionArea FullWidth'}
          rows={7}
          readOnly={true}
          value={self_description}
        />
      </div>
    </div>
  );
};
