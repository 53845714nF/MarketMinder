"""
This Module contains ORM mapping for Tables on the database
"""
from uuid import uuid4
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID

# Own Modules
from database import db

# Association table for the many-to-many relationship between User and ShoppingList
user_shoppinglist_association = db.Table('user_shoppinglist_association',
    db.Column('user_id',
              UUID(as_uuid=True),
              db.ForeignKey('user.id'),
              primary_key=True
            ),

    db.Column('shopping_list_id',
              UUID(as_uuid=True),
              db.ForeignKey('shopping_list.id'),
              primary_key=True
            )
)

class User(UserMixin, db.Model): # pylint: disable=too-few-public-methods
    """
    User Tabel for authentication
    """
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = db.Column(db.String(1000), unique=True, nullable=False)
    password = db.Column(db.String(164), nullable=False)

    # Relationship to ShoppingList for the sharing functionality
    shared_lists = db.relationship('ShoppingList',
                                   secondary=user_shoppinglist_association,
                                   back_populates='shared_with'
                                  )

class ShoppingList(db.Model): # pylint: disable=too-few-public-methods
    """
    ShoppingList Table to handle user's shopping lists
    """
    __tablename__ = 'shopping_list'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(UUID(as_uuid=True),
                        db.ForeignKey('user.id', ondelete='CASCADE'),
                        nullable=False
                       )

    # Relationship to Item for the items in the list
    items = db.relationship('Item', back_populates='shopping_list', cascade='all, delete-orphan')

    # Relationship to User for sharing functionality
    shared_with = db.relationship('User',
                                  secondary=user_shoppinglist_association,
                                  back_populates='shared_lists'
                                )

class Item(db.Model): # pylint: disable=too-few-public-methods
    """
    Item Table have Item for the Shopping list
    """
    __tablename__ = 'item'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = db.Column(db.String(1000),  unique=True, nullable=False)
    done = db.Column(db.Boolean, nullable=False, default=False)
    amount = db.Column(db.Integer, nullable=False, default=1)
    shopping_list = db.relationship('ShoppingList', back_populates='items')
    shopping_list_id = db.Column(UUID(as_uuid=True),
                                 db.ForeignKey('shopping_list.id',
                                 ondelete='CASCADE'),
                                 nullable=False
                                )
