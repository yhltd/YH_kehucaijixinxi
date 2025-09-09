// function alert(msg){
//     let $alerts = $('#alerts')
//     if($alerts.length == 0){
//         $alerts = $('<div id="alerts" class="alerts"></div>')
//         $('body').append($alerts)
//     }
//     let $alert = $('<div class="alert alert-primary alert-dismissible fade show">'+msg+'</div>')
//     $alerts.append($alert)
// }

// $(function () {
//
//     var onload_url = $.session.get('onload_url');
//     if (onload_url != undefined && onload_url !=''){
//         $('#iframe').attr('src', onload_url);
//     }
//     $.session.set('onload_url', '')
//
// })


// 全局变量，用于存储轮播图定时器
var carouselInterval = null;

$(function() {
    console.log("方法调用");
    getList();
});

function getList() {
    console.log("方法内部");
    $ajax({
        type: 'post',
        url: '/psuhnews/getnews',
    }, false, '', function(res) {
        if (res.code == 200) {
            // 清除之前的定时器
            if (carouselInterval) {
                clearInterval(carouselInterval);
                carouselInterval = null;
            }

            images = [
                { tptop2: "" },
                { tptop3: "" },
                { tptop4: "" },
                { tptop5: "" },
                { tptop6: "" }
            ]

            xuantu = "data:image/jpg;base64," + res.data[0].tptop1;

            // 设置图片数据
            if (res.data[0].tptop2 && res.data[0].tptop2.trim() !== "") {
                images[0].tptop2 = "data:image/jpg;base64," + res.data[0].tptop2;
            }
            if (res.data[0].tptop3 && res.data[0].tptop3.trim() !== "") {
                images[1].tptop3 = "data:image/jpg;base64," + res.data[0].tptop3;
            }
            if (res.data[0].tptop4 && res.data[0].tptop4.trim() !== "") {
                images[2].tptop4 = "data:image/jpg;base64," + res.data[0].tptop4;
            }
            if (res.data[0].tptop5 && res.data[0].tptop5.trim() !== "") {
                images[3].tptop5 = "data:image/jpg;base64," + res.data[0].tptop5;
            }
            if (res.data[0].tptop6 && res.data[0].tptop6.trim() !== "") {
                images[4].tptop6 = "data:image/jpg;base64," + res.data[0].tptop6;
            }

            tankuan = res.data[0].xuankuan;
            dingkuan = 100;
            dinggao = res.data[0].topgao;
            textboxValue = res.data[0].textbox;
            localStorage.setItem('marqueeTextValue', textboxValue);

            // 创建轮播图数据
            var carouselImages = [
                { url: images[0].tptop2 || "https://picsum.photos/id/10/800/500", alt: "图1" },
                { url: images[1].tptop3 || "https://picsum.photos/id/11/800/500", alt: "图2" },
                { url: images[2].tptop4 || "https://picsum.photos/id/12/800/500", alt: "图3" },
                { url: images[3].tptop5 || "https://picsum.photos/id/13/800/500", alt: "图4" },
                { url: images[4].tptop6 || "https://picsum.photos/id/14/800/500", alt: "图5" }
            ];

            console.log(carouselImages, "轮播图图片数据");

            // 设置容器样式
            $(".carousel-container").css({
                width: dingkuan + "%",
                height: dinggao + "px"
            });

            var currentIndex = 0;
            var totalItems = carouselImages.length;

            // 初始化轮播图
            function initCarousel() {
                var carouselImagesContainer = $("#carouselImages");
                var indicatorsContainer = $("#carouselIndicators");
                carouselImagesContainer.empty();
                indicatorsContainer.empty();

                // 根据数组动态生成轮播项
                for (var i = 0; i < carouselImages.length; i++) {
                    var item = $("<div>")
                        .addClass("carousel-item")
                        .attr("id", "img" + (i + 1))
                        .data("index", i);

                    if (i === 0) {
                        item.addClass("active");
                    }

                    var img = $("<img>")
                        .attr("src", carouselImages[i].url)
                        .attr("alt", carouselImages[i].alt);

                    item.append(img);
                    carouselImagesContainer.append(item);

                    // 添加指示器
                    var indicator = $("<div>")
                        .addClass("indicator")
                        .data("index", i);

                    if (i === 0) {
                        indicator.addClass("active");
                    }

                    indicatorsContainer.append(indicator);
                }

                // 绑定指示器点击事件
                $(".indicator").on("click", function() {
                    var index = $(this).data("index");
                    goToSlide(index);
                });

                // 绑定导航按钮事件
                $(".prev-btn").on("click", function() {
                    goToSlide((currentIndex - 1 + totalItems) % totalItems);
                });

                $(".next-btn").on("click", function() {
                    goToSlide((currentIndex + 1) % totalItems);
                });
            }

            // 切换到指定幻灯片
            function goToSlide(index) {
                // 隐藏当前图片
                $("#img" + (currentIndex + 1)).removeClass("active");
                $(".indicator").eq(currentIndex).removeClass("active");

                currentIndex = index;

                // 显示下一张图片
                $("#img" + (currentIndex + 1)).addClass("active");
                $(".indicator").eq(currentIndex).addClass("active");
            }

            // 切换图片函数
            function switchImage() {
                goToSlide((currentIndex + 1) % totalItems);
            }

            // 初始化轮播图
            initCarousel();

            // 设置自动切换 - 使用全局变量
            carouselInterval = setInterval(switchImage, 5000);

            // 鼠标悬停时暂停轮播 - 使用全局变量
            $(".carousel-container").hover(
                function() {
                    if (carouselInterval) {
                        clearInterval(carouselInterval);
                        carouselInterval = null;
                    }
                },
                function() {
                    if (!carouselInterval) {
                        carouselInterval = setInterval(switchImage, 5000);
                    }
                }
            );

            // 设置CSS变量
            document.documentElement.style.setProperty('--tankuan', tankuan + "px");
            document.documentElement.style.setProperty('--dinggao', dinggao + "px");

            // 设置其他图片
            var targetImg = document.querySelector('.index-images img');
            if (targetImg && xuantu) {
                targetImg.src = xuantu;
            }
        }
    });
}

