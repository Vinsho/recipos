import os
from typing import Any, Dict

from stringcase import snakecase
from dotenv import load_dotenv
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.ext.declarative import declared_attr


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


class ModelBase(db.Model):
    __abstract__ = True

    @declared_attr
    def __tablename__(self) -> str:
        return snakecase(self.__name__)  # pylint: disable=no-member

    def __init__(self, **kwargs):
        for column, value in kwargs.items():
            if hasattr(self, column):
                setattr(self, column, value)

    def update(self, data: Dict[str, Any]):
        for column, value in data.items():
            if hasattr(self, column):
                setattr(self, column, value)


# initialize api endpoints
from api.user import *
from api.recipe import *
