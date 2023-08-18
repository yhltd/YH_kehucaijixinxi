let list = []
let columns = []
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
                for(var i=0; i< arr.length; i++){
                    columns.push({
                        field: i,
                        title: '',
                        align: 'center',
                        sortable: true,
                        width: 150,
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