# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2019-03-20 14:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0004_users_role_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='role_name',
        ),
    ]
