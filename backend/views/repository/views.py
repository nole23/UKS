from rest_framework.views import APIView
from common.utils import token_required_class, create_json_response, projectSerialize, listProjectUserSerialize
from users.models import Role, Files, Root_Tree, Project, List_Project_User, User, Statistic
from issues.models import Issue
from datetime import datetime
from django.core.files.base import ContentFile
import json

# Create your views here.


class Repository(APIView):

    @token_required_class
    def get(self, request, id):
        listProject = List_Project_User.objects.filter(project_id=id)
        project = listProject[0].project

        issues = Issue.objects.filter(project=project)
        projectRest = projectSerialize(project, issues, listProject)

        file = open("config/labels.json", "r")
        data = file.read()
        file.close()

        parserLabels = json.loads(data)
        return create_json_response({"message": "SUCCESS", "project": projectRest, "labels": parserLabels}, status=200)

    @token_required_class
    def post(self, request):
        data_unicode = request.body.decode('utf-8')
        data_json = json.loads(data_unicode)

        title = 'README.md'
        text = 'Generated by GitUKS v1.0.0 on ' + str(datetime.now())
        content = ContentFile(text)
        content.name = request._user.username + '_' + \
            data_json['name'] + '_master_' + title

        files = Files.objects.create(
            name=title, cover=content, dateCreate=datetime.now(), user=request._user)

        rootTree = Root_Tree.objects.create(
            name_branch='master', date_create=datetime.now(), user_create=request._user)
        rootTree.files.add(files)

        project = Project.objects.create(name=data_json['name'], description=data_json['description'], date_create=datetime.now(
        ), type_project=data_json['type_project'])
        project.root_tree.add(rootTree)

        role = Role.objects.get(id=1)

        List_Project_User.objects.create(
            project=project, user=request._user, role=role)

        # For statistic
        Statistic.objects.create(
            project=project, files=files, date_create=datetime.now())

        return create_json_response({"message": "SUCCESS", "project": str(project.id)}, status=200)

    @token_required_class
    def delete(self, request, id):
        repo = Project.objects.get(id=id).delete()

        return create_json_response({"status": "SUCCESS"}, status=200)


class RepositoryGet(APIView):

    @token_required_class
    def get(self, request, id):
        me = request.user
        user = User.objects.get(id=id)

        if user is None:
            return create_json_response({"status": "FALSE"}, status=200)

        projects = None
        if str(user.id) == str(me.id):
            projects = List_Project_User.objects.filter(user=user)
        else:
            projects = List_Project_User.objects.filter(
                user=user, project__type_project=False)

        data = listProjectUserSerialize(projects)

        return create_json_response({"status": "SUCCESS", "data": data}, status=200)


class RepositoryFind(APIView):

    @token_required_class
    def get(self, request, text):
        me = request.user

        projects = List_Project_User.objects.filter(
            user=me, project__name__contains=text)

        data = listProjectUserSerialize(projects)
        return create_json_response({"status": "SUCCESS", "data": data}, status=200)
