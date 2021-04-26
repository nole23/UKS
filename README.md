# UKS PROJEKAT

** Specifikacija
Projekat ce se implementirati pomocu:
1. Python / Django
2. Sqlite
3. Angular 10
4. Docker

## Koraci za startovanje aplikacije (koraci su za OS Windows i ako imamo instaliranu aplikaciju Docker)
1. U backend folderu pokrenuti CMD
2. U CMD otkucati komandu: docker-compose build
3. Zatim komandu: docker-compose run web python manage.py migrate
4. I na kraju: docker-compose up

5. U frontend folderu pokrenuti CMD
6. U CMD otkucati komandu: docker build -t frontend:v1 .
7. Zatim: docker run -p 4200:80 frontend:v1
8. U pretrazivacu otkucajte link: http://localhost:8000/index
9. Zatvorite ovaj tab i otkucajte sledeci link: http://localhost:4200/
10. Spremni ste za rad!!!