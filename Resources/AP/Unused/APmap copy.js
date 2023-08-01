let myMap = L.map("map", {
  center: [40.7128, -74.0060], // New York coordinates
  zoom: 11 // Adjust the zoom level as needed
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Define a markerSize() function that will give each host a different radius based on their listings count.
function markerSize(listings) {
  return Math.sqrt(listings) * 0.5;
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

  // Loop through the hosts array, and create one marker for each host object.
  for (let i = 0; i < hosts.length; i++) {
    L.marker(hosts[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "red",
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its listings count.
      radius: markerSize(hosts[i].listings)
    }).bindPopup(`<h1>${hosts[i].name}</h1>
                <p><a href="${hosts[i].url}" target="_blank">Host Profile</a></p>
                <hr>
                <h3>Total Listings: ${hosts[i].listings.toLocaleString()}</h3>`).addTo(myMap);
  }
}).catch(function (error) {
  console.log("Error fetching data:", error);
});
