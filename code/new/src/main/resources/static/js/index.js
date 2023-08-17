function get_select_List() {
    $ajax({
        type: 'post',
        url: '/user/get_select_List',
    }, false, '', function (res) {
        if (res.code == 200) {
            console.log(res.data)
            var list = res.data
            var xiala = ""
            for(var i=0; i<list.length; i++){
                if(list[i].company != '' && list[i].company != undefined){
                    xiala = '<option value="' + list[i].company + '">' + list[i].company + '</option>'
                }
                $("#company").append(xiala);
            }
        }
    })
}






$(function () {

    get_select_List();
    setCookie();
    getCookie();
    var oBtn = document.getElementById("submit-btn");
    var oUser = document.getElementById("username");
    var oPass = document.getElementById("password");
    var oCheck = document.getElementById("check");

    if (getCookie("init")) {
        var cookie = JSON.parse(getCookie("init"));
        oUser.value = cookie.name;
        oPass.value = cookie.pass;
        oCheck.checked = true;
    }
    // if(oCheck.checked = false){
    //     setCookie("","","");
    // }
    oBtn.onclick = function () {
        if (oCheck.checked) {
            var obj = {};
            obj.name = oUser.value;
            obj.pass = oPass.value;
            var str = JSON.stringify(obj);
            setCookie("init", str, 7);
        }
    }
    $("#submit-btn").click(function () {
        if(checkForm('#login-form')){
            let params = formToJson('#login-form')
            $ajax({
                type: 'post',
                url: 'user/login',
                data: {
                    company: params.company,
                    username: params.username,
                    password: params.password
                }
            }, false, '', function (res) {
                alert(res.msg)
                if (res.code > 0) {
                    window.location.href = "html/main.html";
                }
            })
        }
    })
})


function setCookie(_name, val, expires) {
    var d = new Date();
    d.setDate(d.getDate() + expires);
    document.cookie = _name + "=" + val + ";path=/;expires=" + d.toGMTString();
}

//获取cookie
function getCookie(_name) {
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (newArr[0] == _name) {
            return newArr[1];
        }
    }
}
