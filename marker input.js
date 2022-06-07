// Defining Global variables

var map;
var marker;
let markersArray = [];
let polyline = null;
var latlongarray = [];
var bounds;

// Function which creates map
function initMap() {
  // Map options
  var options = {
    center: { lat: 28.7041, lng: 77.1025 },
    zoom: 8,
  };
  // New Map
  map = new google.maps.Map(document.getElementById("mymap"), options);

  //add onclick listener
  map.addListener("click", function (e) {
    // console.log(e);
    addMarker(e.latLng);
    drawPolyline();
  });
}

// define function to add marker at given lat & lng
function addMarker(latLng) {
  marker = new google.maps.Marker({
    map: map,
    position: latLng,
    draggable: true,
  });

  // add listener to redraw the polyline when markers position change
  marker.addListener("dragend", function () {
    drawPolyline();
  });
  //extend the bounds to include each marker's position
  markersArray.push(marker);
}

// Input to Marker in Map

// funciton markers
function markers() {
  var geo = document.getElementsByClassName("latlng");
  Array.from(geo).forEach(function (e) {
    latlongarray.push(e.value.split(","));
  });
  bounds = new google.maps.LatLngBounds();
  for (i = 0; i < latlongarray.length; i++) {
    // var position = new google.maps.LatLng(
    //   latlongarray[i][0],
    //   latlongarray[i][1]
    // );
    console.log(latlongarray[i][0], latlongarray[i][1]);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(latlongarray[i][0], latlongarray[i][1]),
      map: map,
      draggable: true,
    });
    //extend the bounds to include each marker's position
    bounds.extend(marker.getPosition());
    markersArray.push(marker);
    drawPolyline();
    // add listener to redraw the polyline when markers position change
    marker.addListener("dragend", function () {
      drawPolyline();
    });
  }
  map.fitBounds(bounds);
}

// function to remove markers

function removemarkers() {
  for (i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

// function which is responsiblw to draw polylines between the markers
function drawPolyline() {
  let markersPositionArray = [];
  // obtain latlng of all markers on map
  markersArray.forEach(function (e) {
    markersPositionArray.push(e.getPosition());
    console.log(e.getPosition().lat());
    if (markersPositionArray.length == 2) {
      document.getElementById("to").value =
        markersArray[0].getPosition().lat().toFixed(6) +
        "," +
        markersArray[0].getPosition().lng().toFixed(6);
      document.getElementById("from").value =
        markersArray[1].getPosition().lat().toFixed(6) +
        "," +
        markersArray[1].getPosition().lng().toFixed(6);
    }
  });

  if (polyline != null) {
    polyline.setMap(null);
  }
  polyline = new google.maps.Polyline({
    map: map,
    path: markersPositionArray,
    strokeOpacity: 0.4,
  });
}
