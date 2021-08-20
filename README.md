# gatsby-source-build-date

Uses Node's built in [Date Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) to add the last build date to your GraphQL. This allows you to add the date anywhere in your site. Use Node standard locale short codes and formatting options in your `gatsby-config`. This is a hard fork of [gatsby-plugin-build-date](https://www.gatsbyjs.com/plugins/gatsby-plugin-build-date/), replacing a third party Date library with Node native Date.

It's common to see text like "Last Updated On 1/20/2021" in website footers - this plugin makes that date, reflecting when the site was built, available in the internal GraphQL API so that it's accessible in any component or page. No need to manually update the date, just build and let the new static date update itself.

This plugin is **not** designed to get "last build/update date/time" of specific files, it is only for when the whole site is compiled and `gatsby-node.js` is run.

## Node Version Issues

- Node 14 (v14.15.4): Everything works.
- Node 13 (v13.14.0): Everything works.
- Node 12 (v12.22): Locales strings are ignored. I discovered this building on Netlify, which caused the locales to be ignored and present only in English. I was running v14 on my dev machine but Netlify had snap shotted v12 on my first build. I needed to set the node version in Netlify env vars.

## Install

`npm install --save gatsby-source-build-date` or `yarn add gatsby-source-build-date`

## How to Use

Date format defaults to a string in "en-US" format, e.g. "8/17/2021, 10:46:14 AM" if built on August 17, 2021. If this is acceptable and no further formatting or localization is needed, you can include it in your `gatsby-config.js` with no options:

```js
// In your gatsby-config.js

module.exports = {
  plugins: [`gatsby-source-build-date`],
};
```

If different formatting or localization is desired, include with options:

```js
// In your gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-build-date`,
      options: {
        locales: "fr-FR",
        options: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      },
    },
  ],
};
```

The above configuration would return a date of "lundi 16 août 2021 à 17:40:13" if built on August 16, 2021.  
With no options, it would produce "16/08/2021 á 17:12:26".

## Plugin Options

### locales

> A single locale short-code string or an array of short-code strings.
>
> Default: ["en-US"]
>
> If you supply an array of locale codes, the global `Intl` object will try to find a match in the order supplied. If it can't find any match, it will use the default locale of the build machine OS. This link explains [how they are interpreted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation). Note that all codes must be strings, or the code negotiation will fail with an error and not proceed to try the next code in your array.
>
> List of NPM [locale short codes](https://www.npmjs.com/package/locale-codes)

### options

> Default: {} (empty object)
>
> This is an object with a list of properties. If not supplied, or left blank, the default format of the build machine OS will be used.
>
> Here is [list of date formatting properties and their value options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat). I have not tested all of the options. [Let me know](mailto:edpike365@gmail.com?subject=[GitHub]%20gatsby-source-build-date%20plugin) if you find one that does not work.
>
> The documentation on the main page is weak. Here are more useful [examples of options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

## How to Query

Date string is added as type `currentBuildDate` to internal GraphQL API and can be queried as such:

```graphql
{
  currentBuildDate {
    currentDate
  }
}
```

Use in a page query:

```js
export const query = graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`;
```

or a static query:

```js
const data = useStaticQuery(graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`);
```

Note that if running in development mode with `gatsby develop` node APIs are not re-run during hot reload, so you must quit (`ctrl-c`) and restart development mode if options are changed.

## Acknowledgements

This plugin was a hard fork of [gatsby-plugin-build-date](https://www.gatsbyjs.com/plugins/gatsby-plugin-build-date/). Its' Gatsby dependencies were out of date and it required a third party Date library. I always try to reduce third party plugins (as I write this third party plugin).

I named this version "gatsby-source-build-date" to differentiate it from gatsby-plugin-build-date, but also because these plugins place a data source in the GraphQL schema, so I think it qualifies as a source.
