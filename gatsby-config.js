module.exports = {
  siteMetadata: {
    title: 'yerevancoder',
    author: 'Coders of Armenia',
    description: 'A place for Armenian coders to talk',
    siteUrl: 'https://yerevancoder.com',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-plugin-ed-comments`,
      options: {
        commentsServerUrl: 'https://comments-for-yerevancoder-com.ed.community',
        commentsScriptUrl:
          'https://comments-for-yerevancoder-com.ed.community/-/ed-comments.v0.min.js',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/hiring-board/job/*`, `/news/posting/*`] },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-111477105-1`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
};
