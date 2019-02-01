export function getOptions() {
  const promise = new Promise((resolve) => {
    chrome.storage.local.get({ options: {} }, (result) => {
      if (result && Object.keys(result).length > 0) {
        resolve(result.options);
      } else {
        resolve({});
      }
    });
  });

  return promise;
}

export function CreateContextMenus() {
  chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: 'form-filler-all',
    title: '填入一条记录'
  });
  chrome.contextMenus.create({
    id: 'form-filler-all-revert',
    title: '回滚一条记录'
  });
}

export function setOptions(options) {
  chrome.storage.local.set({
    options,
  });

  CreateContextMenus();
}

export function getNextRecord() {
  return getOptions().then((options) => {
    let { activeSheetkey, sheets, filled = {}, ...rest } = options
    const {rows, header} = sheets[activeSheetkey]
   
    for (var i = 0; i < rows.length; i++) {
      if (filled[i]) continue;
      filled[i] = true;
      chrome.storage.local.set({
        options: {
          activeSheetkey, sheets, filled, ...rest
        }
      });
      var data = [header, rows[i]];
      return data;
    }
    return null
  })
}