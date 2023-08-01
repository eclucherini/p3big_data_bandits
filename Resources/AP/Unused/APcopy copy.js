// Fetch data from the URL and create a bar chart for the top 10 hosts with the most listings.
d3.json("http://127.0.0.1:5000/api/BigDataBandits/Listings").then(function (data) {
  // Create an object to store the count of listings for each host
  let hostCountMap = {};

  // Loop through the data and populate the hostCountMap object
  data.forEach(function (listing) {
    const hostName = listing.host_name;
    if (!hostCountMap.hasOwnProperty(hostName)) {
      hostCountMap[hostName] = 1;
    } else {
      hostCountMap[hostName]++;
    }
  });

  // Sort the hosts based on the count of listings in descending order
  let sortedHosts = Object.keys(hostCountMap).sort((a, b) => hostCountMap[b] - hostCountMap[a]);

  // Get the top 10 hosts and their corresponding counts
  let top10Hosts = sortedHosts.slice(0, 10);
  let top10Counts = top10Hosts.map(hostName => hostCountMap[hostName]);

  // Function to generate color based on the count
  function getColor(countValue) {
    // Define your color logic here
    // For example, you can set different colors based on count ranges
    if (countValue >= 30) {
      return 'rgba(54, 162, 235, 0.6)';
    } else if (countValue >= 20) {
      return 'rgba(255, 99, 132, 0.6)';
    } else {
      return 'rgba(75, 192, 192, 0.6)';
    }
  }

  // Retrieve the original count values from the data array for the top 10 hosts
  let originalCounts = top10Hosts.map(hostName => {
    const listing = data.find(listing => listing.host_name === hostName);
    return listing.host_total_listings_count;
  });

  let trace1 = {
    x: originalCounts,
    y: top10Hosts,
    type: 'bar',
    orientation: 'h',
    marker: {
      color: originalCounts.map(countValue => getColor(countValue))
    }
  };

  let data1 = [trace1];

  let layout = {
    title: {
      text: 'Number of Listings per Hosts - Top 10',
      font: {
        family: 'Arial, sans-serif',
        size: 24,
        color: 'black'
      }
    },
    font: {
      family: 'Arial, sans-serif',
      size: 14,
      color: 'black'
    },
    yaxis: {
      automargin: true // Adjust margins to accommodate full labels
    }
  };

  Plotly.newPlot("plot", data1, layout);
}).catch(function (error) {
  console.log("Error fetching data:", error);
});
