FROM python:3.10

WORKDIR /backend

COPY poetry.lock pyproject.toml .env ./

COPY ./src ./src

RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install

WORKDIR /backend/src
ENTRYPOINT alembic upgrade head

CMD python create_app.py