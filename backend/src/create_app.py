from base import app, db

db.create_all()
app.run(host="0.0.0.0")
