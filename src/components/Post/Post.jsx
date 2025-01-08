import './Post.css';
// import { getLastWordOrPhrase } from '../../helper/getLastWordOrPhrase';

const Post = ({ post }) => {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='post'>
            <h2>{post.title}</h2>
            {/* <b>{getLastWordOrPhrase(post.author_flair_text)}</b> */}
            <p>{truncateText(post.selftext || '', 100)}</p>
            {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                <img src={post.thumbnail} alt={post.title} />
            )}
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
        </div>
    );
};

export default Post;