#!/usr/bin/python3
""" holds class User score"""

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Score(BaseModel, Base):
    """Representation of a score that a user practices"""
    if models.storage_t == 'db':
        __tablename__ = 'score'
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        wpm = Column(Integer)
        accuracy = Column(Integer)
    else:
        wpm = int
        accuracy = int

    def __init__(self, *args, **kwargs):
        """initializes score"""
        super().__init__(*args, **kwargs)
