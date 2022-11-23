from typing import Optional
from flask_httpauth import HTTPTokenAuth

from models.user import User

auth = HTTPTokenAuth(scheme="Bearer")


@auth.verify_token
def verify_token(token) -> Optional[User]:
    return User.query.filter_by(token=token).first() if token else None
