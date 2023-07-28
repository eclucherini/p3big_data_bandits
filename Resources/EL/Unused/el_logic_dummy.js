// NUMBER OF LISTINGS BY ROOM TYPE
// Assign values for pie chart
let room_counts = [6048, 3872, 96]
let room_types = ["Entire home/apt", "Private room", "Hotel room"]

// Set up the pie chart
let plot_1_data = [{
    type: "pie",
    values: room_counts,
    labels: room_types,
    textinfo: "label+percent",
    textposition: "outside"
  }];

let plot_1_layout = {
    title: "Room Types of NYC AirBnbs",
    height: 600,
    width: 800
  };

Plotly.newPlot("plot1", plot_1_data, plot_1_layout);


// AVERAGE NUMBER OF PEOPLE ACCOMMODATED BY ROOM TYPE
// Assign values for bar chart
let accommodates_avgs = [3.481481, 2.666667, 1.950413]

// Set up the bar chart
let plot_2_data = [{
    type: "bar",
    x: room_types,
    y: accommodates_avgs
  }];

let plot_2_layout = {
    title: "Average People Accommodated by Room Type",
    height: 600,
    width: 800
  };

Plotly.newPlot("plot2", plot_2_data, plot_2_layout);


// AVERAGE MIN AND MAX NIGHTS BY ROOM TYPE
// Assign values for first trace
let min_nights = [23.793651, 18.239669, 1.000000]
let max_nights = [436.047619, 399.115702, 365.000000]

// Set up first trace
let plot3_trace1 = {
    x: room_types,
    y: max_nights,
    name: "Avg Maximum Nights Required",
    type: "bar"
  };

  // Set up second trace
let plot3_trace2 = {
    x: room_types,
    y: min_nights,
    name: "Avg Minimum Nights Required",
    type: "bar"
  };

// Combine data into an array that consists of both traces
plot_3_data = [plot3_trace1, plot3_trace2];

let plot_3_layout = {
    title: "Average Min and Max Nights Required by Room Type",
    height: 600,
    width: 800,
    barmode: 'group'
  };

Plotly.newPlot("plot3", plot_3_data, plot_3_layout);


// AVERAGE NUMBER OF REVIEWS AND AVERAGE REVIEW SCORES BY ROOM TYPE
// Assign values for first trace
let number_of_reviews = [7.640212, 5.333333, 9.603306]
let review_score = [4.715351, 4.71710, 4.910000]

// Set up first trace
let plot4_trace1 = {
    x: room_types,
    y: number_of_reviews,
    name: "Avg Number of Reviews",
    type: "bar"
  };

  // Set up second trace
let plot4_trace2 = {
    x: room_types,
    y: review_score,
    name: "Avg Review Score",
    type: "bar"
  };

// Combine data into an array that consists of both traces
plot_4_data = [plot4_trace1, plot4_trace2];

let plot_4_layout = {
    title: "Average Number of Reviews (past 12 months) and Average Review Score by Room Type",
    height: 600,
    width: 800,
    barmode: 'group'
  };

Plotly.newPlot("plot4", plot_4_data, plot_4_layout);