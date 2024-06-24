#!/usr/bin/python3
""" holds class User"""

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, CheckConstraint, ForeignKey, Text
from sqlalchemy.orm import relationship

class Page(BaseModel, Base):
    """Representation of a text that a user practices"""
    if models.storage_t == 'db':
        __tablename__ = 'pages'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        text = Column(Text, nullable=True)

    else:
        text = ""

    def __init__(self, *args, **kwargs):
        """initializes Page"""
        super().__init__(*args, **kwargs)
