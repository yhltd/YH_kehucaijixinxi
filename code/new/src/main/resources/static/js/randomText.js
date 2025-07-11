let fileType = ""
let body_pic = ""
let head_pic = ""

function getList() {
    $ajax({
        type: 'post',
        url: '/formCreate/queryListById',
        data:{
            id:$.session.get('id')
        },
        async: false
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data[0])
            $(".col-md-12.droppable.sortable.ui-droppable.ui-sortable").html(res.data[0].formBody)
            $("#head_title").html(res.data[0].formName)
            var type = $.session.get('type')
            $("#head_title").html(res.data[0].formName)
            if(type == "修改"){
                $(".col-md-12.droppable.sortable.ui-droppable.ui-sortable").html(res.data[0].bodyUpd)
                setup_draggable();
            }else if(type == "预览"){
                $(".col-md-12.droppable.sortable.ui-droppable.ui-sortable").html(res.data[0].formBody)
                setup_draggable();
                $('.btn-yulan').click()
                $('.btn-yulan').hide()
                $("#copy-to-clipboard").hide()
                $("#title").hide()
            }
            if(res.data[0].headImg != ""){
                $('.set-til.col-md-10').css('background','url(' + res.data[0].headImg + ') no-repeat')
                $('.set-til.col-md-10').css('background-size','cover')
                head_pic = res.data[0].headImg
            }
            if(res.data[0].bodyImg != ""){
                $('.container-fluid').css('background','url(' + res.data[0].bodyImg + ') no-repeat')
                $('.container-fluid').css('background-size','cover')
                body_pic = res.data[0].bodyImg
            }

            $(".form_datetime").datetimepicker({
                language: 'zh-CN', //日期
                format: "yyyy/mm/dd hh:ii",
                initialDate: new Date(), //初始化当前日期
                autoclose: true, //选中自动关闭
                todayBtn: true //显示今日按钮
            });
            //上传初始化
            $('.uploadfile').fileinput({
                language: 'zh',
                showUpload: false,
                showCaption: false,
                maxFileCount: 1
            });
            //省市区初始化
            $('.distpicker').distpicker({
                province: '省份名',
                city: '城市名',
                district: '区名',
                autoSelect: true,
                placeholder: false
            });
            //评分初始化
            $(".rating_simple").webwidget_rating_sex({
                rating_star_length: '5',
                rating_initial_value: '',
                rating_function_name: '',
                directory: '../img/'
            });

            $(".col-sm-7").each(function(){
                console.log($(this))
                var pingfen = $(this).children('.webwidget_rating_sex')
                console.log(pingfen)
                for(var i=pingfen.length-1; i>0; i--){
                    pingfen.eq(i).remove()
                }
            });
        }
    })
}

//自定义表单开始
$(document).ready(function() {
    //预览

    console.log($.session.get('id'))

    var chss = 0;
    $('.btn-yulan').click(function() {
        if (chss == 0) {
            $("#colzuo").attr("class", "col-sm-12");
            $("#colyou").hide();
            $(".tools").hide();
            chss++;
        } else {
            $("#colzuo").attr("class", "col-sm-9");
            $("#colyou").show();
            $(".tools").show();
            chss = 0;
        }
    });

    $('#back').click(function() {
        document.location.href = 'form_list.html'
    });

    //点击添加表单
    $(".btntext,.btntexts").click(function() {
        $(tableList($(this).attr("id"))).appendTo($(".ui-sortable"));
        $(".labcheck input").unbind('click');
        $(".labcheck input").click(function() {
            if ($(this).is(":checked")) {
                alert("选中");
            } else {
                alert("未选中");
            }
        });
        //时间初始化
        $(".form_datetime").datetimepicker({
            language: 'zh-CN', //日期
            format: "yyyy/mm/dd hh:ii",
            initialDate: new Date(), //初始化当前日期
            autoclose: true, //选中自动关闭
            todayBtn: true //显示今日按钮
        });
        //上传初始化
        $('.uploadfile').fileinput({
            language: 'zh',
            showUpload: false,
            showCaption: false,
            maxFileCount: 1
        });
        //省市区初始化
        $('.distpicker').distpicker({
            province: '省份名',
            city: '城市名',
            district: '区名',
            autoSelect: true,
            placeholder: false
        });
        //评分初始化
        $(".rating_simple").webwidget_rating_sex({
            rating_star_length: '5',
            rating_initial_value: '',
            rating_function_name: '',
            directory: '../img/'
        });

        $(".col-sm-7").each(function(){
            console.log($(this))
            var pingfen = $(this).children('.webwidget_rating_sex')
            console.log(pingfen)
            for(var i=pingfen.length-1; i>0; i--){
                pingfen.eq(i).remove()
            }
        });
    });
});

