const url = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

function fetchData() {
  d3.json(url)
    .then(data => {
      const uniqueListings = {};

      data.forEach(item => {
        const listingId = item.listing_id;
        if (!uniqueListings.hasOwnProperty(listingId)) {
          const adjustedPrice = parseFloat(item.adjusted_price.replace('$', ''));
          const accommodates = item.accommodates;
          const numberOfReviews = item.number_of_reviews;
          const listingUrl = item.listing_url; // Store the URL
          uniqueListings[listingId] = {
            adjusted_price: adjustedPrice,
            accommodates: accommodates,
            number_of_reviews: numberOfReviews,
            listing_url: listingUrl, // Include the URL in the unique listings object
          };
        }
      });

      createBubbleChart(uniqueListings);
    })
    .catch(error => {
      console.error(`Error occurred: ${error}`);
    });
}

function createBubbleChart(data) {
  const bubbleData = Object.values(data).map(listing => {
    return {
      x: listing.adjusted_price,
      y: listing.accommodates,
      listing_url: listing.listing_url // Include the URL in the data for each point
    };
  });

  const ctx = document.getElementById('bubbleChart').getContext('2d');
  const bubbleChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Scatter Plot',
        data: bubbleData,
        backgroundColor: 'skyblue',
        borderColor: 'grey',
        pointRadius: 7,
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Price of Listing per Night($)',
            font: {size: 25},
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Number of Accommodations',
            font: {size: 25},
          },
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Scatter Plot of Airbnb Prices vs Accommodations',
          font: {size: 25},
        },
      },
      onClick: function(evt) { // Add a click event handler
        var activePoints = bubbleChart.getActiveElements();
        if (activePoints.length > 0) {
          var firstPoint = activePoints[0];
          var label = bubbleChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
          window.open(label.listing_url, '_blank'); // Open the URL in a new tab
        }
      }
    },
  });
}

fetchData();
