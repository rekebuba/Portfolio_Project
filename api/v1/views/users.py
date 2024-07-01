#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """ Retrieves an user """
    user = storage.get(User, user_id, sub=user_id)
    if not user:
        abort(404)
    user = user.to_dict()
    user['authenticated'] = True
    user = jsonify(user)
    return user, 200


@app_views.route('/user/logout/<user_id>', methods=['POST'], strict_slashes=False)
def logout(user_id):
    user = storage.get(User, user_id)
    if not user:
        return jsonify({'authenticated': False}), 401
    else:
        response = jsonify({'message': 'Logged out successfully'})
    return response, 200


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/user/signup', methods=['POST'], strict_slashes=False)
def signup():
    """create new user"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()

    if not data.get('email'):
        data['email'] = None
        
    print(data)

    """check if a user exists and tried to singUp through google"""
    if data.get('sub'):
        user = storage.get(User, "", sub=data['sub'])
        if user:
            response = jsonify(user.to_dict())
            return response, 200

    instance = User(**data)
    instance.save()
    response = jsonify(instance.to_dict())
    return response, 201

@app_views.route('/user/login', methods=['POST'], strict_slashes=False)
def login():
    """
    check if a user exists
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()

    try:
        if data.get('sub'):
            user = storage.get(User, "", sub=data['sub'])
            if user:
                response = jsonify(user.to_dict())
                return response, 200
        if data.get('username') and data.get('password'):
            user = storage.get(
                User, "", user=data['username'], pas=data['password'])
            if user:
                response = jsonify(user.to_dict())
                return response, 200
    except Exception as e:
        abort(500, description="exception ocured")


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)
