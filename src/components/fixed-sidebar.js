import React from 'react';
import Link from 'gatsby-link';

import { ROUTES } from '../utils/constants';

export default ({ header_content }) => (
  <aside className={'InformationBar'}>
    {header_content}
    <p>
      yerevancoder.com is a place for coders in Armenia to share their experiences in tech. {' '}
      <Link to={ROUTES.AVAILABLE_FOR_WORK}>Find freelancers</Link> looking for a job, or post a tech job on
      our <Link to={ROUTES.JOBS_TABLE}>hiring board</Link>. Check out our{' '}
      <a href={'https://forum.yerevancoder.com/categories'}>forums</a> for more discussions,
      consider coming to <a href={'https://iteratehackerspace.com'}>iterate hackerspace</a> for
      coding workshops and a vibrant programmer community.
    </p>
    <p>
      Use this <Link to={'/2018-03-13-how-yerevan-coder-works/'}>post</Link> as a guide on how to
      add a new blog post and check out this{' '}
      <Link to={'/2017-12-21-javascript-resources/'}>post</Link> for many inpage lecture notes on
      learning JavaScript, consider checking out the source code{' '}
      <a href={'https://github.com/yerevancoder/yerevancoder.github.io'}>here</a>.
    </p>
  </aside>
);
