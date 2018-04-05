import React from 'react';
import Link from 'gatsby-link';

import { ROUTES, SPACER_10_H } from '../utils/constants';

const yc = (
  <Link className={'BlogTable__MobileBarBanner'} to={'/'}>
    yerevancoder
  </Link>
);

export default (
  <div className={'BlogTable__MobileBar'}>
    <img className={'BlogTable__MobileBarSiteLogo'} src={'/mobile-bar-logo.png'} />
    {yc}
    <div className={'BlogTable__MobileBarNavBox PlainFlexRow'}>
      <div className={'PlainFlexColumn BlogTable__MobileBarNavBoxElement'}>
        <Link to={ROUTES.AVAILABLE_FOR_WORK}>freelancers</Link>
        {SPACER_10_H}
        <Link to={ROUTES.JOBS_TABLE}>hiring board</Link>
      </div>
      <div className={'PlainFlexColumn'}>
        <a href={'https://forum.yerevancoder.com/categories'}>forums</a>
        {SPACER_10_H}
        <a href={'https://iteratehackerspace.com'}>iterate</a>
      </div>
    </div>
  </div>
);
