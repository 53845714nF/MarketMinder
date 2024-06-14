"""
This Module mange the Api for the Shopping List
"""
from flask import jsonify
from flask_restful import Resource, reqparse
from flask_login import login_required, current_user
from flask_cors import cross_origin

# Own Modules
from models import ShoppingList, User
from database import db

class ShoppingListResource(Resource):
    """
    This Class manage shoping list wit no id
    """

    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help="Name cannot be blank!")

    @login_required
    @cross_origin(supports_credentials=True)
    def get(self):
        """
        Return the shopping lists of an user
        """
        user: User = current_user

        shopping_lists: ShoppingList = (
            db.session
            .query(ShoppingList)
            .filter_by(user_id=user.id)
            .all()
        )

        # Get shared lists
        shared_lists = user.shared_lists

        # But it in on list
        shopping_lists.extend(shared_lists)

        if shopping_lists is None:
            return {'message': 'No Shopping list found'}, 404

        json_shopping_list = [{'name': str(shopping_list.name),
                               'id': str(shopping_list.id)
                               } for shopping_list in shopping_lists
                             ]

        return  jsonify({'shopping_list': json_shopping_list})

    @login_required
    @cross_origin(supports_credentials=True)
    def post(self):
        """
        Create a new shopping list for a user
        """
        user: User = current_user
        args = self.parser.parse_args()

        shopping_list_name = args['name']

        # Create a new list
        new_list = ShoppingList(name=shopping_list_name, user_id=user.id)
        db.session.add(new_list)
        db.session.commit()

        return {'message': 'Shopping list created',
                'shopping_list': {
                    'id': str(new_list.id),
                    'name': str(new_list.name)
                }}, 201

    @login_required
    @cross_origin(supports_credentials=True)
    def delete(self, list_id):
        """
        Delete/Unshare a specific List
        """
        user = current_user
        shopping_list = ShoppingList.query.get(list_id)

        if shopping_list is None:
            return {'message': 'Shopping list not found'}, 404

        if shopping_list in user.shared_lists:
            user.shared_lists.remove(shopping_list)
            db.session.commit()
            return {'message': 'Unshare List'}, 200

        if str(user.id) != str(shopping_list.user_id):
            return {'message': 'Your are not allot to delete this list'}, 403

        db.session.delete(shopping_list)
        db.session.commit()
        return {'message': 'Shopping list deleted'}, 200

    @cross_origin(supports_credentials=True)
    def options (self):
        return {'Allow' : 'POST' }, 200, \
        { 'Access-Control-Allow-Origin': '*', \
          'Access-Control-Allow-Methods' : 'GET,POST,DELETE' }

class ShareShoppingListResource(Resource):
    """
    Class for sharing the Shopping List
    """

    parser = reqparse.RequestParser()
    parser.add_argument('user_id', type=str, required=True, help="user_id cannot be blank!")

    @login_required
    @cross_origin(supports_credentials=True)
    def post(self, list_id):
        """
        Share the list with other users
        """
        user: User = current_user
        args = self.parser.parse_args()

        # Fetch the shopping list
        shopping_list: ShoppingList = ShoppingList.query.get(list_id)
        if shopping_list is None:
            return {'message': 'Shopping list not found'}, 404

        if not (str(shopping_list.user_id) == str(user.id) or shopping_list in user.shared_lists):
            return {'message': 'Your not allowed to share this list'}, 200

        # Fetch the user to share the list with
        share_with_user_id = args['user_id']
        share_with_user: User = User.query.get(share_with_user_id)
        if share_with_user is None:
            return {'message': 'Sharing User not found'}, 404

        # Add the user to the shared_with relationship
        if share_with_user not in shopping_list.shared_with:
            shopping_list.shared_with.append(share_with_user)
            db.session.commit()
            return {'message': 'Shopping list shared successfully'}, 200

        return  {'message': 'Something went wrong'}, 404


    @cross_origin(supports_credentials=True)
    def options (self):
        return {'Allow' : 'POST' }, 200, \
        { 'Access-Control-Allow-Origin': '*', \
          'Access-Control-Allow-Methods' : 'POST' }

class ItemsShoppingListResource(Resource):
    """
    Class to get Items from a shopping list
    """
    @login_required
    @cross_origin(supports_credentials=True)
    def get(self, list_id):
        """
        Getting the Shopping List and the Items in the List
        """
        user: User = current_user
        shopping_list: ShoppingList = ShoppingList.query.get(list_id)

        if shopping_list is None:
            return {'message': 'Shopping list not found'}, 404

        user_ids_in_shared_list = [str(shared_user.id) for shared_user in shopping_list.shared_with]

        if str(user.id) not in user_ids_in_shared_list and shopping_list.user_id != user.id:
            return {'message': 'You are not allowed to see this list'}, 403

        item_ids = [{'id': str(item.id)} for item in shopping_list.items]

        return {'name': str(shopping_list.name),
                'items': item_ids
               }, 200

    @cross_origin(supports_credentials=True)
    def options (self):
        return {'Allow' : 'POST' }, 200, \
        { 'Access-Control-Allow-Origin': '*', \
          'Access-Control-Allow-Methods' : 'GET' }