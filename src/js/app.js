

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js', {
      scope: './'
    })
    .then(function(registration) { 
      console.log('Service Worker Installed'); 
    })
    .catch(function(err) {
      console.log('Service Worker Failed to Register :(', err); 
    });
}



var fetchData = function(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var result = xhr.responseText
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




var apiKey = "fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ";

fetchData('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key='+apiKey)
  .then(function(response) {
    console.log("Success", response)

    response = JSON.parse(response);

    var r = Math.floor( Math.random() * response.photos.length );
    var imageURL = response.photos[r].img_src;

    document.getElementsByClassName('targetImage')[0].src = imageURL

  })
  .catch(function(err) {
    console.log("Error", err)
  })





