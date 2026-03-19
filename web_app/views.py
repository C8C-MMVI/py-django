from django.shortcuts import render, redirect
from .models import Student

def renderIndex(request):
    students = Student.objects.all()
    edit_id = request.GET.get('edit')
    edit_student = Student.objects.filter(id=edit_id).first() if edit_id else None
    return render(request, 'index.html', {
        "students": students,
        "edit_student": edit_student
    })

def fetchFromForm(request):
    if request.method == "POST":
        student_name = request.POST['student_name']
        course = request.POST['course']
        year = request.POST['year']
        Student.objects.create(student_name=student_name, course=course, year=year)
    return redirect('/')

def deleteStudent(request):
    if request.method == "POST":
        sid = request.POST['id']
        Student.objects.filter(id=sid).delete()
    return redirect('/')

def updatePage(request):
    if request.method == "POST":
        sid = request.POST['id']
        return redirect(f'/?edit={sid}')

def updateInformation(request):
    if request.method == "POST":
        sid = request.POST['id']
        newName = request.POST['newName']
        newCourse = request.POST['newCourse']
        newYear = request.POST['newYear']
        Student.objects.filter(id=sid).update(
            student_name=newName,
            course=newCourse,
            year=newYear
        )
        return redirect('/')