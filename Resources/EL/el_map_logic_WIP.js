// Fetch NYC GeoJSON data
const nycGeoJSON = "../nyc.geojson";
d3.json(nycGeoJSON).then(function (geoJSONData) {
  // Create the Leaflet map instance
  var map = L.map('map').setView([40.7128, -74.0060], 12); // Set the initial view to NYC coordinates

  // Add a tile layer (e.g., OpenStreetMap) to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Fetch API data
  const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";
  d3.json(Listing).then(function (apiData) {
    // Create a dictionary to store the location data for each unique listing_id
    let locationDataByListingId = {};

    // Create a dictionary to store the counts of unique listings by room_type for each neighborhood and borough
    let countsByNeighborhoodAndBorough = {};

    // Loop through the dataset
    apiData.forEach(function (entry) {
      let listingId = entry.listing_id;

      // Check if the listing_id is unique
      if (!locationDataByListingId[listingId]) {
        let latitude = entry.latitude;
        let longitude = entry.longitude;

        // Use Turf.js to find the neighborhood and borough that contains the entry's point (latitude, longitude)
        let point = turf.point([longitude, latitude]);
        let foundNeighborhood = null;
        let foundBorough = null;

        turf.featureEach(geoJSONData, function (feature) {
          if (turf.booleanPointInPolygon(point, feature)) {
            foundNeighborhood = feature.properties.neighborhood;
            foundBorough = feature.properties.borough;
            return;
          }
        });

        // Store the latitude, longitude, neighborhood, borough, and room_type for the unique listing_id
        locationDataByListingId[listingId] = {
          latitude,
          longitude,
          neighborhood: foundNeighborhood,
          borough: foundBorough,
          roomType: entry.room_type,
        };

        // Update the counts for the neighborhood and borough
        if (!countsByNeighborhoodAndBorough[foundNeighborhood]) {
          countsByNeighborhoodAndBorough[foundNeighborhood] = {};
        }
        if (!countsByNeighborhoodAndBorough[foundBorough]) {
          countsByNeighborhoodAndBorough[foundBorough] = {};
        }
        if (!countsByNeighborhoodAndBorough[foundNeighborhood][entry.room_type]) {
          countsByNeighborhoodAndBorough[foundNeighborhood][entry.room_type] = 0;
        }
        if (!countsByNeighborhoodAndBorough[foundBorough][entry.room_type]) {
          countsByNeighborhoodAndBorough[foundBorough][entry.room_type] = 0;
        }
        countsByNeighborhoodAndBorough[foundNeighborhood][entry.room_type]++;
        countsByNeighborhoodAndBorough[foundBorough][entry.room_type]++;
      }
    });

    // Display the location data for each unique listing_id
    console.log("Location Data by Listing ID:");
    console.log(locationDataByListingId);

    // Display the counts of unique listings by room_type for each neighborhood and borough
    console.log("Counts by Neighborhood and Borough:");
    console.log(countsByNeighborhoodAndBorough);

    // Add GeoJSON data to the map as a GeoJSON layer and bind popup
    L.geoJSON(geoJSONData, {
      onEachFeature: function (feature, layer) {
        let neighborhood = feature.properties.neighborhood;
        let borough = feature.properties.borough;

        // Create popup content with the counts for the neighborhood and borough
        let popupContent = `<b>Neighborhood:</b> ${neighborhood}<br><b>Borough:</b> ${borough}<br>`;
        if (countsByNeighborhoodAndBorough[neighborhood]) {
          for (let roomType in countsByNeighborhoodAndBorough[neighborhood]) {
            let count = countsByNeighborhoodAndBorough[neighborhood][roomType];
            popupContent += `<b>${roomType}:</b> ${count}<br>`;
          }
        }
        popupContent += '<br><i>Click to close</i>';

        // Bind popup to the layer
        layer.bindPopup(popupContent);
      }
    }).addTo(map);

  });
});
