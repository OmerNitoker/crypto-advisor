import { VoteButtons } from "./VoteButtons";

export function NewsWidget({ news, snapshotId }) {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Market news</h2>

            {(!news || news.length === 0) && (
                <p style={{ opacity: 0.8 }}>No news available right now.</p>
            )}

            {news && news.length > 0 && (
                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        overflowY: 'auto',
                        maxHeight: '260px',
                    }}
                >
                    {news.map((item) => (
                        <li key={item.id || item.url} style={{ marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <a href={item.url} target="_blank" rel="noreferrer">
                                        {item.title}
                                    </a>
                                    {item.source && (
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                            {item.source}
                                        </div>
                                    )}
                                </div>
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
    )
}