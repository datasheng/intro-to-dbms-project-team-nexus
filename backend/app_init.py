# app_init.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()  # Initialize SQLAlchemy instance

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
    app.config['SECRET_KEY'] = 'pass4JobConnect!'

    CORS(app)

    db.init_app(app)  # Bind SQLAlchemy to the Flask app

    return app
