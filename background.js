chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(
        {
            jiraDomain: null,
            defaultProjectKey: '',
        }
    );
});
