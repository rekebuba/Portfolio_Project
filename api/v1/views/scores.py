#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users practice text(page) """
from models.user import User
from models.score import Score
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
import models


@app_views.route('user/score/<user_id>', methods=['GET'], strict_slashes=False)
def get_scores(user_id):
    """
    Retrieves the list of all user score
    """
    user = storage.get(User, user_id)
    if not user:
        abort(400, description="invalid user")

    all_scores = storage.all(Score).values()
    list_scores = []
    for score in all_scores:
        if score.user_id == user_id:
            list_scores.append(score.to_dict())

    sorted_data = sorted(list_scores, key=lambda x: x["created_at"])
    return jsonify(sorted_data)

# @app_views.route('/score/<score_id>', methods=['GET'], strict_slashes=False)
# def get_user_score(score_id):
#     """ Retrieves a score """
#     score = storage.get(Score, score_id)
#     if not score:
#         abort(404)
#     score = score.to_dict()
#     score = jsonify(score)
#     return score, 200


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

    all_scores = storage.all(Score).values()
    list_scores = []
    for score in all_scores:
        if score.user_id == user_id:
            list_scores.append(score.to_dict())

    total_wpm = total_accuracy = 0
    for score in list_scores:
        total_wpm += score.get('wpm')
        total_accuracy = score.get('accuracy')

    wpm = total_wpm / len(list_scores)
    accuracy = total_accuracy / len(list_scores)

    # Format to two decimal places as a string
    formatted_wpm = float(f"{wpm:.2f}")
    formatted_accuracy = float(f"{accuracy:.2f}")

    if models.storage_t == 'db':
        storage._DBStorage__session.query(User).filter(
            User.id == user_id).update({'average_wpm': formatted_wpm, 'average_accuracy': formatted_accuracy})

    storage.save()

    response = jsonify(instance.to_dict())
    return response, 201
