


// USGS Earthquake Hazards Program web repository for usage guidance and several different time 
//     periods of recorded earthquake activity: 
//     https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

// USGS Earthquake data for all earthquakes for the past 7 days (updated every minute):
let urlWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// USGS Earthquake data for all earthquakes for the past 30 days (updated every minute):
let urlMonth =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform an API call to the USGS Earthquake repository to get the earthquake information
let earthquakeData = d3.json(urlWeek).then(createMarkers);

// A function to determine the marker size based on the earthquake magnitude
function markerSize(earthquake) {
    return Math.sqrt(earthquake) * 50;
  }
  
  // Define arrays to hold the created earthquake magnitude markers
  //let cityMarkers = [];
  //let stateMarkers = [];
  let earthquakeMagnitude = [];

// Loop through locations, and create the earthquake location and magnitude markers.
for (let i = 0; i < features.length; i++) {
    // Setting the marker radius for the earthquake location by passing magnitude into the markerSize function
    earthquakeMagnitude.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        radius: markerSize(locations[i].state.population)
      })
    );
  
    // Set the marker radius for the city by passing the population to the markerSize() function.
    cityMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: markerSize(locations[i].city.population)
      })
    );
  }




function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Bike Stations": bikeStations
    };
  
    // Create the map object with options.
    let map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, bikeStations]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    let stations = response.data.stations;
  
    // Initialize an array to hold bike markers.
    let bikeMarkers = [];
  
    // Loop through the stations array.
    for (let index = 0; index < stations.length; index++) {
      let station = stations[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      let bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      bikeMarkers.push(bikeMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);