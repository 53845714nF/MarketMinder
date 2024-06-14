"""
This Module creates REST API for the Items
"""
from flask_restful import Resource, reqparse
from flask_login import login_required, current_user
from flask_cors import cross_origin

# Own modules
from models import Item, ShoppingList, User
from database import db

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help="Name cannot be blank!")
parser.add_argument('done', type=bool, required=False, default=False)
parser.add_argument('amount', type=int, required=False, default=1)
parser.add_argument('shopping_list_id',
                    type=str,
                    required=True,
                    help="Shopping list ID cannot be blank!")

class ItemResource(Resource):
    """
    Class for the Items in the Shopping List
    """
    @login_required
    @cross_origin(supports_credentials=True)
    def get(self, item_id):
        """
        Getting specific Item
        """
        item: Item = Item.query.get(item_id)

        if item is None:
            return {'message': 'Item not found'}, 404
        return {
            'id': str(item.id),
            'name': item.name,
            'amount': item.amount,
            'done': item.done,
        }, 200

    @login_required
    @cross_origin(supports_credentials=True)
    def post(self):
        """
        Create a new Item in a Shopping List
        """
        user: User = current_user
        args = parser.parse_args()

        shopping_list: ShoppingList = ShoppingList.query.get(args['shopping_list_id'])

        if shopping_list is None:
            return {'message': 'Shopping list not found'}, 404

        user_ids_in_shared_list = [str(shared_user.id) for shared_user in shopping_list.shared_with]

        if str(user.id) not in user_ids_in_shared_list and shopping_list.user_id != user.id:
            return {'message': 'Your are not allot to delete this list'}, 403

        new_item = Item(
            name=args['name'],
            done=args['done'],
            amount=args['amount'],
            shopping_list_id=shopping_list.id
        )
        db.session.add(new_item)
        db.session.commit()

        return {
            'message': 'Item created',
            'item': {
                'id': str(new_item.id),
                'name': new_item.name,
                'amount': new_item.amount,
                'done': new_item.done,
            }
        }, 201

    @login_required
    @cross_origin(supports_credentials=True)
    def put(self, item_id):
        """
        Change a specific Item
        """
        args = parser.parse_args()
        item: Item = Item.query.get(item_id)

        if item is None:
            return {'message': 'Item not found'}, 404

        item.name = args['name']
        item.done = args['done']
        item.amount = args['amount']
        db.session.commit()

        return {
            'message': 'Item updated',
            'item': {
                'id': str(item.id),
                'name': item.name,
                'amount': item.amount,
                'done': item.done,
            }
        }, 200

    @login_required
    @cross_origin(supports_credentials=True)
    def delete(self, item_id):
        """
        Delete a specific Item
        """
        item: Item = Item.query.get(item_id)

        if item is None:
            return {'message': 'Item not found'}, 404

        db.session.delete(item)
        db.session.commit()

        return {'message': 'Item deleted'}, 200

    @cross_origin(supports_credentials=True)
    def options (self):
        return {'Allow' : 'POST' }, 200, \
        { 'Access-Control-Allow-Origin': '*', \
          'Access-Control-Allow-Methods' : 'POST,GET,PUT,DELETE' }