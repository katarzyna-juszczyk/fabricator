"use strict";

function initMap() {

	var map = document.getElementById('map');

	if(map === null) {
		return false;
	}

	var marker;
	var country = "New Zeland";
	var geocoder = new google.maps.Geocoder();
	var bounds = new google.maps.LatLngBounds();

	var locations = [
		['Wellington', -41.287029, 174.759608, 'https://www.google.pl/'],
		['Auckland', -36.841090, 174.759608, 'https://www.google.pl/'],
		['Hamilton', -37.786096, 175.278447, 'https://www.google.pl/']
	];

	map = new google.maps.Map(map, {
		zoom: 5
	});

	map.set('styles', [
		{
			"featureType": "poi",
			"elementType": "labels",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"featureType": "administrative.province",
			"elementType": "geometry",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"featureType": "road",
			"stylers": [
				{ "visibility": "off" }
			]
		},{
			"featureType": "administrative.locality",
			"elementType": "labels.icon",
			"stylers": [
				{ "color": "#0090d4" }
			]
		},{
			"featureType": "administrative.locality",
			"elementType": "labels.icon",
			"stylers": [
				{ "visibility": "on" },
				{ "color": "#122031" }
			]
		},{
		}
	]);

	geocoder.geocode( {'address' : country}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
		}
	});

	for (var i, i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: 'assets/toolkit/images/map-pin.png',
			url: locations[i][3]
		});

		bounds.extend(marker.position);

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				window.location.href = this.url;
			}
		})(marker, i));
	}

	google.maps.event.addListenerOnce(map, "idle", function () {
		map.fitBounds(bounds);
	});
}

window.onload = initMap;
