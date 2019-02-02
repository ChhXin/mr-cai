let right;
function startSlide(code) {
	switch (code) {
		case "SLIDE_RIGHT":
			{
				document.getElementsByClassName("navigate-right")[0].click();
				break;
			}
		case "SLIDE_LEFT":
			{
				document.getElementsByClassName("navigate-left")[0].click();
				break;
			}
		case "SLIDE_RIGHT_AUTO":
			{
				right = setInterval(function () {
					document.getElementsByClassName("navigate-right")[0].click();
				}, 2000);
				break;
			}
		case "PAUSE":
			{
				clearInterval(right);
				break;
			}
		default:
			break;
	}
}

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
	if (request && window.location.origin == "https://ppt.baomitu.com") {
		startSlide(request);
	}
	sendResponse('我收到你的消息了：' + JSON.stringify(request));
});


//与后端background进行消息交互	 执行6秒
// var startTime = new Date().getTime();
// var interval = setInterval(function () {
// 	if (new Date().getTime() - startTime > 6000) {
// 		clearInterval(interval);
// 		return;
// 	}
// 	chrome.runtime.sendMessage
// 		(
// 			{
// 				doc: "yes",
// 				data: "123",
// 			},
// 			function (response) {

// 				tip(JSON.stringify("content-script向background 发送消息"));
// 				tip('收到来自background的回复：' + response);
// 			}
// 		);
// }, 500);
