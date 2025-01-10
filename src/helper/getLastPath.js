export const getLastPath = (url) => {
    const parts = url.split('/');
    return parts[parts.length-1];
}