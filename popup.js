var config = {
    apiUrl: 'https://openapi.youdao.com/api',
    appKey: '6658dfa94976e09e',
    key: '14rKDZO4EY0bR2a1yD4FaVRLuSBR1RBR'
}

var addEvent = function(obj, type, handle) {
    try {  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type, handle, false);
    } catch (e) {
        try {  // IE8.0及其以下版本
            obj.attachEvent('on' + type, handle);
        } catch (e) {  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

var getTranslateResult = function(q, from, to) {
    //  生成签名
    var salt = parseInt(Math.random() * 100);
    var signStr = config.appKey + q + salt + config.key;
    var sign = md5(signStr);

    var resultUrl = config.apiUrl+"?"+"q="+q+"&from="+from+"&to="+to+"&appKey="+config.appKey+"&salt="+salt+"&sign="+sign;
    var result = encodeURI(resultUrl);

    var request = new XMLHttpRequest();
    request.open("GET",result);
    request.send();
}

//addEvent(document.getElementById("btn"), "click", getTranslateResult('hello world', 'EN', 'zh-CHS'));