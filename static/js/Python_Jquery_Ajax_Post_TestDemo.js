                $(function () {
                        $("#btn").click(function () {
                           var data = JSON.stringify({"user":$("#user").val(),"pwd":$("#pwd").val()})
                            $.ajax({
                                url:"save_user",
                                contentType:'application/json;charset=UTF-8',
                                type:"POST",
                                data:data,
                                success:function (data) {
                                    console.log(data)
                                },error:function (error) {
                                    console.log("error")
                                    console.log(error)
                                }
                            })
                        });
                })