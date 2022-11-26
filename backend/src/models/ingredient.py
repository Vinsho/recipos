from enum import Enum
from dataclasses import dataclass
from sqlalchemy.ext.hybrid import hybrid_property
from base import db, ModelBase


@dataclass
class Ingredient(ModelBase):
    name: str

    _name = db.Column("name", db.String(128), primary_key=True)

    @hybrid_property
    def name(self):
        return self._name

    @name.setter
    def name(self, name: str):
        self._name = name.title()


class UnitEnum(str, Enum):
    g = "g"
    pcs = "pc/s"
    ml = "ml"


@dataclass
class IngredientQuantity(ModelBase):
    id: int
    name: str
    unit: UnitEnum
    amount: float

    id = db.Column(db.Integer, primary_key=True)
    unit = db.Column(db.Enum(UnitEnum, name="unit_enum"))
    amount = db.Column(db.Float)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"))
    name = db.Column(
        db.String(128), db.ForeignKey("ingredient.name", ondelete="CASCADE")
    )
