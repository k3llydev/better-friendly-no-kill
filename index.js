function createOption(release, selected) {
    const option = document.createElement('option');
    option.value = release.id;
    option.innerText = release.name;
    option.selected = selected;
    return option;
}

document.addEventListener('DOMContentLoaded', async () => {

    const versionsNode = document.querySelector('#versions');
    const getCodeButton = document.querySelector('#getCode');

    const releases = await fetch('https://api.github.com/repos/k3llydev/better-friendly-no-kill/releases')
        .then(response => response.json())
        .catch(error => console.error(error));
    
    for(let i = 0; i < releases.length; i++) {
        versionsNode.appendChild(createOption(releases[i]), i === 0);
    }

    getCodeButton.addEventListener('click', async () => {
        const releaseToDownload = releases.find(r => r.id == versionsNode.value);
        console.log('should download', releaseToDownload);
        const assetUrl = releaseToDownload.assets[0].browser_download_url;
        const content = await fetch(assetUrl).then(r => r.text());
        console.log(content);
    });

});
