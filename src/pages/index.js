import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import Link from 'gatsby-link';
import Collapsible from 'react-collapsible';

import BlogCardBanner from '../components/blog-card-banner';
import FilterControl from '../components/filter-control';

// import 'prismjs/themes/prism-solarizedlight.css';

const TRIGGER = (
  <span
    data-balloon={'Click to toggle filter tag options'}
    data-ballon-pos={'right'}
    className={'FilterControl__TriggerMessage'}>
    Filter by topic tags
  </span>
);

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

  make_posts() {
    const { data } = this.props;
    const { filtered_tags } = this.state;
    const posts = data.allMarkdownRemark.edges;
    let post_banners = [];
    if (filtered_tags.size === 0) {
      post_banners = posts.map(({ node }) => (
        <BlogCardBanner key={`${node.frontmatter.author}/${node.frontmatter.title}`} node={node} />
      ));
    } else {
      for (const post of posts) {
        const post_tags = new Set(
          post.node.frontmatter.tags.split(',').map(s => s.toLowerCase().trim())
        );
        let intersection = false;
        for (const tag of post_tags) {
          if (filtered_tags.has(tag)) {
            intersection = true;
            break;
          }
        }
        if (intersection) {
          const { node } = post;
          post_banners.push(
            <BlogCardBanner
              key={`${node.frontmatter.author}/${node.frontmatter.title}`}
              node={node}
            />
          );
        }
      }
    }
    return post_banners;
  }

  clear_all = () => this.setState(() => ({ filtered_tags: new Set() }));

  render() {
    const post_banners = this.make_posts();
    const classes =
      'AvailableForWorkContainer__PageBanner AlignSelfFlexStart LeftMinorOneHalfRemPadding';
    return (
      <div className={'BlogTable'}>
        <h4 className={classes}>{`${post_banners.length} great posts to read`}</h4>
        <div className={'FilterControlWrapper LeftMinorOneHalfRemMargin'}>
          <Collapsible trigger={TRIGGER} open={true}>
            <FilterControl
              known_tags={this.state.known_tags}
              on_checkbox_toggle={this.on_checkbox_toggle}
              filtered_tags={this.state.filtered_tags}
              clear_all={this.clear_all}
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