$(document).on("click", ".add", function() {
    var number = $(this).parent().eq(0).children('input').eq(0).val()
    $(this).parent().eq(0).children('input').eq(0).val((number * 1) + 1)
});

$(document).on("click", ".reduce", function() {
    var number = $(this).parent().eq(0).children('input').eq(0).val()
    number = (number * 1) - 1
    if(number < 0){
        number = 0
    }
    $(this).parent().eq(0).children('input').eq(0).val(number)
});

$(function () {

    getList();

    // $('.add').click(function () {
    //     var number = $(this).parent().eq(0).children('input').eq(0).val()
    //     $(this).parent().eq(0).children('input').eq(0).val((number * 1) + 1)
    // });
    //
    // $('.reduce').click(function () {
    //     var number = $(this).parent().eq(0).children('input').eq(0).val()
    //     number = (number * 1) - 1
    //     if(number < 0){
    //         number = 0
    //     }
    //     $(this).parent().eq(0).children('input').eq(0).val(number)
    // });

    $('#head_insert').click(function () {
        fileType = "head"
        $('#pic_file').trigger('click');
    });

    $('#head_delete').click(function () {
        fileType = "head"
        $('.set-til.col-md-10').css('background','')
        head_pic = ""
    });

    $('#body_insert').click(function () {
        fileType = "body"
        $('#pic_file').trigger('click');
        //fileType = "body"
    });

    $('#body_delete').click(function () {
        fileType = "body"
        // $('#container-fluid').css('background','')
        $('.col-md-12.column').css('background','')
        body_pic = ""
    });

    $('#pic_file').change(function () {
        var file = document.getElementById("pic_file").files;
        var oFReader = new FileReader();
        var this_file = file[0];
        var fileName = file[0].name;
        oFReader.readAsDataURL(this_file);
        oFReader.onloadend = function (oFRevent) {
            this_file = oFRevent.target.result;
            console.log(fileType)
            console.log(this_file)
            if(fileType == 'head'){
                head_pic = this_file
                $('.set-til.col-md-10').css('background','url(' + this_file + ') no-repeat')
                $('.set-til.col-md-10').css('background-size','cover')
            }else if(fileType = 'body'){
                body_pic = this_file

                $('.col-md-12.column').css('background','url(' + this_file + ') no-repeat')
                $('.col-md-12.column').css('background-size','cover')
                // $('.container-fluid').css('background','url(' + this_file + ') no-repeat')
                // $('.container-fluid').css('background-size','cover')
            }
            $('#pic_file').val('')
        };
    });

    $("#copy-to-clipboard").on("click", function() {

        var $copy = $(".col-md-12.droppable.sortable.ui-droppable.ui-sortable").clone().appendTo(document.body);
        console.log($copy)
        var $copy2 = $copy.eq(0).children('.form-group.draggable.ui-draggable.dropped.file')
        console.log($copy2)
        for(var i=0; i<$copy2.length; i++){
            var title_text = $copy.eq(0).children('.form-group.draggable.ui-draggable.dropped.file').eq(i).children('label').eq(0)[0].innerText
            console.log(title_text)
            var file_html = "\t<label class=\"col-sm-2 control-label\">" + title_text + "</label>\n" +
                "\t<div class=\"col-sm-7\">\n" +
                "\t\t<input class=\"file uploadfile\" type=\"file\" multiple data-min-file-count=\"1\">\n" +
                "\t</div>\n" +
                "\t<p class=\"tools col-sm-3\">\n" +
                "\t\t<a class=\"edit-link\" name=\"file\" title=\"设置\">\n" +
                "\t\t\t<i class=\"fa fa-cog fa-fw\"></i>\n" +
                "\t\t</a>\n" +
                "\t\t<a class=\"remove-link\">\n" +
                "\t\t\t<i class=\"fa fa-trash-o\"></i>\n" +
                "\t\t</a>\n" +
                "\t</p>"
            $copy.eq(0).children('.form-group.draggable.ui-draggable.dropped.file').eq(i).html(file_html)
        }
        var yuan_html = html_beautify($copy.html());
        $copy.find(".tools").remove();
        var html = html_beautify($copy.html());
        $copy.remove();

        console.log(yuan_html)
        console.log(html)
        $ajax({
            type: 'post',
            url: '/formCreate/updateBody',
            data:{
                userInfoJson: JSON.stringify( {
                    formBody: html,
                    id: $.session.get('id'),
                    bodyUpd: yuan_html,
                }),
            },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            async: false,
        }, false, '', function (res) {
            if (res.code == 200) {
                $ajax({
                    type: 'post',
                    url: '/formCreate/updateImg',
                    data: {
                        userInfoJson: JSON.stringify({
                            id: $.session.get('id'),
                            headImg: head_pic,
                            bodyImg: body_pic
                        }),
                    },
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    async: false,
                }, false, '', function (res) {
                    if (res.code == 200) {
                        alert(res.msg);
                    } else {
                        alert(res.msg);
                    }
                })
            } else {
                alert(res.msg);
            }
        })

        return false
    })
});


