//实现滚动效果
const container = document.querySelector('.container')
const lis = document.querySelectorAll('.controls li')
var viewHeight = 526 //声明页面高度

var index = 0; //当前索引
var flag = true; //节流开关
document.addEventListener('mousewheel', function (e) {
    e = e || window.event
    console.log(e);
    // 获取整屏的高度
    viewHeight = document.body.clientHeight;
    if (flag) {  //节流阀
        flag = false
        if (e.wheelDelta > 0) {
            index--
            if (index < 0) {
                index = 0
            }
        } else {
            index++;
            if (index > lis.length - 1) {
                index = lis.length - 1
            }
        }
        container.style.top = -index * viewHeight + 'px'
        changeColor(index)
        setTimeout(function () {
            flag = true
        }, 500)
    }

})