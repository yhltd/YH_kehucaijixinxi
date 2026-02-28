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
                    var this_arr = list[i].insertText.split("<br/>")
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
                                    //原base64方法
                                    // var text = text_arr[1].split("```")[1]
                                    // this_text = this_text + text

                                    var text = text_arr[1].split("```")[2]
                                    this_text = text
                                }
                                //原base64方法
                                // return '<a href="#" onclick="javascript:downloadFileByBase64(\'' + text_arr[1].split("```")[1] + '\',\'' + text_arr[1].split("```")[2] + '\')">' + this_text + '</a>'
                                // // return this_text;

                                return '<a href="' + this_text + '" target="_blank" title="' + this_text + '">' + this_text + '</a>';
                                // return '<a href="#" onclick="javascript:downloadFileByBase64(\'' + text_arr[1].split("```")[1] + '\',\'' + text_arr[1].split("```")[2] + '\')">' + this_text + '</a>'
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

    //原base64方法
    // //点击删除按钮
    // $('#delete-btn').click(function () {
    //     var msg = confirm("确认要删除吗？")
    //     if (msg) {
    //         let rows = getTableSelection("#labelTable");
    //         if (rows.length != 1) {
    //             alert('请选择1行要删除的数据！')
    //             return;
    //         }
    //         let idList = [];
    //         $.each(rows, function (index, row) {
    //             idList.push(row.data.id)
    //         })
    //         $ajax({
    //             type: 'post',
    //             url: '/formShouJi/delete',
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

    //点击删除按钮
    $('#delete-btn').click(async function () {  // 添加 async
        var msg = confirm("确认要删除吗？")
        if (msg) {
            let rows = getTableSelection("#labelTable");
            if (rows.length != 1) {
                alert('请选择1行要删除的数据！')
                return;
            }

            let idList = [];
            let fileUrls = [];
            let deletePromises = []; // 存储所有删除文件的 Promise

            $.each(rows, function (index, row) {
                // 获取ID
                idList.push(row.data.id);

                // 获取选中行的所有链接
                $('.selected').first().find('td a').each(function() {
                    var $link = $(this);
                    var onclickAttr = $link.attr('onclick');

                    if (onclickAttr) {
                        var match = onclickAttr.match(/'([^']+)',\s*'([^']+)'/);
                        if (match && match.length >= 3) {
                            var fileName = match[1];
                            var fileUrl = match[2];

                            fileUrls.push({
                                fileName: fileName,
                                fileUrl: fileUrl
                            });

                            // 分离路径和文件名
                            const lastSlashIndex = fileUrl.lastIndexOf('/');
                            const path = fileUrl.substring(0, lastSlashIndex + 1);

                            // 存储 Promise
                            deletePromises.push(deleteFiles(fileName, path));
                        }
                    }
                });
            });

            console.log('所有文件URL:', fileUrls);

            // 等待所有文件删除完成
            if (deletePromises.length > 0) {
                try {
                    // 显示删除中状态
                    $(this).prop('disabled', true);
                    $(this).text('删除文件中...');

                    // 等待所有文件删除完成
                    const results = await Promise.all(deletePromises);

                    // 检查是否有失败的
                    const hasFailure = results.some(r => !r.success);

                    if (hasFailure) {
                        alert('部分文件删除失败，是否继续删除记录？');
                        // 可以选择继续或返回
                    }

                } catch (error) {
                    console.error('文件删除过程出错:', error);
                    alert('文件删除过程出错，请重试');
                    $(this).prop('disabled', false);
                    $(this).text('删除');
                    return;
                }
            }

            // 所有文件删除完成后，执行原来的删除逻辑
            console.log('文件删除完成，开始删除记录:', idList);

            // 恢复按钮状态
            $(this).prop('disabled', true);
            $(this).text('删除中...');

            // 原来的删除逻辑
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
                // 恢复按钮状态
                $('#delete-btn').prop('disabled', false);
                $('#delete-btn').text('删除');
            });
        }
    });

})

async function deleteFiles(orderNumber,path) {
    try {


        if (orderNumber.includes('.')) {
            cleanOrderNumber = orderNumber.split('.')[0];

        }

        const params = new URLSearchParams({
            order_number: cleanOrderNumber,
            path:"/xinxicaiji/"
        });

        // 尝试两种可能的端口
        const endpoints = [
            'https://yhocn.cn:9097/file/delete'
        ];

        let success = false;
        let errorMessage = '所有接口都不可用';
        let result;

        // 尝试所有可能的端点
        for (const baseUrl of endpoints) {
            const url = `${baseUrl}?${params.toString()}`;
            console.log('尝试请求URL:', url);

            try {
                // 先尝试POST
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                console.log('响应状态:', response.status);

                if (response.ok) {
                    result = await response.json();
                    success = true;
                    break;
                } else {
                    // 尝试GET
                    const getResponse = await fetch(url, {
                        method: 'GET'
                    });

                    if (getResponse.ok) {
                        result = await getResponse.json();
                        console.log('GET删除成功:', result);
                        success = true;
                        break;
                    } else {
                        errorMessage = `服务器返回错误: ${getResponse.status} ${getResponse.statusText}`;
                    }
                }
            } catch (error) {
                console.log(`${baseUrl} 请求失败:`, error.message);
                errorMessage = `网络请求失败: ${error.message}`;
            }
        }

        return { success, result };

    } catch (error) {

        return { success: false, error: error.message };
    }
}


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