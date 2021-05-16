from django.http import JsonResponse
from rest_framework.views import APIView
from users.models import Files, Project
from common.utils import token_required_class, projectSerialize, create_json_response
import os
import shutil
from django.http import HttpResponse


# Create your views here.


class Download(APIView):

    def get(self, request, id):

        project = Project.objects.get(id=id)
        if project is None:
            return create_json_response({"status": "FALSE"}, status=200)

        link = 'download/' + project.name
        shutil.make_archive(link, 'zip',
                            'media/covers/nole0223/testiramo')

        servableZip = open(link + '.zip', 'rb')
        response = HttpResponse(servableZip, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename="myZip.zip"'
        return response
