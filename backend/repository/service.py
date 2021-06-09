import json
from datetime import datetime
from django.core.files.base import ContentFile

from users.models import Role, User
from files.models import Files
from statistic.models import Statistic
from repository.models import List_Project_User, Root_Tree, Project
from issues.models import Issue
from common.utils import projectSerialize, listProjectUserSerialize


class RepositoryService():
    listProjectUser = List_Project_User()
    issue = Issue()
    rootTree = Root_Tree()
    project = Project()
    user = User()

    def getProjectById(self, id):
        listProject = self.listProjectUser.filter_by_id(id)
        project = listProject[0].project

        issues = self.issue.filter_issue(project)
        projectRest = projectSerialize(project, issues, listProject)

        file = open("config/labels.json", "r")
        data = file.read()
        file.close()

        parserLabels = json.loads(data)
        return {"message": "SUCCESS", "project": projectRest, "labels": parserLabels}

    def createRepositry(self, data, user):

        title = 'README.md'
        text = 'Generated by GitUKS v1.0.0 on ' + str(datetime.now())
        content = ContentFile(text)
        content.name = user.username + '_' + data['name'] + '_master_' + title

        files = Files.objects.create(
            name=title, cover=content, dateCreate=datetime.now(), user=user)

        rootTree = self.rootTree.createRoot('master', user, files)
        project = self.project.create(
            data['name'], data['description'], data['type_project'], rootTree)

        role = Role.objects.get(id=1)

        self.listProjectUser.create(project, user, role)

        # For statistic
        Statistic.objects.create(
            project=project, files=files, date_create=datetime.now())

        return {"message": "SUCCESS", "project": str(project.id)}

    def deleteProject(self, id):
        project = self.project.get_by_id(id)
        project.delete()
        return project

    def getProjectByUser(self, idUser, me):
        user = self.user.get_by_id(idUser)
        if user is None:
            return {"status": "FALSE"}

        projects = None
        if str(user.id) == str(me.id):
            projects = self.listProjectUser.filter_by_user(user)
        else:
            projects = self.listProjectUser.filter_by_user_type(user, False)

        data = listProjectUserSerialize(projects)
        return {"status": "SUCCESS", "data": data}

    def filterProject(self, user, text):
        projects = self.listProjectUser.filter_by_name_project(user, text)
        data = listProjectUserSerialize(projects)

        return {"status": "SUCCESS", "data": data}
