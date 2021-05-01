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
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from users import views
from views.files import views as files
from views.repository import views as repository
from views.update import views as update
from views.statistic import views as statistic
from views.authController import view_registration as registration
from views.authController import views as login
from views.issues import views as issues
from views.issues import views_comment as issuesComment

urlpatterns = [
    # region Global
    path('admin/', admin.site.urls),
    path('index', views.index, name='index'),
    path('api/actions/<int:id>', views.actions, name='actions'),
    path('api/', views.updateUser, name='updateUser'),
    path('api/<int:id>', views.getUserById, name='getUserById'),
    # endregion Global

    # region Auth
    path('api/sing-in', registration.Registration.as_view()),
    path('api/sing-up', login.Login.as_view()),
    # endregion Auth

    # region Repository
    path('api/repository', repository.Repository.as_view()),
    path('api/get-repositpry/<int:id>', repository.Repository.as_view()),
    path('api/get-all-repository/<int:id>',
         repository.RepositoryGet.as_view()),
    path('api/delete-repository/<int:id>', repository.Repository.as_view()),
    # endregion Repository

    # region Files
    path('api/files', files.File.as_view()),
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
    path('api/update-issue', issuesComment.IssuesComment.as_view()),
    path('api/assigne-issue', issues.IssuesGet.as_view()),
    path('api/issue/<int:id>', issues.IssuesGet.as_view()),
    path('api/delete-issues/<int:id>', issues.Issues.as_view()),
    path('api/add-issue-comment', issuesComment.IssuesComment.as_view()),
    path('api/filter/<str:status>/<str:params>/<str:nameUser>/<int:id>',
         issues.Issues.as_view()),
    # endregion Issues
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
