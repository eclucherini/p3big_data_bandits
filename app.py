import numpy as np
from pathlib import Path
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
# Create a reference to the database 
database_path = Path("Resources/ny_airbnb.db")

# Create Engine
engine = create_engine(f"sqlite:///{database_path}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Merged = Base.classes.merged_cleaned_ny

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
        f"/api/v1.0/listing_ids<br/>"
        
    )

@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return listing ids"""
    # Query all passengers
    results = session.query(Merged.listing_id).all()

    session.close()

    # Convert list of tuples into normal list
    all_ids = list(np.ravel(results))

    return jsonify(all_ids)

if __name__ == '__main__':
    app.run(debug=True)