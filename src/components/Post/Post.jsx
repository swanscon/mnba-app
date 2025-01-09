import './Post.css';
import { getLastWordOrPhrase } from '../../helper/getLastWordOrPhrase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Post = ({ post }) => {

    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            alert('Copied to clipboard!');
        });
    };

    const netVotes = (ups, downs) => {
        const net = ups - downs;
        const color = ups < downs ? 'red' : 'green';
        const sign = net >= 0 ? '+' : '-';

        return (
            <span style={{ color: color }}>
                {sign} {Math.abs(net)}
            </span>
        );
    }

    return (
        <div className='post'>
            {post.media && post.media.oembed && post.media.oembed.url ? (
                <iframe
                    src={`https://twitframe.com/show?url=${post.media.oembed.url}`}
                    width="500"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    title="Embedded Twitter Video"
                />
            ) : (
                <>
                    <h2>{post.title}</h2>
                    {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                        <img src={post.thumbnail} alt={post.title} />
                    )}
                </>
            )}
            <div className='post-meta'>
                <span>Author: <b>{post.author}</b></span>
                {post.author_flair_text && (
                    <span className='author-flair'>{getLastWordOrPhrase(post.author_flair_text)}</span>
                )}
                {netVotes(post.ups, post.downs)}
            </div>
            <ReactMarkdown children={post.selftext} remarkPlugins={[remarkGfm]} />
            <div className='post-buttons'>
                <a
                    href={`https://www.reddit.com${post.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='discussion-button'
                >
                    View Discussion
                </a>
                <button
                    onClick={() => copyToClipboard(`https://www.reddit.com${post.permalink}`)}
                    className='copy-button'
                >
                    Copy Link
                </button>
            </div>
        </div>
    );
};

export default Post;