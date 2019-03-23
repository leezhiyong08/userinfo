from django.contrib import admin

# Register your models here.
from index.models import *

class UsersAdmin(admin.ModelAdmin):
    list_filter = ('user',)
    search_fields = ('title',)

admin.site.register(Users)