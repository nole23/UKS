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
from files import views as files

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index', views.index, name='index'),
    path('api/sing-in', views.registration, name='registration'),
    path('api/sing-up', views.login, name='login'),
    path('api/repository', views.repository),
    path('api/get-all-repository', views.getAllrepository),
    path('api/get-repositpry/<int:id>', views.getRepositoryById),
    path('api/add-issue', views.addIssue),
    path('api/issue/<int:id>', views.getIssueById),
    path('api/add-issue-comment', views.saveCommentByIssue),
    path('api/filter/<str:status>/<str:params>/<int:id>', views.filters),
    path('api/delete-repository/<int:id>', views.deleteRepository),
    path('api/files', files.File.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)