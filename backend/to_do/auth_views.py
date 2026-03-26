from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password required.'}, status=400)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken.'}, status=400)

        User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully.'}, status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid username or password.'}, status=400)

        login(request, user)
        return Response({'message': 'Logged in successfully.'})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully.'})


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user.check_password(request.data.get('old_password')):
            return Response({'error': 'Wrong password.'}, status=400)
        user.set_password(request.data.get('new_password'))
        user.save()
        return Response({'message': 'Password updated successfully.'})