/*
*
* Zipcode lookup / caching utility
*
*/


// Variables, Methods

var submit = $('#search'),
    postalApi = "http://public.api.gdos.salvationarmy.org/geocode/postal?",
    searchApi = "http://public.api.gdos.salvationarmy.org/search?",
    hideOnCookie = $('.hideOnCookie'),
    showOnCookie = $('.showOnCookie'),
  
    //fallback = setTimeout(function() { fail('30 seconds expired'); }, 30000),
    addhttp,
    latLong,
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

// Geocode location

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// Failure message

fail = function (err) {
  console.log('err', err);
};

// Initialize utility

submit.click(latLong);