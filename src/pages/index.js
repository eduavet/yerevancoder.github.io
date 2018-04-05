import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';

// import 'prismjs/themes/prism-solarizedlight.css';

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    return (
      <div className={'BlogTable'}>
        {posts.map(({ node }) => {
          const { title, tags, author, date } = node.frontmatter;
          return (
            <div key={node.fields.slug} className={'BlogEntryCard'}>
              <h3 className={'BlogEntryCard__Banner'}>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small className={'BlogEntryCard__Byline'}>
                {date} | {node.wordCount.words} words | {node.timeToRead} minutes to read | {author}{' '}
                | {tags}
              </small>
              <p
                className={'BlogEntryCard__Excerpt'}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          wordCount {
            words
          }
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            author
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
