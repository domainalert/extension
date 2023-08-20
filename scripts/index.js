import {getRootDomain, startMonitoring, triggerNotification} from "./functions";

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        // Only one tab should be active, so this only has one entry
        let activeTab = tabs[0];
        let url = getRootDomain(activeTab.url)

        startMonitoring(url)
            .then(() => {
                triggerNotification('We will let you know once ' + url + ' is available for purchase!')
            })
    });
});
