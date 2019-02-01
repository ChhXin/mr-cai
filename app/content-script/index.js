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
