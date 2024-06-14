"""
Module to create a get endpoint for Users 
"""
from flask_restful import Resource
from flask_login import login_required
from flask_cors import cross_origin

# Own Modules
from models import User, db

class UserResource(Resource):
    """
    Class for User
    """
    @login_required
    @cross_origin(supports_credentials=True)
    def get(self, user_name):
        """
        Search a user by name
        """
        users = db.session.query(User).filter(User.name.like(f'%{user_name}%')).all()
        if users is None:
            return {'message': 'User not found'}, 404

        user_list = [{'name': str(user.name), 'id': str(user.id)} for user in users]

        return str(user_list)

    @cross_origin(supports_credentials=True)
    def options (self):
        return {'Allow' : 'POST' }, 200, \
        { 'Access-Control-Allow-Origin': '*', \
          'Access-Control-Allow-Methods' : 'GET' }