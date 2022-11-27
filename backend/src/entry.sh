#!/bin/bash
alembic upgrade head
python create_app.py