from django.http import JsonResponse
import json
from rest_framework.views import APIView
from common.utils import create_json_response, loginSerialize
from users.models import User
from datetime import datetime, timedelta
from datetime import datetime
import jwt

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 84600


class Login(APIView):

    def post(self, request):
        print("Test")
        data_unicode = request.body.decode('utf-8')
        data = json.loads(data_unicode)

        email = data['email']
        password = data['password']

        try:
            user = User.objects.get(email=email)

            if user.password != password:
                return create_json_response({"message": "FALSE", "data": "PASSWORD_NOT_FOUND"}, status=200)

            payload = {
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
            }
            jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

            return create_json_response({"message": "SUCCESS", "data": loginSerialize(user, jwt_token)}, status=200)
        except:
            return create_json_response({"message": "FALSE", "data": "EMAIL_NOT_FOUND"}, status=200)
