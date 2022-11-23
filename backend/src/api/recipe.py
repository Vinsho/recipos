from flask_restful import Resource
from flask import jsonify, request

from base import api, db
from models.recipe import Recipe
from models.ingredient import Ingredient

from api.auth import auth
from utils import ROOT_PATH


@api.resource("/userCanEdit/<recipe_id>")
class RecipeResourceCanEdit(Resource):
    @auth.login_required
    def get(self, recipe_id: int):
        return {
            "message": Recipe.query.get_or_404(recipe_id).user_id == auth.current_user().id
        }, 200


@api.resource("/recipes/<recipe_id>")
class RecipeResource(Resource):
    def get(self, recipe_id: int):
        recipe = db.session.query(Recipe).get(recipe_id)
        return jsonify(recipe)

    @auth.login_required
    def put(self, recipe_id: int):
        data = dict(request.form)

        recipe = Recipe.query.get(recipe_id)
        recipe.update(data)

        db.session.commit()

        image = request.files.get("image")
        if image:
            image.save(f"{ROOT_PATH}/frontend/public/images/{recipe.id}.jpg")

    def delete(self, recipe_id):
        Recipe.query.filter_by(id=recipe_id).delete()
        db.session.commit()


@api.resource("/recipes")
class RecipeResourceList(Resource):
    def get(self):
        return jsonify(Recipe.query.all())

    @auth.login_required
    def post(self):
        data = dict(request.form)

        recipe = Recipe(**data)
        recipe.user_id = auth.current_user().id

        db.session.add(recipe)
        db.session.commit()

        image = request.files["image"]
        image.save(f"{ROOT_PATH}/frontend/public/images/{recipe.id}.jpg")


@api.resource("/ingredients")
class IngredientResource(Resource):
    def get(self):
        return jsonify(Ingredient.query.all())