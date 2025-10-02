from django.test import TestCase
from .models import Product

class ProductModelTest(TestCase):
    def test_create_product(self):
        p = Product.objects.create(name="Test", description="Desc", price=9.99, category="Toys")
        self.assertEqual(str(p), "Test")
        self.assertEqual(p.price.__class__.__name__, 'Decimal')
