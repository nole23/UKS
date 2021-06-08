import shutil

from repository.models import Project


class DownloadService():
    project = Project()

    def download(self, user, project):
        project = self.project.get_by_id(project)

        if project is None:
            return {"status": "FALSE", "data": None}

        link = 'download/' + project.name
        projectLink = 'media/covers/' + user.folder_name + '/' + project.name
        shutil.make_archive(link, 'zip', projectLink)

        return {"status": "SUCCESS", "data": link}
