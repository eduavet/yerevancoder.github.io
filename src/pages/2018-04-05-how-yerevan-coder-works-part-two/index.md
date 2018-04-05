---
title: How yerevancoder.com works and how you can contribute (Part Two)
tags: yerevancoder, tutorial
author: Edgar Aroutiounian
date: "2018-04-05"
description: How yerevancoder.com works and how you can contribute (Part Two)
discussionId: "2018-04-05-how-yerevancoder-works-part-two"
---

**This is part two of a two part series, see [part one](../2018-03-13-how-yerevan-coder-works) for
the beginning of the post, this post assumes familiarity with React and the React ecosystem.**

Continuing from last time, `yc` is a serverless site as it is hosted on github pages, but we still
have features like user authentication and a database for keeping our
[freelancers](../available-for-work) and for our [job-postings](../hiring-board). We are able to do
this with firebase, an object storage database.

# Getting a copy

First let's get a copy of the source code.

```bash
$ git clone https://github.com/yerevancoder/yerevancoder.github.io.git yerevan-coder
$ cd yerevan-coder
```

Now we have a copy and we can play with the source code.

# Code organization

`gatsby` forces a structure on us via the directories under `src`.

```bash
$ pwd
/Users/Edgar/Repos/yerevan-coder
$  ls -halt src
total 0
drwxr-xr-x  35 Edgar  staff   1.1K Apr  5 11:14 pages
drwxr-xr-x  20 Edgar  staff   640B Apr  5 11:13 ..
drwxr-xr-x   6 Edgar  staff   192B Apr  5 11:13 utils
drwxr-xr-x   7 Edgar  staff   224B Apr  5 11:13 .
drwxr-xr-x   3 Edgar  staff    96B Apr  5 11:13 templates
drwxr-xr-x   3 Edgar  staff    96B Apr  5 11:13 layouts
drwxr-xr-x  15 Edgar  staff   480B Apr  5 11:13 components
```

So we see that we have `pages`, `utils`, `templates`, `layouts` and `components`. All the items
under `pages` will be server side rendered by `gatsby` and will result in a dedicated and individual
`HTML` page, hence why `gatsby` is great for simple sites that just have static content. Files in
`pages`, `layout` and `components` expect a `default export` of a React Component, either class
based component or functional component, also `index.js` is a special file name for `gatsby` so the
component exported by an `index.js` is the one that represents that route under directories and
subdirectories of `pages`. The `index.js` under `layouts` is special because it is like the rootmost
component of our application, it is a wrapper component for all the pages created by `gatsby`.

Hence all Components under pages get statically rendered based on data available at build-time,
however some components need data from databases, so for those we push their data fetching logic
away from build time and to runtime.

# Rootmost component

Let's start examining the rootmost component

```bash
$ pwd
/Users/Edgar/Repos/yerevan-coder/src/layouts
$ ls
index.js
```

...and that `index.js` does a `default export` of a component. Here is the `render` method of this
component, it is the most important `render` method in the codebase since it determines how any of
our UI looks like.

```jsx
1  render() {
2    const { children } = this.props;
3    const site_title = this.props.data.site.siteMetadata.title;
4    const posts = this.props.data.allMarkdownRemark.edges;
5    const all_authors = new Set(posts.map(({ node }) => node.timeToRead));
6    const authors_count = all_authors.size;
7    return (
8      <div className={'ApplicationContainer__Container'}>
9        <Helmet title={site_title}>
10          {global_styles}
11          <link rel={'stylesheet'} href={'/yc-styles.css'} />
12          <link
13            href={'https://fonts.googleapis.com/css?family=Montserrat|Titillium+Web'}
14            rel={'stylesheet'}
15          />
16          <link
17            rel={'stylesheet'}
18            href={'https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css'}
19          />
20        </Helmet>
21        <FixedSidebar authors_count={authors_count} header_content={yc} />
22        <div className={'ApplicationContainer__MainContent'}>
23          <Headroom pinStart={300} onPin={this.onPin} onUnpin={this.onUnpin} onUnfix={this.onUnfix}>
24            {this.state.pin_bar_content}
25          </Headroom>
26          <div className={'ApplicationContainer__BusinessContent'}>{children()}</div>
27        </div>
28      </div>
29    );
30  }
```

Let's break it down line by line. Starting with line `2`, we use object destructing to pull out
`children`. This is a prop that React passes to our Component, it is whatever our rootmost component
is wrapping around. From it's usage on line `26`, we can see that in this case, `children` is a
function but it does not always have to be.

On line `3` we pull out the `site_title` from a deeply nested property chain lookup. But how do we know
that this lookup will succeed and where does this data even come from? For that answer, we look
further down in `layouts/index.js` and find this code:

```javascript
export const pageQuery = graphql`
  query IndexQuery_ {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
        }
      }
    }
  }
`;
```

