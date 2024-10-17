
function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/user/queryC3',
    }, false, '', function (res) {
        if (res.code == 200) {
           document.getElementById("yhm").value=res.data[0].name;
            document.getElementById("zh").value=res.data[0].username;
            document.getElementById("mm").value=res.data[0].password;
            document.getElementById("power").value=res.data[0].power;
            document.getElementById("id123").value=res.data[0].id;
        }
    })
}


$(function () {
    //刷新
    getList();

    $("#select-btn").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/user/queryC_Inquire',
            data:{
                query:query
            }
        }, false, '', function (res) {
            if (res.code == 200) {

                setTable(res.data);
            }
        })
    })




    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        document.getElementById("update-name").value=document.getElementById("yhm").value
        document.getElementById("update-username").value=document.getElementById("zh").value
        document.getElementById("update-password").value=document.getElementById("mm").value
        document.getElementById("update-power").value=document.getElementById("power").value
        $('#update-modal').modal('show');

    })

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        var name = $('#update-name').val();
        var username = $('#update-username').val();
        var password = $('#update-password').val();
        var power = $('#update-power').val();
        var id = $('#id123').val();
        if(name==""||username==""||password==""||power==""){
            alert("姓名,账号，密码，权限都不能为空");
        }else{
            if (msg) {

                // if (checkForm('#update-form')) {
                $ajax({
                    type: 'post',
                    url: '/user/update1',
                    data: {
                        name:name,
                        username:username,
                        password:password,
                        power:power,
                        id:id
                    },
                }, false, '', function (res) {
                    alert(res.msg);
                    if (res.code == 200) {
                        $('#update-close-btn').click();
                        $('#update-modal').modal('hide');
                        getList();
                    }
                })
                // }
            }
        }

    })

    //点击删除按钮
    $('#delete-btn').click(function () {
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#labelTable");
            if (rows.length == 0) {
                alert('请选择要删除的数据！')
                return;
            }
            let idList = [];
            $.each(rows, function (index, row) {
                idList.push(row.data.id)
            })
            $ajax({
                type: 'post',
                url: '/user/delete',
                data: JSON.stringify({
                    idList: idList
                }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            }, false, '', function (res) {
                alert(res.msg);
                if (res.code == 200) {
                    getList();
                }
            })
        }
    })

})

function setTable(data) {
    if ($('#labelTable').html != '') {
        $('#labelTable').bootstrapTable('load', data);
    }
    var count = 0;
    $('#labelTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize : 15,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        columns: [
            {
                field: 'id',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {
                field: 'name',
                title: '姓名',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'username',
                title: '账号',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'password',
                title: '密码',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
            ,{
                field: 'power',
                title: '权限',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
        ],

        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }

    })

}