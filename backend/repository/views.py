from rest_framework.views import APIView
import json

from common.utils import token_required_class, create_json_response
from repository.service import RepositoryService

# Create your views here.


class Repository(APIView):
    repositoryService = RepositoryService()

    @token_required_class
    def get(self, request, id):
        res = self.repositoryService.getProjectById(id)
        return create_json_response(res, status=200)

    @token_required_class
    def post(self, request):
        data_unicode = request.body.decode('utf-8')
        data_json = json.loads(data_unicode)

        res = self.repositoryService.createRepositry(data_json, request._user)

        return create_json_response(res, status=200)

    @token_required_class
    def delete(self, request, id):
        res = self.repositoryService.deleteProject(id)
        return create_json_response({"status": "SUCCESS"}, status=200)


class RepositoryGet(APIView):
    repositoryService = RepositoryService()

    @token_required_class
    def get(self, request, id):
        res = self.repositoryService.getProjectByUser(id, request.user)
        return create_json_response(res, status=200)


class RepositoryFind(APIView):
    repositoryService = RepositoryService()

    @token_required_class
    def get(self, request, text):
        res = self.repositoryService.filterProject(request.user, text)
        return create_json_response(res, status=200)
