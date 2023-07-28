// Fetch the JSON data from our API
const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

//----------------------------------------------------------------------------------------------------------------
// CALCULATIONS

// Count number of room types
function countRoomTypes(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeCount = {};
  data.forEach(entry => {
    const roomType = entry.room_type;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });
  return roomTypeCount;
}

// Calculate average number accommodated by room type
function calculateAverageAccommodates(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalAccommodates = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const accommodates = parseInt(entry.accommodates);

    roomTypeTotalAccommodates[roomType] = (roomTypeTotalAccommodates[roomType] || 0) + accommodates;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  const roomTypeAverageAccommodates = {};
  for (const roomType in roomTypeTotalAccommodates) {
    const totalAccommodates = roomTypeTotalAccommodates[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageAccommodates[roomType] = totalAccommodates / count;
  }

  return roomTypeAverageAccommodates;
}

// Calculate average minimum required nights by room type
function calculateAverageMinNights(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalMinNights = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const minNights = parseInt(entry.minimum_nights);

    roomTypeTotalMinNights[roomType] = (roomTypeTotalMinNights[roomType] || 0) + minNights;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  const roomTypeAverageMinNights = {};
  for (const roomType in roomTypeTotalMinNights) {
    const totalMinNights = roomTypeTotalMinNights[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageMinNights[roomType] = totalMinNights / count;
  }

  return roomTypeAverageMinNights;
}

// Calculate average maximum required nights by room type
function calculateAverageMaxNights(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalMaxNights = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const maxNights = parseInt(entry.maximum_nights);

    roomTypeTotalMaxNights[roomType] = (roomTypeTotalMaxNights[roomType] || 0) + maxNights;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  const roomTypeAverageMaxNights = {};
  for (const roomType in roomTypeTotalMaxNights) {
    const totalMaxNights = roomTypeTotalMaxNights[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageMaxNights[roomType] = totalMaxNights / count;
  }

  return roomTypeAverageMaxNights;
}

// Calculate average number of reviews over the last 12 months by room type
function calculateAverageReviewsLTM(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalReviewsLTM = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const reviewsLTM = parseInt(entry.number_of_reviews_ltm);

    roomTypeTotalReviewsLTM[roomType] = (roomTypeTotalReviewsLTM[roomType] || 0) + reviewsLTM;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  const roomTypeAverageReviewsLTM = {};
  for (const roomType in roomTypeTotalReviewsLTM) {
    const totalReviewsLTM = roomTypeTotalReviewsLTM[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageReviewsLTM[roomType] = totalReviewsLTM / count;
  }

  return roomTypeAverageReviewsLTM;
}

// Calculate average number of reviews over the last 30 days by room type
function calculateAverageReviews30D(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalReviews30D = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const reviewsLast30D = parseInt(entry.number_of_reviews_l30d);

    roomTypeTotalReviews30D[roomType] = (roomTypeTotalReviews30D[roomType] || 0) + reviewsLast30D;
    roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
  });

  const roomTypeAverageReviews30D = {};
  for (const roomType in roomTypeTotalReviews30D) {
    const totalReviews30D = roomTypeTotalReviews30D[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageReviews30D[roomType] = totalReviews30D / count;
  }

  return roomTypeAverageReviews30D;
}

// Calculate average review scores rating by room type
function calculateAverageReviewScores(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data format. Expected an array.');
    return {};
  }

  const roomTypeTotalScores = {};
  const roomTypeCount = {};

  data.forEach(entry => {
    const roomType = entry.room_type;
    const reviewScores = parseFloat(entry.review_scores_rating);

    if (!isNaN(reviewScores)) {
      roomTypeTotalScores[roomType] = (roomTypeTotalScores[roomType] || 0) + reviewScores;
      roomTypeCount[roomType] = (roomTypeCount[roomType] || 0) + 1;
    }
  });

  const roomTypeAverageScores = {};
  for (const roomType in roomTypeTotalScores) {
    const totalScores = roomTypeTotalScores[roomType];
    const count = roomTypeCount[roomType];
    roomTypeAverageScores[roomType] = totalScores / count;
  }

  return roomTypeAverageScores;
}


//----------------------------------------------------------------------------------------------------------------
// CHART DISPLAYS

// Display the countRoomTypes results using Plotly to create a pie chart
function plot1Chart(data) {
  const roomTypeCount = countRoomTypes(data);

  // Pie Chart
  const plot1Data = [{
    values: Object.values(roomTypeCount),
    labels: Object.keys(roomTypeCount),
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

// Display the calculateAverageAccommodates results using Plotly to create a bar graph
function plot2Chart(data) {
  const roomTypeAverageAccommodates = calculateAverageAccommodates(data);

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

// Display the calculateAverageMinNights and calculateAverageMaxNights results using Plotly to create a grouped bar chart
function plot3Chart(data) {
  const roomTypeAverageMinNights = calculateAverageMinNights(data);
  const roomTypeAverageMaxNights = calculateAverageMaxNights(data);

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

// Display the Avg. Min and Max Nights Required results using Plotly to create a grouped bar chart for average reviews
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
    title: 'Average Number of Reviews (Last 12 Months and Last 30 Days) by Room Type',
    xaxis: { title: 'Room Type' },
    yaxis: { title: 'Number of Reviews' },
    barmode: 'group',
    height: 400,
    width: 600
  };

  Plotly.newPlot('plot4', plot4Data, plot4Layout);
}

// Display the calculateAverageReviewScores results using Plotly to create a bar graph
function plot5Chart(data) {
  const roomTypeAverageScores = calculateAverageReviewScores(data);

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