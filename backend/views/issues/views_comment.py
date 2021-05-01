from rest_framework.views import APIView
from common.utils import token_required_class, create_json_response, read_file, issuesSerialize, issueSerialize, issueCommentSerialize, issuesCommentSerialize
from users.models import User, Role, Issue, Files, Root_Tree, Project, List_Project_User, Issue_Comment
from datetime import datetime, timedelta
from django.core.files.base import ContentFile
import json
from django.core import serializers

# Create your views here.


class IssuesComment(APIView):

    @token_required_class
    def post(self, request):
        idIssue = request.data['id']
        comment = request.data['comment']
        user = request.user

        issue = Issue.objects.get(id=idIssue)

        issueComment = Issue_Comment.objects.create(
            comment=comment, issue=issue, user=user, date_create=datetime.now())

        return create_json_response({"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}, status=200)

    @token_required_class
    def put(self, request):
        idIssue = request.data['id']
        name = request.data['name']
        description = request.data['description']
        user = request.user

        issue = Issue.objects.get(id=idIssue)
        issue.name = name
        issue.description = description
        issue.save()

        comment = user.first_name + ' ' + user.last_name + ' has edited this issue.'

        issueComment = Issue_Comment.objects.create(
            comment=comment, issue=issue, user=user, date_create=datetime.now(), type_comment="AUTOGENERATE")

        return create_json_response({"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}, status=200)

    @token_required_class
    def delete(self, request):
        return create_json_response({"message": "FALSE"}, status=200)
