async function getVersions() {
    return await fetch({
        url: `https://api.github.com/repos/k3llydev/better-friendly-no-kill/releases`
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const releases = await getVersions();
    console.log('releases', releases);
});