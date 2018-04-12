import React from 'react';
import Spinner from 'react-spinkit';

import Posting from './freelancer-post';

const no_freelancers = (
  <p style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
    No freelancers posted at this time
  </p>
);

export default ({ freelancers, loadedLancers }) => {
  const content =
    freelancers.length >= 1
      ? freelancers.map(freelancer => (
          <Posting {...freelancer} key={`${freelancer.name}/${freelancer.github_link}`} />
        ))
      : no_freelancers;
  return (
    <section className={'FreelancerTable'}>
      {loadedLancers ? content : <Spinner fadeIn={'quarter'} name={'ball-scale-ripple-multiple'} />}
    </section>
  )
};
