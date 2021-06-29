from rest_framework.views import APIView
import json

from common.utils import token_required_class, create_json_response
from files.service import FileService


class File(APIView):
    fileService = FileService()

    @token_required_class
    def post(self, request):
        res = self.fileService.addNewFile(request.user, request.data)
        return create_json_response(res, status=200)

    def put(self, request):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        res = self.fileService.editFile(body)
        return create_json_response(res, status=200)

    def delete(self, request, id):
        res = self.fileService.delete(id)
        return create_json_response(res, status=200)
