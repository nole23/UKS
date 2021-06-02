from rest_framework.views import APIView
from common.utils import token_required_class, create_json_response, read_file, issuesSerialize, issueSerialize, issueCommentSerialize, issuesCommentSerialize
from users.models import User, Role, Issue, Files, Root_Tree, Project, List_Project_User, Issue_Comment
from datetime import datetime, timedelta
from django.core.files.base import ContentFile
import json
from django.core import serializers

# Create your views here.


class Issues(APIView):

    @token_required_class
    def get(self, request, status, params, nameUser, id):
        trueOrFalse = eval(params)

        issues = None
        if nameUser != 'author':
            user = User.objects.get(id=nameUser)

            if params != 'status':
                issues = Issue.objects.filter(
                    project=id, status=trueOrFalse, user=user)
            else:
                issues = Issue.objects.filter(project=id, user=user)
        else:
            if params != 'status':
                issues = Issue.objects.filter(
                    project=id, status=trueOrFalse)
            else:
                issues = Issue.objects.filter(project=id)

        data = issuesSerialize(issues)
        return create_json_response({"message": "SUCCESS", "data": data}, status=200)

    @token_required_class
    def post(self, request):
        name = request.data['name']
        description = request.data['description']
        idProject = request.data['id']
        user = request.user

        labels = request.data['labels']

        project = Project.objects.get(id=idProject)

        issue = Issue.objects.create(
            name=name, description=description, project=project, user=user, date_create=datetime.now(), labels=labels)

        return create_json_response({"message": "SUCCESS", "data": issueSerialize(issue)}, status=200)

    @token_required_class
    def put(self, request):
        idIssue = request.data['id']
        user = request.user

        issue = Issue.objects.get(id=idIssue)

        if issue.status == False:
            return create_json_response({"message": "FALSE", "data": "ISSUE_IS_CLOSSE"}, status=200)

        issue.status = False
        issue.save()

        comment = user.first_name + ' ' + user.last_name + \
            ' has closed issue #' + str(idIssue) + '.'

        issue = Issue.objects.get(id=idIssue)

        issueComment = Issue_Comment.objects.create(
            comment=comment, issue=issue, user=user, date_create=datetime.now(), type_comment="AUTOGENERATE")

        return create_json_response({"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}, status=200)

    @token_required_class
    def delete(self, request, id):
        issue = Issue.objects.get(id=id)
        if issue == None:
            return create_json_response({"message": "FALSE"}, status=200)

        issue.delete()

        return create_json_response({"message": "SUCCESS"}, status=200)


class IssuesGet(APIView):

    @token_required_class
    def get(self, request, id):
        issue = Issue.objects.get(id=id)
        issue_comment = Issue_Comment.objects.filter(issue=issue)

        return create_json_response({"message": "SUCCESS", "data": issueSerialize(issue), "comments": issuesCommentSerialize(issue_comment)}, status=200)

    @token_required_class
    def put(self, request):
        idIssue = request.data['id']
        user = request.user

        issue = Issue.objects.get(id=idIssue)
        issue.assigned.add(user)
        issue.save()

        comment = user.first_name + ' ' + user.last_name + \
            ' assigned to issue #' + str(issue.id) + '.'

        issueComment = Issue_Comment.objects.create(
            comment=comment, issue=issue, user=user, date_create=datetime.now(), type_comment="AUTOGENERATE")

        return create_json_response({"message": "SUCCESS", "data": issueCommentSerialize(issueComment), "issue": issueSerialize(issue)}, status=200)


class IssueUpdateLabel(APIView):

    @token_required_class
    def put(self, request):
        idIssue = request.data['issueId']
        idlabel = request.data['labelId']

        issue = Issue.objects.get(id=idIssue)
        issue.labels = idlabel
        issue.save()

        file = open("config/labels.json", "r")
        data = file.read()
        file.close()

        findLabel = None
        for e in json.loads(data):
            if (str(e['id']) == str(idlabel)):
                findLabel = e
                break

        user = request.user
        comment = user.first_name + ' ' + user.last_name + \
            ' added the <span class="bug-tags ' + str(findLabel['color']) + \
            '-b color-background-white">' + \
            str(findLabel['name']) + '</span> label.'

        issueComment = Issue_Comment.objects.create(
            comment=comment, issue=issue, user=user, date_create=datetime.now(), type_comment="AUTOGENERATE")

        return create_json_response({"message": "SUCCESS", "data": issueCommentSerialize(issueComment), "issue": issueSerialize(issue)}, status=200)
