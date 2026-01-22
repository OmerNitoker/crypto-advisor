import { AIInsightWidget } from "./AIInsightWidget";
import { MemeWidget } from "./MemeWidget";
import { NewsWidget } from "./NewsWidget";
import { PricesWidget } from "./PricesWidget";

export function DashboardGrid({ dashboard }) {
  const { news = [], coins = [], aiInsight, meme } = dashboard;
  const snapshotId = dashboard._id;

  return (
    <div className="dashboard-grid">
      <div className="widget-card">
        <NewsWidget news={news} snapshotId={snapshotId} />
      </div>

      <div className="widget-card">
        <PricesWidget coins={coins} snapshotId={snapshotId} />
      </div>

      <div className="widget-card">
        <AIInsightWidget aiInsight={aiInsight} snapshotId={snapshotId} />
      </div>

      <div className="widget-card">
        <MemeWidget meme={meme} snapshotId={snapshotId} />
      </div>
    </div>
  );
}