var setup_draggable = function() {
    $(".draggable").draggable({
        appendTo: "body",
        helper: "clone"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        helper: "clone",
        hoverClass: "droppable-active",
        drop: function(event, ui) {
            $(".empty-form").remove();
            var $orig = $(ui.draggable);
            if (!$(ui.draggable).hasClass("dropped")) {
                $(tableList($orig.attr("id"))).appendTo(this);
                //时间初始化
                console.log('asd')
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN', //日期
                    format: "yyyy/mm/dd hh:ii",
                    initialDate: new Date(), //初始化当前日期
                    autoclose: true, //选中自动关闭
                    todayBtn: true //显示今日按钮
                });
                //上传初始化
                $('.uploadfile').fileinput({
                    language: 'zh',
                    showUpload: false,
                    showCaption: false,
                    maxFileCount: 1
                });
                //省市区初始化
                $('.distpicker').distpicker({
                    province: '省份名',
                    city: '城市名',
                    district: '区名',
                    autoSelect: true,
                    placeholder: false
                });
                //评分初始化
                $(".rating_simple").webwidget_rating_sex({
                    rating_star_length: '5',
                    rating_initial_value: '',
                    rating_function_name: '',
                    directory: '../img/'
                });

                $(".col-sm-7").each(function(){
                    console.log($(this))
                    var pingfen = $(this).children('.webwidget_rating_sex')
                    console.log(pingfen)
                    for(var i=pingfen.length-1; i>0; i--){
                        pingfen.eq(i).remove()
                    }
                });
            } else {
                if ($(this)[0] != $orig.parent()[0]) {
                    var $el = $orig.clone().appendTo(this);
                    $orig.remove()
                }
            }
        }
    }).sortable()

};
//表单自定义
function tableList(id) {
    var content = "";
    switch (id) {
        case "text":
            //文本框
            var text = '<input type="text" class="form-control" placeholder="请输入文本">';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "select":
            //下拉框
            var select = '<select class="form-control"><option>请选择</option><option>默认</option></select>';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">下拉框：</label><div class="col-sm-7">' + select + '</div><p class="tools col-sm-3"><a class="edit-link" name="select" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "textarea":
            //多行文本
            var textarea = '<textarea class="form-control" placeholder="请输入文本"></textarea>';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">多行文本：</label><div class="col-sm-7">' + textarea + '</div><p class="tools col-sm-3"><a class="edit-link" name="textarea" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "radio":
            //单选框
            var radom = Math.ceil(Math.random() * 100000);
            var radio = '<label class="radio-inline"><input type="radio" value="默认1" name="rad' + radom + '" checked> 默认1</label><label class="radio-inline"><input type="radio" name="rad' + radom + '" value="默认2"> 默认2</label>';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">单选：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-3"><a class="edit-link" name="radio" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "checkbox":
            //多选框
            var checkbox = '<label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认1"> 默认1</label><label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认2"> 默认2</label>';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">多选：</label><div class="col-sm-7">' + checkbox + '</div><p class="tools col-sm-3"><a class="edit-link" name="checkbox" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "datetime":
            //时间
            var datetime = '<input readonly="" class="form-control form_datetime" type="text" style="border: 1px solid #e5e6e7;">';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + datetime + '</div><p class="tools col-sm-3"><a class="edit-link" name="datetime" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "file":
            //上传
            var file = '<input class="file uploadfile" type="file" multiple data-min-file-count="1">';
            content = '<div class="form-group draggable ui-draggable dropped file" style="border: 0px"><label class="col-sm-2 control-label">上传：</label><div class="col-sm-7">' + file + '</div><p class="tools col-sm-3"><a class="edit-link" name="file" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "picker":
            //省市区
            var picker = '<form class="form-inline"><div class="distpicker"><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="province10">Province</label><select class="form-control" id="province10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="city10">City</label><select class="form-control" id="city10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="district10">District</label><select class="form-control" id="district10"></select></div></div></form>';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">省市区：</label><div class="col-sm-7">' + picker + '</div><p class="tools col-sm-3"><a class="edit-link" name="picker" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "pingfen":
            //评分
            var pingfen = '<input name="my_input" value="5" class="rating_simple" type="hidden" />';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">评分：</label><div class="col-sm-7">' + pingfen + '</div><p class="tools col-sm-3"><a class="edit-link" name="pingfen" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "image":
            //评分
            var image = '<img style="max-width: 100%" src="" >';
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">图片：</label><div class="col-sm-7">' + image + '</div><p class="tools col-sm-3"><a class="edit-link" name="image" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "product":
            //商品
            content = "<div class=\"form-group draggable ui-draggable dropped\">\n" +
                "                                                    <label class=\"col-sm-2 control-label\">商品名：</label>\n" +
                "                                                    <div class=\"col-sm-7\" style=\"margin: 0 auto;text-align: center\">\n" +
                "                                                        <label class=\"col-sm-2\" style=\"font-size: 20px\">￥0.0</label>\n" +
                "                                                        <img class=\"add\" style=\"margin: 0 auto;\" src=\"../img/add.png\">\n" +
                "                                                        <input type=\"number\" style=\"margin: 0 auto;width: 50px;text-align:center;\" type=\"text\" style=\"width: 30px\">\n" +
                "                                                        <img class=\"reduce\" style=\"margin: 0 auto;\" src=\"../img/reduce.png\">\n" +
                "                                                    </div>\n" +
                "                                                    <p class=\"tools col-sm-3\">\n" +
                "                                                        <a class=\"edit-link\" name=\"product\" title=\"设置\">\n" +
                "                                                            <i class=\"fa fa-cog fa-fw\"></i>\n" +
                "                                                        </a>\n" +
                "                                                        <a class=\"remove-link\">\n" +
                "                                                            <i class=\"fa fa-trash-o\"></i>\n" +
                "                                                        </a>\n" +
                "                                                    </p>\n" +
                "                                                </div>"
            break;

        case "juzhen":
            //矩阵
            var juzhen = "";
            var radom = Math.ceil(Math.random() * 100000);
            juzhen = juzhen + "                                                        <table class=\"tab02\" style=\"width: 100%\">\n" +
                "                                                            <tr>\n" +
                "                                                                <td style=\"width: 25%\"></td>\n" +
                "                                                                <td style=\"width: 25%\">选项1</td>\n" +
                "                                                                <td style=\"width: 25%\">选项2</td>\n" +
                "                                                                <td style=\"width: 25%\">选项3</td>\n" +
                "                                                            </tr>\n" +
                "                                                            <tr>\n" +
                "                                                                <td>问题1</td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项1\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项2\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项3\"></td>\n" +
                "                                                            </tr>"
            radom = Math.ceil(Math.random() * 100000);
            juzhen = juzhen + "                                                            <tr>\n" +
                "                                                                <td>问题2</td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项1\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项2\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项3\"></td>\n" +
                "                                                            </tr>"
            radom = Math.ceil(Math.random() * 100000);
            juzhen = juzhen + "                                                            <tr>\n" +
                "                                                                <td>问题3</td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项1\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项2\"></td>\n" +
                "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"选项3\"></td>\n" +
                "                                                            </tr>\n" +
                "                                                        </table>"
            content = '<div class="form-group draggable ui-draggable dropped"><label class="col-sm-2 control-label">矩阵：</label><div class="col-sm-7">' + juzhen + '</div><p class="tools col-sm-3"><a class="edit-link" name="juzhen" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
    }
    return content;
}
//表单自定义设置
function tabUp(tabL, $el) {
    var content = "";
    switch (tabL) {
        case "text":
            //文本框
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">提示信息：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("input:eq(0)").attr("placeholder") + '" placeholder="请输入提示信息"></div></div></div>';
            break;
        case "select":
            //下拉框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("select").find("option:eq(0)").html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("select").find("option:eq(1)").html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("select").find("option").each(function(index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "textarea":
            //多行文本
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">提示信息：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("textarea").attr("placeholder") + '" placeholder="请输入提示信息"></div></div></div>';
            break;
        case "radio":
            //单选框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='radio']:eq(0)").attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='radio']:eq(1)").attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("input[type='radio']").each(function(index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "checkbox":
            //多选框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='checkbox']:eq(0)").attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='checkbox']:eq(1)").attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("input[type='checkbox']").each(function(index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "datetime":
            //时间
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "file":
            //上传
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "picker":
            //省市区
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "pingfen":
            //评分
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "image":
            //图片
            content = '<div class="row tabup">' +
                '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>' +
                '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">图片：</label><div class="col-sm-9"><input type="file" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>' +
                '</div>';
            break;
        case "product":
            //商品
            content = '<div class="row tabup">' +
                '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">商品名：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>' +
                '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">价格：</label><div class="col-sm-9"><input type="number" class="form-control" value="' + $el.eq(0).children('.col-sm-7').eq(0).children('label:eq(0)').html().replace("￥","") + '" placeholder="请输入价格"></div></div>' +
                '</div>';
            break;
        case "juzhen":
            //矩阵
            console.log($el)
            console.log($el.find("tr"))
            console.log($el.find("tr").eq(0).find("td"))
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            var xuanxiang = $el.find("tr").eq(0).find("td")
            if(xuanxiang.length >0){
                console.log($el.find("tr").eq(0).find("td").eq(1).html())
                for(var i=1; i<xuanxiang.length; i++){
                    if(i == 1){
                        content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">选项' + i + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("tr").eq(0).find("td").eq(i).html() + '" placeholder="请输入选项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add2" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
                    }else{
                        content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">选项' + i + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("tr").eq(0).find("td").eq(i).html() + '" placeholder="请输入选项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                    }
                }
            }
            var wenti = $el.find("tr")
            if(wenti.length > 0){
                for(var i=1; i<wenti.length; i++){
                    if(i == 1){
                        content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">问题' + i + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("tr").eq(i).find("td").eq(0).html() + '" placeholder="请输入问题"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add2" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
                    }else{
                        content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">问题' + i + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("tr").eq(i).find("td").eq(0).html() + '" placeholder="请输入问题"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                    }
                }
            }
            content += '</div>';
            break;
    }
    return content;
}
var get_modal = function(content, tabL, $el) {
    var modal = "";
    if (tabL == "cont") {
        modal = $('<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front"><xmp class="form-control"  style="min-height: 200px; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>').appendTo(document.body);
    } else {
        modal = $('<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front">' + tabUp(tabL, $el) + '<xmp class="form-control"  style="min-height: 200px; display:none; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>').appendTo(document.body);
    }
    return modal;
};
$(document).on("click", ".edit-link", function(ev) {

    var tabname = $(this).attr('name');
    var $el = $(this).parent().parent();
    var $el_copy = $el.clone();
    var $edit_btn = $el_copy.find(".edit-link").parent().remove();
    var $modal = get_modal(html_beautify($el_copy.html()), tabname, $el).modal("show");

    $modal.find(".btn-success").click(function(ev2) {
        //表单自定义js
        switch (tabname) {
            case "text":
                //文本框
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("input:eq(0)").attr("placeholder", $(this).parent().find("input:eq(1)").val());
                $modal.modal("hide");
                return false;
                break;
            case "select":
                //下拉框
                var option = "";
                var panduan = 0;
                $(this).parent().find("input").each(function(index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += "<option>" + $(this).val() + "</option>";
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("select").html(option);
                    $modal.modal("hide");
                }
                break;
            case "textarea":
                //多行文本
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("textarea").attr("placeholder", $(this).parent().find("input:eq(1)").val());
                $modal.modal("hide");
                return false;
                break;
            case "datetime":
                //时间
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "file":
                //上传
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "picker":
                //省市区
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "radio":
                //单选
                var option = "";
                var panduan = 0;
                var radom = Math.ceil(Math.random() * 100000);
                $(this).parent().find("input").each(function(index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else if (index == 1) {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="radio" name="rad' + radom + '" value="' + $(this).val() + '" checked=""> ' + $(this).val() + '</label>';
                        }
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="radio" name="rad' + radom + '" value="' + $(this).val() + '" > ' + $(this).val() + '</label>';
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("div[class='col-sm-7']").html(option);
                    $modal.modal("hide");
                }
                return false;
                break;
            case "checkbox":
                //多选
                var option = "";
                var panduan = 0;
                $(this).parent().find("input").each(function(index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else if (index == 1) {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            // option += '<label class="radio-inline"><input type="checkbox" name="' + $(this).val() + '"> ' + $(this).val() + '</label>';
                            option += '<label class="checkbox-inline"><input type="checkbox" name="' + $(this).val() + '"> ' + $(this).val() + '</label>';
                        }
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            // option += '<label class="radio-inline"><input type="checkbox" name="' + $(this).val() + '" > ' + $(this).val() + '</label>';
                            option += '<label class="checkbox-inline"><input type="checkbox" name="' + $(this).val() + '" > ' + $(this).val() + '</label>';
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("div[class='col-sm-7']").html(option);
                    $modal.modal("hide");
                }
                return false;
                break;
            case "pingfen":
                //评分
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "image":
                //评分
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                var this_file = $(this).parent().find("input:eq(1)")[0].files[0]
                var oFReader = new FileReader();
                oFReader.readAsDataURL(this_file);
                oFReader.onloadend = function (oFRevent) {
                    this_file = oFRevent.target.result;
                    $el.find("img:eq(0)").attr('src',oFRevent.target.result);
                };
                $modal.modal("hide");
                return false;
                break;
            case "product":
                //商品
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("label:eq(1)").html("￥" + $(this).parent().find("input:eq(1)").val());
                $modal.modal("hide");
                return false;
                break;
            case "juzhen":
                //矩阵
                var juzhen = "";
                var panduan = 1
                $(this).parent().find('input').each(function(index, element) {
                    if($(this).val() == ""){
                        panduan = 0
                    }
                });
                if(panduan == 0){
                    alert("不能有空值！");
                    return;
                }

                var wenti_arr = []
                var xuanxiang_arr = []
                var list = $(this).parent().eq(0).children().eq(0).children()
                list.each(function(index, element) {
                    var title = $(this).children().eq(0)[0].innerHTML
                    if(title.indexOf("选项") != -1){
                        xuanxiang_arr.push($(this).children().eq(1).children().eq(0).val())
                    }else if(title.indexOf("问题") != -1){
                        wenti_arr.push($(this).children().eq(1).children().eq(0).val())
                    }
                })
                console.log(wenti_arr)
                console.log(xuanxiang_arr)

                juzhen = juzhen + "<table class=\"tab02\" style=\"width: 100%\">"
                var column_width = 75 / xuanxiang_arr.length
                console.log(column_width)

                juzhen = juzhen + "<tr>" + "<td style=\"width: 25%\"></td>"
                for(var i=0; i<xuanxiang_arr.length; i++){
                    juzhen = juzhen + "<td style=\"width: " + column_width + "%\">" + xuanxiang_arr[i] + "</td>"
                }
                juzhen = juzhen + "</tr>"
                for(var i=0; i< wenti_arr.length; i++){
                    juzhen = juzhen + "<tr>" + "<td>" + wenti_arr[i] + "</td>"
                    var radom = Math.ceil(Math.random() * 100000);
                    for(var j=0; j< xuanxiang_arr.length; j++){
                        juzhen = juzhen + "<td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + xuanxiang_arr[j] + "\"></td>\n"
                    }
                    juzhen = juzhen + "</tr>"
                }
                juzhen = juzhen + " </table>"

                // var radom = Math.ceil(Math.random() * 100000);
                // juzhen = juzhen + "                                                        <table class=\"tab02\" style=\"width: 100%\">\n" +
                //     "                                                            <tr>\n" +
                //     "                                                                <td style=\"width: 25%\"></td>\n" +
                //     "                                                                <td style=\"width: 25%\">" + $(this).parent().find("input:eq(1)").val() + "</td>\n" +
                //     "                                                                <td style=\"width: 25%\">" + $(this).parent().find("input:eq(2)").val() + "</td>\n" +
                //     "                                                                <td style=\"width: 25%\">" + $(this).parent().find("input:eq(3)").val() + "</td>\n" +
                //     "                                                            </tr>\n" +
                //     "                                                            <tr>\n" +
                //     "                                                                <td>" + $(this).parent().find("input:eq(4)").val() + "</td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(1)").val() + "\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(2)").val() + "\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(3)").val() + "\"></td>\n" +
                //     "                                                            </tr>"
                // radom = Math.ceil(Math.random() * 100000);
                // juzhen = juzhen + "                                                            <tr>\n" +
                //     "                                                                <td>" + $(this).parent().find("input:eq(5)").val() + "</td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(1)").val() + "\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(2)").val() + "\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(3)").val() + "\"></td>\n" +
                //     "                                                            </tr>"
                // radom = Math.ceil(Math.random() * 100000);
                // juzhen = juzhen + "                                                            <tr>\n" +
                //     "                                                                <td>" + $(this).parent().find("input:eq(6)").val() + "</td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(1)").val() + "\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(2)").val() + "\"\"></td>\n" +
                //     "                                                                <td><input type=\"radio\" name=\"rad" + radom + "\" value=\"" + $(this).parent().find("input:eq(3)").val() + "\"></td>\n" +
                //     "                                                            </tr>\n" +
                //     "                                                        </table>"
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("div[class='col-sm-7']").html(juzhen);
                $modal.modal("hide");
        }

    })
    //select 增加和删除
    $modal.find(".select-add").click(function() {
        var str = '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
        $(this).parent().parent().parent().parent().find("div[class='row tabup']").append(str);

        $(".select-del").unbind('click');

        $(".select-del").click(function() {
            var r = confirm("是否删除？")
            if (r == true) {
                $(this).parent().parent().remove();
            }

        });
        $(this).parent().parent().parent().parent().find("label[class='col-sm-3 control-label']").each(function(index, element) {
            if (index > 1) {
                $(this).html("子项" + index + "：");
            }
        });
    });

    //select 增加和删除
    $modal.find(".select-add2").click(function() {
        //窗口中每行元素
        var list = $(this).parents().eq(2).children()
        //当前点击元素的label
        var title = $(this).parents().eq(1).children().eq(0)[0].innerHTML.replace("1：","")


        var wenti_num = 1
        var xuanxiang_num = 1
        list.each(function(index, element) {
            var title = $(this).children().eq(0)[0].innerHTML.replace("：","")
            if(title.indexOf("问题") != -1){
                title = title.replace("问题","")
                title = title * 1
                console.log(title)
                if(title >= wenti_num){
                    wenti_num = title + 1
                }
            }else if(title.indexOf("选项") != -1){
                title = title.replace("选项","")
                title = title * 1
                console.log(title)
                if(title >= xuanxiang_num){
                    xuanxiang_num = title + 1
                }
            }
        })
        console.log(wenti_num)
        console.log(xuanxiang_num)
        var this_num = 0
        if(title =='问题'){
            this_num = wenti_num
        }else{
            this_num = xuanxiang_num
        }
        var str = '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">' + title + this_num + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="" placeholder="请输入" + title + "></div><label class="col-sm-1 control-label"><a class="remove-link"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></a></label></div>';
        $(this).parent().parent().parent().parent().find("div[class='row tabup']").append(str);

    });

    $(".select-del").unbind('click');
    $modal.find(".select-del").click(function() {

        var r = confirm("是否删除？")
        if (r == true) {
            $(this).parent().parent().remove();
        }
    });
    //select 增加和删除
});
$(document).on("click", ".remove-link", function(ev) {
    var r = confirm("是否删除？")
    if (r == true) {
        $(this).parent().parent().remove();
    }
});
//自定义表单结束
