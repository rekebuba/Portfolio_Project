#!/usr/bin/python3
"""
objects that handle all default RestFul API actions
for Users practice text(page)
"""
from models.user import User
from models.paragraph import Paragraph
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
import random


@app_views.route('/paragraph/pages', methods=['GET'], strict_slashes=False)
def get_paragraph():
    """
    Retrieves the list of all user paragraph/pages
    or a specific page
    """
    all_pages = storage.all(Paragraph).values()
    list_pages = []
    for page in all_pages:
        list_pages.append(page.to_dict())
    random.shuffle(list_pages)
    return jsonify(list_pages)


# @app_views.route('/paragraph/page/<page_id>', methods=['GET'], strict_slashes=False)
# def get_user_page(page_id):
#     """ Retrieves a page """
#     text = storage.get(Paragraph, page_id)
#     if not text:
#         abort(404)
#     text = text.to_dict()
#     text = jsonify(text)
#     return text, 200
