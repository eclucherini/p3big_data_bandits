// Fetch data from the URL and create a bar chart for the top 10 hosts with the most listings.
d3.json("http://127.0.0.1:5000/api/BigDataBandits/Listings").then(function (data) {
  // Create an object to store the count of listings for each host
  let uniqueHostNames = [];
  let totalListingsCountArray = [];
  
  // Loop through the data and populate the arrays
  data.forEach(function (listing) {
    const hostName = listing.host_name;
    const totalListingsCount = listing.host_total_listings_count;
  
    // Check if the host_name is not already in the uniqueHostNames array
    if (!uniqueHostNames.includes(hostName)) {
      uniqueHostNames.push(hostName); // Add the host_name to the uniqueHostNames array
      totalListingsCountArray.push(totalListingsCount); // Add the corresponding total listings count to the totalListingsCountArray
    } else {
      // If the host_name is already in the uniqueHostNames array, find its index
      const index = uniqueHostNames.indexOf(hostName);  
    }
  });

  const hostListingsDict = uniqueHostNames.reduce((result, hostName, index) => {
    result[hostName] = totalListingsCountArray[index];
    return result;
  }, {});

  //Transforme the dictionary into an array  
  const hostListingsArray = Object.entries(hostListingsDict);

  // Sort the array in descending order based on the values
  hostListingsArray.sort((a, b) => b[1] - a[1]);
  
  // Slicing to keep only top 10
  let top10Hosts = hostListingsArray.slice(0, 10);

  //Separating array into 2 different arrays
  var keylist = [];
  var valuelist = [];

  for (let i = 0; i < top10Hosts.length; i++) {
    keylist.push(top10Hosts[i][0]); // Push the host name (key) at index 0
    valuelist.push(top10Hosts[i][1]); // Push the total listings count (value) at index 1
  }
  
  console.log(keylist);
  console.log(valuelist);

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

  //reversing arrays to show host with the most listings on top
  keylist = keylist.reverse();
  valuelist = valuelist.reverse();
  
  //creating chart
  let trace1 = {
    x: valuelist,
    y: keylist,
    type: 'bar',
    orientation: 'h',
    marker: {
      color: valuelist.map(countValue => getColor(countValue))
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
