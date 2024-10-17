function updateProgressBar(percentage) {
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage + "%";
    progressBar.innerHTML = percentage + "%";
}

// 示例：更新进度条到50%
$(function () {
    updateProgressBar(20);
})