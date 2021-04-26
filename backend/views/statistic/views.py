from django.http import JsonResponse
import json
from rest_framework.views import APIView
from django.http import HttpResponse
from django.core.files.base import ContentFile
from datetime import datetime, timedelta
from users.models import User, Files, Root_Tree, Project, Children_Tree, Issue
from common.utils import token_required_class, create_json_response, rootTreeSeriallize


class Statistic(APIView):

    def get(self, request, id):
        project = Project.objects.get(id=id)

        root_tree = project.root_tree.first()
        children_folder = root_tree.children_folder.all()

        files = root_tree.files.all()
        issues = Issue.objects.filter(project=project)

        for each in children_folder:
            data = each.files.all()
            files.append(data)

        count_of_ammount = []
        for i in range(12):
            count = files.filter(dateCreate__month=str(i+1))
            count_of_ammount.append(len(count))

        count_of_issues = []
        count_true = 0
        count_false = 0
        for i in issues:
            if i.status == True:
                count_false += 1
            if i.status == False:
                count_true += 1
        count_of_issues.append(count_false)
        count_of_issues.append(count_true)

        dataRes = '{"count_of_ammount": ' + str(count_of_ammount) + \
            ', "count_of_issues": ' + str(count_of_issues) + '}'

        return create_json_response({"message": "SUCCESS", "data": dataRes}, status=200)
