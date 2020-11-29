import Noty from "@/../node_modules/noty/lib/noty.js"

export const notify = function(text, type = 'success') {
  new Noty({
    theme: 'metroui',
    text: '<b style="font-size: 1.2rem;">'+ text +'</b>',
    type: type,
    timeout: 1000
  }).show();
};