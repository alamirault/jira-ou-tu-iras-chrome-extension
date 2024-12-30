const saveOptions = () => {
    let rawJiraDomain = document.getElementById('jiraDomain').value;

    if(false === rawJiraDomain.startsWith("http")){
        rawJiraDomain= 'https://' + rawJiraDomain;
    }

    const jiraDomain = (new URL(rawJiraDomain)).host

    const defaultProjectKey = document.getElementById('defaultProjectKey').value;

    chrome.storage.sync.set(
        {
            jiraDomain: jiraDomain,
            defaultProjectKey: defaultProjectKey
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(
        ['jiraDomain', 'defaultProjectKey'],
        (items) => {
            document.getElementById('jiraDomain').value = items.jiraDomain;
            document.getElementById('defaultProjectKey').value = items.defaultProjectKey;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