// 页面卸载时清理定时器，防止内存泄漏
$(window).on('beforeunload', function() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
});



function yinClick() {
    document.querySelector('.carousel-container').classList.add('hidden');  // 隐藏顶部元素
}
function tanClick() {
    document.querySelector('.carousel-index').classList.add('hidden');  // 隐藏弹窗元素
}


document.addEventListener('DOMContentLoaded', function() {
    var textboxValue = localStorage.getItem('marqueeTextValue');
    var marqueetext = document.getElementById("marqueeText");

    if(marqueetext && textboxValue){
        console.log("从localStorage获取到数据:", textboxValue);
        marqueetext.textContent = textboxValue;
    }
});




function $ajax(options, isLoading, loadingEl, success) {
    $.ajax({
        timeout: 1000000,
        ...options,
        beforeSend: function () {
            if (isLoading) {

            }
        },
        success: res => {
            if (res.code == 401) {
                alert(res.msg);
                return;
            }
            success(res);
        },
        error: err => {
            if(err.responseText == 'loseToken'){
                alert('身份验证已过期，请重新登录');
                window.location.href = '/';
                return;
            }

            if (err.status == 'timeout') {
                alert('网络超时，请稍后再试。')
            } else {
                alert('网络错误，请稍后再试。')
            }
        },
        complete: res => {
            if (isLoading) {

            }
        }
    })
}

function loadingShow(el) {

}

function loadingHide(el) {

}

function formToJson(el) {
    let formData = $(el).serialize();
    let deCode = decodeURIComponent(formData);
    deCode = deCode.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\+/g, " ").replace(/[\r\n]/g, "<br>");
    deCode = "{\"" + deCode + "\"}";
    return JSON.parse(deCode);
}

