const url = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

// Function to fetch data from the API using d3.json
function fetchData() {
  d3.json(url)
    .then(data => {
      // Initialize an object to store the unique listings
      const uniqueListings = {};

      // Process the data and add unique listings to the object
      data.forEach(item => {
        const listingId = item.listing_id;
        if (!uniqueListings.hasOwnProperty(listingId)) {
          const adjustedPrice = parseFloat(item.adjusted_price.replace('$', ''));
          const accommodates = item.accommodates;
          const numberOfReviews = item.number_of_reviews;
          uniqueListings[listingId] = {
            adjusted_price: adjustedPrice,
            accommodates: accommodates,
            number_of_reviews: numberOfReviews,
          };
        }
      });

      // Create the Chart.js bubble chart
      createBubbleChart(uniqueListings);

    })
    .catch(error => {
      console.error(`Error occurred: ${error}`);
    });
}

// Function to create the bubble chart
function createBubbleChart(data) {
  const bubbleData = Object.values(data).map(listing => {
    return {
      x: listing.adjusted_price,
      y: listing.accommodates,
      r: listing.number_of_reviews * .25, // Adjust the factor to control the bubble size
    };
  });

  const ctx = document.getElementById('bubbleChart').getContext('2d');
  const bubbleChart = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Bubble Chart',
        data: bubbleData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 10, // Base radius for the bubbles
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Adjusted Price',
          },
        },
        y: {
          type: 'logarithmic', // Use logarithmic scale for y-axis
          position: 'left',
          title: {
            display: true,
            text: 'Accommodates',
          },
          ticks: {
            callback: function (value, index, values) {
              return Number.isInteger(Math.log10(value)) ? value : null;
            },
          },
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Bubble Chart',
        },
      },
    },
  });
}

// Call the function to fetch data and create the bubble chart
fetchData();
