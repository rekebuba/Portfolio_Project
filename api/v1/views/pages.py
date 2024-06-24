#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users practice text(page) """
from models.page import Page
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from

@app_views.route('/pages', methods=['GET'], strict_slashes=False)
def get_pages():
    """
    Retrieves the list of all user pages
    or a specific page
    """
    all_pages = storage.all(Page).values()
    list_pages = []
    for page in all_pages:
        list_pages.append(page.to_dict())
    return jsonify(list_pages)

@app_views.route('/page/<page_id>', methods=['GET'], strict_slashes=False)
def get_user_page(page_id):
    """ Retrieves a page """
    text = storage.get(Page, page_id)
    if not text:
        abort(404)
    text = text.to_dict()
    text = jsonify(text)
    return text, 200

@app_views.route('/user/page/<user_id>', methods=['POST'], strict_slashes=False)
def add_text_to_user_page(user_id):
    """create new user practice page"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    user = storage.get(User, user_id)

    if not user:
        abort(400, description="invalid user")

    data = request.get_json()
    data['user_id'] = user_id
    
    instance = Page(**data)
    instance.save()
    response = jsonify(instance.to_dict())
    return response, 201
