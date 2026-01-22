import { VoteButtons } from "./VoteButtons";

export function PricesWidget({ coins, snapshotId }) {
    const hasCoins = coins && coins.length > 0;

    return (
        <>
            <div className="widget-header">
                <h2 className="widget-header__title">Coin prices</h2>
                <span className="widget-header__meta">
                    {hasCoins ? `${coins.length} assets` : 'No price data'}
                </span>
            </div>

            <div className="widget-body">
                {!hasCoins && (
                    <p className="prices-empty">No price data available.</p>
                )}

                {hasCoins && (
                    <table className="prices-table">
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">24h</th>
                                <th className="text-right">Your vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((coin) => {
                                const change = coin.change24h;
                                const changeClass =
                                    change > 0
                                        ? 'text-change-positive'
                                        : change < 0
                                            ? 'text-change-negative'
                                            : '';

                                return (
                                    <tr key={coin.id || coin.symbol}>
                                        <td>{coin.symbol || coin.name}</td>
                                        <td className="">
                                            {coin.price != null ? coin.price.toLocaleString() : '-'}
                                            {coin.currency ? ` ${coin.currency}` : ''}
                                        </td>
                                        <td className={` ${changeClass}`}>
                                            {change != null ? `${change.toFixed(2)}%` : '-'}
                                        </td>
                                        <td className="">
                                            <VoteButtons
                                                section="coins"
                                                snapshotId={snapshotId}
                                                targetId={coin.id || coin.symbol}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
