document.addEventListener('DOMContentLoaded', async () => {
    const releases = await fetch('https://api.github.com/repos/k3llydev/better-friendly-no-kill/releases');
    console.log('releases', releases);
});
