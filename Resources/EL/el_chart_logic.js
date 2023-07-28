// Fetch the JSON data from our API
const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

//----------------------------------------------------------------------------------------------------------------
// CALCULATIONS

// Count room types
function countRoomTypesFromUniqueListings(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  // Step 1: Filter unique listing_id entries
  const uniqueListings = {};
  data.forEach(entry => {
    const listingId = entry.listing_id;
    const roomType = entry.room_type;

    if (!uniqueListings[listingId]) {
      uniqueListings[listingId] = new Set();
    }

    uniqueListings[listingId].add(roomType);
  });

  // Step 2: Count room types from the unique listing_id entries
  const roomTypeCount = {};
  for (const listingId in uniqueListings) {
    uniqueListings[listingId].forEach(roomType => {
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    });
  }

  return roomTypeCount;
}

// Calculate average number accommodated by room type
function calculateAverageAccommodatesFromUniqueListings(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  // Step 1: Filter unique listing_id entries and calculate total accommodates and count for each room_type
  const roomTypeTotalAccommodates = {};
  const roomTypeCount = {};
  data.forEach(entry => {
    const roomType = entry.room_type;
    const accommodates = parseInt(entry.accommodates);

    roomTypeTotalAccommodates[roomType] = (roomTypeTotalAccommodates[roomType] || 0) + accommodates;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  // Step 2: Calculate the average accommodates for each room_type
  const roomTypeAverageAccommodates = {};
  for (const roomType in roomTypeTotalAccommodates) {
    const totalAccommodates = roomTypeTotalAccommodates[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageAccommodates[roomType] = totalAccommodates / count;
  }

  return roomTypeAverageAccommodates;
}

// Calculate average minimum required nights by room type
function calculateAverageMinNightsFromUniqueListings(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  // Step 1: Filter unique listing_id entries and calculate total minimum nights and count for each room_type
  const roomTypeTotalMinNights = {};
  const roomTypeCount = {};
  const uniqueListingIds = new Set();

  data.forEach(entry => {
    const roomType = entry.room_type;
    const minNights = parseInt(entry.minimum_nights);
    const listingId = entry.listing_id;

    if (!uniqueListingIds.has(listingId)) {
      uniqueListingIds.add(listingId);
      roomTypeTotalMinNights[roomType] = (roomTypeTotalMinNights[roomType] || 0) + minNights;
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    }
  });

  // Step 2: Calculate the average minimum nights for each room_type
  const roomTypeAverageMinNights = {};
  for (const roomType in roomTypeTotalMinNights) {
    const totalMinNights = roomTypeTotalMinNights[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageMinNights[roomType] = totalMinNights / count;
  }

  return roomTypeAverageMinNights;
}

// Calculate average maximum required nights by room type
function calculateAverageMaxNightsFromUniqueListings(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  // Step 1: Filter unique listing_id entries and calculate total maximum nights and count for each room_type
  const roomTypeTotalMaxNights = {};
  const roomTypeCount = {};
  const uniqueListingIds = new Set();

  data.forEach(entry => {
    const roomType = entry.room_type;
    const maxNights = parseInt(entry.maximum_nights);
    const listingId = entry.listing_id;

    if (!uniqueListingIds.has(listingId)) {
      uniqueListingIds.add(listingId);
      roomTypeTotalMaxNights[roomType] = (roomTypeTotalMaxNights[roomType] || 0) + maxNights;
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    }
  });

  // Step 2: Calculate the average maximum nights for each room_type
  const roomTypeAverageMaxNights = {};
  for (const roomType in roomTypeTotalMaxNights) {
    const totalMaxNights = roomTypeTotalMaxNights[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageMaxNights[roomType] = totalMaxNights / count;
  }

  return roomTypeAverageMaxNights;
}

// Calculate average number of reviews by unique listing_id
function calculateAverageReviews(data, reviewType) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const uniqueListings = {}; // Keep track of unique listing_id
  const roomTypeTotalReviews = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const listingId = entry.listing_id;
    const roomType = entry.room_type;
    const reviews = parseInt(entry[reviewType]);

    if (!uniqueListings[listingId]) {
      uniqueListings[listingId] = true; // Mark listing_id as seen
      roomTypeTotalReviews[roomType] = (roomTypeTotalReviews[roomType] || 0) + reviews;
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    }
  });

  const roomTypeAverageReviews = {};
  for (const roomType in roomTypeTotalReviews) {
    const totalReviews = roomTypeTotalReviews[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageReviews[roomType] = totalReviews / count;
  }

  return roomTypeAverageReviews;
}

// Calculate average number of reviews over the last 12 months by room type
function calculateAverageReviewsLTM(data) {
  return calculateAverageReviews(data, 'number_of_reviews_ltm');
}

// Calculate average number of reviews over the last 30 days by room type
function calculateAverageReviews30D(data) {
  return calculateAverageReviews(data, 'number_of_reviews_l30d');
}

// Calculate average review scores rating by room type
function calculateAverageReviewScoresFromUniqueListings(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const uniqueListings = {}; // Object to store unique listing_id and corresponding review_scores_rating
  const roomTypeCount = {}; // Object to keep track of the count of each room type

  data.forEach(entry => {
    const listingId = entry.listing_id;
    const roomType = entry.room_type;
    const reviewScores = parseFloat(entry.review_scores_rating);

    if (!isNaN(reviewScores)) {
      // Check if the listing_id is unique and add it to the uniqueListings object
      if (!uniqueListings[listingId]) {
        uniqueListings[listingId] = {
          reviewScores: reviewScores,
          roomType: roomType
        };
      } else {
        // If the listing_id is not unique, update the review_scores_rating for the listing_id
        uniqueListings[listingId].reviewScores += reviewScores;
      }

      // Increment the count of the room_type
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    }
  });

  // Calculate the average review_scores_rating for each room type
  const roomTypeAverageScores = {};
  for (const roomType in roomTypeCount) {
    const totalScores = 0;
    for (const listingId in uniqueListings) {
      if (uniqueListings[listingId].roomType === roomType) {
        totalScores += uniqueListings[listingId].reviewScores;
      }
    }
    const count = roomTypeCount[roomType];
    roomTypeAverageScores[roomType] = totalScores / count;
  }

  return roomTypeAverageScores;
}


//----------------------------------------------------------------------------------------------------------------
// CHART DISPLAYS

// Display the countRoomTypesFromUniqueListings results using Plotly to create a pie chart
function plot1Chart(data) {
  const roomTypeCounts = countRoomTypesFromUniqueListings(data);

  // Pie Chart
  const plot1Data = [{
    values: Object.values(roomTypeCounts),
    labels: Object.keys(roomTypeCounts),
    type: "pie",
    textinfo: "label+percent+value",
    textposition: "outside"
  }];

  const plot1Layout = {
    title: "Percentage of Room Types of NYC AirBnbs",
    height: 400,
    width: 600
  };

  Plotly.newPlot("plot1", plot1Data, plot1Layout);
}

// Display the calculateAverageAccommodatesFromUniqueListings results using Plotly to create a bar graph
function plot2Chart(data) {
  const roomTypeAverageAccommodates = calculateAverageAccommodatesFromUniqueListings(data);

  // Bar Graph
  const plot2Data = [{
    x: Object.keys(roomTypeAverageAccommodates),
    y: Object.values(roomTypeAverageAccommodates),
    type: "bar",
    text: Object.values(roomTypeAverageAccommodates).map(val => val.toFixed(2)),
    textposition: "inside"
  }];

  const plot2Layout = {
    title: "Average People Accommodated by Room Type",
    xaxis: { title: "Room Type" },
    yaxis: { title: "Number of People" },
    height: 400,
    width: 500
  };

  Plotly.newPlot("plot2", plot2Data, plot2Layout);
}

// Display the calculateAverageMinNightsFromUniqueListings and calculateAverageMaxNightsFromUniqueListings results using Plotly to create a grouped bar chart
function plot3Chart(data) {
  const roomTypeAverageMinNights = calculateAverageMinNightsFromUniqueListings(data);
  const roomTypeAverageMaxNights = calculateAverageMaxNightsFromUniqueListings(data);

  const roomTypes = Object.keys(roomTypeAverageMinNights);
  const minNightsValues = Object.values(roomTypeAverageMinNights);
  const maxNightsValues = Object.values(roomTypeAverageMaxNights);

  const plot3Data = [
    {
      x: roomTypes,
      y: minNightsValues,
      name: 'Average Min Nights',
      type: 'bar',
      text: Object.values(roomTypeAverageMinNights).map(val => val.toFixed(0)),
      textposition: "outside"
    },
    {
      x: roomTypes,
      y: maxNightsValues,
      name: 'Average Max Nights',
      type: 'bar',
      text: Object.values(roomTypeAverageMaxNights).map(val => val.toFixed(0)),
      textposition: "inside"
    }
  ];

  const plot3Layout = {
    title: 'Average Minimum and Maximum Required Nights by Room Type',
    xaxis: { title: 'Room Type' },
    yaxis: { title: 'Number of Nights' },
    barmode: 'group',
    height: 400,
    width: 600
  };

  Plotly.newPlot('plot3', plot3Data, plot3Layout);
}

// Display the calculateAverageReviewsLTM and calculateAverageReviews30D results using Plotly to create a grouped bar chart for average reviews
function plot4Chart(data) {
  const roomTypeAverageReviewsLTM = calculateAverageReviewsLTM(data);
  const roomTypeAverageReviews30D = calculateAverageReviews30D(data);

  const roomTypes = Object.keys(roomTypeAverageReviewsLTM);
  const reviewsLTM = Object.values(roomTypeAverageReviewsLTM);
  const reviews30D = Object.values(roomTypeAverageReviews30D);

  const plot4Data = [
    {
      x: roomTypes,
      y: reviewsLTM,
      name: 'Last 12 Months',
      type: 'bar',
      text: Object.values(roomTypeAverageReviewsLTM).map(val => val.toFixed(0)),
      textposition: "inside"
    },
    {
      x: roomTypes,
      y: reviews30D,
      name: 'Last 30 Days',
      type: 'bar',
      text: Object.values(roomTypeAverageReviews30D).map(val => val.toFixed(0)),
      textposition: "outside"
    }
  ];

  const plot4Layout = {
    title: 'Average Number of Reviews Over Time by Room Type',
    xaxis: { title: 'Room Type' },
    yaxis: { title: 'Number of Reviews' },
    barmode: 'group',
    height: 400,
    width: 600
  };

  Plotly.newPlot('plot4', plot4Data, plot4Layout);
}

// Display the calculateAverageReviewScoresFromUniqueListings results using Plotly to create a bar graph
function plot5Chart(data) {
  const roomTypeAverageScores = calculateAverageReviewScoresFromUniqueListings(data);

  // Bar Graph
  const plot5Data = [{
    x: Object.keys(roomTypeAverageScores),
    y: Object.values(roomTypeAverageScores),
    type: "bar",
    text: Object.values(roomTypeAverageScores).map(val => val.toFixed(2)),
    textposition: "auto"
  }];

  const plot5Layout = {
    title: "Average Ratings by Room Type",
    xaxis: { title: "Room Type" },
    yaxis: { title: "Rating (out of 5)" },
    height: 400,
    width: 500
  };

  Plotly.newPlot("plot5", plot5Data, plot5Layout);
}


//----------------------------------------------------------------------------------------------------------------
// Fetch the JSON data using fetch API
fetch(Listing)
  .then(response => response.json())
  .then(data => {
    plot1Chart(data);
    plot2Chart(data);
    plot3Chart(data);
    plot4Chart(data);
    plot5Chart(data)
  })
  .catch(error => console.error('Error fetching data:', error));