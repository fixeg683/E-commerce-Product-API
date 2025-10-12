from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


# Pagination for user listing
class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


# ✅ User Registration View
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({
            "message": "User registered successfully!",
            "user": UserSerializer(user).data
        }, status=201)


# ✅ User Login View (returns JWT + redirect URL)
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials."}, status=401)

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful!",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "redirect": "/api/products/",  # ✅ frontend can use this to redirect
            "user": UserSerializer(user).data
        })


# ✅ Paginated User List (for authenticated users)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    pagination_class = UserPagination
    permission_classes = [permissions.IsAuthenticated]


# ✅ Single User Detail View
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
