from users.models import Role
from repository.models import Project, List_Project_User
from users.service import UserService
from common.utils import userSerialize, roleSerialize


class UpdateService():
    userService = UserService()
    role = Role()

    def addUserToProject(self, user, data):
        project = Project.objects.get(id=data['project'])

        listProjectUser = List_Project_User.objects.filter(project=project)

        # Proverimo da li je korisnik već dodat na projekat
        isStatus = True
        for each in listProjectUser:
            if each.user.id == int(data['user']):
                isStatus = False

        if isStatus == True:
            newUser = self.userService.getUserById(data['user'])
            role = self.role.get_by_id(2)

            List_Project_User.objects.create(
                project=project, user=newUser, role=role)

            resData = [{'isSave': 'true'}]
            resData.append(userSerialize(newUser))
            resData.append(roleSerialize(role))
            return {"message": "SUCCESS", "data": resData}
        else:
            resData = [{'isSave': 'false'}]
            return {"message": "SUCCESS", "data": resData}

    def updateInfoProject(self, user, data):
        project = Project.objects.get(id=data['project'])

        project.name = data['name']

        if data['type_project'] == 'false':
            project.type_project = False
        else:
            project.type_project = True

        project.save()

        return {"message": "SUCCESS", "data": None}
