import json
from django.http import HttpResponse
from users.models import User
import jwt
from datetime import datetime, timedelta

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'

def json_response(response_dict, status=200):
    response = HttpResponse(json.dumps(response_dict), content_type="application/json", status=status)
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response


def token_required(func):
    def inner(request, *args, **kwargs):
        if request.method == 'OPTIONS':
            return func(request, *args, **kwargs)
        auth_header = request.META.get('HTTP_AUTHORIZATION', None)
        if auth_header is not None:
            tokens = auth_header.split(' ')
            decoded = jwt.decode(tokens[0], JWT_SECRET, algorithms=JWT_ALGORITHM)

            user = User.objects.get(pk=decoded['user_id'])
            if user is not None:
                request.user = user
                return func(request, *args, **kwargs)
            return json_response({
                'error': 'Invalid Header'
            }, status=401)
        return json_response({
            'error': 'Invalid Header'
        }, status=401)


    return inner