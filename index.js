async function getVersions() {
    const octokit = new Octokit();
    
    const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: 'k3llydev',
        repo: 'better-friendly-no-kill',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    console.log('response', response)
}

document.addEventListener('DOMContentLoaded', () => {
    getVersions();
});