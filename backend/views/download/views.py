from django.http import JsonResponse
from rest_framework.views import APIView
from users.models import Files, Project
from common.utils import token_required_class, projectSerialize, create_json_response
import os
import shutil
from django.http import HttpResponse


# Create your views here.


class Download(APIView):

    @token_required_class
    def get(self, request, id):
        user = request.user
        project = Project.objects.get(id=id)

        if project is None:
            return create_json_response({"status": "FALSE"}, status=200)

        link = 'download/' + project.name
        projectLink = 'media/covers/' + user.folder_name + '/' + project.name
        shutil.make_archive(link, 'zip', projectLink)

        servableZip = open(link + '.zip', 'rb')
        response = HttpResponse(servableZip, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename="myZip.zip"'
        return response
