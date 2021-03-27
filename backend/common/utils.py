import json
from django.http import HttpResponse
import jwt

from users.models import User

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'


def create_json_response(message, status):
    response = HttpResponse(json.dumps(
        message), content_type="application/json", status=status)
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# region authorization
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
            return create_json_response({'error': 'Invalid_Auth'}, status=401)
        return create_json_response({'error': 'Invalid_Header'}, status=401)
    return inner

def token_required_class(func):
    def inner(request, req, *args, **kwargs):
        auth_header = request.request.META.get('HTTP_AUTHORIZATION', None)
        if auth_header is not None:
            tokens = auth_header.split(' ')
            try:
                decoded = jwt.decode(tokens[0], JWT_SECRET, algorithms=JWT_ALGORITHM)

                user = User.objects.get(pk=decoded['user_id'])
                if user is not None:
                    req.user = user
                    return func(request, req, *args, **kwargs)
                return create_json_response({'error': 'Invalid_Auth'}, status=401)
            except:
                return create_json_response({'error': 'Invalid_JWT'}, status=401)
        return create_json_response({'error': 'Invalid_Header'}, status=401)
        
    return inner
# endregion