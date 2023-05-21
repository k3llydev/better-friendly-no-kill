document.addEventListener('DOMContentLoaded', async () => {
    const releases = await fetch('https://api.github.com/repos/k3llydev/better-friendly-no-kill/releases')
        .then(response => response.json())
        .catch(error => console.error(error));
    console.log('releases', releases);
});
