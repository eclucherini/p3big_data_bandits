const Review = "http://127.0.0.1:5000/api/BigDataBandits/Reviews";

// Fetch the JSON data and work with it using D3.json
d3.json(Review).then(function(data) {
  // 'data' is the array of accommodation objects

  // Create an object to store the count of reviews for each reviewer_id and the corresponding reviewer_name
  const reviewerData = {};

  // Loop through the data to count reviews for each reviewer_id
  data.forEach(review => {
    const reviewerId = review.reviewer_id;
    const reviewerName = review.reviewer_name;
    if (reviewerData[reviewerId]) {
      // If the reviewer_id is already in the object, increment the count
      reviewerData[reviewerId].review_count++;
    } else {
      // If the reviewer_id is not in the object, initialize the count to 1
      reviewerData[reviewerId] = {
        reviewer_id: reviewerId,
        reviewer_name: reviewerName,
        review_count: 1
      };
    }
  });

  // Convert the reviewerData object to an array of objects containing the reviewer_id, reviewer_name, and review_count
  const reviewers = Object.values(reviewerData);

  // Sort the reviewers array in descending order based on review_count
  reviewers.sort((a, b) => b.review_count - a.review_count);

  // Take the top 15 reviewers
  const top15Reviewers = reviewers.slice(0, 15);

  // Extract reviewer_names and review_counts from the top15Reviewers array
  const reviewerNames = top15Reviewers.map(d => d.reviewer_name);
  const reviewCounts = top15Reviewers.map(d => d.review_count);
  const reviewerIds = top15Reviewers.map(d => d.reviewer_id);

  // Format the hover text to display both reviewer_name and reviewer_id without review_count
  const hoverText = top15Reviewers.map((d, i) => `${reviewerNames[i]} (Reviewer ID: ${reviewerIds[i]})`);

  // Create the Plotly bar chart
  const chartData = [{
    x: reviewerNames,
    y: reviewCounts,
    hovertext: hoverText, // Use hoverText to display formatted text when hovering over the bar
    type: 'bar'
  }];

  const layout = {
    title: 'Top 15 Reviewers',
    xaxis: { title: 'Reviewer Name (Reviewer ID)' }, // Display reviewer_name and reviewer_id together
    yaxis: { title: 'Number of Reviews' }
  };

  Plotly.newPlot('chart', chartData, layout);

}).catch(function(error) {
  console.error("Error fetching data:", error);
});
