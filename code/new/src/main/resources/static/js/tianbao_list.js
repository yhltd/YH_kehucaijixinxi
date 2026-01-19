let list = []
let columns = []
let list_len = 1
function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/formShouJi/getList',
        data:{
            id: $.session.get('formId')
        },
    }, false, '', function (res) {
        if (res.code == 200) {
            list = res.data
            console.log(list)
            if(list.length == 0){
                columns = [
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
                                field: 'insertDate',
                                title: '提交时间',
                                align: 'center',
                                sortable: true,
                                width: 150,
                            },
                            {
                                field: 'insertText',
                                title: '提交内容',
                                align: 'center',
                                sortable: true,
                                width: 150,
                            }
                        ]
            }else{
                columns = [
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
                                    field: 'insertDate',
                                    title: '提交时间',
                                    align: 'center',
                                    sortable: true,
                                    width: 150,
                                },
                            ]
                var arr = list[0].insertText.split("<br/>")
                for(var i=0; i<list.length; i++){
                    var this_arr = list[0].insertText.split("<br/>")
                    if(arr.length < this_arr.length){
                        arr = this_arr
                    }
                }
                list_len = arr.length
                for(var i=0; i< arr.length; i++){
                    columns.push({
                        field: i,
                        title: '',
                        align: 'center',
                        sortable: true,
                        width: 150,
                        formatter: function (value, row, index) {
                            // 修复：添加空值检查
                            if (!value || typeof value !== 'string') {
                                return '';
                            }

                            if (value.indexOf("```") != -1) {
                                var this_text = ""
                                var text_arr = value.split("：")
                                this_text = text_arr[0] + "："
                                if (text_arr.length > 1) {
                                    var text = text_arr[1].split("```")[1]
                                    this_text = this_text + text
                                }
                                return '<a href="#" onclick="javascript:downloadFileByBase64(\'' + text_arr[1].split("```")[1] + '\',\'' + text_arr[1].split("```")[2] + '\')">' + this_text + '</a>'
                                // return this_text;
                            } else {
                                return value;
                            }
                        }
                    })
                }

                var list_upd = []
                for(var i=0; i<list.length; i++){
                    var list_item = {}
                    list_item.formId = list[i].formId
                    list_item.id = list[i].id
                    list_item.insertDate = list[i].insertDate
                    var arr = list[i].insertText.split("<br/>")
                    for(var j=0; j<arr.length; j++){
                        list_item[j] = arr[j]
                    }
                    list_upd.push(list_item)
                }
                console.log(list_upd)
                list = list_upd
            }


            setTable(list);
        }
    })
}


$(function () {
    //刷新
    getList();

    $("#refresh-btn").click(function () {
        getList();
    })

    //点击修改按钮显示弹窗
    $('#update-btn').click(function () {
        let rows = getTableSelection('#labelTable')
        if (rows.length > 1 || rows.length == 0) {
            alert('请选择一条数据查看');
            return;
        }
        $('#update-modal').modal('show');
    //     var this_body = $("#update_modal_list")
    //     var data = rows[0].data
    //     var this_html = ""
    //     console.log(rows[0].data)
    //     console.log(this_body)
    //     for(var i=0; i<list_len; i++){
    //         if(data[i] != undefined){
    //             var this_list = data[i].split("：")
    //             if(this_list.length > 1){
    //                 this_title = this_list[0]
    //
    //                 if(this_list[1].indexOf("```") != -1){
    //                     this_html = this_html + "<div class=\"form-group\">\n" +
    //                         "                    <label >" + this_list[0] + "：</label>\n" +
    //                         '                    <a href="#" onclick="javascript:downloadFileByBase64(\'' + this_list[1].split("```")[1] + '\',\''+ this_list[1].split("```")[2] +'\')">' + this_list[1].split("```")[1] + '</a>' +
    //                         "                </div>"
    //                 }else{
    //                     this_html = this_html + "<div class=\"form-group\">\n" +
    //                         "                    <label >" + this_list[0] + "：</label>\n" +
    //                         "                    <label style=\"margin-left: 5px\">" + this_list[1] + "</label>\n" +
    //                         "                </div>"
    //                 }
    //             }else{
    //                 this_html = this_html + "<div class=\"form-group\">\n" +
    //                         "                    <label >" + this_list[0] + "：</label>\n" +
    //                         "                    <label style=\"margin-left: 5px\"></label>\n" +
    //                         "                </div>"
    //             }
    //         }
    //     }
    //     console.log(this_html)
    //     $("#update_modal_list").html(this_html)
    // })
        var this_body = $("#update_modal_list");
        var data = rows[0].data || []; // 增加空值保护
        var this_html = "";

        // 确保循环次数正确
        for(var i = 0; i < list_len; i++) {
            if(typeof data[i] === 'undefined') continue;

            // 优化分割逻辑
            var this_list = data[i].split(/[:：]/);

            // 增加分割结果验证
            if(this_list.length >= 2) {
                var this_title = this_list[0].trim();
                var this_value = this_list.slice(1).join("："); // 保留原始冒号类型

                // 处理文件下载类型
                if(this_value.includes("```")) {
                    var parts = this_value.split("```");
                    if(parts.length >= 3) {
                        this_html += `
                <div class="form-group">
                    <label>${this_title}：</label>
                    <a href="#" onclick="downloadFileByBase64('${parts[1]}', '${parts[2]}')">${parts[1]}</a>
                </div>`;
                    }
                }
                // 处理普通文本
                else {
                    this_html += `
            <div class="form-group">
                <label>${this_title}：</label>
                <label style="margin-left: 5px">${this_value}</label>
            </div>`;
                }
            }
            // 处理无效数据格式
            else {
                this_html += `
        <div class="form-group">
            <label>${data[i]}：</label>
            <label style="margin-left: 5px" class="text-danger">格式错误</label>
        </div>`;
            }
        }

        this_body.html(this_html);
    })

    //修改弹窗点击关闭按钮
    $('#update-close-btn').click(function () {
        $('#update-modal').modal('hide');
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
                url: '/formShouJi/delete',
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
        pageSize : 10,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        columns: columns,

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

function dataURLtoBlob(dataurl, name) {//name:文件名
    var mime = name.substring(name.lastIndexOf('.') + 1)//后缀名
    var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function downloadFile(url, name = '默认文件名') {
    var a = document.createElement("a")//创建a标签触发点击下载
    a.setAttribute("href", url)//附上
    a.setAttribute("download", name);
    a.setAttribute("target", "_blank");
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

//主函数
function downloadFileByBase64(name, base64) {
    console.log(base64)
    base64 = base64.split(",")[1]
    console.log(name)
    var myBlob = dataURLtoBlob(base64, name);
    var myUrl = URL.createObjectURL(myBlob);
    downloadFile(myUrl, name)
}