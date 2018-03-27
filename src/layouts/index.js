import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { auth, freelancers_posts_ref, db, firebase, hiring_table_posts_ref } from '../utils/db';
import FixedSidebar from '../components/fixed-sidebar';
import { SESSION_USER, global_styles, ROUTES } from '../utils/constants';
import { query_my_freelance_submission } from '../utils/funcs';

const yc = (
  <Link className={'InformationBar__SiteBannerName'} to={'/'}>
    yerevancoder
  </Link>
);

const INIT_STATE = { authenticated_user: null, remember_me_checked: false };

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

  componentDidMount() {
    // const existing_user = sessionStorage.getItem(SESSION_USER);
    // if (existing_user) {
    //   const authenticated_user = JSON.parse(existing_user);
    //   console.log({ authenticated_user });
    // this.setState(() => ({ authenticated_user }));
    // }
  }

  handle_session_storage(remember_me_checked, authed_user_data) {
    if (remember_me_checked) {
      sessionStorage.setItem(SESSION_USER, JSON.stringify(authed_user_data));
    }
  }

  pass_through = ({
    displayName,
    email,
    emailVerified,
    metadata,
    phoneNumber,
    photoURL,
    refreshToken,
    uid,
  }) => ({
    displayName,
    email,
    emailVerified,
    metadata,
    phoneNumber,
    photoURL,
    refreshToken,
    uid,
  });

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
      sign_user_in: (email, password, remember_me_checked, did_signin_and_update) =>
        auth.signInWithEmailAndPassword(email, password).then(reply => {
          return this.setState(
            () => ({ remember_me_checked, authenticated_user: this.pass_through(reply) }),
            did_signin_and_update
          );
        }),
      sign_user_out: after_sign_out =>
        auth.signOut().then(() => {
          this.setState(() => ({ ...INIT_STATE }), after_sign_out);
        }),
      submit_new_freelancer_post: data =>
        query_my_freelance_submission().then(profile => {
          if (profile === null) {
            return freelancers_posts_ref.push(data).then(reply => {
              const { uid } = this.state.authenticated_user;
              return db
                .ref(`users/${uid}/my-freelance-submission`)
                .set({ ...data, post_key: reply.key });
            });
          } else {
            throw new Error('Profile already exists, delete existing one first');
          }
        }),
      submit_new_hiring_post: hiring_post =>
        hiring_table_posts_ref.push().then(reply => {
          const { uid } = this.state.authenticated_user;
          const new_post_key = reply.key;
          const updates = {};
          const with_info = { ...hiring_post, post_key: new_post_key };
          updates[`/hiring-table-posts/${new_post_key}`] = with_info;
          updates[`/users/${uid}/my-hiring-board-submissions/${new_post_key}`] = with_info;
          return db.ref().update(updates);
        }),
    };
  }

  render() {
    const { children, location } = this.props;
    const site_title = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges;
    const all_authors = new Set(posts.map(({ node }) => node.timeToRead));
    const authors_count = all_authors.size;
    return (
      <div className={'ApplicationContainer__Container'}>
        <Helmet title={site_title}>
          {global_styles}
          <link rel={'stylesheet'} href={'yc-styles.css'} />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat|Titillium+Web"
            rel="stylesheet"
          />
          <link
            rel={'stylesheet'}
            href={'https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css'}
          />
        </Helmet>
        <FixedSidebar authors_count={authors_count} header_content={yc} />
        <div className={'ApplicationContainer__MainContent'}>
          <div className={'ApplicationContainer__BusinessContent'}>{children()}</div>
        </div>
      </div>
    );
  }
}

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
