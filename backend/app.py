"""
Main Modul for this web app
"""
from os import getenv
from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate, upgrade, init as migrate_init, migrate as flask_migrate
from flask_restful import Api
from flask_cors import CORS

# Own Modules
from database import db
from models import User
from auth import auth as auth_blueprint
from default import default as default_blueprint
from resources.item import ItemResource
from resources.user import UserResource
from resources.shopping_list import (
    ShoppingListResource,
    ShareShoppingListResource,
    ItemsShoppingListResource
)

migrate = Migrate()

def create_app():
    """
    Create the Web App with Flask fo a shopping list app.
    """
    app = Flask(__name__)
    app.config['SECRET_KEY'] = getenv('SECRET_KEY', '9OLWxND4o83j4K4iuopO')

    # Cors enable
    cors = CORS(app, support_credentials=True)
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Database Connection
    user = getenv('POSTGRES_USER', 'postgres')
    password = getenv('POSTGRES_PASSWORD', 'postgres')
    host = getenv('POSTGRES_HOST', '127.0.0.1')
    port = getenv('POSTGRES_PORT', '5432')
    database = getenv('POSTGRES_DB', 'shopping_list')

    db_url = f'postgresql://{user}:{password}@{host}:{port}/{database}'

    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(app)
    migrate.init_app(app, db)

    # Session handling
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(User, user_id)

    # blueprint for auth routes in our app
    app.register_blueprint(auth_blueprint)

    # Setup Api
    api = Api(app)
    api.add_resource(ShoppingListResource, '/shopping_lists', '/shopping_lists/<string:list_id>')
    api.add_resource(ShareShoppingListResource, '/shopping_lists/<string:list_id>/share')
    api.add_resource(ItemsShoppingListResource, '/shopping_lists/<string:list_id>/items')
    api.add_resource(ItemResource, '/items', '/items/<string:item_id>')
    api.add_resource(UserResource, '/users/<string:user_name>')

    # blueprint for default parts of app
    app.register_blueprint(default_blueprint)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=False)
