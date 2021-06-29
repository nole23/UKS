from users.service import UserService
from issues.models import Issue, Issue_Comment
from repository.models import Project

from common.utils import issuesSerialize, issueSerialize, issueCommentSerialize, issuesCommentSerialize


class IssueService():
    userService = UserService()
    issue = Issue()
    issueComment = Issue_Comment()

    def findIssue(self, trueOrFalse, user, params, id):
        issues = None
        if user != 'author':
            user = self.userService.getUserById(user)

            if params != 'status':
                issues = self.issue.filter_issue_by_user_status(
                    id, trueOrFalse, user)
            else:
                issues = self.issue.filter_issue_by_user(id, user)
        else:
            if params != 'status':
                issues = self.issue.filter_issue_by_status(id, trueOrFalse)
            else:
                issues = self.issue.filter_issue(id)

        return {"message": "SUCCESS", "data": issuesSerialize(issues)}

    def createNewIssue(self, user, data):
        project = Project.objects.get(id=data['id'])
        issue = self.issue.create(data, project, user)

        return {"message": "SUCCESS", "data": issueSerialize(issue)}

    def closeIssue(self, idIssue, user):
        issue = self.issue.get_by_id(idIssue)

        if issue.status == False:
            return {"message": "FALSE", "data": "ISSUE_IS_CLOSSE"}

        issue.status = False
        issue.save()

        comment = user.first_name + ' ' + user.last_name + \
            ' has closed issue #' + str(idIssue) + '.'

        issueComment = self.issueComment.create(
            comment, issue, user, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}

    def removeIssue(self, id):
        issue = self.issue.get_by_id(id)
        if issue == None:
            return {"message": "FALSE", "data": None}

        issue.delete()

        return {"message": "SUCCESS", "data": None}

    def getCommentByIssue(self, id):
        issue = self.issue.get_by_id(id)
        issue_comment = self.issueComment.filterByIssue(issue)

        return {"message": "SUCCESS", "data": issueSerialize(issue), "comments": issuesCommentSerialize(issue_comment)}

    def assignedToIssue(self, user, data):
        issue = self.issue.get_by_id(data['id'])
        issue.assigned.add(user)
        issue.save()

        comment = user.first_name + ' ' + user.last_name + \
            ' assigned to issue #' + str(issue.id) + '.'

        issueComment = self.issueComment.create(
            comment, issue, user, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": issueCommentSerialize(issueComment), "issue": issueSerialize(issue)}

    def addLabels(self, user, data, jsonData):
        issue = self.issue.get_by_id(data['issueId'])
        issue.labels = data['labelId']
        issue.save()

        findLabel = None
        for e in jsonData:
            if (str(e['id']) == str(data['labelId'])):
                findLabel = e
                break

        comment = user.first_name + ' ' + user.last_name + \
            ' added the <span class="bug-tags ' + str(findLabel['color']) + \
            '-b color-background-white">' + \
            str(findLabel['name']) + '</span> label.'

        issueComment = self.issueComment.create(
            comment, issue, user, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": issueCommentSerialize(issueComment), "issue": issueSerialize(issue)}

    def createNewComment(self, user, data):
        issue = self.issue.get_by_id(data['id'])

        issueComment = self.issueComment.create(
            data['comment'], issue, user, "COMMENT")

        return {"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}

    def editIssue(self, user, data):
        issue = self.issue.get_by_id(data['id'])
        issue.name = data['name']
        issue.description = data['description']
        issue.save()

        comment = user.first_name + ' ' + user.last_name + ' has edited this issue.'
        issueComment = self.issueComment.create(
            comment, issue, user, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": issueCommentSerialize(issueComment)}
