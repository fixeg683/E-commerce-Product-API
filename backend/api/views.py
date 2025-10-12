from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from products.models import Product
from products.serializers import ProductSerializer
from users.serializers import UserSerializer


# -------------------------------------------------
# Pagination Class
# -------------------------------------------------
class DefaultPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


# -------------------------------------------------
# Product Views
# -------------------------------------------------
class ProductListCreateView(generics.ListCreateAPIView):
    """
    GET: List all products (paginated)
    POST: Create a new product (authenticated users only)
    """
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    pagination_class = DefaultPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()  # you could also do serializer.save(owner=self.request.user)


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a product
    PUT/PATCH: Update product (authenticated users only)
    DELETE: Delete product (authenticated users only)
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# -------------------------------------------------
# User Views
# -------------------------------------------------
class UserListView(generics.ListAPIView):
    """
    GET: Paginated list of users (authenticated users only)
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    pagination_class = DefaultPagination
    permission_classes = [permissions.IsAuthenticated]


class UserDetailView(generics.RetrieveAPIView):
    """
    GET: Retrieve a single user's details (authenticated users only)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
