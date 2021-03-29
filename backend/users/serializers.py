from rest_framework import serializers
from .models import List_Project_User, User, Role, Project, Root_Tree, Files, Children_Tree


class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = ('id', 'role_name')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username')

class Children_TreeSerializer(serializers.ModelSerializer):
    def get_relations(self): 
        return models.Children_Tree.objects.get(from_person=self)

    files = serializers.PrimaryKeyRelatedField(queryset=Files.objects.all(), many=True)
    class Meta:
        model = Children_Tree
        fields = ('id', 'name_node', 'date_create', 'user_create', 'files', 'children_folder')

class FilesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Files
        fields = ('id', 'name', 'cover', 'user')

class Root_TreeSerializer(serializers.ModelSerializer):
    user_create = serializers.StringRelatedField(many=False)
    files = serializers.PrimaryKeyRelatedField(queryset=Files.objects.all(), many=True)
    children_folder = serializers.PrimaryKeyRelatedField(queryset=Children_Tree.objects.all(), many=True)
    class Meta:
        model = Root_Tree
        fields = ('id', 'name_branch', 'date_create', 'user_create', 'files', 'children_folder')

class ProjectSerializer(serializers.ModelSerializer):
    root_tree = serializers.PrimaryKeyRelatedField(queryset=Root_Tree.objects.all(), many=True)
    class Meta:
        models = Project
        fields = ('id', 'name', 'description', 'date_create', 'date_close', 'type_project', 'root_tree')

class List_Project_UserSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField(many=False)
    user = serializers.StringRelatedField(many=False)
    role = serializers.StringRelatedField(many=False)
    class Meta:
        model = List_Project_User
        fields = ('id', 'project', 'user', 'role')
