import { VoteButtons } from "./VoteButtons";

export function MemeWidget({ meme, snapshotId }) {
    if (!meme) {
        return (
            <div>
                <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Fun crypto meme</h2>
                <p style={{ opacity: 0.8 }}>No meme for today 😅</p>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Fun crypto meme</h2>
            {meme.title && (
                <p style={{ marginTop: 0, marginBottom: '0.5rem' }}>{meme.title}</p>
            )}
            {meme.url && (
                <img
                    src={meme.url}
                    alt={meme.title || 'Crypto meme'}
                    style={{ maxWidth: '100%', borderRadius: '6px' }}
                />
            )}
            <VoteButtons
                section="meme"
                snapshotId={snapshotId}
                targetId={meme.id || meme.url}
            />
        </div>
    )
}