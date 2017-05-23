var Git = require("nodegit");

export let download = (githubUrl,location)=>{
  Git.Clone(githubUrl, location).then(function(repository) {
    // Work with the repository object here.
    console.log(repository);
  });
}

export let build = (location)=>{
  //build material library
}
