import { VoteButtons } from "./VoteButtons";


export function PricesWidget({ coins, snapshotId }) {
    return (
        <div>
            <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Coin prices</h2>

            {(!coins || coins.length === 0) && (
                <p style={{ opacity: 0.8 }}>No price data available.</p>
            )}

            {coins && coins.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr>
                            <th align="left">Coin</th>
                            <th align="right">Price</th>
                            <th align="right">24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => (
                            <tr key={coin.id || coin.symbol}>
                                <td>{coin.symbol || coin.name}</td>
                                <td align="right">
                                    {coin.price != null ? coin.price.toLocaleString() : '-'}
                                    {coin.currency ? ` ${coin.currency}` : ''}
                                    <VoteButtons
                                        section="coins"
                                        snapshotId={snapshotId}
                                        targetId={coin.id || coin.symbol}
                                    />
                                </td>
                                <td
                                    align="right"
                                    style={{
                                        color:
                                            coin.change24h > 0
                                                ? 'green'
                                                : coin.change24h < 0
                                                    ? 'red'
                                                    : 'inherit',
                                    }}
                                >
                                    {coin.change24h != null ? `${coin.change24h.toFixed(2)}%` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}