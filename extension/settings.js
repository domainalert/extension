function save_options() {
    let apikey = document.getElementById('apikey').value;

    if (apikey.length < 10) {
        let status = document.getElementById('status');

        status.textContent = 'Invalid api key.';

        return;
    }

    let data = {
        apikey: apikey
    }

    chrome.storage.local.set(data).then(function () {
        let status = document.getElementById('status');
        status.textContent = 'The api key has been saved.';

        let apikey = document.getElementById('apikey');
        apikey.value = '';

        setTimeout(function () {
            status.textContent = '';
        }, 4000);
    });
}

function restore_options() {
    chrome.storage.local.get({
        apikey: '',
    }).then(function (data) {
        if (data.apikey && data.apikey !== '') {
            let status = document.getElementById('apikey');

            status.placeholder = '•••••••••••••••••••••••••••••••••••••';
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
