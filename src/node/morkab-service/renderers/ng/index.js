export default function({
  webdriverio,
  options,
  url,
  tag
}){
  return webdriverio
      .remote(options)
      .init()
      .url(url)
      .getHTML(tag).then(function(title) {
          console.log('Title was: ' + title);
          return title;
      })
}
