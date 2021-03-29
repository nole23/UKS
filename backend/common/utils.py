import json
from django.http import HttpResponse
import jwt

from users.models import User

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'

# region respons


def create_json_response(message, status):
    response = HttpResponse(json.dumps(
        message), content_type="application/json", status=status)
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response
# endregion

# region read/write files


def read_file(user, branch, folder, name_file):
    file_data = None
    file_location = 'media/covers/' + user + '/' + branch + '/'

    if folder is not None:
        file_location += folder + '/' + name_file
    else:
        file_location += name_file

    try:
        with open(file_location, 'r') as f:
            file_data = f.read()
    except IOError:
        # handle file not exist case here
        return str('null')
    return file_data
# endregion

# region serialize


def userSerialize(data):
    return {
        'id': str(data.id),
        'firstName': data.first_name,
        'lastName': data.last_name,
        'username': data.username
    }


def serializeFiles(data, node, folder, username):
    dt = []
    for each in data:
        dt.append({
            'id': str(each.id),
            'name': each.name,
            'cover': read_file(username, node, folder, each.name),
            'dateCreate': str(each.dateCreate),
            'user': userSerialize(each.user)
        })
    return dt


def serializeFolders(data, branch, user_create):
    dt = []
    for each in data:
        dt.append({
            'id': str(each.id),
            'nameNode': each.name_node,
            'dateCreate': str(each.date_create),
            'userCreate': userSerialize(each.user_create),
            'files': serializeFiles(each.files.all(), branch, each.name_node, user_create),
            'childrenFolder': serializeFolders(each.children_folder.all(), branch, user_create)
        })
    return dt


def rootTreeSeriallize(data, types=None):
    if types is None:
        rd = []
        for each in data:
            rd.append({
                'id': str(each.id),
                'nameBranch': each.name_branch,
                'dateCreate': str(each.date_create),
                'userCreate': userSerialize(each.user_create),
                'files': serializeFiles(each.files.all(), each.name_branch, None, each.user_create.username),
                'childrenFolder': serializeFolders(each.children_folder.all(), each.name_branch, each.user_create.username)
            })
        return rd
    else:
        return {
            'id': str(data.id),
            'nameBranch': data.name_branch,
            'dateCreate': str(data.date_create),
            'userCreate': userSerialize(data.user_create),
            'files': serializeFiles(data.files.all(), data.name_branch, None, data.user_create.username),
            'childrenFolder': serializeFolders(data.children_folder.all(), data.name_branch, data.user_create.username)
        }


def issuesSerialize(data):
    rd = []
    for each in data:
        rd.append({
            'id': str(each.id),
            'name': each.name,
            'description': each.description,
            'status': each.status,
            'user': userSerialize(each.user)
        })
    return rd


def roleSerialize(data):
    return {
        'roleName': data.role_name
    }


def listUserSerialize(data):
    rd = []
    for each in data:
        rd.append({
            'user': userSerialize(each.user),
            'role': roleSerialize(each.role)
        })
    return rd


def projectSerialize(data, issuesData, listProjectData):
    return {
        'id': str(data.id),
        'name': data.name,
        'description': data.description,
        'dateCreate': str(data.date_create),
        'dateClose': str(data.date_close),
        'typeProject': data.type_project,
        'rootTree': rootTreeSeriallize(data.root_tree.all()),
        'issue': issuesSerialize(issuesData),
        'listUser': listUserSerialize(listProjectData)
    }

# endregion

# region authorization


def token_required(func):
    def inner(request, *args, **kwargs):
        if request.method == 'OPTIONS':
            return func(request, *args, **kwargs)
        auth_header = request.META.get('HTTP_AUTHORIZATION', None)
        if auth_header is not None:
            tokens = auth_header.split(' ')
            decoded = jwt.decode(
                tokens[0], JWT_SECRET, algorithms=JWT_ALGORITHM)

            user = User.objects.get(pk=decoded['user_id'])
            if user is not None:
                request.user = user
                return func(request, *args, **kwargs)
            return create_json_response({'error': 'Invalid_Auth'}, status=401)
        return create_json_response({'error': 'Invalid_Header'}, status=401)
    return inner


def token_required_class(func):
    def inner(request, req, *args, **kwargs):
        auth_header = request.request.META.get('HTTP_AUTHORIZATION', None)
        if auth_header is not None:
            tokens = auth_header.split(' ')
            try:
                decoded = jwt.decode(
                    tokens[0], JWT_SECRET, algorithms=JWT_ALGORITHM)

                user = User.objects.get(pk=decoded['user_id'])
                if user is not None:
                    req.user = user
                    return func(request, req, *args, **kwargs)
                return create_json_response({'error': 'Invalid_Auth'}, status=401)
            except:
                return create_json_response({'error': 'Invalid_JWT'}, status=401)
        return create_json_response({'error': 'Invalid_Header'}, status=401)

    return inner
# endregion
