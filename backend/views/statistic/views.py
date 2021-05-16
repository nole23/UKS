from rest_framework.views import APIView
from users.models import Project, Issue, Statistic as static
from common.utils import create_json_response


class Statistic(APIView):
    def get(self, request, id):
        project = Project.objects.get(id=id)

        statistic = static.objects.filter(project=project)

        issues = Issue.objects.filter(project=project)

        count_of_ammount = []
        number_of_months = 12
        for i in range(number_of_months):
            count = statistic.filter(date_create__month=str(i+1))
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
