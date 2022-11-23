from dataclasses import dataclass

import json
from enum import Enum
from typing import List

from sqlalchemy.ext.hybrid import hybrid_property

from base import db
from models.ingredient import Ingredient, IngredientQuantity
from models.base import ModelBase


@dataclass
class RecipeDirection(ModelBase):
    id: int
    order: int
    recipe_id: int
    direction: str

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"))
    direction = db.Column(db.String(512))


class RecipeTypeEnum(str, Enum):
    soup = "soup"
    main_dish = "main_dish"
    dessert = "dessert"


@dataclass
class Recipe(ModelBase):
    id: int
    name: str
    author_name: str
    ingredients: list
    directions: list
    type: RecipeTypeEnum

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    type = db.Column(db.Enum(RecipeTypeEnum, name="recipe_type_enum"))

    author = db.relationship("User", uselist=False)
    _ingredients = db.relationship("IngredientQuantity", cascade="all, delete-orphan")
    _directions = db.relationship("RecipeDirection", cascade="all, delete-orphan")

    @property
    def author_name(self) -> str:
        return self.author.name

    @hybrid_property
    def directions(self) -> List[RecipeDirection]:
        return self._directions

    @directions.setter
    def directions(self, directions: str):
        self._directions = []
        for order, direction in enumerate(json.loads(directions), 1):
            direction.pop("id")
            direction["order"] = order
            self._directions.append(RecipeDirection(**direction))

    @hybrid_property
    def ingredients(self) -> List[IngredientQuantity]:
        return self._ingredients

    @ingredients.setter
    def ingredients(self, ingredients: str):
        self._ingredients = []
        existing_ingredients = [ing.name for ing in Ingredient.query.all()]

        for ingredient in json.loads(ingredients):
            ingredient.pop("id")

            if ingredient["name"] not in existing_ingredients:
                db.session.add(Ingredient(name=ingredient["name"]))

            self._ingredients.append(IngredientQuantity(**ingredient))


@dataclass
class Tag(ModelBase):
    tag: str

    tag = db.Column(db.String(32), primary_key=True)


@dataclass
class RecipeTag(ModelBase):
    id: int
    tag: str
    recipe_id: int

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"))
    tag = db.Column(db.String(32), db.ForeignKey("tag.tag"))
