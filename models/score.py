#!/usr/bin/python3
""" holds class User score"""

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, CheckConstraint, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship

class Score(BaseModel, Base):
    """Representation of a score that a user practices"""
    if models.storage_t == 'db':
        __tablename__ = 'scores'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        wpm  = Column(Integer)
        accuracy = Column(Integer)
        avrage = Column(Integer)

    else:
        wpm = int
        accuracy = int
        avrage = int

    def __init__(self, *args, **kwargs):
        """initializes score"""
        super().__init__(*args, **kwargs)
