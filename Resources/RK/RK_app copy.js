// Get the API link
const url = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

// Fetch the JSON data and console it 
// It will turn it into a data object 
d3.json(url).then(data => {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chartData = [];

  data.forEach(item => {
    var adjustedPrice = parseFloat(item.adjusted_price.replace("$", ""));
    var listingId = item.listing_id;
    var existingDataIndex = chartData.findIndex(dataItem => dataItem.label === listingId);

    if (existingDataIndex !== -1) {
      chartData[existingDataIndex].x = (chartData[existingDataIndex].x + adjustedPrice) / 2;
      chartData[existingDataIndex].y = (chartData[existingDataIndex].y + item.accommodates) / 2;
      chartData[existingDataIndex].r += item.number_of_reviews * 10;
    } else {
      chartData.push({
        x: adjustedPrice,
        y: item.accommodates,
        r: item.number_of_reviews * 2,
        label: listingId,
        name: item.name,
        url: item.listing_url
      });
    }
  });

  const chartConfig = {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Bubble Chart',
        data: chartData,
        backgroundColor: 'skyblue',
        borderColor: 'black'
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Prices of Airbnb Listings'
          }
        },
        y: {
          title: {
            display: true,
            text: 'How many people are accommodated'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              var name = context.raw.name;
              var url = context.raw.url;
              return `Name: ${name}, URL: ${url}`;
            }
          }
        }
      }
    }
  };

  // Create the Chart instance using the ctx and chartConfig
  new Chart(ctx, chartConfig);
}).catch(error => console.error(error));
