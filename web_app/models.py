from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length= 100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.product_name

class Student(models.Model):
    student_name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    def __str__(self):
        return self.student_name    