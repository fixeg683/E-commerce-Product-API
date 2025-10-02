from django.db import models
from django.contrib.auth.models import AbstractUser

# ✅ Custom User model (can be extended later)
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


# ✅ Product model with Image support
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
