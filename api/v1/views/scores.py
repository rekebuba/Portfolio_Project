#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users practice text(page) """
from models.page import Page
from models.user import User
from models.score import Score
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from

@app_views.route('/scores', methods=['GET'], strict_slashes=False)
def get_scores():
    """
    Retrieves the list of all user scores
    or a specific score
    """
    all_scores = storage.all(Score).values()
    list_scores = []
    for score in all_scores:
        list_scores.append(score.to_dict())
    return jsonify(list_scores)

@app_views.route('/score/<score_id>', methods=['GET'], strict_slashes=False)
def get_user_score(score_id):
    """ Retrieves a score """
    score = storage.get(Score, score_id)
    if not score:
        abort(404)
    score = score.to_dict()
    score = jsonify(score)
    return score, 200

@app_views.route('/user/score/<user_id>', methods=['POST'], strict_slashes=False)
def add_score(user_id):
    """create new user score """

    if not request.get_json():
        abort(400, description="Not a JSON")

    user = storage.get(User, user_id)
    if not user:
        abort(400, description="invalid user")

    data = request.get_json()
    data['user_id'] = user_id
    
    instance = Score(**data)
    instance.save()
    response = jsonify(instance.to_dict())
    return response, 201
