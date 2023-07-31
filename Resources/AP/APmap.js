function markerSize(listings) {
  return Math.sqrt(listings) * 20;
}

// Fetch data from the URL and create markers based on unique hosts.
d3.json("http://127.0.0.1:5000/api/BigDataBandits/Listings").then(function (data) {
  // Create an object to store unique hosts based on host_id
  let uniqueHosts = {};

  // Loop through the data and populate the uniqueHosts object
  data.forEach(function (listing) {
    const host_id = listing.host_id;
    if (!uniqueHosts.hasOwnProperty(host_id)) {
      uniqueHosts[host_id] = {
        name: listing.host_name,
        location: [listing.latitude, listing.longitude],
        listings: listing.host_total_listings_count,
        url: listing.host_url
      };
    }
  });

  // Convert the uniqueHosts object into an array of hosts
  let hosts = Array.from(Object.values(uniqueHosts));

  let sortedhosts = hosts.sort((a, b) => b.listings - a.listings);

  // Slicing to keep only top 10
  let top10hosts = sortedhosts.slice(0, 10);

  // Call the createMap function with top10hosts data
  createMap(top10hosts);
}).catch(function (error) {
  console.log("Error fetching data:", error);
});

function createMap(topHosts) {
  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the topHosts layer.
  let overlayMaps = {
    "Top Hosts": L.layerGroup() // Create an empty layerGroup for now
  };

  let myMap = L.map("map-id", {
    center: [40.7128, -74.0060], // New York coordinates
    zoom: 11, // Adjust the zoom level as needed
    layers: [streetmap] // Only add the streetmap for now
  });

  // Loop through the topHosts array, and create one marker for each host object.
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="background-color: purple; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;"></div>',
  });
  
  // Loop through the top10hosts array, and create one marker for each host object.
  for (let i = 0; i < topHosts.length; i++) {
    L.marker(topHosts[i].location, {
      icon: customIcon,
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its listings count.
      radius: markerSize(topHosts[i].listings)
    }).bindPopup(`<h1 style="color: purple; line-height: 0.5; margin-bottom: 3px;">${topHosts[i].name}</h1>
                <p><a href="${topHosts[i].url}" target="_blank">Host Profile</a></p>
                <hr>
                <h3 style="color: purple; line-height: 0.5; margin-bottom: 3px;">Total Listings: ${topHosts[i].listings.toLocaleString()}</h3>`).addTo(myMap);
  }

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Now that the markers are added, add the overlayMaps layerGroup to the map
  overlayMaps["Top Hosts"].addTo(myMap);
};