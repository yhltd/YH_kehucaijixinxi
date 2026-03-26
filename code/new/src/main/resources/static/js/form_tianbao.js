let file_obj = {}
let file_panduan = true
let isSubmitted = false;
//自定义表单开始
$(document).ready(function() {
    var savedCompany = localStorage.getItem('savedCompany');
    var storageSpaceKB = localStorage.getItem('storageSpace');

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

    // $("#add-submit-btn").click(function () {
    //     // 防止重复提交
    //     if (isSubmitted) {
    //         alert('您已经提交过表单，不能重复提交！');
    //         return;
    //     }
    //
    //     if(file_panduan == false){
    //         alert('正在读取上传文件，请稍后再试')
    //         return;
    //     }
    //     var formdata = {};
    //     var xunhuan = 1
    //     var insertText = ""
    //     $(".col-sm-7").each(function(){
    //         var title = $(this).parent()[0].innerText.split("：")[0] + "："
    //         console.log(title)
    //         var input = $(this).children('.form-control')
    //         var check = $(this).children('.radio-inline')
    //         var check1 = $(this).children('.checkbox-inline')
    //         var city = $(this).children('.form-inline')
    //         var file = $(this).children('.file-input')
    //         var table = $(this).children('.tab02')
    //         var shangpin = $(this).children('.col-sm-2')
    //         console.log(table)
    //         var pingfen = $(this).children('.webwidget_rating_sex')
    //         if(input.length >0){
    //             input.each(function(){
    //                 if(insertText == ""){
    //                     insertText = title + $(this).val()
    //                 }else{
    //                     insertText = insertText + "<br/>" + title + $(this).val()
    //                 }
    //                 formdata[xunhuan] = title + $(this).val()
    //                 xunhuan = xunhuan + 1
    //             });
    //         }
    //         else if(check.length >0){
    //             var this_text = "";
    //             check.each(function() {
    //                 var group = $(this);
    //                 var selectedValue = '';
    //                 var selectedName = '';
    //
    //                 // 仅处理单选按钮
    //                 group.find('input[type="radio"]').each(function() {
    //                     if ($(this).is(':checked')) {
    //                         selectedValue = $(this).val() || '';  // 优先取value值
    //                         selectedName = $(this).attr('name');   // 保留name属性
    //                         return false; // 找到第一个选中项后立即退出循环
    //                     }
    //                 });
    //
    //                 // 拼接逻辑（value优先，空值时用name替代）
    //                 var displayText = selectedValue || selectedName;
    //
    //                 if (this_text === "") {
    //                     this_text = displayText;
    //                 } else {
    //                     this_text += "" + displayText;
    //                 }
    //             });
    //
    //             if (insertText === "") {
    //                 insertText = title + this_text;
    //             } else {
    //                 insertText += "<br/>" + title + this_text;
    //             }
    //
    //             formdata[xunhuan] = {
    //                 title: title,
    //                 value: this_text
    //             };
    //             xunhuan++;
    //
    //         }
    //         else if(check1.length >0){
    //
    //             var this_text = ""
    //             check1.each(function(){
    //                 var radio = $(this).children('input')
    //                 radio.each(function(){
    //                     if($(this).attr('checked')=='checked'){
    //                         if(this_text == ""){
    //                             this_text = $(this).val()
    //                         }else{
    //                             this_text = this_text + "，" + $(this).val()
    //                         }
    //                     }else if($(this).is(":checked")){
    //                         if(this_text == ""){
    //                             this_text = $(this).attr('name')
    //                         }else{
    //                             this_text = this_text + "，" + $(this).attr('name')
    //                         }
    //                     }
    //                 });
    //             });
    //             if(insertText == ""){
    //                 insertText = title + this_text
    //             }else{
    //                 insertText = insertText + "<br/>" + title + this_text
    //             }
    //             formdata[xunhuan] = title + this_text
    //             xunhuan = xunhuan + 1
    //
    //         }
    //         else if(city.length > 0){
    //             var this_text = ""
    //             var this_select = $(this).eq(0).children().eq(0).children().eq(0).children()
    //             this_select.each(function(){
    //                 var this_val = $(this).eq(0).children('select').val()
    //                 if(this_text == "" && this_val != ""){
    //                     this_text = this_val
    //                 }else{
    //                     this_text = this_text + " " + this_val
    //                 }
    //             });
    //             if(insertText == ""){
    //                 insertText = title + this_text
    //             }else{
    //                 insertText = insertText + "<br/>" + title + this_text
    //             }
    //             formdata[xunhuan] = title + this_text
    //             xunhuan = xunhuan + 1
    //         }else if(file.length > 0){
    //             var this_text = ""
    //             var file_list = file.eq(0).children().eq(4).children('input')[0].files
    //             console.log(file_list)
    //             var this_file = file_list[0];
    //             console.log(this_file)
    //             var fileName = ""
    //             if(this_file != undefined){
    //                 fileName = file_list[0].name;
    //                 if(insertText == ""){
    //                     insertText = title + "上传文件```" + fileName + "```" + file_obj[fileName]
    //                 }else{
    //                     insertText = insertText + "<br/>" + title + "上传文件```" + fileName + "```" + file_obj[fileName]
    //                 }
    //                 formdata[xunhuan] = title + "上传文件```" + fileName + "```" + file_obj[fileName]
    //                 xunhuan = xunhuan + 1
    //             }else{
    //                 if(insertText == ""){
    //                     insertText = title
    //                 }else{
    //                     insertText = insertText + "<br/>" + title
    //                 }
    //                 formdata[xunhuan] = title
    //                 xunhuan = xunhuan + 1
    //             }
    //         }else if(pingfen.length > 0){
    //             var li_list = pingfen.eq(0).children('li')
    //             var pingfen = 0
    //             for(var i=0; i<li_list.length; i++){
    //                 console.log(li_list.eq(i).css('background-position'))
    //                 if(li_list.eq(i).css('background-position') == '0px -28px'){
    //                     pingfen = i + 1
    //                 }
    //             }
    //             if(insertText == ""){
    //                 insertText = title + pingfen
    //             }else{
    //                 insertText = insertText + "<br/>" + title + pingfen
    //             }
    //             formdata[xunhuan] = title + pingfen
    //             xunhuan = xunhuan + 1
    //         }else if(table.length > 0){
    //             console.log(table)
    //             console.log(table.eq(0).children().eq(0).children())
    //             var tr_list = table.eq(0).children().eq(0).children()
    //             console.log(tr_list)
    //             var this_text = ""
    //             for(var i=1; i<tr_list.length; i++){
    //                 console.log(tr_list.eq(i).children())
    //                 var td_list = tr_list.eq(i).children()
    //                 for(var j=1; j<td_list.length; j++){
    //                     var radio = td_list.eq(j).children().eq(0)
    //                     if(radio.is(":checked")){
    //                         if(this_text != ""){
    //                             this_text = this_text + "，" + td_list.eq(0)[0].innerHTML + "：" + radio.val()
    //                         }else{
    //                             this_text = td_list.eq(0)[0].innerHTML + "：" + radio.val()
    //                         }
    //                     }
    //                 }
    //             }
    //             console.log(this_text)
    //             if(insertText == ""){
    //                 insertText = title + this_text
    //             }else{
    //                 insertText = insertText + "<br/>" + title + this_text
    //             }
    //             formdata[xunhuan] = title + this_text
    //             xunhuan = xunhuan + 1
    //         }else if(shangpin.length > 0){
    //             console.log(shangpin.html())
    //             var price = shangpin.html()
    //             var num = shangpin.parents().eq(0).children().eq(2).val()
    //             this_text =  price + "  " + num
    //             if(insertText == ""){
    //                 insertText = title + this_text
    //             }else{
    //                 insertText = insertText + "<br/>" + title + this_text
    //             }
    //             formdata[xunhuan] = title + this_text
    //             xunhuan = xunhuan + 1
    //         }
    //     });
    //
    //     console.log(formdata);
    //     console.log(insertText);
    //
    //     if(formdata == "" || Object.keys(formdata).length === 0){
    //         alert("请填写表单信息");
    //         return;
    //     }
    //
    //     // 添加确认弹窗
    //     if (confirm("信息提交后不可修改，确认提交吗？")) {
    //         // 禁用提交按钮，防止重复点击
    //         $(this).prop('disabled', true);
    //         $(this).text('提交中...');
    //
    //         var json = JSON.stringify({
    //             formId: getUrlParams("id"),
    //             insertText: insertText,
    //         });
    //         console.log(json);
    //
    //         $ajax({
    //             type: 'post',
    //             url: '/formShouJi/add',
    //             data: {
    //                 userInfoJson: json
    //             },
    //             dataType: 'json',
    //             contentType: 'application/json;charset=utf-8',
    //             async: false,
    //         }, false, '', function (res) {
    //             if (res.code == 200) {
    //                 // 设置已提交标志
    //                 isSubmitted = true;
    //
    //                 // 显示成功提示
    //                 alert(res.msg);
    //
    //                 // 跳转到成功页面
    //                 var successUrl = "/html/success.html"; // 这里换成你的成功页面URL
    //                 // 或者可以用相对路径：successUrl = "/form/success";
    //
    //                 // 如果有表单ID，可以传递过去
    //                 var formId = getUrlParams("id");
    //                 if (formId) {
    //                     successUrl += "?formId=" + formId;
    //                 }
    //
    //                 // 跳转到成功页面
    //                 window.location.href = successUrl;
    //
    //                 // 或者如果服务器返回了跳转URL，可以使用服务器返回的
    //                 // if (res.data && res.data.redirectUrl) {
    //                 //     window.location.href = res.data.redirectUrl;
    //                 // }
    //             } else {
    //                 alert(res.msg);
    //                 // 提交失败，重新启用按钮
    //                 $("#add-submit-btn").prop('disabled', false);
    //                 $("#add-submit-btn").text('提交');
    //             }
    //         });
    //     }
    // })
    $("#add-submit-btn").click(async function () {
        // 防止重复提交
        if (isSubmitted) {
            alert('您已经提交过表单，不能重复提交！');
            return;
        }

        if (file_panduan == false) {
            alert('正在读取上传文件，请稍后再试');
            return;
        }

        // ========== 获取存储空间限制和公司名 ==========
        var savedCompany = localStorage.getItem('savedCompany');
        var storageSpaceKB = localStorage.getItem('storageSpace');

        var formdata = {};
        var xunhuan = 1;
        var insertText = "";
        var uploadTasks = []; // 存储所有上传任务

        $(".col-sm-7").each(function () {
            var title = $(this).parent()[0].innerText.split("：")[0] + "：";
            console.log(title);
            var input = $(this).children('.form-control');
            var check = $(this).children('.radio-inline');
            var check1 = $(this).children('.checkbox-inline');
            var city = $(this).children('.form-inline');
            var file = $(this).children('.file-input');
            var table = $(this).children('.tab02');
            var shangpin = $(this).children('.col-sm-2');
            console.log(table);
            var pingfen = $(this).children('.webwidget_rating_sex');

            // 处理输入框
            if (input.length > 0) {
                input.each(function () {
                    if (insertText == "") {
                        insertText = title + $(this).val();
                    } else {
                        insertText = insertText + "<br/>" + title + $(this).val();
                    }
                    formdata[xunhuan] = title + $(this).val();
                    xunhuan = xunhuan + 1;
                });
            }
            // 处理单选按钮
            else if (check.length > 0) {
                var this_text = "";
                check.each(function () {
                    var group = $(this);
                    var selectedValue = '';
                    var selectedName = '';

                    group.find('input[type="radio"]').each(function () {
                        if ($(this).is(':checked')) {
                            selectedValue = $(this).val() || '';
                            selectedName = $(this).attr('name');
                            return false;
                        }
                    });

                    var displayText = selectedValue || selectedName;

                    if (this_text === "") {
                        this_text = displayText;
                    } else {
                        this_text += "" + displayText;
                    }
                });

                if (insertText === "") {
                    insertText = title + this_text;
                } else {
                    insertText += "<br/>" + title + this_text;
                }

                formdata[xunhuan] = {
                    title: title,
                    value: this_text
                };
                xunhuan++;
            }
            // 处理复选框
            else if (check1.length > 0) {
                var this_text = "";
                check1.each(function () {
                    var radio = $(this).children('input');
                    radio.each(function () {
                        if ($(this).attr('checked') == 'checked') {
                            if (this_text == "") {
                                this_text = $(this).val();
                            } else {
                                this_text = this_text + "，" + $(this).val();
                            }
                        } else if ($(this).is(":checked")) {
                            if (this_text == "") {
                                this_text = $(this).attr('name');
                            } else {
                                this_text = this_text + "，" + $(this).attr('name');
                            }
                        }
                    });
                });
                if (insertText == "") {
                    insertText = title + this_text;
                } else {
                    insertText = insertText + "<br/>" + title + this_text;
                }
                formdata[xunhuan] = title + this_text;
                xunhuan = xunhuan + 1;
            }
            // 处理省市区
            else if (city.length > 0) {
                var this_text = "";
                var this_select = $(this).eq(0).children().eq(0).children().eq(0).children();
                this_select.each(function () {
                    var this_val = $(this).eq(0).children('select').val();
                    if (this_text == "" && this_val != "") {
                        this_text = this_val;
                    } else {
                        this_text = this_text + " " + this_val;
                    }
                });
                if (insertText == "") {
                    insertText = title + this_text;
                } else {
                    insertText = insertText + "<br/>" + title + this_text;
                }
                formdata[xunhuan] = title + this_text
                xunhuan = xunhuan + 1
            } else if (file.length > 0) {
                var fileInput = file.eq(0).find('input[type="file"]')[0];
                if (fileInput && fileInput.files.length > 0) {
                    var this_file = fileInput.files[0];
                    var fileName = this_file.name;
                    var currentTitle = title;
                    var currentXunhuan = xunhuan;

                    // 文件大小验证（不能超过 500MB）
                    var maxSizeMB = 500;
                    var maxSizeBytes = maxSizeMB * 1024 * 1024;
                    var fileSizeMB = this_file.size / (1024 * 1024);

                    if (this_file.size > maxSizeBytes) {
                        alert("文件大小超过限制！\n当前文件: " + fileSizeMB.toFixed(2) + " MB\n最大允许: " + maxSizeMB + " MB");
                        hasFileError = true;
                        return false; // 跳出 each 循环
                    }
                    console.log("文件大小验证通过:", fileSizeMB.toFixed(2), "MB /", maxSizeMB, "MB");

                    var path = "/xinxicaiji/" + savedCompany + "/";

                    // 创建上传任务的Promise
                    var uploadPromise = new Promise(async function (resolve, reject) {
                        // 先检查空间
                        try {
                            var spaceResult = await checkTotalSpace(savedCompany, storageSpaceKB);
                            if (!spaceResult.canUpload) {
                                reject("存储空间不足，无法上传！");
                                return;
                            }
                        } catch (error) {
                            reject("空间检查失败: " + error);
                            return;
                        }

                        var formData = new FormData();
                        formData.append('file', this_file);
                        formData.append('name', fileName);
                        formData.append('path', path);
                        var storageSpaceGB = (storageSpaceKB / 1024 / 1024).toFixed(0);
                        formData.append('kongjian', storageSpaceGB);

                        $.ajax({
                            url: "https://yhocn.cn:9097/file/upload",
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (res) {
                                if (res.code === 200) {
                                    var fileUrl = "http://yhocn.cn:9088" + path + fileName;
                                    resolve({
                                        title: currentTitle,
                                        fileName: fileName,
                                        fileUrl: fileUrl,
                                        xunhuan: currentXunhuan
                                    });
                                } else {
                                    reject("上传失败：" + (res.msg || "未知错误"));
                                }
                            },
                            error: function (xhr, status, error) {
                                reject("上传失败：" + error);
                            }
                        });
                    });

                    uploadTasks.push({
                        promise: uploadPromise,
                        xunhuan: currentXunhuan
                    });

                    xunhuan = xunhuan + 1;
                } else {
                    // 没有选择文件
                    if (insertText == "") {
                        insertText = title;
                    } else {
                        insertText = insertText + "<br/>" + title;
                    }
                    formdata[xunhuan] = title;
                    xunhuan = xunhuan + 1;
                }
            }
            // 处理评分
            else if (pingfen.length > 0) {
                var li_list = pingfen.eq(0).children('li');
                var pingfenVal = 0;
                for (var i = 0; i < li_list.length; i++) {
                    console.log(li_list.eq(i).css('background-position'));
                    if (li_list.eq(i).css('background-position') == '0px -28px') {
                        pingfenVal = i + 1;
                    }
                }
                if (insertText == "") {
                    insertText = title + pingfenVal;
                } else {
                    insertText = insertText + "<br/>" + title + pingfenVal;
                }
                formdata[xunhuan] = title + pingfenVal;
                xunhuan = xunhuan + 1;
            }
            // 处理表格
            else if (table.length > 0) {
                console.log(table);
                console.log(table.eq(0).children().eq(0).children());
                var tr_list = table.eq(0).children().eq(0).children();
                console.log(tr_list);
                var this_text = "";
                for (var i = 1; i < tr_list.length; i++) {
                    console.log(tr_list.eq(i).children());
                    var td_list = tr_list.eq(i).children();
                    for (var j = 1; j < td_list.length; j++) {
                        var radio = td_list.eq(j).children().eq(0);
                        if (radio.is(":checked")) {
                            if (this_text != "") {
                                this_text = this_text + "，" + td_list.eq(0)[0].innerHTML + "：" + radio.val();
                            } else {
                                this_text = td_list.eq(0)[0].innerHTML + "：" + radio.val();
                            }
                        }
                    }
                }
                console.log(this_text);
                if (insertText == "") {
                    insertText = title + this_text;
                } else {
                    insertText = insertText + "<br/>" + title + this_text;
                }
                formdata[xunhuan] = title + this_text;
                xunhuan = xunhuan + 1;
            }
            // 处理商品
            else if (shangpin.length > 0) {
                console.log(shangpin.html());
                var price = shangpin.html();
                var num = shangpin.parents().eq(0).children().eq(2).val();
                this_text = price + "  " + num;
                if (insertText == "") {
                    insertText = title + this_text;
                } else {
                    insertText = insertText + "<br/>" + title + this_text;
                }
                formdata[xunhuan] = title + this_text;
                xunhuan = xunhuan + 1;
            }
        });

        // 如果有文件上传任务，等待所有上传完成
        if (uploadTasks.length > 0) {
            $(this).prop('disabled', true);
            $(this).text('上传文件中...');

            try {
                var uploadResults = await Promise.all(
                    uploadTasks.map(task => task.promise)
                );

                uploadResults.forEach(function (result) {
                    var fileText = "上传文件```" + result.fileName + "```" + result.fileUrl;
                    if (insertText == "") {
                        insertText = result.title + fileText;
                    } else {
                        insertText = insertText + "<br/>" + result.title + fileText;
                    }
                    formdata[result.xunhuan] = result.title + fileText;
                });

            } catch (error) {
                alert(error);
                $(this).prop('disabled', false);
                $(this).text('提交');
                return;
            }
        }

        // 所有数据处理完成，继续执行
        console.log(formdata);
        console.log(insertText);

        if (formdata == "" || Object.keys(formdata).length === 0) {
            alert("请填写表单信息");
            return;
        }

        // 添加确认弹窗
        if (confirm("信息提交后不可修改，确认提交吗？")) {
            // 禁用提交按钮，防止重复点击
            $(this).prop('disabled', true);
            $(this).text('提交中...');

            var json = JSON.stringify({
                formId: getUrlParams("id"),
                insertText: insertText,
            });
            console.log(json);

            $.ajax({
                type: 'post',
                url: '/formShouJi/add',
                data: {
                    userInfoJson: json
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (res) {
                    if (res.code == 200) {
                        // 设置已提交标志
                        isSubmitted = true;

                        // 显示成功提示
                        alert(res.msg);

                        // 跳转到成功页面
                        var successUrl = "/html/success.html";
                        var formId = getUrlParams("id");
                        if (formId) {
                            successUrl += "?formId=" + formId;
                        }

                        window.location.href = successUrl;
                    } else {
                        alert(res.msg);
                        // 提交失败，重新启用按钮
                        $("#add-submit-btn").prop('disabled', false);
                        $("#add-submit-btn").text('提交');
                    }
                },
                error: function () {
                    alert("提交失败，请检查网络连接");
                    $("#add-submit-btn").prop('disabled', false);
                    $("#add-submit-btn").text('提交');
                }
            });
        }
    });

});


function checkTotalSpace(companyName, limitKB) {
    return new Promise((resolve, reject) => {
        // 并行请求数据库大小和文件夹大小
        var dbRequest = $.ajax({
            url: "/formShouJi/getCompanyTableSizes",
            type: "GET",
            data: { companyName: companyName }
        });

        var path = "/xinxicaiji/" + companyName + "/";
        var folderRequest = $.ajax({
            url: "https://yhocn.cn:9097/file/getFolderSize",
            type: 'GET',
            data: { path: path }
        });

        $.when(dbRequest, folderRequest).done(function(dbRes, folderRes) {
            var dbData = dbRes[0];
            var folderData = folderRes[0];

            // 检查数据库请求是否成功
            if (dbData.code !== 200) {
                reject("获取数据库大小失败: " + (dbData.msg || "未知错误"));
                return;
            }

            var dbSizeKB = dbData.data.totalSizeKB;
            var folderSizeKB = 0;

            // 检查文件夹请求结果
            if (folderData.code === 200) {
                // 文件夹存在，获取大小
                folderSizeKB = folderData.data.sizeBytes / 1024;
                console.log("文件夹大小:", folderSizeKB.toFixed(2), "KB");
            } else if (folderData.code === 500 && folderData.msg === "文件夹不存在") {
                // 文件夹不存在，大小设为 0
                folderSizeKB = 0;
                console.log("文件夹不存在，大小设为 0 KB");
            } else {
                // 其他错误，也设为 0 继续执行
                console.warn("获取文件夹大小失败:", folderData.msg);
                folderSizeKB = 0;
            }

            // 总使用空间（KB）
            var totalUsedKB = dbSizeKB + folderSizeKB;

            // 使用率
            var usagePercent = (totalUsedKB / limitKB) * 100;

            console.log("数据库大小:", dbSizeKB, "KB");
            console.log("文件夹大小:", folderSizeKB.toFixed(2), "KB");
            console.log("总使用:", totalUsedKB.toFixed(2), "KB", "(", usagePercent.toFixed(2), "%)");
            console.log("限制:", limitKB, "KB", "(", (limitKB / 1024 / 1024).toFixed(2), "GB)");

            var canUpload = true;
            var message = "";

            if (totalUsedKB >= limitKB * 1.1) {
                canUpload = false;
                message = "空间使用已超100%（" + usagePercent.toFixed(2) + "%），无法上传！";
                alert(message);
                $("#upload-btn").prop("disabled", true);
            } else if (totalUsedKB >= limitKB * 0.9) {
                message = "空间使用已超90%（" + usagePercent.toFixed(2) + "%），请注意清理！";
                alert(message);
                $("#upload-btn").prop("disabled", false);
            } else {
                $("#upload-btn").prop("disabled", false);
            }

            resolve({
                canUpload: canUpload,
                usagePercent: usagePercent,
                totalUsedKB: totalUsedKB,
                limitKB: limitKB
            });

        }).fail(function(err) {
            console.error("获取空间信息失败:", err);
            reject("请求失败");
        });
    });
}


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
