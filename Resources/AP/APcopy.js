// Top 10 hosts with the most listing

let hosts = ["The Box House Hotel ", "Tony ", "Seith ", "Jean ","Jade ","Vie ", "Vasili ","Henry ","Christian & Carla ", "Marylyn "]

let count = [40, 37, 33, 26, 23, 19, 19, 17, 13, 13]

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
  
      let trace1 = {
        x: count,
        y: hosts,
        type: 'bar',
        orientation: 'h',
        marker: {
          color: count.map(countValue => getColor(countValue))
        }
      };

let data = [trace1];

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
    }
  };

Plotly.newPlot("plot", data, layout);