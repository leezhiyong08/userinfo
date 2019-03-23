from django.db import models

# Create your models here.
class Users(models.Model):
    uname = models.CharField(max_length=20,verbose_name='用户名')
    udate = models.DateField(max_length=50,verbose_name='用户生日')
    uemail = models.EmailField(verbose_name='电子邮件')
    isActive = models.BooleanField(default=True,verbose_name='是否激活')
    ugender = models.CharField(default='',max_length=2, verbose_name='用户性别')
    role_id= models.IntegerField(default=0, verbose_name='角色Id')
    province_id = models.IntegerField(default=0, verbose_name='省份Id')




    def to_dict(self):
        dic = {
            "id" : self.id,
            "uname" : self.uname,
            "udate":self.udate,
            "uemail" : self.uemail,
            "isActive": self.isActive,
            "ugender": self.ugender,
            "role_id": self.role_id,
            "province_id": self.province_id,


        }
        return dic


class Roles(models.Model):
    role_name = models.CharField(max_length=20, verbose_name='角色名称')

    def to_dict(self):
        dic = {
            "role_id" : self.id,
            "role_name" : self.role_name,
        }
        return dic


class Province(models.Model):
    province_name = models.CharField(max_length=5, verbose_name='出生省份')

    def to_dict(self):
        dic = {
            "province_id" : self.id,
            "province_name" : self.province_name,
        }
        return dic












