(()=>{"use strict";var n=function(n){chrome.notifications.create("",{title:"Notify.Domains",message:n,iconUrl:"images/icon128.png",type:"basic"})};chrome.action.onClicked.addListener((function(){chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var i=function(n){if(!n)return null;var e=new URL(n).hostname.split(".");return e.length>2?e.slice(-3).join("."):2===e.length?e.join("."):null}(e[0].url);(function(e){return chrome.storage.local.get({apikey:""}).then((function(i){if(!i.apikey&&i.apikey.length<10)throw n("Please specify an api key."),new Error("No api key found.");return fetch("https://notify.domains/api/domains",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer "+i.apikey},body:JSON.stringify({domains:[e]})})}))})(i).then((function(){n("We will let you know once "+i+" is available for purchase!")}))}))}))})();
//# sourceMappingURL=background.js.map