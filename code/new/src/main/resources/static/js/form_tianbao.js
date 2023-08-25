let file_obj = {}
let file_panduan = true
//自定义表单开始
$(document).ready(function() {

});

function getList() {
    $('#query').val('')
    $ajax({
        type: 'post',
        url: '/formCreate/queryListById',
        data:{
            id:getUrlParams("id")
        },
        async: false,
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data[0])
            if(res.data[0].formState != '可收集'){
                alert('此表单已关闭，请联系管理员')
                return;
            }
            $(".col-md-12.droppable.sortable.ui-droppable.ui-sortable").html(res.data[0].formBody)
            $("#head_title").html(res.data[0].formName)
            if(res.data[0].headImg != ""){
                $('.set-til.col-md-10').css('background','url(' + res.data[0].headImg + ') no-repeat')
                $('.set-til.col-md-10').css('background-size','cover')
            }
            if(res.data[0].bodyImg != ""){
                $('body').css('background','url(' + res.data[0].bodyImg + ') no-repeat')
                $('body').css('background-size','cover')
            }
        }
    })
}

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

    var id = getUrlParams("id")

    console.log(id)

    getList();

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

    $(".file.uploadfile").change(function () {
        file_panduan = false
        console.log($(this)[0].files)
        var this_file = $(this)[0].files[0]
        console.log(this_file)
        var oFReader = new FileReader();
        if(this_file != undefined){
            var fileName = this_file.name;
            oFReader.readAsDataURL(this_file);
            oFReader.onloadend = function (oFRevent) {
                this_file = oFRevent.target.result;
                file_obj[fileName] = oFRevent.target.result
                console.log(file_obj)
                file_panduan = true
            };
        }
    });

    $("#add-submit-btn").click(function () {
        if(file_panduan == false){
            alert('正在读取上传文件，请稍后再试')
            return;
        }
        var formdata = {};
        var xunhuan = 1
        var insertText = ""
        $(".col-sm-7").each(function(){
            var title = $(this).parent()[0].innerText.split("：")[0] + "："
            console.log(title)
            var input = $(this).children('.form-control')
            var check = $(this).children('.radio-inline')
            var city = $(this).children('.form-inline')
            var file = $(this).children('.file-input')
            var table = $(this).children('.tab02')
            var shangpin = $(this).children('.col-sm-2')
            console.log(table)
            var pingfen = $(this).children('.webwidget_rating_sex')
            if(input.length >0){
                input.each(function(){
                    if(insertText == ""){
                        insertText = title + $(this).val()
                    }else{
                        insertText = insertText + "<br/>" + title + $(this).val()
                    }
                    formdata[xunhuan] = title + $(this).val()
                    xunhuan = xunhuan + 1
                });
            }else if(check.length >0){
                var this_text = ""
                check.each(function(){
                    var radio = $(this).children('input')
                    radio.each(function(){
                        if($(this).attr('checked')=='checked'){
                            if(this_text == ""){
                                this_text = $(this).val()
                            }else{
                                this_text = this_text + "，" + $(this).val()
                            }
                        }else if($(this).is(":checked")){
                            if(this_text == ""){
                                this_text = $(this).attr('name')
                            }else{
                                this_text = this_text + "，" + $(this).attr('name')
                            }
                        }
                    });
                });
                if(insertText == ""){
                    insertText = title + this_text
                }else{
                    insertText = insertText + "<br/>" + title + this_text
                }
                formdata[xunhuan] = title + this_text
                xunhuan = xunhuan + 1
            }else if(city.length > 0){
                var this_text = ""
                var this_select = $(this).eq(0).children().eq(0).children().eq(0).children()
                this_select.each(function(){
                    var this_val = $(this).eq(0).children('select').val()
                    if(this_text == "" && this_val != ""){
                        this_text = this_val
                    }else{
                        this_text = this_text + " " + this_val
                    }
                });
                if(insertText == ""){
                    insertText = title + this_text
                }else{
                    insertText = insertText + "<br/>" + title + this_text
                }
                formdata[xunhuan] = title + this_text
                xunhuan = xunhuan + 1
            }else if(file.length > 0){
                var this_text = ""
                var file_list = file.eq(0).children().eq(4).children('input')[0].files
                console.log(file_list)
                var this_file = file_list[0];
                console.log(this_file)
                var fileName = ""
                if(this_file != undefined){
                    fileName = file_list[0].name;
                    if(insertText == ""){
                        insertText = title + "上传文件```" + fileName + "```" + file_obj[fileName]
                    }else{
                        insertText = insertText + "<br/>" + title + "上传文件```" + fileName + "```" + file_obj[fileName]
                    }
                    formdata[xunhuan] = title + "上传文件```" + fileName + "```" + file_obj[fileName]
                    xunhuan = xunhuan + 1
                }else{
                    if(insertText == ""){
                        insertText = title
                    }else{
                        insertText = insertText + "<br/>" + title
                    }
                    formdata[xunhuan] = title
                    xunhuan = xunhuan + 1
                }
            }else if(pingfen.length > 0){
                var li_list = pingfen.eq(0).children('li')
                var pingfen = 0
                for(var i=0; i<li_list.length; i++){
                    console.log(li_list.eq(i).css('background-position'))
                    if(li_list.eq(i).css('background-position') == '0px -28px'){
                        pingfen = i + 1
                    }
                }
                if(insertText == ""){
                    insertText = title + pingfen
                }else{
                    insertText = insertText + "<br/>" + title + pingfen
                }
                formdata[xunhuan] = title + pingfen
                xunhuan = xunhuan + 1
            }else if(table.length > 0){
                console.log(table)
                console.log(table.eq(0).children().eq(0).children())
                var tr_list = table.eq(0).children().eq(0).children()
                console.log(tr_list)
                var this_text = ""
                for(var i=1; i<tr_list.length; i++){
                    console.log(tr_list.eq(i).children())
                    var td_list = tr_list.eq(i).children()
                    for(var j=1; j<td_list.length; j++){
                        var radio = td_list.eq(j).children().eq(0)
                        if(radio.is(":checked")){
                            if(this_text != ""){
                                this_text = this_text + "，" + td_list.eq(0)[0].innerHTML + "：" + radio.val()
                            }else{
                                this_text = td_list.eq(0)[0].innerHTML + "：" + radio.val()
                            }
                        }
                    }
                }
                console.log(this_text)
                if(insertText == ""){
                    insertText = title + this_text
                }else{
                    insertText = insertText + "<br/>" + title + this_text
                }
                formdata[xunhuan] = title + this_text
                xunhuan = xunhuan + 1
            }else if(shangpin.length > 0){
                console.log(shangpin.html())
                var price = shangpin.html()
                var num = shangpin.parents().eq(0).children().eq(2).val()
                this_text =  price + "  " + num
                if(insertText == ""){
                    insertText = title + this_text
                }else{
                    insertText = insertText + "<br/>" + title + this_text
                }
                formdata[xunhuan] = title + this_text
                xunhuan = xunhuan + 1
            }
        });

        console.log(formdata);
        console.log(insertText);

        var json = JSON.stringify({
                formId: getUrlParams("id"),
                insertText: insertText,
            })
        console.log(json)

        if(formdata != ""){
            $ajax({
                type: 'post',
                url: '/formShouJi/add',
                data: {
                    userInfoJson: json
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

        }else{
            alert("未读取到信息")
        }
    })

});

function getUrlParams(key) {
    var url = window.location.search.substr(1);
    if (url == '') {
        return false;
    }
    var paramsArr = url.split('&');
    for (var i = 0; i < paramsArr.length; i++) {
        var combina = paramsArr[i].split("=");
        if (combina[0] == key) {
            return combina[1];
        }
    }
    return false;
};
