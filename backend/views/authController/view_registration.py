from django.http import JsonResponse
import json
from rest_framework.views import APIView
from common.utils import create_json_response
from users.models import User


class Registration(APIView):

    def post(self, request):
        data_unicode = request.body.decode('utf-8')
        data = json.loads(data_unicode)

        count = User.objects.filter(email__exact=data['email']).count()

        if count > 0:
            return create_json_response({"message": "FALSE", "data": "NOT_SAVE_MAIL"}, status=200)

        username = data['email'].split('@')
        username = username[0]

        User.objects.create(first_name=data['firstName'], last_name=data['lastName'],
                            email=data['email'], username=username, folder_name=username, password=data['password'])

        return create_json_response({"message": "SUCCESS"}, status=200)
