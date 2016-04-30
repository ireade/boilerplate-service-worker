
// Setup Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) { 
      console.log('Service Worker Registered :)'); 
    })
    .catch(function(err) {
      console.log('Service Worker Failed to Register :(', err); 
    });
}


// Function to perform HTTP request
var get = function(url) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
                result = JSON.parse(result);
                resolve(result);
            } else {
                reject(xhr);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();

  }); 
};

get('https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ')
  .then(function(response) {
    console.log("Success", response);
    document.getElementsByClassName('targetImage')[0].src = response.url;
  })
  .catch(function(err) {
    console.log("Error", err);
  })
