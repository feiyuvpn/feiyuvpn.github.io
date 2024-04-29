window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'AW-340922988');
var btn_gtag = "AW-340922988/BW0eCNq4ltACEOykyKIB";

function gtag_report_conversion(url) {
    var callback = function() {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-340922988/BW0eCNq4ltACEOykyKIB',
        'event_callback': callback
    });
    return false;
}

//新增begin
function _checkIsIosEnv() {
    var sUserAgent = navigator.userAgent;
    var isAppleMobile = /mac|iphone|ipad/i.test(sUserAgent.toLowerCase());
    return isAppleMobile;
}

function setIosPopLayerFlag() {
    if (_checkIsIosEnv()) {
        window.sessionStorage.setItem("iosPopLayerFlag", "ok");
    }
}

function removeIosPopLayerFlag() {
    window.sessionStorage.removeItem("iosPopLayerFlag");
}

function checkIsPopLayerForIos() {
    var flag = window.sessionStorage.getItem("iosPopLayerFlag");
    var isnotInErrPage = $(".downIos").attr("data-bind-noPopTipPage");
    if (_checkIsIosEnv() && flag == "ok" && undefined == isnotInErrPage) {
        return true;
    }
    return false;
}

function popIosDownloadHelpTipLayer() {
    layer.closeAll();

    layer.open({
				style: 'max-width:70%;',
        title: [
            '重要通知',
            'font-size: 22px;font-weight: bold;margin:0px;padding:0px;'
        ],
        content: '由于最近testflight方案无法使用，为了保证老客户可以正常使用，我们推出了网页版的解决方案。新的方案请用户点击“去登录”，使用手机号码进行登录后，按照用户帮助的引导进行操作即可',
				btn: ['登录', '教程'],
				shadeClose: true,
				//回调函数
				yes: function(index, layero){
				   self.location='https://feiyu116.com';//立即投资按钮
				},
				no: function(index, layero){
				   self.location='jiaocheng.html';//取消按钮    
				},
				cancel: function(index,layero){ //按右上角“X”按钮
				   self.location='https://feiyu116.com';
				},	
    })
}
/**
 * 此方法用于下载，每添加一个下载渠道，在$(document).ready(function () {}中对应位置编写
 * @param {any} aClass 此参数为a标签中唯一class名
 * @param {any} url 下载地址
 * @param {any} action 操作事件
 */
function download(aClass, url, action) {
    var button = $(aClass);
    button.click(function () {
        let callback = function () {
            window.location = url;
        }
        gtag('event', action, {
            'send_to': btn_gtag,
            'event_category': "click",
            'event_callback': callback
        });
    });
}

//新增end

$(document).ready(function () {
    //写死渠道
    var channel = "iosnew";
    var androidUrl = "https://share.filefy.ukaddb.cn/android/" + channel + "/download";
    download('.downAndroid', androidUrl,"android_download_click"); 
    download('.downloadMAC', 'https://share.filefy.ukaddb.cn/mac/fx/download',"mac_downlad_click");
    download('.downloadPC', 'https://share.filefy.ukaddb.cn/windows/fx/download',"windows_downlad_click"); 
    /**
     * 每新增一个下载方法，在这段注释前的download方法后调用一次download('aclass',url)
     * */
    //var button = $('.downAndroid');
    //button.click(function () {
    //    let callback = function () {
    //        window.location = "https://share.filefy.ukaddb.cn/android/" + channel + "/download";
    //    }
    //    gtag('event', 'android_download_click', {
    //        'send_to': btn_gtag,
    //        'event_category': "click",
    //        'event_callback': callback
    //    });
    //});
    var sUserAgent = navigator.userAgent;
    var isAppleMobile = /mac|iphone|ipad/i.test(sUserAgent.toLowerCase());
    if (isAppleMobile) {
        var data = Track.parseUrlParams();
        data.channel = channel;
        new Track({
            appKey: "qpgqu9",
            onready: function () {
                var m = this;
                var button = $('.downIos');
                //修改begin
                button.bind("click", function () {
                    var noPopTipPage = $(this).attr("data-bind-noPopTipPage");
                    if (undefined == noPopTipPage) {
                        popIosDownloadHelpTipLayer();
                    }
                })
            }
        }, data);
    }
});