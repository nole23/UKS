from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from datetime import datetime
from django.core import serializers
import jwt
import json
from users.models import User, Role, List_Project_User, Project, Issue, Issue_Comment

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 3600

def index(request):
    role1 = Role(role_name="O")
    role2 = Role(role_name="C")
    role3 = Role(role_name="V")

    role1.save()
    role2.save()
    role3.save()

    x = '{ "status":"SUCCESS", "message":"Uspjesno pokrenut serve"}'
    y = json.loads(x)
    return JsonResponse(y)

@csrf_exempt
def registration(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        username = body['email'].split('@')
        username = username[0]
        
        p = User(first_name=body['firstName'], last_name=body['lastName'], email=body['email'], username=username, password=body['password'])
        p.save()

        x = '{ "status":"SUCCESS" }'
        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def login(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        email = body['email']
        password = body['password']
        x = ''

        user = User.objects.get(email=email)
        if user.password != password:
            print(2)
            x = '{ "status":false }'
            y = json.loads(x)
            return JsonResponse(y)

        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

        x ='{ "status":true, "user":{"firstName":"' + user.first_name + '", "lastName":"' + user.last_name + '"}, "jwt":"' + jwt_token + '"}'   
        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def repository(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        u = 'nole@gmail.com'
        user = User.objects.get(email=u)

        project = Project(name=body['name'], description=body['description'], date_create=datetime.now(), type_project=body['type_project'])
        project.save()

        role = Role.objects.get(id=1)

        list_project_user = List_Project_User(project=project, user=user, role=role)
        print(list_project_user)
        list_project_user.save()

        x = '{ "status":"SUCCESS", "project": {"id":"' + str(project.id) + '", "name":"' + project.name + '", "description":"' + project.description + '", "type_project":"' + str(project.type_project) + '"} }'
        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def getAllrepository(request):
    if request.method == "GET":
        u = 'nole@gmail.com'
        user = User.objects.get(email=u)

        project = List_Project_User.objects.filter(user=user.id)

        pp = '['
        end = len(project)
        count = 0
        for each in project:
            pp += '{ "id":"' + str(each.project.id) + '", "name":"' + each.project.name + '" }'
            count = count + 1
            if count < end:
                pp += ','
        pp += ']'

        x = '{ "status":"SUCCESS", "data":' + pp + '}'
        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def getRepositoryById(request, id):
    if request.method == "GET":
        list_project = List_Project_User.objects.filter(project_id=id)


        user = list_project[0].user
        project = list_project[0].project
        issues = Issue.objects.filter(project=project.id)
        role = list_project[0].role

        end_issue = len(issues)
        count_issye = 0
        dataIssue = '['
        for each in issues:
            issue_comment = Issue_Comment.objects.filter(issue=each.id)

            end_comment = len(issue_comment)
            count_comment = 0
            dataComment = '['
            for ieach in issue_comment:
                dataComment += '{"id":"' + str(ieach.id) + '", "comment":"' + str(ieach.comment) + '", "user":{"id":"' + str(ieach.user.id) + '", "firstName":"' + ieach.user.first_name + '", "lastName":"' + ieach.user.last_name + '", "username": "' + ieach.user.username + '"}}'
                count_comment = count_comment + 1
                if count_comment < end_comment:
                    dataComment += ','
            dataComment += ']'

            dataIssue += '{"id":"' + str(each.id) + '", "name":"' + each.name + '", "description":"' + each.description + '", "status":"' + str(each.status) + '", "user":{"id":"' + str(each.user.id) + '", "firstName":"' + each.user.first_name + '", "lastName":"' + each.user.last_name + '", "username": "' + each.user.username + '"}, "issue_comment": ' + dataComment + '}'
            count_issye = count_issye + 1
            if count_issye < end_issue:
                dataIssue += ','            
        dataIssue += ']'

        lp = '['
        for each in list_project:
            lp += '{"user": {"id":"' + str(each.user.id) + '", "firstName":"' + str(each.user.first_name) + '", "lastName":"' + str(each.user.last_name) + '", "username":"' + str(each.user.username) + '"},'
            lp += '"role": {"name":"' + str(each.role.role_name) + '"}}'
        lp += ']'

        data = '{ "project": {"id":"' + str(project.id) + '", "name":"' + str(project.name) + '", "description":"' + str(project.description) + '", "date_create":"' + str(project.date_create) + '",'
        data += '"date_close":"' + str(project.date_close) + '", "type_project":"' + str(project.type_project) + '", "issue": ' + dataIssue + ', '
        data += '"user":{"id":"' + str(user.id) + '","first_name":"' + str(user.first_name) + '", "last_name":"' + str(user.last_name) + '", "role":"' + str(role.role_name) + '"}, "list_project_user":' + lp + '' 
        data += '}}'

        x = '{ "status":"SUCCESS", "data":' + data + '}'

        y = json.loads(x)
        return JsonResponse(y)

@csrf_exempt
def addIssue(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        project = Project.objects.get(id=body['id'])
        user = User.objects.get(id=1)

        issue = Issue(name=body['name'], description=body['description'], project=project, user=user)
        issue.save()

        data = '{"id":"' + str(issue.id) + '", "name":"' + issue.name + '", "description":"' + str(issue.description) + '", "user":{"id":"' + str(issue.user.id) + '", "first_name":"' + str(issue.user.first_name) + '", "last_name":"' + str(issue.user.last_name) + '", "username":"' + str(issue.user.username) + '"}}'
        
        x = '{ "status":"SUCCESS", "issue": ' + data + ' }'

        y = json.loads(x)
        return JsonResponse(y)