import { getOptions, getNextRecord, CreateContextMenus } from '../utils';

const analyticsTrackingCode = 'UA-XXXXXXX-X'; // UA-9183424-4 / UA-XXXXXXX-X

function handleMessage(request, sender, sendResponse) {
  if (request === 'getOptions') {
    getOptions().then(options => {
      sendResponse({
        options,
        analyticsTrackingCode,
      });
    });
    return true;
  }
  if (request === 'getNextRecord') {
    getNextRecord().then(data => {
      sendResponse(data);
    });
    return true;
  }
  if (request === 'slide') {
    sendResponse();
    return true;
  }
  return null;
}

chrome.runtime.onMessage.addListener(handleMessage);

getOptions().then(() => {
  CreateContextMenus(true);
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'form-filler-all') {
    chrome.tabs.executeScript({
      code: 'window.fillAllInputs();'
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'fill_all_inputs') {
    chrome.tabs.executeScript({
      code: 'window.fillAllInputs();'
    });
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("开始自动换页", tab);
  chrome.tabs.executeScript({
    code: 'window.autoSlideRight();'
  });
})

