import jwt
from datetime import datetime, timedelta

from common.utils import loginSerialize, userSerialize
from users.models import User

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 84600

class UserService():
    userModel = User()
    def login(self, data):
        user = self.userModel.get_by_email(data['email'])

        if user is None:
            return {"message": "FALSE", "data": "EMAIL_NOT_FOUND"}

        if user.password != data['password']:
            return {"message": "FALSE", "data": "PASSWORD_NOT_FOUND"}

        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

        return {"message": "SUCCESS", "data": loginSerialize(user, jwt_token)}

    def create(self, data):
        user = self.userModel.get_all_by_email(data['email'])

        if user.count() > 0:
            return {"message": "FALSE", "data": "NOT_SAVE_MAIL"}

        self.userModel.create_new_user(data)
        return {"message": "SUCCESS", "data": None}

    def getUserById(self, id):
        return self.userModel.get_by_id(id)

    def update(self, data):
        user = self.userModel.get_by_id(data['id'])

        if user is None:
            return {"message": "FALSE", "data": "USER_NOT_FOUNDE"}
        
        user.first_name = data['firstName']
        user.last_name = data['lastName']
        user.username = data['username']

        user.save()

        return {"message": "SUCCESS", "data": None}

    def filter(self, user, text):
        #queryset = self.userModel.filter(text)
        queryset = User.objects.filter(first_name__startswith=text) | User.objects.filter(last_name__startswith=text) | User.objects.filter(email__startswith=text)

        lists = []
        for each in queryset:
            lists.append(userSerialize(each))

        return {"message": "SUCCESS", "data": lists}
