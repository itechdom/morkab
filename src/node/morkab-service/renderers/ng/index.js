export default function({
  webdriverio,
  options
}){
  return webdriverio
      .remote(options)
      .init()
      .url('http://www.google.com')
      .getTitle().then(function(title) {
          console.log('Title was: ' + title);
          return title;
      })
}
