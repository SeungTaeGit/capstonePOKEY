var data = {};//전송 데이터(JSON)

var ws ;
var btnSend = getId('btnSend');
var talk = getId('talk');
var msg = getId('msg');

btnLogin.onclick = function(){
    ws = new WebSocket("ws://" + location.host + "/chatt");

    ws.onmessage = function(msg){
        var data = JSON.parse(msg.data);
        var css;

        if(data.mid == mid.value){
            css = 'class=me';
        }else{
            css = 'class=other';
        }

        var item = `<div ${css} >
		                <span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
                      <span>${data.msg}</span>
						</div>`;

        talk.innerHTML += item;
        talk.scrollTop=talk.scrollHeight;//스크롤바 하단으로 이동
    }
}

msg.onkeyup = function(ev){
    if(ev.keyCode == 13){
        send();
    }
}

btnSend.onclick = function(){
    send();
}

function send(){
    if(msg.value.trim() != ''){
        data.mid = getId('mid').value;
        data.msg = msg.value;
        data.date = new Date().toLocaleString();
        var temp = JSON.stringify(data);
        ws.send(temp);
    }
    msg.value ='';

}


// SeungTae's Code
var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'msg': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
