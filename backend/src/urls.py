"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic.base import TemplateView
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from users import views
from views.files import views as files
from views.repository import views as repository
from views.update import views as update
from views.statistic import views as statistic
from issues import views as issues
from views.download import views as download

urlpatterns = [
    # region Global
    path('admin/', admin.site.urls),
    path('index', views.index, name='index'),
    path('api/', views.User.as_view(), name='updateUser'),
    path('api/actions', views.action, name='actions'),
    path('api/<int:id>', views.User.as_view(), name='getUserById'),

    # endregion Global

    # region Auth
    path('api/sing-in', views.Registration.as_view()),
    path('api/sing-up', views.Login.as_view()),
    # endregion Auth

    # region Repository
    path('api/repository', repository.Repository.as_view()),
    path('api/get-repositpry/<int:id>', repository.Repository.as_view()),
    path('api/get-all-repository/<int:id>',
         repository.RepositoryGet.as_view()),
    path('api/delete-repository/<int:id>', repository.Repository.as_view()),
    path('api/repository/<str:text>', repository.RepositoryFind.as_view()),
    # endregion Repository

    # region Files
    path('api/files', files.File.as_view()),
    path('api/files/<int:id>', files.File.as_view()),
    # endregion Files

    # region Update
    path('api/userSearch/<str:text>', update.Update.as_view()),
    path('api/updateProject', update.Update.as_view()),
    path('api/addUserInProject', update.Update.as_view()),
    # endregion Update

    # region Statistic
    path('api/statistic/<int:id>', statistic.Statistic.as_view()),
    # endregion Statistic

    # region Issues
    path('api/add-issue', issues.Issues.as_view()),
    path('api/close-issue', issues.Issues.as_view()),
    path('api/update-issue', issues.IssuesComment.as_view()),
    path('api/assigne-issue', issues.IssuesGet.as_view()),
    path('api/labels-issue', issues.IssueUpdateLabel.as_view()),
    path('api/issue/<int:id>', issues.IssuesGet.as_view()),
    path('api/delete-issues/<int:id>', issues.Issues.as_view()),
    path('api/add-issue-comment', issues.IssuesComment.as_view()),
    path('api/filter/<str:status>/<str:params>/<str:nameUser>/<int:id>',
         issues.Issues.as_view()),
    # endregion Issues

    # region Download
    path('api/download/<int:id>', download.Download.as_view()),
    # endregion Download

    # region Templateview
    path('', TemplateView.as_view(template_name="ang_home.html"), name='home'),
    path(r'^$', TemplateView.as_view(template_name="ang_home.html"), name='home')
    # endregion Templateview
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