function setForm(params, el) {
    for (let param in params) {
        $(el + ' input').each(function (index, input) {
            if ($(input).attr('name') == param) {
                $(input).val(params[param]);
                return false;
            }
        })
        $(el + ' select').each(function (index, select) {
            if ($(select).attr('name') == param) {
                $(select).val(params[param]);
                return false;
            }
        })
    }
}

function setTextArea(params, el) {
    for (let param in params) {
        $(el + ' textarea').each(function (index, textarea) {
            if ($(textarea).attr('name') == param) {
                let str = params[param]
                console.log(str)
                var reg = new RegExp("<br><br>","g")
                var newstr = str.replace(reg,"\n")
                console.log(newstr)
                $(textarea).val(newstr);
                return false;
            }
        })
    }
}

function checkForm(el) {
    let result = true
    $(el + ' input').each(function(index,input){
        let isRequired = $(input).data('required');
        if(isRequired == "1"){
            return true;
        }
        if($(input).val() == '' || $(input).val() <= 0){
            $(input).next().css('display','block')
            result = false
        }else{
            $(input).next().css('display','none')
        }
    })
    $(el + ' select').each(function(index,select){
        if($(select).val() == '' || $(select).val() == undefined){
            $(select).next().css('display','block')
            result = false
        }else{
            $(select).next().css('display','none')
        }
    })
    return result;
}

function formatDate(date, format) {
    if (!date) return;
    if (!format)
        format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}

//获取表格选择行
function getTableSelection(tableEl) {
    let result = [];
    let tableData = $(tableEl).bootstrapTable('getData');
    $(tableEl + ' tr').each(function (i, tr) {
        let index = $(tr).data('index');
        if (index != undefined) {
            if ($(tr).hasClass('selected')) {
                result.push({
                    index: index,
                    data: tableData[index]
                })
            }
        }
    })
    return result;
}

//选择表格行
function setTableSelection(tableEl, rowIndex, isSelect) {
    $(tableEl + ' tr').each(function (i, tr) {
        let index = $(tr).data('index');
        if (index == rowIndex) {
            if (isSelect) {
                $(tr).addClass('selected')
            } else {
                $(tr).removeClass('selected')
            }
        }
    })
}


$(function () {
    $('#out-a').click(function(){
        window.location.href = '/';
        location.reload()
    })
    $('#out-aa').click(function(){
        window.location.href = '/';
        location.reload()
    })

    $('#refresh_btn').click(function(){
        window.location.href = '/';
        location.reload();
    })

    $(function () {
        $('#nav-shouye').click(function () {
            window.location.href = '/html/main.html';
        })
    })
    // //点击修改密码显示弹窗
    // $("#updPwd-a").click(function () {
    //     $('#update-modal').modal('show');
    // })
    //
    // //点击提交按钮
    // $("#update-submit-btn").click(function () {
    //     if(checkForm('#updPwdForm')) {
    //         let params = formToJson('#updPwdForm')
    //         if (params.newPwd != params.newPwdAgain) {
    //             alert('两次新密码不相同')
    //             return;
    //         }
    //
    //         $ajax({
    //             type: 'post',
    //             url: '/user/updatePwd',
    //             data: JSON.stringify({
    //                 oldPwd: params.oldPwd,
    //                 newPwd: params.newPwd
    //             }),
    //             contentType: 'application/json;charset=utf-8',
    //             dataType: 'json'
    //         }, false, '', function (res) {
    //             if (res.code == 200) {
    //                 alert(res.msg)
    //                 $('#update-modal').modal('hide');
    //                 $('#updPwdForm')[0].reset();
    //             }
    //         })
    //     }
    // })
    //点击关闭按钮
    // $("#update-close-btn").click(function () {
    //     $('#update-modal').modal('hide');
    // })
})
