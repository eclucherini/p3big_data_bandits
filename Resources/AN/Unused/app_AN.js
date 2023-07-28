const Listing = "http://127.0.0.1:5000/api/BigDataBandits/Listings";

// Function to fetch the JSON data
async function fetchData() {
  try {
    const response = await fetch(Listing);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to populate the table with the top 10 listings
function populateTable(sortedListings) {
  const table = document.getElementById('listingTable');
  // Clear existing rows
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  sortedListings.forEach(([listingId, listingData]) => {
    const row = table.insertRow();
    row.insertCell().textContent = listingId;

    // Create an anchor element with the listing URL as the href
    const link = document.createElement('a');
    link.textContent = listingData.name;
    link.href = listingData.listingurl;
    link.target = "_blank"; // Open link in a new tab
    row.insertCell().appendChild(link);

    row.insertCell().textContent = listingData.number_of_reviews;
    row.insertCell().textContent = listingData.review_scores_rating;
    row.insertCell().textContent = listingData.price;
  });
}

// Function to filter data based on the selected room type
function filterData(data, roomType) {
  return data.filter(accommodation => accommodation.room_type.includes(roomType));
}

// Function to fetch data and update the table
async function fetchAndUpdateTable(selectedRoomType) {
  const data = await fetchData();

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