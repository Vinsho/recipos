from flask_restful import Resource
from flask import request, jsonify

from base import api, db
from models.user import User
from api.errors import RequestError


@api.resource("/users")
class UserResourceList(Resource):
    def post(self):
        data = dict(request.form)

        if User.email_exists(data["email"]):
            return RequestError("Email already exists!", 500)

        if User.name_exists(data["name"]):
            return RequestError("Name already exists!", 500)

        user = User(**data)

        db.session.add(user)
        db.session.commit()

        return jsonify(user)


@api.resource("/userLogin")
class UserLogin(Resource):
    def post(self):
        data = dict(request.form)

        user = db.session.query(User).filter(User.email == data["email"]).first()

        if not user:
            return RequestError("Email doesn't exist", 401)

        if not user.check_password(data["password"]):
            return RequestError("Wrong password!", 401)

        return user.generate_token(), 200
