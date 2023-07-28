// Create a map object.
// let myMap = L.map("map", {
//   center: [37.09, -95.71],
//   zoom: 5
// });

let myMap = L.map("map", {
    center: [40.7128, -74.0060], // New York coordinates
    zoom: 11 // Adjust the zoom level as needed
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Define a markerSize() function that will give each city a different radius based on its population.
  function markerSize(listings) {
    return Math.sqrt(listings) * 0.5;
  }
  
  // Each city object contains the city's name, location, and population.
  // Population Data Source: U.S. 2020 Decennial Census
  let hosts = [
    {
      name: "The Box House Hotel",
      location: [40.73777, -73.95366],
      listings: 40
    },
    {
      name: "Tony",
      location: [40.72021, -73.99426],
      listings: 37
    },
    {
      name: "Seith",
      location: [40.72641, -73.98711],
      listings: 33
    },
    {
      name: "Jean",
      location: [40.7106, -73.85246],
      listings: 26
    },
    {
      name: "Jade",
      location: [40.7209818, -73.9931495],
      listings: 23
    },
    {
      name: "Vasili",
      location: [40.772472, -73.906075],
      listings: 19
    },
    {
      name: "Vie",
      location: [40.881, -73.83511],
      listings: 19
    },
    {
      name: "Henry",
      location: [40.7751, -73.98595],
      listings: 17
    },
    {
      name: "Christian & Carla",
      location: [40.86502, -73.85496],
      listings: 13
    },
    {
      name: "Marylyn Palmer",
      location: [40.67823, -73.94719],
      listings: 13
    }
  ];
  
  // Loop through the cities array, and create one marker for each city object.
  for (let i = 0; i < hosts.length; i++) {
    L.marker(hosts[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(hosts[i].listings)
    }).bindPopup(`<h1>${hosts[i].name}</h1> <hr> <h3>listings: ${hosts[i].listings.toLocaleString()}</h3>`).addTo(myMap);
  }