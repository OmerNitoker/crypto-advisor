import { VoteButtons } from "./VoteButtons";

export function NewsWidget({ news, snapshotId }) {
    const hasNews = news && news.length > 0;

    return (
        <>
            <div className="widget-header">
                <h2 className="widget-header__title">Market news</h2>
                <span className="widget-header__meta">
                    {hasNews ? `${news.length} stories` : 'No news available'}
                </span>
            </div>

            <div className="widget-body">
                {!hasNews && (
                    <p className="news-empty">No news available right now.</p>
                )}

                {hasNews && (
                    <ul className="news-list">
                        {news.map((item) => (
                            <li key={item.id || item.url} className="news-item">
                                <div className="news-item__main">
                                    <p className="news-item__title">
                                        <a href={item.url} target="_blank" rel="noreferrer">
                                            {item.title}
                                        </a>
                                    </p>
                                    {item.source && (
                                        <div className="news-item__source">
                                            {item.source}
                                        </div>
                                    )}
                                </div>

                                <div className="news-item__vote">
                                    <VoteButtons
                                        section="news"
                                        snapshotId={snapshotId}
                                        targetId={item.id || item.url}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
