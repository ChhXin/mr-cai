// popup调用background的js函数
$('#test').click(() => {
  alert("调用background的js函数");
  var bg = chrome.extension.getBackgroundPage();
  bg.bgtest();
});

// popup主动发消息给content-script
$('#right').click(() => {
  console.log("popup发送消息给content-script, right slide");
  sendMessageToContentScript('SLIDE_RIGHT', (response) => {
    if (response) console.log('收到来自content-script的回复：' + response);
  });
});
$('#left').click(() => {
  console.log("popup发送消息给content-script, left slide auto");
  sendMessageToContentScript('SLIDE_LEFT', (response) => {
    if (response) console.log('收到来自content-script的回复：' + response);
  });
});
$('#auto').click(() => {
  console.log("popup发送消息给content-script, right slide auto");
  sendMessageToContentScript('SLIDE_RIGHT_AUTO', (response) => {
    if (response) console.log('收到来自content-script的回复：' + response);
  });
});
$('#pause').click(() => {
  console.log("popup发送消息给content-script, pause slide");
  sendMessageToContentScript('PAUSE', (response) => {
    if (response) console.log('收到来自content-script的回复：' + response);
  });
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (callback) callback(response);
    });
  });
}