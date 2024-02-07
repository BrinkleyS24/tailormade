from django.db import models

class TailoredResume(models.Model):
    resume = models.FileField(upload_to='tailored_resumes/')

# Create your models here.
