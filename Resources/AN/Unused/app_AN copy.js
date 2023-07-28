
const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

// Function to populate the table with the top 10 listings
function populateTable(sortedListings) {
  const table = d3.select('#listingTable tbody');
  const rows = table.selectAll('tr').data(sortedListings, d => d[0]);
  
  // Enter new rows
  const newRows = rows.enter().append('tr');
  newRows.append('td').text(d => d[0]);
  newRows.append('td').append('a').text(d => d[1].name)
    .attr('href', d => d[1].listingurl)
    .attr('target', '_blank'); // Open link in a new tab
  newRows.append('td').text(d => d[1].number_of_reviews);
  newRows.append('td').text(d => d[1].review_scores_rating);
  newRows.append('td').text(d => d[1].price);
  
  // Update existing rows
  rows.select('td:nth-child(2) a').text(d => d[1].name)
    .attr('href', d => d[1].listingurl);
  rows.select('td:nth-child(3)').text(d => d[1].number_of_reviews);
  rows.select('td:nth-child(4)').text(d => d[1].review_scores_rating);
  rows.select('td:nth-child(5)').text(d => d[1].price);
  
  // Remove rows that are not in the data anymore
  rows.exit().remove();
}

// Function to filter data based on the selected room type
function filterData(data, roomType) {
  return data.filter(accommodation => accommodation.room_type.includes(roomType));
}

// Function to fetch data and update the table
async function fetchAndUpdateTable(selectedRoomType) {
  const data = await d3.json(Listing);

  // Create an object to store the first number_of_reviews, review_scores_rating, name, and price for each listing_id
  const reviewsByListingId = {};

  // Loop through the data array and populate the reviewsByListingId object
  data.forEach(accommodation => {
    const listingId = accommodation.listing_id;
    const numberOfReviews = accommodation.number_of_reviews;
    const reviewScoresRating = accommodation.review_scores_rating;
    const name = accommodation.name;
    const price = accommodation.price;
    const listingurl = accommodation.listing_url;

    // Check if the room type matches the selected room type
    if (accommodation.room_type.includes(selectedRoomType)) {
      // Check if the listing_id does not exist in the reviewsByListingId object
      // If it doesn't, add the listing_id and its corresponding data to the object
      if (!reviewsByListingId.hasOwnProperty(listingId)) {
        reviewsByListingId[listingId] = {
          name: name,
          number_of_reviews: numberOfReviews,
          review_scores_rating: reviewScoresRating,
          price: price,
          listingurl: listingurl,
        };
      }
    }
  });

  // Sort the reviewsByListingId object by number_of_reviews in descending order
  const sortedListings = Object.entries(reviewsByListingId)
    .sort(([, a], [, b]) => b.number_of_reviews - a.number_of_reviews)
    .slice(0, 10);

  // Populate the table chart
  populateTable(sortedListings);
}

// Fetch the JSON data and update the table with the default selected room type
fetchAndUpdateTable("Private room");

// Add event listener to the dropdown
const dropdown = document.getElementById('roomTypeDropdown');
dropdown.addEventListener('change', function() {
  const selectedRoomType = this.value;
  fetchAndUpdateTable(selectedRoomType);
});
