function markerSize(listings) {
  return Math.sqrt(listings) * 20;
}

// Fetching data from the URL
d3.json("http://127.0.0.1:5000/api/BigDataBandits/Listings").then(function (data) {
  // Object to store unique hosts
  let uniqueHosts = {};

  // Loop to populate uniqueHosts
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

  // Converting the uniqueHosts object into an array of hosts
  let hosts = Array.from(Object.values(uniqueHosts));

  let sortedhosts = hosts.sort((a, b) => b.listings - a.listings);

  // Slicing to keep only top 10
  let top10hosts = sortedhosts.slice(0, 10);

  // CreateMap function
  createMap(top10hosts);
}).catch(function (error) {
  console.log("Error fetching data:", error);
});

function createMap(topHosts) {
  
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Creating a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Creating an empty layerGroup to hold the topHosts layer.
  let tophostlayer = L.layerGroup();

  // Loop to create markers
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="background-color: purple; border: 2px solid white; border-radius: 50%; width: 20px; height: 20px;"></div>',
  });

  for (let i = 0; i < topHosts.length; i++) {
    L.marker(topHosts[i].location, {
      icon: customIcon,
      radius: markerSize(topHosts[i].listings)
    }).bindPopup(`<h1 style="color: purple; line-height: 0.5; margin-bottom: 3px;">${topHosts[i].name}</h1>
                <p><a href="${topHosts[i].url}" target="_blank">Host Profile</a></p>
                <hr>
                <h3 style="color: purple; line-height: 0.5; margin-bottom: 3px;">Total Listings: ${topHosts[i].listings.toLocaleString()}</h3>`).addTo(tophostlayer);
  }

  let myMap = L.map("map-id", {
    center: [40.730610, -73.935242],
    zoom: 11,
    layers: [streetmap, tophostlayer]
  });

  L.control.layers(baseMaps, {
    "Top Hosts": tophostlayer
  }, {
    collapsed: true
  }).addTo(myMap);

  // Now that the markers are added, add the tophostlayer to the map
  tophostlayer.addTo(myMap);
};
