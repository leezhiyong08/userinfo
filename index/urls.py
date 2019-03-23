from django.conf.urls import url
from .views import *
urlpatterns = [
    #访问路径是 /
    url(r'^$',index_views),
    url(r'^car/$',car_views),
    url(r'^user/$',user_views),
    url(r'^get_user_lst/$',get_user_lst),
    url(r'^del_user/$',del_user),
    url(r'^save_user/$', save_user),
    url(r'^get_role_lst/$', get_role_lst),
    url(r'^get_province_lst/$',get_province_lst),
    url(r'^test_ajax_post/$',test_ajax_post),

    ]








