// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups
let layers = {
  AVAILABLE: new L.LayerGroup(),
  UNAVAILABLE: new L.LayerGroup(),
};

// Create the map with layers.
let map = L.map("map-id", {
  center: [40.707560, -73.936501],
  zoom: 13,
  layers: [
    layers.AVAILABLE,
    layers.UNAVAILABLE
  ]
});

// Add "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
  "Available": layers.AVAILABLE,
  "Unavailable": layers.UNAVAILABLE,
};

// Create a control for layers, and add overlays to it.
L.control.layers(null, overlays).addTo(map);

// Initialize an object that contains icons for each layer group.
let icons = {
  AVAILABLE: L.ExtraMarkers.icon({
    icon: "fas fa-home",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  UNAVAILABLE: L.ExtraMarkers.icon({
    icon: "fas fa-bed",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
};

// Fetch the data from the API endpoint using d3.json
d3.json('http://127.0.0.1:5000/api/BigDataBandits/Listings').then(function (data) {
  // Get today's date in the required format (e.g., "8/3/2023")
  // -- hardcode to test dataset
  //let todayDate = '7/31/2023'
  let todayDate = new Date().toLocaleDateString();


  // Filter the data to get only entries with today's date
  let todayEntries = data.filter(entry => entry.date === todayDate);

  // Loop through the filtered data and create markers based on the "available" property.
  todayEntries.forEach(entry => {
    let marker;
    if (entry.available === "t") {
      marker = L.marker([entry.latitude, entry.longitude], {
        icon: icons.AVAILABLE
      });
      marker.addTo(layers.AVAILABLE);
    } else {
      marker = L.marker([entry.latitude, entry.longitude], {
        icon: icons.UNAVAILABLE
      });
      marker.addTo(layers.UNAVAILABLE);
    }

    // Bind a popup to the marker that will display the required information.
    marker.bindPopup(`
      <b>Name:</b> ${entry.name}<br>
      <b>Price:</b> ${entry.price}<br>
      <b>Room Type:</b> ${entry.room_type}<br>
      <b>Listing URL:</b> <a href="${entry.listing_url}" target="_blank">${entry.listing_url}</a>
    `);
  });

  // Add code to load the NYC GeoJSON file and add it to the map.
  d3.json('static/neighbourhoods.geojson').then(function (geojson) {
    L.geoJSON(geojson, {
      style: {
        fillColor: "transparent",
        color: "white", // Border color for the neighborhoods
        weight: 2, // Border width for the neighborhoods
        fillOpacity: 0.1, // Opacity for the neighborhood polygons
      },
    }).addTo(map);
  });
}).catch(function (error) {
  console.error('Error fetching data:', error);
});


// Create a legend control and add it to the map
const legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  const div = L.DomUtil.create("div", "legend");
  const labels = Object.keys(icons);

  // Loop through the labels and generate the legend items with corresponding icons and color swatches
  for (let i = 0; i < labels.length; i++) {
    const iconColor = icons[labels[i]].options.markerColor;
    div.innerHTML +=
      '<div class="legend-item"><i class="legend-icon" style="background:' +
      iconColor +
      '"></i>' +
      labels[i] +
      ' <span class="color-swatch" style="background:' +
      iconColor +
      '"></span></div>';
  }

  return div;
};

legend.addTo(map);