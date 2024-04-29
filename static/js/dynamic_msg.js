function getBottomNavMsg() {
    var isIOS2 = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS2) {
        document.writeln('<a class="downnow downIos" href="javascript:;">立即下载</a>');
    } else {
        document.writeln('<a class="downnow downAndroid" href="javascript:;">立即下载</a>');
    }
}