import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';

import BlogCardBanner from '../components/blog-card-banner';
// import 'prismjs/themes/prism-solarizedlight.css';

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const post_banners = posts.map(({ node }) => (
      <BlogCardBanner key={`${node.frontmatter.author}/${node.frontmatter.title}`} node={node} />
    ));
    const classes =
      'AvailableForWorkContainer__PageBanner AlignSelfFlexStart LeftMinorOneHalfRemPadding';
    return (
      <div className={'BlogTable'}>
        <h4 className={classes}>{`${post_banners.length} great posts to read`}</h4>
        {post_banners}
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
