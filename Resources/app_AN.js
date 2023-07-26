console.log(Listings);


function popular(reviews) {
  return reviews.number_of_reviews > 20;
}

// Call the custom function with filter()
let popularairbnb = Listings.filter(popular);


let trace1 = {
    x: popularairbnb.map(row => row.number_of_reviews),
    y: popularairbnb.map(row => row.listing_id),
    type: "bar"
};

// Data trace array
let traceData = [trace1];

// Apply title to the layout
let layout = {
  title: "Popular Airbnb"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);