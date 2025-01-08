const API_URL = 'https://www.reddit.com/r/nba.json';

export const fetchPosts = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.data.children.map(post => post.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}