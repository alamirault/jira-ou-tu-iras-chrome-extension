const saveOptions = () => {
    const jiraDomain = document.getElementById('jiraDomain').value;
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        ['jiraDomain', 'defaultProjectKey'],
        (items) => {
            document.getElementById('jiraDomain').value = items.jiraDomain;
            document.getElementById('defaultProjectKey').checked = items.defaultProjectKey;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
