import React from 'react';

import { SPACER_20_W } from '../utils/constants';

const maybe_link = link =>
  link !== null && link !== undefined && link !== '' ? (
    <a className={'FreelancerTable__FreelancerProfileLink'} href={link}>
      {link}
    </a>
  ) : (
    <span>not provided</span>
  );

const FreelancerCard = ({
  name,
  github_link,
  linkedin_link,
  resume_link,
  self_description,
  known_technologies,
}) => {
  return (
    <div className={'FreelancerTable__Freelancer'}>
      <div className={'FreelancerTable__FreelancerColumnDescription'}>
        <span className={'FreelancerTable__FreelancerName'}>{name}</span>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Github:</label>
            {SPACER_20_W}
            {maybe_link(github_link)}
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Linkedin:</label>
            {SPACER_20_W}
            {maybe_link(linkedin_link)}
          </div>
        </div>
        <div className={'FreelancerTable__FlexColumn'}>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Resume/Personal Site:</label>
            {SPACER_20_W}
            {maybe_link(resume_link)}
          </div>
          <div className={'PlainFlexRow FlexSpaceBetween'}>
            <label>Known Technologies:</label>
            {SPACER_20_W}
            <span>{known_technologies}</span>
          </div>
        </div>
        <textarea rows={7} readOnly={true} value={self_description} />
      </div>
    </div>
  );
};

const no_freelancers = (
  <p style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
    No free lancers posted at this time
  </p>
);

export default props => {
  const { freelancers } = props;
  const content =
    freelancers.length >= 1
      ? freelancers.map(freelancer => (
          <FreelancerCard {...freelancer} key={`${freelancer.name}/${freelancer.github_link}`} />
        ))
      : no_freelancers;
  return <div className={'FreelancerTable'}>{content}</div>;
};
