import json

from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response

from .forms import *



# Create your views here.
def index_views(request):
    return render(request, 'user.html')

def car_views(request):
    return render_to_response('car.html', {'user_stylesheet': 'css/user.css'})


# def user_views(request):
#     return render(request, 'UserInfo.html')

def user_views(request):
    # roleLst = Roles.objects.filter(id=1)
    # provinceLst=detail_birthplace.objects.filter(id=1)
    # dic ={"roleLst":roleLst}
    return render_to_response("UserInfo.html", {})

def get_role_lst(request):
    json_list = []
    roleLst = Roles.objects.all()

    for role in roleLst:
        json_dict = {}
        json_dict["role_id"] = role.id
        json_dict["role_name"] = role.role_name
        json_list.append(json_dict)
    return HttpResponse(json.dumps(json_list), content_type="application/json")


def get_province_lst(request, ):
    json_list = []
    provinceLst = Province.objects.all()

    for province in provinceLst:
        json_dict = {}
        json_dict["pro_id"] = province.id
        json_dict["pro_name"] = province.province_name
        json_list.append(json_dict)

    return HttpResponse(json.dumps(json_list), content_type="application/json")




# 处理后台与前端页面数据交互
def get_user_lst(request):
    json_list = []
# try:
    userName = request.GET['userName']
    userEmail= request.GET['userEmail']
    userBirthday= request.GET['userBirthday']
    role_id = request.GET['role_id']
    # province_id=request.GET['province_id']

    # B For Test
    # B 方法一　精准搜索
    search_dict = dict()
    if userName!="":
        search_dict['uname'] = userName
    if userEmail!="":
        search_dict['uemail'] = userEmail
    if userBirthday != "":
        search_dict['udate'] = userBirthday
    if role_id != "-1":
        search_dict['role_id'] = role_id
    users = Users.objects.filter(**search_dict)
    # E 方法一　精准搜索


    # if userName != "":


    # E For Test

    # if userName =="" and userEmail=="" and userBirthday=="" and role_id=="-1" : #and province_id==""
    #     users = Users.objects.all()
    # elif userName !="" and userEmail!="" and userBirthday!="":
    #     users = Users.objects.filter(uname=userName,uemail=userEmail,udate=userBirthday,role_id=role_id)
    # elif role_id!="-1":
    #     users = Users.objects.filter((Q(uname=userName)|Q(uemail=userEmail)|Q(udate=userBirthday))&Q(role_id=role_id))
    # else:
    #     users = Users.objects.filter(Q(uname=userName)|Q(uemail=userEmail)|Q(udate=userBirthday)|Q(role_id=role_id))

    if role_id !="-1":
        roles=Roles.objects.filter(id=role_id)
    else:
        roles = Roles.objects.all()

    provins=Province.objects.all()

    for user in users:
        json_dict = {}
        json_dict["user_id"] = user.id
        json_dict["userName"] = user.uname
        json_dict["Birthday"] = str(user.udate)
        json_dict["e_mail"] = user.uemail
        json_dict["ugender"] = user.ugender
        json_dict["pro_id"] = user.province_id

        if user.province_id == 0:
            json_dict["pro_name"] = ""
        else:
            birth_pro = provins.get(id=user.province_id)
            json_dict["pro_name"] = "" if (birth_pro is None)  else  birth_pro.province_name

        json_dict["role_id"] = user.role_id
        role = roles.get(id=user.role_id)
        json_dict["role_name"] = "" if (role is None)  else  role.role_name
        json_list.append(json_dict)
# except  Exception as e:
#     print(e)
# finally:
    return HttpResponse(json.dumps(json_list), content_type="application/json")



# 删除功能
def del_user(request):
    try:
        user_id = request.GET['user_id']
        Users.objects.filter(id=user_id).delete()
    except Exception as e:
        print('Error:', e)
    finally:
        json_dict = {}
        json_dict["responseCode"] = "Y"
        return HttpResponse(json.dumps(json_dict), content_type="application/json")


# 保存功能
def save_user(request):
    # if request.method == 'POST':
        user_id = request.POST['user_id']
        userName=request.POST['userName']
        userEmail = request.POST['userEmail']
        userGender= request.POST['userGender']
        userBirthday = request.POST['userBirthday']
        role_id = request.POST['role_id']
        province_id=request.POST['province_id']

        if user_id !="0":
            Users.objects.filter(id=user_id).update(uname=userName,uemail=userEmail,ugender=userGender,udate=userBirthday,role_id=role_id,province_id=province_id)
        else:
            Users.objects.create(uname=userName,ugender=userGender,udate=userBirthday,uemail=userEmail,isActive=1,role_id=role_id,province_id=province_id)

        json_dict = {}
        json_dict["responseCode"] = "Y"
        return HttpResponse(json.dumps(json_dict), content_type="application/json")


def test_ajax_post(request):
    return render(request, 'Python_Jquery_Ajax_Post_TestDemo.html')





