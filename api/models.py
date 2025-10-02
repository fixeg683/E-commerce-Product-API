from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # 👇 this must be an ImageField, not CharField/TextField
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name
