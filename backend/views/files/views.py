from django.http import JsonResponse
import json
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core.files.base import ContentFile
from datetime import datetime, timedelta
from users.models import User, Files, Root_Tree, Project, Children_Tree
from common.utils import token_required_class, create_json_response, rootTreeSeriallize


class File(APIView):

    # DOTO: Dovesti sve fajlove za jedno cvoriste
    def get(self, request):
        pass

    @token_required_class
    def post(self, request):
        user = request.user

        id_project = request.data['parent']
        types = request.data['type']
        folder = request.data['folder']
        branch = request.data['branch']
        tree = request.data['tree'].split(',')

        path = ""
        if tree is not None:
            for each in tree:
                path += each + "/"
        else:
            path = "master/"

        project = Project.objects.get(id=id_project)
        rootTree = project.root_tree.first()

        files = None

        if folder != "":
            path += folder + '/'

        if types == "create":
            title = request.data['title'].split(".")
            text = request.data['text']
            content = ContentFile(text)
            name = None

            if len(title) > 1:
                content.name = path + title[0] + "." + title[1]
                name = title[0] + "." + title[1]
            else:
                content.name = path + title[0] + ".txt"
                name = title[0] + ".txt"

            files = Files.objects.create(
                name=name, cover=content, dateCreate=datetime.now(), user=user)

        if types == "upload":
            cover = request.data['cover']
            name = cover.name.split("_")
            files = Files.objects.create(
                name=name[-1], cover=cover, dateCreate=datetime.now(), user=user)

        if len(tree) > 1:
            help_child = rootTree
            for each in tree:
                if each != 'master':
                    help_child = help_child.children_folder.get(name_node=each)

            if folder != "":
                childrenTree = Children_Tree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=request._user)
                childrenTree.files.add(files)
                help_child.children_folder.add(childrenTree)
            else:
                help_child.files.add(files)
        else:
            if folder != "":
                childrenTree = Children_Tree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=request._user)
                childrenTree.files.add(files)
                rootTree.children_folder.add(childrenTree)
            else:
                rootTree.files.add(files)

        jsonRootTree = rootTreeSeriallize(rootTree, 'none')
        return create_json_response({"message": "SUCCESS", "rootTree": jsonRootTree}, status=200)

    def put(self, request):
        pass

    def delete(self, request):
        pass
