export default let generateIndexFile = (tag,distFolder) => (`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
        <title>AngularApp</title>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="favicon.ico">
        </head>
        <body>
          <my-app id="app" tag=${tag}>Loading AppComponent content here ...</my-app>
          <script type="text/javascript" src="ng/inline.bundle.js"></script><script type="text/javascript" src="ng/polyfills.bundle.js"></script><script type="text/javascript" src="ng/styles.bundle.js"></script><script type="text/javascript" src="ng/vendor.bundle.js"></script><script type="text/javascript" src="ng/main.bundle.js"></script></body>
        </html>
        `);
