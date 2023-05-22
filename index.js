function createOption(release, selected) {
    const option = document.createElement('option');
    option.value = release.id;
    option.innerText = release.name;
    option.selected = selected;
    return option;
}

document.addEventListener('DOMContentLoaded', async () => {

    const loadingVeilNode = document.querySelector('#loadingVeil');
    const versionsNode = document.querySelector('#versions');
    const getCodeButton = document.querySelector('#getCode');
    const usageModalNode = document.querySelector('#usageManual');
    const helpButtonNode = document.querySelector('#helpTextOpen');
    const helpButtonCloseNode = document.querySelector('#helpTextClose');

    const releases = await fetch('https://api.github.com/repos/k3llydev/better-friendly-no-kill/releases')
        .then(response => response.json())
        .catch(error => {
            // TODO: Distinguish between intermitence and rate limits
            alert('An error occurred while retrieving the versions of the workshop. Please try again in a couple hours in case you have exceeded rate limits.');
        });
    
    for(let i = 0; i < releases.length; i++) {
        versionsNode.appendChild(createOption(releases[i]), i === 0);
    }

    setTimeout(() => {
        loadingVeilNode.classList.add('hide');
    }, 1500);

    getCodeButton.addEventListener('click', async () => {
        // Do not execute same process if there's a copy already in progress
        if(getCodeButton.classList.contains('copying')) return;

        getCodeButton.classList.add('copying');
        getCodeButton.innerText = 'Copying...';

        const releaseToDownload = releases.find(r => r.id == versionsNode.value);
        const assetUrl = releaseToDownload.assets[0].browser_download_url;
        const content = await fetch('https://api.codetabs.com/v1/proxy?quest=' + assetUrl)
            .then(r => r.text())
            .catch(error => {
                // TODO: Determine possible error cases
                alert('Could not retrieve workshop code. Please try again in a few minutes in case you have exceeded rate limits.');
            });

        // Copy to clipboard
        navigator.clipboard.writeText(content).then(() => {
            // Success copying
            getCodeButton.classList.add('success');
            getCodeButton.innerText = 'Copied!';
            setTimeout(() => {
                getCodeButton.classList.remove('copying');
                getCodeButton.classList.remove('success');
                getCodeButton.innerText = 'Copy workshop code!';
            }, 2500);
        }, (error) => {
            // Error while copying to clipboard
            alert('Something went wrong while trying to copy the workshop. Please try again or contact the creator of this site.');
            console.error(error);
        });
    });

    helpButtonNode.addEventListener('click', () => usageModalNode.classList.add('open'));

    helpButtonCloseNode.addEventListener('click', () => usageModalNode.classList.remove('open'));

});
