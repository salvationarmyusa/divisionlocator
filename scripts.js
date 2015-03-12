/*
*
* Zipcode lookup / caching utility
*
*/


// Variables, Methods

var submit = $('#search'),
    locate = $('#locate'),
    results = $('#results'),
    postalApi = "http://public.api.gdos.salvationarmy.org/geocode/postal?",
    searchApi = "http://public.api.gdos.salvationarmy.org/search?",
    hideOnCookie = $('.hideOnCookie'),
    showOnCookie = $('.showOnCookie'),
  
    //fallback = setTimeout(function() { fail('30 seconds expired'); }, 30000),
    addhttp,
    latLong,
    geoLocate,
    fail;


// Add http to URL if missing

addhttp = function(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}

// Find Lat/Long from Zip

latLong = function(){

  var zip = $('#term').val();

  if(zip.length < 5) {
    results.html('<p>Please enter a zip code.</p>');
  } else {
    results.empty();
    $.getJSON( postalApi, {
        isoCountry: "us",
        postalCode: zip
    }).done(function( data ) {
        var lat = data.latitude;
        var lon = data.longitude;
        var latLong = [lat,lon];
        console.log(latLong);
        return latLong;
    });
  }

}

// Geocode location
// https://developer.mozilla.org/en-US/docs/Web/API/Location

geoLocate = function(){

  if(!navigator.geolocation){
    results.html('<p>Sorry, geolocation is not supported in your browser. Please enter a zip code to search');
    return;
  }

  var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude;
    var lon = crd.longitude;
    var latLong = [lat,lon];
    console.log(latLong);
    return latLong;
  };

  function error(err) {
    result.html('<p>Sorry! There was an error. Please try again or use the manual zip search feature. The error was' + err.code + ' ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

}

// Failure message

fail = function (err) {
  console.log('err', err);
};

// Initialize utility

submit.click(latLong);
locate.click(geoLocate);