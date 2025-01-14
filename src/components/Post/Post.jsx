import './Post.css';
import { getLastWordOrPhrase } from '../../helper/getLastWordOrPhrase';
import { getLastPath } from '../../helper/getLastPath';
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

    const postTitle = (title) => {
        const size = title.length;
        if (size > 80) {
            return (
                <h6>{title}</h6>
            )
        } else {
            return (
                <h2>{title}</h2>
            )
        }

    }

    return (
        <div className='post'>
            {post.media && post.media.oembed ? (
                post.url.includes('streamable.com') ? (
                    (<>
                        {postTitle(post.title)}
                        <iframe
                            className="streamable-embed"
                            src={`https://streamable.com/o/${getLastPath(post.url)}`}
                            frameborder="0"
                            scrolling="no"
                            height="550px"
                            width="100%"
                            allowfullscreen
                            title="Streamable Video"
                        ></iframe>
                    </>
                    )
                ) :
                    (<iframe
                        src={`https://twitframe.com/show?url=${post.media.oembed.url}`}
                        width="500"
                        height="600"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                        title="Embedded Twitter Video"
                    />)
            ) : (
                <>
                    {postTitle(post.title)}
                    {/* {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                        <img src={post.thumbnail} alt={post.title} />
                    )} */}
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