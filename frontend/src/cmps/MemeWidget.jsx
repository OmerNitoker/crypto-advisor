import { VoteButtons } from "./VoteButtons";

export function MemeWidget({ meme, snapshotId }) {
    if (!meme) {
        return (
            <>
                <div className="widget-header">
                    <h2 className="widget-header__title">Fun crypto meme</h2>
                </div>
                <div className="widget-body">
                    <p className="meme-empty">No meme for today 😅</p>
                </div>
            </>
        );
    }

    return (
        <div className="widget-meme">
            <div className="widget-header">
                <h2 className="widget-header__title">Fun crypto meme</h2>
            </div>

            <div className="widget-body widget-body--centered">
                {meme.url && (
                    <img
                        src={meme.url}
                        alt="Crypto meme"
                        className="meme-img"
                    />
                )}
            </div>

            <div className="widget-footer widget-footer--right">
                <VoteButtons
                    section="meme"
                    snapshotId={snapshotId}
                    targetId={meme.id || meme.url}
                />
            </div>
        </div>
    );
}
