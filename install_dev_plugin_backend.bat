cd ./backend

py -m venv env && env\Scripts\activate.bat && pip install django && pip install djangorestframework && pip install django-cors-headers && pip install PyJWT && python manage.py migrate