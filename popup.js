var lc1306 = jQuery.noConflict(true);

(function ($) {
  $(function () {
    chrome.storage.sync.get('colorblindingValue', function (obj) {
      var noValue = obj.colorblindingValue === null || obj.colorblindingValue === undefined;
      $('input[name=type][value=' + (noValue ? 'deactive' : obj.colorblindingValue) + ']').prop(
        'checked',
        true
      );
    });

    $('input[name="type"]:radio').change(function () {
      var newValue = $('input[name=type]:checked', '#cvd_radios').val();
      chrome.storage.sync.set({ colorblindingValue: newValue }, function () {
        if (newValue !== 'deactivate') {
          chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((res) => {
            chrome.scripting.executeScript({
              target: { tabId: res[0].id },
              files: ['execute.js'],
            });
          });
        } else {
          chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((res) => {
            chrome.scripting.executeScript({
              target: { tabId: res[0].id },
              files: ['reload.js'],
            });
          });
        }
      });
    });
  });
})(lc1306);
