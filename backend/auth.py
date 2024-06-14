"""
Module for authentication for this web app
"""
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin

# Own Modules
from models import User
from database import db

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
    """
    Signup process for user
    """
    content = request.json
    name = content['name']
    password = content['password']

    if name is None or password is None:
        return jsonify(message='Not the right parameters (name, password)'), 404

    user = User.query.filter_by(name=name).first()

    if user:
        return jsonify(message='User allredy exsist'), 404

    new_user = User(name=name, password=generate_password_hash(password, method='scrypt'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message='User created'), 200

@auth.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    """
    Login process for user
    """
    content = request.json
    name = content['name']
    password = content['password']

    if name is None or password is None:
        return jsonify(message='Not the right parameters (name, password)'), 404

    remember = request.form.get('remember')

    user = User.query.filter_by(name=name).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify(message='Password wrong or User dose not exsist'), 404


    login_user(user, remember=remember)
    return jsonify(message='Login successfully'), 200

@auth.route('/logout')
@login_required
@cross_origin(supports_credentials=True)
def logout():
    """
    Logout process for user
    """
    logout_user()
    return jsonify(message='Successfully logged out'), 200
