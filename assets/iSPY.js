var PTZID=-1,SERVER="http://apcare.ddns.net:8090/", OID=1, AUTH="6ae5ecd7-188b-4a9f-bc2d-47d074a0f023"; function iSpyFeed() {document.write('<img src="http://apcare.ddns.net:8090/livefeed?oid=1&Auth=6ae5ecd7-188b-4a9f-bc2d-47d074a0f023&size=320x240&r=random_token" onerror="iSpyErrorThumb(this)" onload="iSpyGetNextFrame(this,1000,300)" id="ispy_KJEKYPNMQU"/>');};


function iSpyPTZ() {
    document.write("<img src=\"//ispycontent.azureedge.net/content/PTZ_Controller.png\" usemap=\"#ptzmap\" alt=\"PTZ Control\" style=\"cursor:hand;border:0px;\" id=\"ptzController\"/>");
    document.write("<map name=\"ptzmap\" style=\"cursor:hand\">");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"31,31,52,52\" onmousedown=\"iSpyPTZCommand('ispydir_0')\" onmouseup=\"iSpySendStop()\" alt=\"Center\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"0,32,27,52\" onmousedown=\"iSpyPTZCommand('ispydir_1')\" onmouseup=\"iSpySendStop()\" alt=\"Left\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"0,0,27,32\"  onmousedown=\"iSpyPTZCommand('ispydir_2')\" onmouseup=\"iSpySendStop()\" alt=\"Left Up\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"27,0,54,30\" onmousedown=\"iSpyPTZCommand('ispydir_3')\" onmouseup=\"iSpySendStop()\" alt=\"Up\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"55,0,83,30\" onmousedown=\"iSpyPTZCommand('ispydir_4')\" onmouseup=\"iSpySendStop()\" alt=\"Right Up\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"53,32,83,52\" onmousedown=\"iSpyPTZCommand('ispydir_5')\" onmouseup=\"iSpySendStop()\" alt=\"Right\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"53,52,83,83\" onmousedown=\"iSpyPTZCommand('ispydir_6')\" onmouseup=\"iSpySendStop()\" alt=\"Right Down\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"30,52,53,83\" onmousedown=\"iSpyPTZCommand('ispydir_7')\" onmouseup=\"iSpySendStop()\" alt=\"Down\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"0,52,32,83\" onmousedown=\"iSpyPTZCommand('ispydir_8')\" onmouseup=\"iSpySendStop()\" alt=\"Left Down\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"85,0,110,22\" onmousedown=\"iSpyPTZCommand('ispydir_9')\" onmouseup=\"iSpySendStop()\" alt=\"Zoom In\" />");
    document.write("<area shape=\"rect\" style=\"cursor:hand\" coords=\"85,23,110,45\" onmousedown=\"iSpyPTZCommand('ispydir_10')\" onmouseup=\"iSpySendStop()\" alt=\"Zoom Out\" />");
    document.write("</map>");

}

var iSpyDateStart=new Date();
var iSpyScriptIndex = 0;

function iSpySendStop() {
    iSpyPTZCommand('ispydir_11');
}
function iSpyErrorThumb(obj) {
    if (obj.src.indexOf("camoff")==-1)
        obj.src = "//ispycontent.azureedge.net/content/camoff.png";
}
function iSpyGetNextFrame(obj,iSpyInterval, iSpyStreamFor) {
    var _dNow = new Date();
    var _dExpire = new Date(iSpyDateStart.valueOf()+iSpyStreamFor*1000);
    if (obj.src.indexOf("camoff") == -1) {
        if (iSpyStreamFor==0 || _dNow<_dExpire)
            window.setTimeout("iSpyRefreshImage('"+obj.id+"')",iSpyInterval);
    }
}
function iSpyRefreshImage(id)   {
    var obj = document.getElementById(id);
    var _url = obj.src;
    _url = _url.substring(0, _url.indexOf('&r='));
    _url += "&r=" + Math.random();
    obj.src = _url;
}

function iSpyPTZCommand(cmd) {
    if (cmd != "") {
        iSpyAJAXCommand(SERVER + "changesetting?ot=2&oid=" + OID + "&field=ptz&value=" + cmd, "ispydonothing()");
    }
}
function ispydonothing() {}

function iSpyAJAXCommand(cmd, runfunction) {
    var sep = "?";
    if (cmd.indexOf("?") != -1)
        sep = "&";
    runfunction = runfunction.replace(/ /g,"");
    if (runfunction!="")
        runfunction+=";";
    cmd = cmd + sep+"Auth=" + AUTH + "&jsfunc="+runfunction+"&r=" + Math.random();

    eval("var old = document.getElementById('jsonScript_"+(iSpyScriptIndex-50)+"')");
    if (old != null) {
        old.parentNode.removeChild(old);
        delete old;
    }

    var head = document.getElementsByTagName("head")[0];
    script = document.createElement('script');
    script.id = 'jsonScript_' + iSpyScriptIndex;
    script.type = 'text/javascript';
    script.src = cmd;
    head.appendChild(script);
    iSpyScriptIndex++;
}