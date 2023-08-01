# New York City AirBnB Analysis
p3big_data_bandits

# To use
- (1) Open final_flask.py in an Integrated Terminal, type "python final_flask.py", then click the link to open the API in a development server. (Note that this step is required in order for the next step to function correctly.)
- (2) Open NYC_Airbnb.html in a Live Server

# Deployment
Link to website: https://eclucherini.github.io/p3big_data_bandits/

# Data and Delivery
- We started with three CSV files from the source (http://insideairbnb.com/get-the-data/), specifically about New York City.
- Out of these three original files, calendars contained 15.9M rows of data, reviews contained 1.1M rows, and listings contained 44K rows.
- We cleaned this data down by removing null values and merging calendars and listings into one table, and removing null values in reviews. 
- We housed our data in a SQLite database, named ny_airbnb.sqlite (Resources).
- The two tables in the ny_airbnb database are called merged_cleaned_ny (10K rows) and reviews_cleaned_ny (35K rows).
- Our website is powered by a Python Flask API (final_flask.py), and includes HTML/CSS, JavaScript, and the ny_airbnb database in SQLite.

# Back End
- We used two JavaScript libraries not shown in class: (1) chart.js, and (2) Turf.js.
- We used both Leaflet and Plotly charts built from our data gathered through web scraping.
- Our website includes a dashboard page with multiple charts that all reference the same data.

# Visualizations 
- Our website contains four unique views to present the data, which are accessible via the hyperlink options.
- Our website contains multiple user-driven interactions (including hyperlinks, zoom and click features on maps, and dropdown selections). 

# Analysis Ownership
Elena Lucherini - Property Analysis:
- 
- The most popular room type available in New York City are entire homes/apartments, comprising 60% of the total unique listings of our dataset. Following that at 39% are private rooms, with hotel rooms (those that are available on AirBnB) making up only 1%. It makes sense that entire homes/apartments would be the most available, since they can accommodate on average 3.5 people, whereas private rooms and hotel rooms can only accommodate 2 and 2.7 people, respectively. Additionally, entire homes/apartments have an average minimum night requirement of 24, compared to private rooms' and hotel rooms' average minimum nights required of 18 and 1, respectively. This indicates that entire homes/apartments are more likely to be rented for longer periods of time, particularly if guests do not have to share the space with other guests/owners. It's interesting that over the last 12 months, private room listings have, on average, 10 reviews, compared to entire homes/apartment listings' 8 reviews and hotels' 5 reviews, which indicates that private room listings are more likely to be reviewed on AirBnB, and may suggest that they are more likely to be booked than entire homes/apartments or AirBnB-listed hotel rooms. It could also be related to the duration of bookings of each room type, where there might be fewer average reviews for entire homes/apartment listings because their required minimum nights might result in fewer bookings overall. Finally, the map shows the neighborhoods within each NYC borough and how many of each room type are currently listed on AirBnB (based on our cleaned dataset). For example, Williamsburg in Brooklyn has 7 private rooms and 26 entire homes/apartments. For this analysis, I used turf.js, which is an open-source JavaScript library used for spatial analysis. Basically, since the listings in our data didn't specifically have the neighborhood and borough, only the latitudes and longitudes, it allowed me to connect our data to the New York City geojson file.
- Note: All original and linked files are located in Resources/EL.

Andrea Paredes - Host Analysis:
- 
- I decided to filter and sort the data to find the top 10 hosts with the most listings. To present the results I used a horizontal bar chart that included a code to change the color of the bars depending on the number of listings the host had. Right below it I presented a map to show the location of the property including a popup that contains a link to the host profile for more details. I believe this data is helpful for users looking to establish a partnership, for example, and would want to reach out the individuals with a larger number of listings.
- Note: All original and linked files are located in Resources/AP.

Rutva Korat - Pricing Analysis:
- 
- For my analysis on Airbnb rentals in New York city, I decided to use d3.json and chart.js to create a scatter plot. The main purpose of this scatter plot was to show case a direct connection of pricing of each listing to its number of people it can accommodate. We used a flask API to receive the data we used to create the scatter plot. The d3.json function fetches the data provided from the API URL and returns what is asked. For this particular visual I used the adjusted prices and accommodates data. Originally the idea to show case this data was to make a bubble chart with chart.js, but when looking at the final product of the bubble chart, we noticed it was difficult to see each data point since the size of each bubble was originally determined by the rating of each location which made the bubble sizes too large to work with. Instead of the bubble chart we decided to turn it into a scatter plot with chart.js so that each point of data is the same size and can be properly viewed on the plot. With this I also added the listing URL to each point so when clicked on a point it will take you directly to the Airbnb listing.
This was done by using the onClick event handler which is part of chart.js.
- Note: All original and linked files are located in Resources/RK.

Adam Nguyen - Review Analysis: 
-
- I worked on reviews analysis. It consisted of pulling a unique value of the listing_id from review_data, and creating a bar chart of the top 15 reviewers from our clean data using plotly. 
 A top 10 Airbnb reviews by type table was created by taking the top 10 listings with the most reviews and review rating for Private rooms and Entire home/ apt. The addition of a link for each listing to view as well as price per night was added for the ability to compare each listing.
Lastly, the Leaflet map was created to reflect on if a listing is available (green house) or unavailable (red sleeping bed) depending on the current date. If the listing is clicked then information is in the popup including name, price, room type, and url. There is the option to click the layout and show available listings as well as unavailable listings. 

- Note: All original and linked files are located in Resources/AN. 
