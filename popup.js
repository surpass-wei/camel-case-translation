var config = {
    apiUrl: 'https://openapi.youdao.com/api',
    appKey: '6658dfa94976e09e',
    key: '14rKDZO4EY0bR2a1yD4FaVRLuSBR1RBR'
}

var requiredParam = {
    q: "mark",
    from: "auto",
    to: "auto"
}

//  获取requiredParam构建好请求的URL，调用doGet
var getTranslateResult = function () {
    //  生成签名
    var salt = parseInt(Math.random() * 100);
    var signStr = config.appKey + requiredParam.q + salt + config.key;
    var sign = md5(signStr);

    var requestUrl = config.apiUrl + "?" + "q=" + requiredParam.q + "&from=" + requiredParam.from + "&to=" + requiredParam.to + "&appKey=" + config.appKey + "&salt=" + salt + "&sign=" + sign;
    var requestUrlEnc = encodeURI(requestUrl);
    doGet(requestUrlEnc, function (translateResult) {
        var resultJson = JSON.parse(translateResult);
        document.getElementById('resultDiv').innerHTML = resultJson.translation;
    });
}

//  发起请求
var doGet = function (theUrl, callback) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.onload = function (e) {
        if (this.status == 200 || this.status == 304) {
            callback(this.responseText);
        }
    }
    xmlHttp.send();
}

//  点击翻译
var byClick = function () {
    var theQ = document.getElementById('content').value;
    requiredParam.q = convertToBase(theQ);
    requiredParam.from = document.getElementById('whatFrom').value;
    requiredParam.to = document.getElementById('whatTo').value;

    //  当未输入内容时，直接返回
    if (requiredParam.q.replace(/(^s*)|(s*$)/g, "").length == 0) {
        document.getElementById('resultDiv').innerHTML = "";
        return;
    }

    getTranslateResult();
}

//  对驼峰、下划线、中划线等特殊格式进行转换
var convertToBase = function (oldStr) {
    //  驼峰转换
    if (/^([a-z]|[A-Z])+([A-Z][a-z]+)$/.test(oldStr)) {
        return oldStr.replace(/([A-Z])/g, " $1").toLowerCase();  //  驼峰转化
    } else if (/^([a-z]|[A-Z])+([-][a-z]+)+$/.test(oldStr)) {
        return oldStr.replace(/(-)([a-zA-Z])/g, " $2").toLowerCase() //  中划线
    } else if (/^([a-z]|[A-Z])+([_][a-z]+)+$/.test(oldStr)) {
        return oldStr.replace(/(_)([a-zA-Z])/g, " $2").toLowerCase() //  下划线
    } else {
        return oldStr;
    }
}

//  取词翻译
var bySelect = function () {
    alert("取词翻译，尚未完成");
}

document.getElementById('translateBtn').onclick = byClick;