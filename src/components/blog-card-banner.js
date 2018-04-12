import React from 'react';
import Link from 'gatsby-link';

import styles from './blog-card-banner.module.css';

export default ({ node }) => {
  const { title, tags, author, date } = node.frontmatter;
  return (
    <div key={node.fields.slug} className={styles.BlogEntryCard}>
      <h3 className={styles.BlogEntryCard__Banner}>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <small className={styles.BlogEntryCard__Byline}>
        {date} | {node.wordCount.words} words | {node.timeToRead} {node.timeToRead > 1 ? "minutes" : "minute"} to read | {author} |{' '}
        {tags}
      </small>
      <p
        className={styles.BlogEntryCard__Excerpt}
        dangerouslySetInnerHTML={{ __html: node.excerpt }}
      />
    </div>
  );
};
