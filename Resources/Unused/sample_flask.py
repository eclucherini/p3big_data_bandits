import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///sample_airbnb.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Calendar = Base.classes.sample_ny_calendar
Listings = Base.classes.sample_ny_listings
Reviews = Base.classes.sample_ny_reviews


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/BigDataBandits/calendar<br/>"
        f"/api/BigDataBandits/listings<br/>"
        f"/api/BigDataBandits/reviews<br/>"
    )


@app.route("/api/BigDataBandits/calendar")
def calendar():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of calendar data"""
    # Query all calendar data
    results = session.query(Calendar.listing_id, Calendar.date, Calendar.available, Calendar.price, Calendar.adjusted_price).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_calendar
    all_calendar = []
    for listing_id, date, available, price, adjusted_price in results:
        calendar_dict = {}
        calendar_dict["listing_id"] = listing_id
        calendar_dict["date"] = date
        calendar_dict["available"] = available
        calendar_dict["price"] = price
        calendar_dict["adjusted_price"] = adjusted_price
        all_calendar.append(calendar_dict)

    return jsonify(all_calendar)


@app.route("/api/BigDataBandits/listings")
def listings():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of listings data"""
    # Query all calendar data
    results = session.query(Listings.id, Listings.listing_url, Listings.name, Listings.host_id, Listings.host_url, Listings.host_name, Listings.host_since, Listings.host_is_superhost, 
                            Listings.host_listings_count, Listings.host_total_listings_count, Listings.latitude, Listings.longitude, Listings.property_type, Listings.room_type, 
                            Listings.accommodates, Listings.bathrooms, Listings.bedrooms, Listings.beds, Listings.price, Listings.minimum_nights, Listings.maximum_nights, 
                            Listings.has_availability, Listings.number_of_reviews, Listings.number_of_reviews_ltm, Listings.number_of_reviews_l30d, Listings.first_review, 
                            Listings.last_review, Listings.review_scores_rating, Listings.calculated_host_listings_count, Listings.reviews_per_month 
                            ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_calendar
    all_listings = []
    for id, listing_url, name, host_id, host_url, host_name, host_since, host_is_superhost, host_listings_count, host_total_listings_count, latitude, longitude, property_type, room_type, accommodates, bathrooms, bedrooms, beds, price, minimum_nights, maximum_nights, has_availability, number_of_reviews, number_of_reviews_ltm, number_of_reviews_l30d, first_review, last_review, review_scores_rating, calculated_host_listings_count, reviews_per_month in results:
        listing_dict = {}
        listing_dict["id"] = id
        listing_dict["listing_url"] = listing_url
        listing_dict["name"] = name
        listing_dict["host_id"] = host_id
        listing_dict["host_url"] = host_url
        listing_dict["host_name"] = host_name
        listing_dict["host_since"] = host_since
        listing_dict["host_is_superhost"] = host_is_superhost
        listing_dict["host_listings_count"] = host_listings_count
        listing_dict["host_total_listings_count"] = host_total_listings_count
        listing_dict["latitude"] = latitude
        listing_dict["longitude"] = longitude
        listing_dict["property_type"] = property_type
        listing_dict["room_type"] = room_type
        listing_dict["accommodates"] = accommodates
        listing_dict["bathrooms"] = bathrooms
        listing_dict["bedrooms"] = bedrooms
        listing_dict["beds"] = beds
        listing_dict["price"] = price
        listing_dict["minimum_nights"] = minimum_nights
        listing_dict["maximum_nights"] = maximum_nights
        listing_dict["has_availability"] = has_availability
        listing_dict["number_of_reviews"] = number_of_reviews
        listing_dict["number_of_reviews_ltm"] = number_of_reviews_ltm
        listing_dict["number_of_reviews_l30d"] = number_of_reviews_l30d
        listing_dict["first_review"] = first_review
        listing_dict["last_review"] = last_review
        listing_dict["review_scores_rating"] = review_scores_rating
        listing_dict["calculated_host_listings_count"] = calculated_host_listings_count
        listing_dict["reviews_per_month"] = reviews_per_month
        all_listings.append(listing_dict)

    return jsonify(all_listings)


@app.route("/api/BigDataBandits/reviews")
def reviews():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of review data"""
    # Query all reviews data
    results = session.query(Reviews.listing_id, Reviews.id, Reviews.date, Reviews.reviewer_id, Reviews.reviewer_name).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_reviews
    all_reviews = []
    for listing_id, id, date, reviewer_id, reviewer_name in results:
        review_dict = {}
        review_dict["listing_id"] = listing_id
        review_dict["id"] = id
        review_dict["date"] = date
        review_dict["reviewer_id"] = reviewer_id
        review_dict["reviewer_name"] = reviewer_name
        all_reviews.append(review_dict)

    return jsonify(all_reviews)


if __name__ == '__main__':
    app.run(debug=True)
