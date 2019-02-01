import jQuery from 'jquery'

window.fillAllInputs = function () {
  chrome.runtime.sendMessage('getNextRecord', (response) => {
    const [header, row] = response
    console.log(header, row)
    header.forEach((name, i) => {
      if (name === 'BannerConfig[isShowInActivity]') {
        return jQuery(`[name="${name}"][value="${row[i]}"]`).attr("checked", true)
      }
      jQuery(`[name="${name}"]`).val(row[i])
    })
    jQuery(`[name="login-button"]`).trigger('click')
  })
}

window.autoSlideRight = function () {
  chrome.runtime.sendMessage('slide', () => {
    console.log("autoSlideRight 执行");
    setInterval(function () {
      if (window.location.origin == "https://ppt.baomitu.com" && document.getElementsByClassName("navigate-right")[0]) {
        document.getElementsByClassName("navigate-right")[0].click();
      }
    }, 2000);
  })
}





