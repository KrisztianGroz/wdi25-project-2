/* global google: true */
$(() => {

  const greeting = 'Hello Krisz';
  console.log(greeting+'JS loaded!');
  let map = null;
  const markers = [];

  const $input = $('.autocomplete');
  //console.log($input);
  const autocomplete = new google.maps.places.Autocomplete($input[0]);
  autocomplete.addListener('place_changed', () => {
    // Remove any old markers
    removeMapMarkers();

    const $lat = $('input[name="address[lat]"]');
    const $lng = $('input[name="address[lng]"]');
    const $address = $('input[name="address[lng]"]');
    const $fulladdress = $('input[name="address[full]"]');
    const $postCode = $('input[name="address[postcode]"]');
    const $city = $('input[name="address[city]"]');
    const $country = $('input[name="address[country]"]');
    const $street = $('input[name="address[street]"]');



    const place = autocomplete.getPlace();
    console.log(place);
    const location = place.geometry.location.toJSON();
    const address = place.formatted_address;
    const postCode = place.address_components[6].long_name;

    // Update the hidden form fields (to send to database)
    $lat.val(location.lat);
    $lng.val(location.lng);
    $fulladdress.val(place.formatted_address);
    $street.val(place.address_components[0].long_name);
    $city.val(place.address_components[2].long_name);
    $country.val(place.address_components[5].long_name);
    $postCode.val(place.address_components[6].long_name);

    // Center the map on the location
    const latLng = {lat: location.lat, lng: location.lng};
    map.setCenter(latLng);
    // Add a marker on the location
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    // Push the marker to the markers array (in case we want to delete it later)
    markers.push(marker);
  });

  function removeMapMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }




  function initMap() {
    var pos = {lat: 51.515276, lng: -0.072155};
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
      center: {lat: -34.397, lng: 150.644},
      zoom: 16
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }




  if ($('#map').length) geoMap();
  if ($('#map2').length) initMap();
});
