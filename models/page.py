#!/usr/bin/python3
""" holds class User"""

import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, CheckConstraint, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5

class Page(BaseModel, Base):
    """Representation of a text that a user practices"""
    if models.storage_t == 'db':
        __tablename__ = 'pages'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        text = Column(String(99999), nullable=True)

        # places = relationship("Place", backref="user")
        # reviews = relationship("Review", backref="user")
    else:
        text = ""

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
