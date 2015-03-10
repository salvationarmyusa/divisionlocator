/*
*
* Zipcode lookup / caching utility
*
*/


//
// Variables
//

var zipCode,
    submit = $('#search'),
    postalApi = "http://public.api.gdos.salvationarmy.org/geocode/postal?",
    searchApi = "http://public.api.gdos.salvationarmy.org/search?",
    hideOnCookie = $('.hideOnCookie'),
    showOnCookie = $('.showOnCookie');



/**
* Add http to URL if missing
*
*/

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
    return url;
}

/**
* Find Lat/Long from Zip
*
*/

function latLong(){

  var zipCode = $('#term').val();

  $.getJSON( postalApi, {
      isoCountry: "us",
      postalCode: zipCode
  }).done(function( data ) {
      var lat = data.latitude;
      var lon = data.longitude;
      var latLong = [lat,lon];
      return latLong;
  });
}

/**
* Find Lat/Long from Zip
*
*/


function findUserLocation() {


  if ($.cookie('zipResult')) {
    $.cookie('zipResult', null, { path: '/' });
  }

  // If geolocation is unsupported, stop further operations and show message
  if (!navigator.geolocation) {
    $res.html('Geolocation unsupported. Please use the zip code box to enter and save your zip code.');
    return false;
  }

  navigator.geolocation.getCurrentPosition(positionFound, positionError);
};


$('#search').click(latLong);

/**
* Error positioning
*
*/
positionError = function (err) {
  fail(err.message);
};