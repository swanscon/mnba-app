export const getLastWordOrPhrase = (flairText) => {
    if (!flairText) return '';
    const words = flairText.trim().split(' ');
    return words[words.length - 1];
}