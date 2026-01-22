import { VoteButtons } from "./VoteButtons";

export function AIInsightWidget({ aiInsight, snapshotId }) {
    const hasInsight = !!aiInsight;

    return (
        <>
            <div className="widget-header">
                <h2 className="widget-header__title">AI insight of the day</h2>
            </div>

            <div className="widget-body">
                {hasInsight ? (
                    <p className="ai-insight-text">{aiInsight}</p>
                ) : (
                    <p className="ai-insight-text ai-insight-text--empty">
                        No AI insight available for today.
                    </p>
                )}
            </div>

            <div className="widget-footer">
                <VoteButtons
                    section="ai"
                    snapshotId={snapshotId}
                    targetId="ai-insight-of-the-day"
                />
            </div>
        </>
    );
}
