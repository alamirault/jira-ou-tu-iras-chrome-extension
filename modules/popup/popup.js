document.getElementById('ticket-input').focus();

chrome.storage.sync.get(
    ['jiraDomain', 'defaultProjectKey'],
    (items) => {
        document.getElementById("ticket-input").placeholder = items.defaultProjectKey + '-XXXX';
    }
);

document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

async function logSubmit(event) {
    const data = await chrome.storage.sync.get(['jiraDomain', 'defaultProjectKey']);

    const inputValue = document.getElementById("ticket-input").value;

    let ticketIdentifier;
    if(inputValue.includes("-")){
        ticketIdentifier = inputValue;
    }
    else{
        ticketIdentifier = data.defaultProjectKey + "-" + inputValue;
    }

    if(null !== data.jiraDomain){
        const newURL = "https://" + data.jiraDomain + "/browse/" + ticketIdentifier;
        chrome.tabs.create({ url: newURL });
    }

    event.preventDefault();
}

const form = document.getElementById("open-ticket");
form.addEventListener("submit", logSubmit);