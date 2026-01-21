// frontend/src/components/dashboard/VoteButtons.jsx
import { useState } from 'react';
import { feedbackService } from '../services/feedback.service';

export function VoteButtons({ section, snapshotId, targetId }) {
    const [currentVote, setCurrentVote] = useState(0)
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState('')

    async function handleVote(voteValue) {
        if (isSending) return

        const newVote = currentVote === voteValue ? 0 : voteValue;
        if (newVote === 0) {
            setCurrentVote(0);
            return;
        }

        setIsSending(true);
        setError('');
        try {
            await feedbackService.addFeedback({ section, vote: voteValue, snapshotId, targetId })
            setCurrentVote(voteValue);
        } catch (err) {
            setError(err.message || 'Failed to send feedback');
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
                type="button"
                onClick={() => handleVote(1)}
                disabled={isSending}
                style={{
                    fontSize: '0.9rem',
                    padding: '0.15rem 0.4rem',
                    opacity: currentVote === 1 ? 1 : 0.6,
                }}
            >
                👍
            </button>
            <button
                type="button"
                onClick={() => handleVote(-1)}
                disabled={isSending}
                style={{
                    fontSize: '0.9rem',
                    padding: '0.15rem 0.4rem',
                    opacity: currentVote === -1 ? 1 : 0.6,
                }}
            >
                👎
            </button>
            {error && (
                <span style={{ color: 'red', fontSize: '0.75rem', marginLeft: '0.25rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
}


