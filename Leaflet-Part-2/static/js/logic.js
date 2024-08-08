// USGS Earthquake Hazards Program web repository for usage guidance and several different time 
//     periods of recorded earthquake activity: 
//     https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

// USGS Earthquake data for all earthquakes for the past 7 days (updated every minute):
let urlWeek  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// USGS Earthquake data for all earthquakes for the past 30 days (updated every minute):
let urlMonth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

//For topographical maps:

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// function createMap(earthquakes) {

//     // Create the tile layer that will be the background of our map.
//     let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });
  
  
//     // Create a baseMaps object to hold the streetmap layer.
//     let baseMaps = {
//       "Street Map": streetmap
//     };
  
//     // Create an overlayMaps object to hold the earthquakes layer.
//     let overlayMaps = {
//       "Earthquakes": earthquakes
//     };
  
//     // Create the map object with options.
//     let map = L.map("map", {
//       center: [44.966667, -103.766667], //Center of USA, per https://www.usgs.gov/educational-resources/geographic-centers
//       zoom: 3.5,
//       layers: [streetmap, earthquakes]
//     });
  
//     // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
  
//     //Add legend
//     function getColor(depthValue) {
//         return depthValue >= 90 ? "#F66066":
//                depthValue >= 70 ? "#F8A35D":
//                depthValue >= 50 ? "#F9B72A":
//                depthValue >= 30 ? "#F7DB12":
//                depthValue >= 10 ? "#DDF403":
//                                   "#A4F600";
//     }

//     var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function (map) {
    
//     var div = L.DomUtil.create('div', 'info legend'),
//     grades = [-10, 10, 30, 50, 70, 90],
//     labels = ['<h4><u>Quake Depth (km)</u></h4>'];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             labels.push(
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? ' <span>&#8804;</span> ' + grades[i + 1] + '<br>' : '+'));
//     }
//     div.innerHTML = labels.join('<br>');
//     return div;
//     };

//     legend.addTo(map);
// }
  
//   function createMarkers(response) {
  
//     // Pull the "features" property from response.
//     let features = response.features;

//     // Initialize an array to hold earthquake epicenter markers.
//     let epicenterMarkers = [];
//     let testArray = [] //DELETE LINE AFTER COMPLETION

//     // Loop through the features array.
//     for (let index = 0; index < features.length; index++) {
//       let feature      = features[index];

//       let coordinates  = feature.geometry.coordinates; // [longitude, latitude, magnitude]
//       let depth        = coordinates[2];

//       let place        = feature.properties.place;
//       let magnitude    = feature.properties.mag;
//       let unixDatetime = feature.properties.time;
    
//       // Convert unixDatetime to UTC normalized format
//       let formatTime = d3.timeFormat("%B %d, %Y at %I:%M%p UTC")
//       let dateTime     = formatTime(new Date(unixDatetime));

//       // For each earthquake, create a marker, and bind a popup with the earthquake's place and magnitude.
      
//         //Function to set marker size for given earthquake instance
//       function markerSize(magnitude) {
//         return magnitude * 20000;
//       }

//         //Filter to set fillColor for given earthquake instance based on depth
//             // Conditionals for earthquake depth
//             let filterColor = "";
//             if (depth >= 90) {
//               filterColor = "#F66066"; //red
//               }
//             else if (depth >= 70) {
//                 filterColor = "#F8A35D"; //burnt orange
//               }
//             else if (depth >= 50) {
//                 filterColor = "#F9B72A"; //orange
//               }
//             else if (depth >= 30) {
//                 filterColor = "#F7DB12"; //gold
//               }   
//             else if (depth >= 10) {
//                 filterColor = "#DDF403"; //yellow
//               }   
//             else {
//                 filterColor = "#A4F600"; //green
//             }
    

//       let epicenterMarker = L.circle([coordinates[1], coordinates[0]],{
//         fillOpacity: 0.75,
//         color: "black",
//         weight: 0.5,
//         fillColor: filterColor,
//         // Setting our circle's radius to equal the output of our markerSize() function:
//         // This will make our marker's size proportionate to its population.
//         radius: markerSize(magnitude)        
//       })
//         .bindPopup("Location: <h3>" + place 
//                     + "</h3>Date: <h3>" + dateTime 
//                     + "</h3>Magnitude: <h3>" + magnitude 
//                     + "</h3>Depth (km): <h3>" + depth +"</h3>");
  
//       // Add the marker to the epicenterMarkers array.
//       epicenterMarkers.push(epicenterMarker);
//       testArray.push(depth); //DELETE LINE AFTER COMPLETION
//     }
  
//     // Create a layer group that's made from the epicenterMarkers array, and pass it to the createMap function.
//     createMap(L.layerGroup(epicenterMarkers))
//     console.log(testArray); //DELETE LINE AFTER COMPLETION

// }

//   // Perform an D3 JSON call to the USGS repo to get the earthquake information. Call createMarkers when it completes.
//   d3.json(urlWeek).then(createMarkers);