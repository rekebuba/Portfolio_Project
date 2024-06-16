#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/all_users.yml')
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
@swag_from('documentation/user/get_user.yml', methods=['GET'])
def get_user(user_id):
    """ Retrieves an user """
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    return jsonify(user.to_dict())


@app_views.route('/users/auth', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/check_auth.yml', methods=['GET'])
def check_auth():
    """ Retrieves an user """
    user_cookie = request.cookies.get('user_id')
    print(user_cookie)
    user = storage.get(User, user_cookie)
    if not user:
        return jsonify({'authenticated': False}), 401
    else:
        user = jsonify(user.to_dict())
        user['authenticated'] = True
        return user, 200

@app_views.route('/logout', methods=['POST'], strict_slashes=False)
def logout():

    user_cookie = request.cookies.get('user_id')
    user = storage.get(User, user_cookie)
    if not user:
        return jsonify({'authenticated': False}), 401
    else:
        response = jsonify({'message': 'Logged out successfully'})
        response.delete_cookie('user_id')
    return response, 201


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/user/delete_user.yml', methods=['DELETE'])
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


@app_views.route('/users', methods=['POST'], strict_slashes=False)
@swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()

    if not data['email']:
        data['email'] = None

    instance = User(**data)
    instance.save()
    response = jsonify(instance.to_dict())
    response.set_cookie('user_id', instance.to_dict()['id'], path='/', samesite='Lax')
    return response, 201

@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/user/put_user.yml', methods=['PUT'])
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
