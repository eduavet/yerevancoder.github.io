import React from 'react';
import Link from 'gatsby-link';

export default ({ node }) => {
  const { title, tags, author, date } = node.frontmatter;
  return (
    <div key={node.fields.slug} className={'BlogEntryCard'}>
      <h3 className={'BlogEntryCard__Banner'}>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <small className={'BlogEntryCard__Byline'}>
        {date} | {node.wordCount.words} words | {node.timeToRead} minutes to read | {author} |{' '}
        {tags}
      </small>
      <p className={'BlogEntryCard__Excerpt'} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  );
};
