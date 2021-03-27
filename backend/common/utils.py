import json
from django.http import HttpResponse


def upload_path(instance, filname):
    return "/".join(["covers", str(instance.user.username), filname])


def create_json_response(message, status):
    response = HttpResponse(json.dumps(
        message), content_type="application/json", status=status)
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response
