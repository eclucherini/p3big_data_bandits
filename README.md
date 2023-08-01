# New York City AirBnB Analysis
# p3big_data_bandits

# To use
(1) Open final_flask.py in an Integrated Terminal, type "python final_flask.py", then click the link to open the API in a development server. (Note that this step is required in order for the next step to function correctly.)
(2) Open NYC_Airbnb.html in a Live Server

# Deployment
Link to website: https://eclucherini.github.io/p3big_data_bandits/

# Data and Delivery
- We started with three CSV files from the source (http://insideairbnb.com/get-the-data/), specifically about New York City.
- Out of these three original files, calendars contained 15.9M rows of data, reviews contained 1.1M rows, and listings contained 44K rows.
- We cleaned this data down by removing null values and merging calendars and listings into one table, and removing null values in reviews. 
- We housed our data in a SQLite database, named ny_airbnb.sqlite (Resources).
- The two tables in the ny_airbnb database are called merged_cleaned_ny (10K rows) and reviews_cleaned_ny (35K rows).

# Back End
- We used two JavaScript libraries not shown in class: (1) chart.js, which ...; and (2) Turf.js, which combines data from our API into the Property Analysis map.
- We used both Leaflet and Plotly charts built from our data gathered through web scraping.
- Our website includes a dashboard page with multiple charts that all reference the same data.

# Visualizations 
- Our website contains four unique views to present the data. 
- Our website contains multiple user-driven interactions (including hyperlinks, zoom features on maps, and dropdown selections). 

# Analysis Ownership
Elena Lucherini - Property Analysis:
- 
- Note: All original and linked files located in Resources/EL.

Andrea Paredes - Host Analysis:
- Note: All original and linked files located in Resources/AP.

Rutva Korat - Pricing Analysis:
- For my analysis on Airbnb rentals in New York city, I decided to use d3.json and chart.js to create a scatter plot. The main purpose of this scatter plot was to show case a direct connection of pricing of each listing to its number of people it can accommodate. We used a flask API to receive the data we used to create the scatter plot. The d3.json function fetches the data provided from the API URL and returns what is asked. For this particular visual I used the adjusted prices and accommodates data. Originally the idea to show case this data was to make a bubble chart with chart.js, but when looking at the final product of the bubble chart, we noticed it was difficult to see each data point since the size of each bubble was originally determined by the rating of each location which made the bubble sizes too large to work with. Instead of the bubble chart we decided to turn it into a scatter plot with chart.js so that each point of data is the same size and can be properly viewed on the plot. With this I also added the listing URL to each point so when clicked on a point it will take you directly to the Airbnb listing.
This was done by using the onClick event handler which is part of chart.js.
- Note: All original and linked files located in Resources/RK.

Adam Nguyen - Review Analysis: 
-
- Note: All original and linked files located in Resources/AN. 
