export const getRootDomain = (url) => {
    if (!url) {
        return null
    }

    let urlObject = new URL(url);
    let parts = urlObject.hostname.split('.');

    if (parts.length > 2) {
        return parts.slice(-3).join('.');
    } else if (parts.length === 2) {
        return parts.join('.');
    }

    return null;
}

export const startMonitoring = (url) => {
    return chrome.storage.local.get({
        apikey: '',
    }).then(function (data) {
        if (!data.apikey && data.apikey.length < 10) {
            triggerNotification('Please specify an api key.')
            throw new Error('No api key found.')
        }
        return fetch('https://notify.domains/api/domains', {
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
    })
}

export const triggerNotification = (message) => {
    chrome.notifications.create('', {
        title: 'Notify.Domains',
        message: message,
        iconUrl: 'images/icon128.png',
        type: 'basic'
    });
}
