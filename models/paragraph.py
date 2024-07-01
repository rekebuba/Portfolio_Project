#!/usr/bin/python3
""" holds class User"""

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, Text
from sqlalchemy.orm import relationship

class Paragraph(BaseModel, Base):
    """Representation of a text that a user practices"""
    if models.storage_t == 'db':
        __tablename__ = 'paragraph'
        text = Column(Text, nullable=False)

    else:
        text = ""

    def __init__(self, *args, **kwargs):
        """initializes paragraph"""
        super().__init__(*args, **kwargs)
