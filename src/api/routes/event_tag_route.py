# rutas/event_tag_routes.py

from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.event_tag_service import EventTagService

event_tag_blueprint = Blueprint('event_tag', __name__)
CORS(event_tag_blueprint)

event_tag_service = EventTagService()

# Create
@event_tag_blueprint.route('/event_tag', methods=['POST'])
def create_event_tag():
    data = request.get_json()
    event_tag = event_tag_service.create_event_tag(data)
    return jsonify(event_tag), 201

# Read
@event_tag_blueprint.route('/event_tag/<int:id>', methods=['GET'])
def get_event_tag(id):
    event_tag = event_tag_service.get_event_tag(id)
    return jsonify(event_tag)

# Update
@event_tag_blueprint.route('/event_tag/<int:id>', methods=['PUT'])
def update_event_tag(id):
    data = request.get_json()
    event_tag = event_tag_service.update_event_tag(id, data)
    return jsonify(event_tag)

# Delete
@event_tag_blueprint.route('/event_tag/<int:id>', methods=['DELETE'])
def delete_event_tag(id):
    event_tag_service.delete_event_tag(id)
    return '', 204