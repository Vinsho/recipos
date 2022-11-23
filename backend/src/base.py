import os

from dotenv import load_dotenv
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# pylint: skip-file

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.app_context().push()

CORS(app)
api = Api(app)


db = SQLAlchemy(app)
db.create_all()

# initialize api endpoints
from api.user import *
from api.recipe import *
