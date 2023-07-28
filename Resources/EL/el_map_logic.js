const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";
const nycGeoJSON = "../Resources/nyc.geojson";

// Fetch NYC GeoJSON data
d3.json(nycGeoJSON).then(function (geoJSONData) {
  // Fetch API data
  d3.json(Listing).then(function (apiData) {
    // Create a dictionary to store the room type counts for each neighborhood and borough
    let roomTypeCountsByNeighborhood = {};
    let roomTypeCountsByBorough = {};

    // Group data by unique listing_id
    const dataGroupedByListingId = apiData.reduce((acc, entry) => {
      const listingId = entry.listing_id;
      if (!acc[listingId]) {
        acc[listingId] = entry;
      }
      return acc;
    }, {});

    // Loop through the grouped data
    Object.values(dataGroupedByListingId).forEach(function (entry) {
      let latitude = entry.latitude; // Assuming your API returns latitude information for each entry
      let longitude = entry.longitude; // Assuming your API returns longitude information for each entry

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

      // Count the room types for each neighborhood
      if (foundNeighborhood) {
        if (!roomTypeCountsByNeighborhood[foundNeighborhood]) {
          roomTypeCountsByNeighborhood[foundNeighborhood] = {};
        }

        let roomType = entry.room_type; // Assuming your API returns roomType information for each entry
        if (!roomTypeCountsByNeighborhood[foundNeighborhood][roomType]) {
          roomTypeCountsByNeighborhood[foundNeighborhood][roomType] = 0;
        }

        roomTypeCountsByNeighborhood[foundNeighborhood][roomType]++;
      }

      // Count the room types for each borough
      if (foundBorough) {
        if (!roomTypeCountsByBorough[foundBorough]) {
          roomTypeCountsByBorough[foundBorough] = {};
        }

        let roomType = entry.room_type; // Assuming your API returns roomType information for each entry
        if (!roomTypeCountsByBorough[foundBorough][roomType]) {
          roomTypeCountsByBorough[foundBorough][roomType] = 0;
        }

        roomTypeCountsByBorough[foundBorough][roomType]++;
      }
    });

    // Display room type counts by neighborhood
    console.log("Room Type Counts by Neighborhood:");
    console.log(roomTypeCountsByNeighborhood);

    // Display room type counts by borough
    console.log("Room Type Counts by Borough:");
    console.log(roomTypeCountsByBorough);
  });
});
