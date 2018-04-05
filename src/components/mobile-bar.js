import React from 'react';
import Link from 'gatsby-link';

const yc = (
  <Link className={'BlogTable__MobileBarBanner'} to={'/'}>
    yerevancoder
  </Link>
);

export default (
  <div className={'BlogTable__MobileBar'}>
    <img className={'BlogTable__MobileBarSiteLogo'} src={'/mobile-bar-logo.png'} />
    {yc}
  </div>
);
