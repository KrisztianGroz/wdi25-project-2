'use strict';

/* global google: true */
$(function () {

  var greeting = 'Hello Krisz';
  console.log(greeting + 'JS loaded!');
  var map = null;
  var markers = [];

  var $input = $('.autocomplete');
  if ($input.length > 0) {
    var autocomplete = new google.maps.places.Autocomplete($input[0]);
    autocomplete.addListener('place_changed', function () {
      // Remove any old markers
      removeMapMarkers();

      var $lat = $('input[name="address[lat]"]');
      var $lng = $('input[name="address[lng]"]');
      var $fulladdress = $('input[name="address[full]"]');
      var $postCode = $('input[name="address[postcode]"]');
      var $city = $('input[name="address[city]"]');
      var $country = $('input[name="address[country]"]');
      var $street = $('input[name="address[street]"]');
      var place = autocomplete.getPlace();
      var location = place.geometry.location.toJSON();

      // Update the hidden form fields (to send to database)
      $lat.val(location.lat);
      $lng.val(location.lng);
      $fulladdress.val(place.formatted_address);
      $street.val(place.address_components[0].long_name);
      $city.val(place.address_components[2].long_name);
      $country.val(place.address_components[5].long_name);
      $postCode.val(place.address_components[6].long_name);

      // Center the map on the location
      var latLng = { lat: location.lat, lng: location.lng };

      map.setCenter(latLng);

      // Add a marker on the location
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

      // Push the marker to the markers array (in case we want to delete it later)
      markers.push(marker);
    });
  }

  function removeMapMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  function initMap() {
    var pos = { lat: 51.0, lng: -0.072155 };
    var map = new google.maps.Map(document.getElementById('map2'), {
      zoom: 16,
      center: pos
    });
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });
  }

  function geoMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 10
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }

  if ($('#map').length) geoMap();else initMap();

  var $mapData = $('#mapData');
  if ($mapData.length > 0) {
    // loop through the sessions data

    var showMapMarkers = function showMapMarkers() {
      for (var i = 0; i < sessionsData.length; i++) {
        var latLng = { lat: sessionsData[i].address.lat, lng: sessionsData[i].address.lng };
        console.log(latLng);
        console.log(map);

        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      }
    };

    var sessionsData = $mapData.data('sessions');

    showMapMarkers();

    // add a marker to the map for each object in the sessionsData
  }
});