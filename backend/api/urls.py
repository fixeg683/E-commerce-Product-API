from django.urls import path
from .views import (
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    # -------------------------------
    # Product Endpoints
    # -------------------------------
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),

    # -------------------------------
    # User Endpoints
    # -------------------------------
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
