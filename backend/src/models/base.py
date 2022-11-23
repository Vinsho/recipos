from typing import Any, Dict

from stringcase import snakecase

from sqlalchemy.ext.declarative import declared_attr
from base import db


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
