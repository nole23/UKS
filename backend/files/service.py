from django.core.files.base import ContentFile
from datetime import datetime
import os

from common.utils import rootTreeSeriallize
from repository.models import Project, Children_Tree
from files.models import Files
from statistic.models import Statistic


class FileService():
    project = Project()
    files = Files()
    childrenTree = Children_Tree()

    def addNewFile(self, user, data):
        tree = data['tree'].split(',')
        folder = data['folder']
        types = data['type']

        project = Project.objects.get(id=data['parent'])
        rootTree = project.root_tree.first()

        path = rootTree.user_create.username + "_" + project.name + "_"
        if tree is not None:
            for each in tree:
                path += each + "_"

        files = None
        if folder != "":
            path += folder + '_'

        if types == "create":
            title = data['title'].split(".")
            text = data['text']
            content = ContentFile(text)
            name = None

            if len(title) > 1:
                content.name = path + title[0] + "." + title[1]
                name = title[0] + "." + title[1]
            else:
                content.name = path + title[0] + ".txt"
                name = title[0] + ".txt"

            files = self.files.create(name, content, user)

        if types == "upload":
            cover = data['cover']
            name = cover.name.split("_")
            files = self.files.create(name[-1], cover, user)

        if len(tree) > 1:
            help_child = rootTree
            for each in tree:
                if each != 'master':
                    help_child = help_child.children_folder.get(name_node=each)

            if folder != "":
                childrenTree = Children_Tree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=user)
                childrenTree.files.add(files)
                help_child.children_folder.add(childrenTree)
            else:
                help_child.files.add(files)
        else:
            if folder != "":
                childrenTree = Children_Tree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=user)
                childrenTree.files.add(files)
                rootTree.children_folder.add(childrenTree)
            else:
                rootTree.files.add(files)

        Statistic.objects.create(
            project=project, files=files, date_create=datetime.now())

        jsonRootTree = rootTreeSeriallize(rootTree, 'none')
        return {"message": "SUCCESS", "rootTree": jsonRootTree}

    def editFile(self, data):
        file = self.files.find_by_id(data['id'])

        file1 = open('media/' + file.cover.name, "w")

        file1.write(data['cover'])
        file1.close()
        return {"message": "SUCCESS", "data": None}

    def delete(self, id):
        file = self.files.find_by_id(id)
        path = file.cover.path
        print(path)
        file.delete()

        if os.path.isfile(path):
            os.remove(path)

        return {"message": "SUCCESS", "data": None}
