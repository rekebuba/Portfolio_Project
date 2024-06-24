#!/usr/bin/python3
""" holds class User"""

import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, CheckConstraint
from sqlalchemy.orm import relationship
from hashlib import md5


class User(BaseModel, Base):
    """Representation of a user """
    if models.storage_t == 'db':
        __tablename__ = 'users'
        email = Column(String(128), nullable=True)
        password = Column(String(128), nullable=True)
        sub = Column(String(128), nullable=True)
        username = Column(String(128), nullable=True)
        name = Column(String(128), nullable=True)
        
        __table_args__ = (
            CheckConstraint('password IS NOT NULL OR sub IS NOT NULL'),
            CheckConstraint('username IS NOT NULL OR name IS NOT NULL')
        )
        pages = relationship("Page", backref="user")
        scores = relationship("Score", backref="user")
    else:
        email = ""
        password = ""
        sub = ""
        username = ""
        name = ""

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
