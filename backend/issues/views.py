from rest_framework.views import APIView
from common.utils import token_required_class, create_json_response
import json

from issues.service import IssueService

# Create your views here.


class Issues(APIView):
    issueService = IssueService()

    @token_required_class
    def get(self, request, status, params, nameUser, id):
        res = self.issueService.findIssue(eval(params), nameUser, params, id)
        return create_json_response(res, status=200)

    @token_required_class
    def post(self, request):
        res = self.issueService.createNewIssue(request.user, request.data)
        return create_json_response(res, status=200)

    @token_required_class
    def put(self, request):
        res = self.issueService.closeIssue(request.data['id'], request.user)
        return create_json_response(res, status=200)

    @token_required_class
    def delete(self, request, id):
        res = self.issueService.removeIssue(id)
        return create_json_response(res, status=200)


class IssuesGet(APIView):
    issueService = IssueService()

    @token_required_class
    def get(self, request, id):
        res = self.issueService.getCommentByIssue(id)
        return create_json_response(res, status=200)

    @token_required_class
    def put(self, request):
        res = self.issueService.assignedToIssue(request.user, request.data)
        return create_json_response(res, status=200)


class IssueUpdateLabel(APIView):
    issueService = IssueService()

    @token_required_class
    def put(self, request):
        file = open("config/labels.json", "r")
        data = file.read()
        file.close()

        res = self.issueService.addLabels(
            request.user, request.data, json.loads(data))
        return create_json_response(res, status=200)


class IssuesComment(APIView):
    issueService = IssueService()

    @token_required_class
    def post(self, request):
        res = self.issueService.createNewComment(request.user, request.data)
        return create_json_response(res, status=200)

    @token_required_class
    def put(self, request):
        res = self.issueService.editIssue(request.user, request.data)
        return create_json_response(res, status=200)

    @token_required_class
    def delete(self, request):
        return create_json_response({"message": "FALSE"}, status=200)
