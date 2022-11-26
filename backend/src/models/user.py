from dataclasses import dataclass

import hashlib
import os
import jwt


from base import db, ModelBase


@dataclass
class User(ModelBase):
    id: int
    name: str
    email: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    email = db.Column(db.String(128), unique=True)
    password_hash = db.Column(db.LargeBinary)
    salt = db.Column(db.LargeBinary)
    token = db.Column(db.String(256))

    def __init__(self, **kwargs):
        kwargs["password_hash"] = self.hash_password(kwargs.pop("password"))
        self.update(kwargs)

    def hash_password(self, password: str) -> bytes:
        self.salt = os.urandom(64)
        return hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), self.salt, 1000000
        )

    def check_password(self, password: str) -> bool:
        hashed = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), self.salt, 1000000
        )
        return hashed == self.password_hash

    def generate_token(self) -> str:
        self.token = jwt.encode(
            {"user_id": self.id, "email": self.email},
            os.getenv("SECRET_KEY"),
            algorithm="HS256",
        )
        db.session.commit()

        return self.token

    @staticmethod
    def email_exists(email: str) -> bool:
        return User.query.filter_by(email=email).first() is not None

    @staticmethod
    def name_exists(name: str) -> bool:
        return User.query.filter_by(name=name).first() is not None
