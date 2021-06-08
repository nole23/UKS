from rest_framework.views import APIView
from django.http import HttpResponse

from common.utils import token_required_class, create_json_response
from download.service import DownloadService
# Create your views here.


class Download(APIView):
    downloadService = DownloadService()

    @token_required_class
    def get(self, request, id):
        res = self.downloadService.download(request.user, id)

        if res['message'] == "FALSE":
            return create_json_response(res, status=200)

        servableZip = open(res['link'] + '.zip', 'rb')
        response = HttpResponse(servableZip, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename="myZip.zip"'
        return response