This is a [graphql](https://graphql.org) query and notice that it is named `pageQuery`, this is
intentional as `gatsby` will inject our `default export`ed component and inject it with the data
result of this `graphql` query, it will put it under the `data` prop, hence `this.props.data`.

Moving onto line `8`, we make a container div and begin with a `Helmet` component. `Helmet` is used
to put whatever it's children are into the `<head/>` HTML element. We use it to load our `CSS`
which provides our popup tooltips on some buttons, fonts and website layout/style; handwritten CSS on YC is
about 900 lines with a few thousand more that is generated by function calls for the input field
effects on new job post and modal signin forms.

On line `21` we see the `FixedSidebar` which is sticky as it is because of the CSS it has:

```css
.InformationBar {
  position: fixed;
  justify-content: space-around;
  z-index: 99;
  left: 0;
  bottom: 0;
  top: 0;
  background-size: 100% 20px;
  width: var(--sidebar-fixed-width);
  padding: 10px;
}
```

This CSS keeps it from moving and we only do it under a media query, aka when the screen size is
appropriate. So the full usage of our fixed sidebar is:

```css
@media (min-width: 650px) {
  .InformationBar {
    position: fixed;
    justify-content: space-around;
    z-index: 99;
    left: 0;
    bottom: 0;
    top: 0;
    background-size: 100% 20px;
    width: var(--sidebar-fixed-width);
    padding: 10px;
  }
}
```

aka, this `CSS` will only work when the screen has a min-width of at least 650 pixels.

Then we see the `Headroom` Component used on line `23`, this provides us with the nav bar that comes
down when you down up on mobile, you can see usage of `this.state.pin_bar_content` on line `24`,
which should imply that we are keeping a React element (remember that a element is an instance of a
React Component) in state.

Finally coming to line `26`, we see `children()` aka a function call, this is a pattern used in React
when we don't know what the contents of our component will be, we make it so that children is a
function; this is a powerful pattern. Hence any UI we see on `yc` is whatever is the result of the
`children()` function call in the `render` method of the `default export`ed React Component of
`layouts/index.js`.

# Application Wide Data & Behavior

Working in the React paradigm, we pass data down the tree with props. Just like `gatsby` passed us
the data from the result of the `graphql` queries as `this.props.data`, then so can we pass data
down as props as well. However, this can be tedious when the level of nesting is deep, that is, we
have to pass data from one component as prop to another, and then pass again and again, sometimes
even five levels. React seems to limit the kinds of "global" operations we can do.

## Context API

Of course React does have a solution, and its an important one that is undergoing changes at the
moment. As of commit `0bf892baef941ea7a4117d4494b07fd1f7de13fc`, `yc` is built with React version
`16.1.0`. That means that we are using the original context API, but note that React released a new
a much better context API in `16.3.0` read this
[post](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) for more critical details on the new
API. The new context API is so nice that you can avoid using redux and mobx.

The point of the context API is to inject values into the children (subtree) of any React element
without having to go through many layers of nested data lookups.

### Our usage

The older context API that we use forces us declare what values we want available to any element in
the subtree of the component that implements `getChildContext`s.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import { db, firebase } from '../utils/db';

const INIT_STATE = {
  authenticated_user: null,
  remember_me_checked: false,
  pin_bar_content: EMPTY_DIV,
};

export default class ApplicationRoot extends React.Component {
  state = { ...INIT_STATE };

  static childContextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_in: PropTypes.func,
    sign_user_up: PropTypes.func,
    sign_user_out: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
  };

  getChildContext() {
    return {
      authenticated_user: () => this.state.authenticated_user,
      sign_user_up: (
        given_username,
        given_email,
        given_password,
        user_receives_blog_newsletter,
        did_signup_and_update
      ) =>
        firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(given_email, given_password)
          .catch(error => {
            throw new Error(`Could not sign you up because:\n${error.message}`);
          })
          .then(reply => {
            const authenticated_user = this.pass_through(reply.user);
            const current_user = firebase.auth().currentUser;
            return db
              .ref(`signed-up-users/${current_user.uid}`)
              .set({ user_receives_blog_newsletter, given_email, given_username })
              .then(() => {
                return current_user.updateProfile({ displayName: given_username });
              })
              .then(() => {
                this.setState(() => ({ authenticated_user }), did_signup_and_update);
              });
          }),
      // And other values not shown, see childContextTypes
    };
  }
}
```

Now any React Component will have access to the values described in `childContextTypes` because we
are implementing `getChildContext` in the rootmost component of the whole React application. To get
access to those values, a child component describe what values it wants to have access to.

Here is an example from `src/components/page-control.js`

```jsx
export default class PageControl extends React.Component {
  state = { modal_show: false, error: null };

  static contextTypes = {
    authenticated_user: PropTypes.func,
    sign_user_out: PropTypes.func,
    sign_user_in: PropTypes.func,
    submit_new_freelancer_post: PropTypes.func,
    submit_new_hiring_post: PropTypes.func,
  };
}
```

So this `PageControl` Component has access to such values under `this.context`, as in this
method of the `PageControl` Component:

```jsx
signout_handler = () => {
  const { sign_user_out } = this.context;
  const { user_did_sign_out } = this.props;
  sign_user_out(user_did_sign_out);
};
```

Hence the context API lets us centralize application wide data and behavior without forcing us to
write a lot of props passing boilerplate.

# firebase

The previous context API example showed a usage of firebase, specifically for creating a new
user. You'll notice that the firebase API is modern, its Promise based so we can use plain Promise
chaining with `.then/.catch` or `async/await`. We don't use async/await in `yc` because 1) it was
build hassle to add polyfills and it made site's JavaScript bundle bigger, 2) some people in country
side of Armenia/Artsakh might have older browsers and async/await would break their experience.

Coming back to firebase, it is a `NoSQL` object store DB, which means that there is no formal
schema, no tables, no primary keys/secondary keys. We just upload JavaScript values directly to a
path, similar to buckets in AWS.

Here is an example usage in `src/utils/funcs.js`:

```javascript
export const query_my_hiring_post_submissions = () => {
  const current_user = firebase.auth().currentUser;
  return db
    .ref(`users/${current_user.uid}/my-hiring-board-submissions`)
    .once('value')
    .then(snapshot => snapshot.val());
};
```

This function returns back all the JavaScript objects in the list at this ref path, where each
JavaScript object becomes a value of a key which is the key that firebase autogenerated for the data
point. aka something like:

```javascript
{
 '-L12313435': {...},
 '-Lgefg9823': {...},
 '-L12f1234': {...}
}
```

# closing

Be sure to write a comment below if there is something you don't understand, or open a question on our
[forum](https://forum.yerevancoder.com).
