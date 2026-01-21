import { VoteButtons } from "./VoteButtons";

export function AIInsightWidget({ aiInsight, snapshotId }) {
    return (
        <div>
            <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>AI insight of the day</h2>
            {aiInsight ? (
                <p style={{ marginTop: 0 }}>{aiInsight}</p>
            ) : (
                <p style={{ opacity: 0.8 }}>No AI insight available for today.</p>
            )}
            <VoteButtons
                section="ai"
                snapshotId={snapshotId}
                targetId="ai-insight-of-the-day"
            />
        </div>
    )
}