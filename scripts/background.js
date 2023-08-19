chrome.action.onClicked.addListener(tab => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        // only one tab should be active so it should only have one entry
        let activeTab = tabs[0];
        let url = getRootDomain(activeTab.url)
        console.log('[getRootDomain]', url)

        startMonitoring(url)
    });
});

function getRootDomain(url) {
    let urlObject = new URL(url);
    let parts = urlObject.hostname.split('.');

    if (parts.length > 1) {
        return parts.slice(-2).join('.');
    }

    return null;
}

function startMonitoring(url) {
    chrome.storage.local.get({
        apikey: '',
    }).then(function (data) {
        if (data.apikey && data.apikey.length > 10) {
            fetch('https://domainalert.app/api/domains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + data.apikey
                },
                body: JSON.stringify({
                    domains: [url]
                })
            })
        }
    })
}