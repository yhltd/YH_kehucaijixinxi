let list = []


function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/formCreate/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            list = res.data
            setTable(res.data);
        }
    })
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
$(function () {
    //刷新
    getList();

    $("#select-btn").click(function () {
        var query=$('#query').val()
        $ajax({
            type: 'post',
            url: '/formCreate/queryList',
            data:{
                query:query
            }
        }, false, '', function (res) {
            if (res.code == 200) {
                list = res.data
                setTable(res.data);
            }
        })
    })


    $("#refresh-btn").click(function () {
        getList();
    })

    //点击新增按钮显示弹窗
    $("#add-btn").click(function () {
        $('#add-modal').modal('show');
    })

    //新增弹窗里点击关闭按钮
    $('#add-close-btn').click(function () {
        $('#add-modal').modal('hide');
    })

    //新增弹窗里点击提交按钮
    $("#add-submit-btn").click(function () {
        var formName = $('#add-formName').val();
        var formType = $('#add-formType').val();
        var formState = $('#add-formState').val();
        if(formName==""||formType==""||formState==""){
            alert("填写项不能为空");
        }else{
            $ajax({
                type: 'post',
                url: '/formCreate/add',
                data: {
                    formName:formName,
                    formType:formType,
                    formState:formState,
                },
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code == 200) {
                    $('#add-form')[0].reset();
                    getList();
                    $('#add-close-btn').click();
                }

            })
        }

    })


    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#labelTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据修改');
            return;
        }
        $('#update-modal').modal('show');
        setForm(rows[0].data, '#update-form');
    })

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-form')[0].reset();
        $('#update-modal').modal('hide');
    })

    //修改弹窗里点击提交按钮
    $('#update-submit-btn').click(function () {
        var msg = confirm("确认要修改吗？")
        var formName = $('#update-formName').val();
        var formType = $('#update-formType').val();
        var formState = $('#update-formState').val();
        if(formName==""||formType==""||formState==""){
            alert("填写项不能为空");
        }else{
            if (msg) {
                let params = formToJson('#update-form');
                // if (checkForm('#update-form')) {
                $ajax({
                    type: 'post',
                    url: '/formCreate/update',
                    data: {
                        userInfoJson: JSON.stringify(params)
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8'
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

    // //点击删除按钮
    // $('#delete-btn').click(function () {
    //     var msg = confirm("确认要删除吗？")
    //     if (msg) {
    //         let rows = getTableSelection("#labelTable");
    //         if (rows.length == 0) {
    //             alert('请选择要删除的数据！')
    //             return;
    //         }
    //         let idList = [];
    //         $.each(rows, function (index, row) {
    //             idList.push(row.data.id)
    //         })
    //         $ajax({
    //             type: 'post',
    //             url: '/formCreate/delete',
    //             data: JSON.stringify({
    //                 idList: idList
    //             }),
    //             dataType: 'json',
    //             contentType: 'application/json;charset=utf-8'
    //         }, false, '', function (res) {
    //             alert(res.msg);
    //             if (res.code == 200) {
    //                 getList();
    //             }
    //         })
    //     }
    // })

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
        pageSize : 8,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        checkbox: true,
        // toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        columns: [
            {
                field: 'state',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
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
                field: 'formName',
                title: '表单名称',
                align: 'center',
                sortable: true,
                width: 150,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            },
           {
                field: 'formType',
                title: '表单类型',
                align: 'center',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }, {
                field: 'insertDate',
                title: '创建时间',
                align: 'center',
                sortable: true,
                width: 120,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
            ,{
                field: 'createName',
                title: '创建人',
                align: 'center',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
            ,{
                field: 'updateDate',
                title: '修改时间',
                align: 'center',
                sortable: true,
                width: 120,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            }
            ,{
                field: 'formState',
                title: '表单状态',
                align: 'center',
                sortable: true,
                width: 100,
                formatter:function(value, row , index){
                    if(value == null || value == ''){
                        value = '-'
                    }
                    return "<div title='"+value+"'; style='overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 100%;word-wrap:break-all;word-break:break-all;' href='javascript:edit(\""+row.id+"\",true)'>"+value+"</div>";
                }
            } ,{
                field: '',
                title: '操作',
                align: 'center',
                sortable: true,
                width:300,
                formatter: function (value, row, index) {
                    return '<button onclick="javascript:pass(' + row.id + ')" class="btn-sm btn-link">编辑</button>  <button onclick="javascript:pass2(' + row.id + ')" class="btn-sm btn-link">预览</button> <button onclick="javascript:delList(' + row.id + ')" class="btn-sm btn-link" id="delete-btn" >删除</button>   <button onclick="javascript:pass3(' + row.id + ')" class="btn-sm btn-link">收集列表</button>  <button onclick="javascript:pass4(' + row.id + ')" class="btn-sm btn-link">收集链接</button> '                }
                    // return  '    <button class="btn btn-default" id="dropdownMenu1" data-toggle="dropdown">操作\n' +
                //         '        <span class="caret"></span>\n' +
                //         '    </button>\n' +
                //         '    <ul class="dropdown-menu " role="menu" aria-labelledby="dropdownMenu1">\n' +
                //         '        <li role="presentation">\n' +
                //         '            <button onclick="javascript:delList(' + row.id + ')" class="btn-sm btn-link" id="delete-btn" >删除</button>  \n' +
                //         '        </li>\n' +
                //         '        <li role="presentation">\n' +
                //         '           <button onclick="javascript:pass3(' + row.id + ')" class="btn-sm btn-link">收集列表</button>  \n' +
                //         '        </li>\n' +
                //         '        <li role="presentation">\n' +
                //         '           <button onclick="javascript:pass4(' + row.id + ')" class="btn-sm btn-link">收集链接</button> \n' +
                //         '        </li>\n' +
                //         '    </ul>\n' +
                //     '<button onclick="javascript:pass(' + row.id + ')" class="btn btn-default">编辑</button> <button onclick="javascript:pass2(' + row.id + ')" class="btn btn-default">预览</button> <div class="dropdown">'
                // }
                },
        ],

        onClickRow: function (row, el) {
             let isSelect = $(el).hasClass('selected')
            // if (isSelect) {
            //     $(el).removeClass('selected')
            // } else {
            //     $(el).addClass('selected')
            // }
            pass5(row.id)
            // var url = getCookie("url")
            // alert(url)
        }

    })

}

function pass(id) {
    $.session.set('id', id)
    $.session.set('type', "修改")
    document.location.href = 'randomText.html'
}
function delList(id){
    //点击删除按钮

        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#labelTable");

            let idList = [];

            idList.push(id)
            $ajax({
                type: 'post',
                url: '/formCreate/delete',
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

}
// function updateList(id){
//     //修改弹窗里点击提交按钮
//
//         var msg = confirm("确认要修改吗？")
//         var formName = $('#update-formName').val();
//         var formType = $('#update-formType').val();
//         var formState = $('#update-formState').val();
//         if(formName==""||formType==""||formState==""){
//             alert("填写项不能为空");
//         }else{
//             if (msg) {
//                 let params = formToJson('#update-form');
//                 // if (checkForm('#update-form')) {
//                 $ajax({
//                     type: 'post',
//                     url: '/formCreate/update',
//                     data: {
//                         userInfoJson: JSON.stringify(params)
//                     },
//                     dataType: 'json',
//                     contentType: 'application/json;charset=utf-8'
//                 }, false, '', function (res) {
//                     alert(res.msg);
//                     if (res.code == 200) {
//                         $('#update-close-btn').click();
//                         $('#update-modal').modal('hide');
//                         getList();
//                     }
//                 })
//                 // }
//             }
//         }
//
//
// }

function pass2(id) {
    $.session.set('id', id)
    $.session.set('type', "预览")
    document.location.href = 'randomText.html'
}

function pass3(id) {
    $.session.set('formId', id)
    document.location.href = 'tianbao_list.html'
}

function pass4(id) {
    var formState = ""
    for(var i=0; i<list.length; i++){
        if(list[i].id == id){
            formState = list[i].formState
            break;
        }
    }
    if(formState != "可收集"){
        alert("此表单不可收集")
    }else{
     getList()
        clearCookie("url")
        var iframeUrl = window.top.location.href.replace("main.html","form_tianbao.html") + "?id=" + id
        alert(iframeUrl)
        setCookie("url", iframeUrl, 1); // 设置过期时间为7天

    }

}
function pass5(id) {
    var formState = ""
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            formState = list[i].formState
            break;
        }
    }
    if (formState != "可收集") {

    } else {
        getList()
        clearCookie("url")
        var iframeUrl = window.top.location.href.replace("main.html", "form_tianbao.html") + "?id=" + id
        setCookie("url", iframeUrl, 1); // 设置过期时间为7天

    }
}