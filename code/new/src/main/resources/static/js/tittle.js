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
function getUrlFromCookie(cookie) {
    const regex = /{"url":"(http:\/\/[^"]+)"}/;
    const match = cookie.match(regex);
    return match ? match[1] : '';
}

function generateQRCode() {
    var urlString = getCookie("url");
    var url1 = JSON.stringify(urlString);
    let newUrl = url1.replace(/"/g, '');
    // var urlObject = JSON.parse(url1);
    // var url = urlObject.url;
    // alert(url)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/ewm/erweima", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var qrcodeUrl = xhr.responseText;
            document.getElementById("qrcode").src ='data:image/png;base64,' + qrcodeUrl;
            document.getElementById("qrcode").style.display = "block";
        } else if (xhr.readyState === 4) {
            alert("生成二维码失败");
        }
    };
    xhr.send(JSON.stringify({ url: url1 }));
}
$(function () {
    document.getElementById("erweima").addEventListener("click",function (){
        generateQRCode()
        $('#tupian-modal').modal('show');

    })
    document.getElementById("lianxiren").addEventListener("click",function (){
        $('#lianxi-modal').modal('show');

    })
    document.getElementById("sel-btn").addEventListener("click",function (){
        alert("功能维护中，敬请期待。。。。。")

    })

})
