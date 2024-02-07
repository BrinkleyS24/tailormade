from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('tailor_resume/', views.tailor_resume, name='tailor_resume'),
    path('api/tailor-resume/', views.generate_tailored_resume, name='tailor_resume_api'),
]


