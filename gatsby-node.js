"use strict";

// second arg is de-reffed from pluginOptions
exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest
}, {
  locales = ["en-US"],
  options = {}
}) => {

  console.info("gatsby-source-build-date: locales: " + locales);
  console.info("gatsby-source-build-date: options: " + JSON.stringify(options));
    
  const dateTime = new Date();
  
  const dateTimeString = dateTime.toLocaleString(locales, options);

  const dateBuiltData = {
    currentDate : dateTimeString
  }

  const nodeContent = JSON.stringify(dateBuiltData);

  const nodeMeta = {
    id: createNodeId(`current-build-date`),
    parent: null,
    children: [],
    internal: {
      type: `CurrentBuildDate`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(dateBuiltData)
    }
  };

  const dateBuiltNode = Object.assign({}, dateBuiltData, nodeMeta);

  actions.createNode(dateBuiltNode);

};