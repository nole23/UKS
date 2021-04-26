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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index', views.index, name='index'),
    path('api/sing-in', views.registration, name='registration'),
    path('api/sing-up', views.login, name='login'),
    path('api/repository', repository.Repository.as_view()),
    path('api/get-repositpry/<int:id>', repository.Repository.as_view()),
    path('api/get-all-repository', views.getAllrepository),
    path('api/add-issue', views.addIssue),
    path('api/issue/<int:id>', views.getIssueById),
    path('api/add-issue-comment', views.saveCommentByIssue),
    path('api/filter/<str:status>/<str:params>/<int:id>', views.filters),
    path('api/delete-repository/<int:id>', views.deleteRepository),
    path('api/files', files.File.as_view()),
    path('api/actions/<int:id>', views.actions, name='actions'),
    path('api/userSearch/<str:text>', update.Update.as_view()),
    path('api/updateProject', update.Update.as_view()),
    path('api/addUserInProject', update.Update.as_view()),
    path('api/statistic/<int:id>', statistic.Statistic.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
