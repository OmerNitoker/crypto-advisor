import { AIInsightWidget } from "./AIInsightWidget"
import { MemeWidget } from "./MemeWidget"
import { NewsWidget } from "./NewsWidget"
import { PricesWidget } from "./PricesWidget"


export function DashboardGrid({ dashboard }) {

    const { news = [], coins = [], aiInsight, meme } = dashboard
    const snapshotId = dashboard._id
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridTemplateRows: 'minmax(200px, auto) minmax(160px, auto) minmax(140px, auto)',
                gap: '1rem',
            }}
        >
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    overflow: 'hidden',
                }}
            >
                <NewsWidget news={news} snapshotId={snapshotId} />
            </div>
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '0.75rem',
                }}
            >
                <PricesWidget coins={coins} snapshotId={snapshotId} />
            </div>

            <div
                style={{
                    gridColumn: '1 / -1',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '0.75rem',
                }}
            >
                <AIInsightWidget aiInsight={aiInsight} snapshotId={snapshotId} />
            </div>
            <div
                style={{
                    gridColumn: '1 / -1',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '0.75rem',
                }}
            >
                <MemeWidget meme={meme} snapshotId={snapshotId} />
            </div>
        </div>
    )
}