    $(document).ready(function(){
    //第一步 ：搜索按钮 追加事件处理

    //获取角色下拉列表
    $.get
                (
                        "http://localhost:8000/get_role_lst/",	//url
                        {"user_id":1},				//json data
                        function(json_data)			//后台服务 返回json
                        {
                            var selectHtml = "";
                            selectHtml += "<option value='-1' >角色筛选</option>";
                            $.each(json_data, function(index, obj) {
                                selectHtml += "<option value='"+obj.role_id+"' >"+obj.role_name+"</option>";
                            });
                            $("#sel_rolesLst").html(selectHtml);
                            $("#sel_roles_detail").html(selectHtml);
                            $("#sel_roles_detail").find("option[value='']").remove();
                        }
                );
    //获取出生省份下拉列表
    $.get
                (
                        "http://localhost:8000/get_province_lst/",	//url
                        {"user_id":1},				//json data
                        function(json_data)			//后台服务 返回json
                        {
                            var selectHtml = "";
                            selectHtml += "<option value='' >出生省份</option>";
                            $.each(json_data, function(index, obj) {
                                selectHtml += "<option value='"+obj.pro_id+"' >"+obj.pro_name+"</option>";
                            });
                            $("#detail_birthplace").html(selectHtml);
                            $("#detail_birthplace").find("option[value='']").remove();
                        }
                );








    $("#btn_search").click(function(){

            //模拟搜索列表展示
            //showUsrLst(null)

        var tmp_url="http://localhost:8000/get_user_lst/"
                                +"?userName="+$("#txt_userName").val()
                                +"&userGender="+$("#detail_userGender").val()
                                +"&userEmail="+$("#txt_email").val()
                                +"&userBirthday="+$("#txt_birthday").val()
                                +"&role_id="+$('#sel_rolesLst option:selected').val()

            //第二步：调用Ajax 将数据POST到后台
            $.ajax({
                        type: "GET",
                        url: "http://localhost:8000/get_user_lst/"
                                +"?userName="+$("#txt_userName").val()
                                +"&userGender="+$("#detail_userGender").val()
                                +"&userEmail="+$("#txt_email").val()
                                +"&userBirthday="+$("#txt_birthday").val()
                                +"&role_id="+$('#sel_rolesLst option:selected').val(),

                        contentType: "application/json; charset=utf-8",
                         //第三步：将界面值 转化为 JSON
                        data: JSON.stringify(GetJsonData()),
                        dataType: "json",
                        success: function (json_data) {
                            if (json_data ) {
                                showUsrLst(json_data)
                            }
                        },
                        error: function (message) {
                            $("#request-process-patent").html("提交数据失败！");
                        }
                });
     });

        // 模拟新增事件
        $("#btn_add").click(function(){
            $("#hid_user_id").val(0)
        });



              //保存用户信息
          $("#btn_save").click(function(){

             // $.ajax({
             //        url: "http://localhost:8000/save_user",
             //        contentType: "application/x-www-form-urlencoded",
             //        type: "POST",
             //        data: JSON.stringify(GetJsonDataForSave()),		//第三步：将界面值 转化为 JSON
             //        dataType: "json",
             //        success: function (json_data) {
             //            if (json_data ) {
             //                alert("保存用户信息成功！")
             //            }
             //        },
             //        error: function (message) {
             //            alert("保存用户信息失败！")
             //        }
             //    });

               // $.get
               //      (
               //              "http://localhost:8000/save_user/",	//url
               //              {"user_id":$("#hid_user_id").val(),"userName":$("#detail_userName").val()},				//json data
               //              function(result)			//后台服务 返回json
               //              {
               //                  alert("提交成功！")
               //              }
               //      );


            var xhr=createXhr();
            xhr.open('post','/save_user/',true)
            xhr.onreadystatechange=function (){
                    if(xhr.readyState==4&&xhr.status==200){
                        // alert("服务器处理成功！")
                        if ($("#hid_user_id").val()  !=0)
                        {
                            $('.alert').html('修改成功！').addClass('alert-success').show().delay(1500).fadeOut();
                        }
                        else
                        {
                            $('.alert').html('新增成功！').addClass('alert-success').show().delay(1500).fadeOut();
                        }

                        //刷新搜索记录
                        $("#btn_search").click();
                    }
                }
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var csrf=$.cookie('csrftoken');
            var user_id=$("#hid_user_id").val()
            var userName=$("#detail_userName").val()
            var userBirthday=$("#detail_Birth").val()
            var userGender=$("input[name='detail_userGender']:checked").val()
            var useremail=$("#detail_e_mail").val()


            var params= "user_id="+user_id
                      +"&userName="+userName
                      +"&userBirthday="+userBirthday
                      +"&userGender="+userGender
                      +"&userEmail="+useremail
                      +"&role_id="+$('#sel_roles_detail option:selected').val()
                      +"&province_id="+$('#detail_birthplace option:selected').val()
                      +"&uname=AAA&upwd=BBB&csrfmiddlewaretoken="+csrf;

            xhr.send(params);

          });


          //获取搜索按钮 JSON
          function GetJsonDataForSave() {
                    var json = {
                        "user_id"       : $("#hid_user_id").val(),
                        "userName"		: $("#detail_userName").val(),
                        "userGender"    : $("#detail_userGender").val(),
                        "userBirthday"	: $("#detail_Birth").val(),
                        "e_mail"	    : $("#detail_e_mail").val(),
                        "birthplace"	: $("#detail_birthplace").val(),
                        "csrf"          : $.cookie('csrftoken')
                    };
                    return json;
                }


        //　删除功能
        $("#btn_delUser").click(function(){

                //第二步：调用Ajax 将数据POST到后台
                $.ajax({
                        type: "GET",
                        url: "http://localhost:8000/del_user?user_id="+$("#hid_user_id").val(),
                        contentType: "application/json; charset=utf-8",
                         //第三步：将界面值 转化为 JSON
                        data: "user_id="+$("#hid_user_id").val(),
                        dataType: "json",
                        success: function (json_data) {
                            if (json_data ) {
                                $('.alert').html('删除成功！').addClass('alert-success').show().delay(1500).fadeOut();
                                //刷新搜索记录
                                $("#btn_search").click();
                            }
                        },
                        error: function (message) {
                            $("#request-process-patent").html("提交数据失败！");
                        }
                    });

                // var xhr=createXhr();
                // var user_id=$("#hid_user_id").val();
                // var url='/del_user/?user_id='+user_id;
                // xhr.open('get',url,true);
                // xhr.onreadystatechange=function (){
                //     if(xhr.readyState==4&&xhr.status==200){
                //         alert("删除成功，请点击搜索刷新记录列表！")
                //     }
                // }
                // xhr.send(null);
            });




    //获取搜索按钮 JSON
    function GetJsonData() {
        var json = {
            "user_id"       : $("#hid_user_id").val(),
            "userName"      : $("#txt_userName").val(),
            "userBirthday"  : $("#txt_birthday").val(),
            "useremail"     : $("#txt_email").val(),
        };
        return json;
    }

    //后台返回搜索 列表给 用户列表记录展示
    function showUsrLst(json_data)
    {
        var datas = [{
            userName:"小勇",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小雯",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小翠",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小花",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小强",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小明",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小勇",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小雯",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小翠",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小花",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小强",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小明",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小勇",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小雯",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小翠",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小花",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        },
        {
            userName:"小强",
            Birth:"1986-02-28",
            gender:"男",
            e_mail:"xiaoyong@qq.com",
        },
        {
            userName:"小明",
            Birth:"1988-09-16",
            gender:"女",
            e_mail:"xiaowen@qq.com",
        }
        ];


        var tableHtml = "";
        var numOrder=0;
        var t_u_gender=''
        $.each(json_data, function(index, obj) {
            if (obj.ugender == null || obj.ugender == undefined || obj.ugender == '')
            {}
            else if(obj.ugender=='F')
            {
                t_u_gender="女"
            }
            else
            {
                t_u_gender="男"
            }

            numOrder=index+1
            tableHtml += "<tr>";
            tableHtml +=    "<td key='"+numOrder+"' user_id='"+obj.user_id+"' >"+ numOrder +"</td>";
            tableHtml +=    "<td key='"+obj.userName+"'>"+ obj.userName +"</td>";
            tableHtml +=    "<td key='"+obj.Birthday+"'>"+ obj.Birthday +"</td>";
            tableHtml +=    "<td key='"+obj.ugender+"'>"+ t_u_gender +"</td>";
            tableHtml +=    "<td key='"+obj.e_mail+"'>"+ obj.e_mail +"</td>";
            tableHtml +=    "<td key='"+obj.role_id+"'>"+ obj.role_name +"</td>";
            tableHtml +=    "<td key='"+obj.pro_id+"'>"+ obj.pro_name +"</td>";
            tableHtml += "</tr>";
        });
        $("#tbl_userLst").html(tableHtml);


    /*$("#tbl_userLst tr:odd").css("background-color","#eeeeee");
    $("#tbl_userLst tr:even").css("background-color","#ffffff");*/


    $("#tbl_userLst tr").bind("mouseover",function(){
        $(this).css("background-color","LightBLue");
    })
    $("#tbl_userLst tr").bind("mouseout",function(){
        $(this).css("background-color","#ffffff");
    })
}


    $("#tbl_userLst").on("click","tr",function() {
        var col_user_id = $(this).find("td").eq(0).attr("user_id")
        var col_userName = $(this).find("td").eq(1).attr("key")
        var col_Birth = $(this).find("td").eq(2).attr("key")
        var col_gender = $(this).find("td").eq(3).attr("key")
        var col_e_mail = $(this).find("td").eq(4).attr("key")
        var col_role_id = $(this).find("td").eq(5).attr("key")
        var col_province_id = $(this).find("td").eq(6).attr("key")

        $("#hid_user_id").val(col_user_id)
        $("#detail_userName").val(col_userName)
        $("#detail_Birth").val(col_Birth)
        $("#detail_gender").val(col_gender)
        $(":radio[name='detail_userGender'][value='" + col_gender + "']").prop("checked", "checked");
        $("#detail_e_mail").val(col_e_mail)
        $("#sel_roles_detail").find("option[value='"+col_role_id+"']").prop("selected",true);
        $("#detail_birthplace").find("option[value='"+col_province_id+"']").prop("selected",true);
    });


});