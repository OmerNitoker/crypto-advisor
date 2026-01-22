import { useState } from 'react';
import { feedbackService } from '../services/feedback.service';

export function VoteButtons({ section, snapshotId, targetId }) {
    const [currentVote, setCurrentVote] = useState(0); // 1 = like, -1 = dislike, 0 = none
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    async function handleVote(voteValue) {
        if (isSending) return;

        const newVote = currentVote === voteValue ? 0 : voteValue;

        setCurrentVote(newVote);
        setIsSending(true);
        setError('');

        try {
            await feedbackService.addFeedback({
                section,
                vote: newVote,
                snapshotId,
                targetId,
            });
        } catch (err) {
            setError(err.message || 'Failed to send feedback');
        } finally {
            setIsSending(false);
        }
    }

    const likeSrc =
        currentVote === 1 ? '/imgs/like.png' : '/imgs/like-empty.png';
    const dislikeSrc =
        currentVote === -1 ? '/imgs/dislike.png' : '/imgs/dislike-empty.png';

    return (
        <div className="vote-buttons">
            <button
                type="button"
                className={
                    'vote-buttons__btn' +
                    (currentVote === 1 ? ' vote-buttons__btn--active' : '')
                }
                onClick={() => handleVote(1)}
                disabled={isSending}
                aria-label="Like"
            >
                <img
                    src={likeSrc}
                    alt="Like"
                    className="vote-buttons__icon"
                />
            </button>

            <button
                type="button"
                className={
                    'vote-buttons__btn' +
                    (currentVote === -1 ? ' vote-buttons__btn--active-down' : '')
                }
                onClick={() => handleVote(-1)}
                disabled={isSending}
                aria-label="Dislike"
            >
                <img
                    src={dislikeSrc}
                    alt="Dislike"
                    className="vote-buttons__icon"
                />
            </button>

            {error && (
                <span className="vote-buttons__error">
                    {error}
                </span>
            )}
        </div>
    );
}
