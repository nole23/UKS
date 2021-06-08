from rest_framework.views import APIView
import json
from common.utils import token_required_class, create_json_response, read_file, userSerialize, roleSerialize, listUserSerialize
from users.models import User, Role, Files, Root_Tree, Project, List_Project_User
# Create your views here.


class Update(APIView):

    @token_required_class
    def get(self, request, text):
        user = request.user

        queryset = User.objects.filter(first_name__startswith=text) | User.objects.filter(
            last_name__startswith=text) | User.objects.filter(email__startswith=text)

        lists = []
        for each in queryset:
            lists.append(userSerialize(each))

        return create_json_response({"message": "SUCCESS", "users": lists}, status=200)

    @token_required_class
    def post(self, request):
        idNewUser = request.data['user']
        idProject = request.data['project']
        user = request.user
        project = Project.objects.get(id=idProject)

        listProjectUser = List_Project_User.objects.filter(project=project)

        isStatus = True
        for each in listProjectUser:
            if each.user.id == int(idNewUser):
                isStatus = False

        if isStatus == True:
            newUser = User.objects.get(id=idNewUser)
            role = Role.objects.get(id=2)

            List_Project_User.objects.create(
                project=project, user=newUser, role=role)

            resData = [{'isSave': 'true'}]
            resData.append(userSerialize(newUser))
            resData.append(roleSerialize(role))
            return create_json_response({"message": "SUCCESS", "data": resData}, status=200)
        else:
            resData = [{'isSave': 'false'}]
            return create_json_response({"message": "SUCCESS", "data": resData}, status=200)

    @token_required_class
    def put(self, request):

        types = request.data['type']
        idProject = request.data['project']
        name = request.data['name']
        type_project = request.data['type_project']

        user = request.user

        project = Project.objects.get(id=idProject)
        project.name = name

        if type_project == 'false':
            project.type_project = False
        else:
            project.type_project = True

        project.save()

        return create_json_response({"message": "SUCCESS"}, status=200)
