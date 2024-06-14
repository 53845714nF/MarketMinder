"""
Module for testing the profile
"""
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from flask_cors import cross_origin

default = Blueprint('main', __name__)

@default.route('/profile', methods=['GET'])
@login_required
@cross_origin(supports_credentials=True)
def profile():
    """
    This function test profile
    """
    user = {'id':current_user.id,'name':current_user.name}
    return jsonify(user)
