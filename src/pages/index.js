import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';
import Collapsible from 'react-collapsible';

import BlogCardBanner from '../components/blog-card-banner';
import FilterControl from '../components/filter-control';

// import 'prismjs/themes/prism-solarizedlight.css';

export default class BlogIndex extends React.Component {
  constructor(p, context) {
    super(p, context);
    const { edges } = this.props.data.allMarkdownRemark;
    const names_set = new Set();
    edges.forEach(({ node }) => {
      node.frontmatter.tags
        .split(',')
        .map(s => s.toLowerCase().trim())
        .forEach(s => names_set.add(s));
    });
    this.state = { filtered_tags: new Set(), known_tags: Array.from(names_set.values()) };
  }

  on_checkbox_toggle = ({ name, checked }) => {
    const { filtered_tags } = this.state;
    if (checked) filtered_tags.add(name);
    else filtered_tags.delete(name);
    this.setState(() => ({ filtered_tags }));
  };

  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const post_banners = posts.map(({ node }) => {
      node._tag_set = new Set(node.frontmatter.tags.split(',').map(s => s.toLowerCase().trim()));
      return (
        <BlogCardBanner key={`${node.frontmatter.author}/${node.frontmatter.title}`} node={node} />
      );
    });
    const classes =
      'AvailableForWorkContainer__PageBanner AlignSelfFlexStart LeftMinorOneHalfRemPadding';
    return (
      <div className={'BlogTable'}>
        <h4 className={classes}>{`${post_banners.length} great posts to read`}</h4>
        <div className={'FilterControlWrapper LeftMinorOneHalfRemMargin'}>
          <Collapsible trigger={'Filter by tags'}>
            <FilterControl
              known_tags={this.state.known_tags}
              on_checkbox_toggle={this.on_checkbox_toggle}
              filtered_tags={this.state.filtered_tags}
            />
          </Collapsible>
        </div>
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
          excerpt(pruneLength: 190)
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
