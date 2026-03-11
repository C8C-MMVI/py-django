from django.shortcuts import render
from .models import Product

# Create your views here.
def renderIndex(request):
    # user = {
    #     "name": "Raiven Christian B. Navor",
    #     "course": "Bachelor of Science in Information Technology-II",
    #     "age": 19,
    #     "motto": "Life is worth living if one starts to get out and explore."
    # }
    products = Product.objects.all()
    return render(request, 'index.html', {'products': products})