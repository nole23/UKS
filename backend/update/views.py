from rest_framework.views import APIView
from common.utils import token_required_class, create_json_response
from update.service import UpdateService
from users.service import UserService
# Create your views here.


class Update(APIView):
    updateService = UpdateService()
    userService = UserService()

    @token_required_class
    def get(self, request, text):
        res = self.userService.filter(request.user, text)
        return create_json_response(res, status=200)

    @token_required_class
    def put(self, request):
        res = self.updateService.addUserToProject(request.user, request.data)
        return create_json_response(res, status=200)


class UpdateInfo(APIView):
    updateService = UpdateService()

    @token_required_class
    def put(self, request):
        res = self.updateService.updateInfoProject(request.user, request.data)
        return create_json_response(res, status=200)
