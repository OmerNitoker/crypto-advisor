import { useState } from "react";
import { userService } from "../services/user.service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const ASSET_OPTIONS = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE'];
const INVESTOR_TYPES = ['HODLer', 'Day Trader', 'DeFi Explorer', 'NFT Collector'];
const CONTENT_TYPES = ['Market News', 'Charts', 'On-chain Data', 'Fun'];

export function Onboarding() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [assets, setAssets] = useState(user?.preferences?.assets || []);
    const [investorType, setInvestorType] = useState(user?.preferences?.investorType || '');
    const [contentTypes, setContentTypes] = useState(user?.preferences?.contentTypes || []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { update } = useAuth();

    function handleStepChange(diff) {
        setError('');
        if (step + diff > 3 || step + diff < 1) return;
        setStep((prevStep) => prevStep + diff);
    }

    function toggleInArray(value, arr, setFn) {
        if (arr.includes(value)) {
            setFn(arr.filter((v) => v !== value));
        } else {
            setFn([...arr, value]);
        }
    }

    function canGoNext() {
        if (step === 1) return assets.length > 0;
        if (step === 2) return !!investorType;
        if (step === 3) return contentTypes.length > 0;
        return false;
    }

    async function handleSubmit(ev) {
        ev.preventDefault();

        if (!canGoNext()) {
            setError('Please fill in this step before continuing');
            return;
        }

        setIsSubmitting(true);

        try {
            const userUpdates = {
                _id: user._id,
                preferences: {
                    assets,
                    investorType,
                    contentTypes,
                },
                onboardingCompleted: true,
            }
            await update(userUpdates);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setIsSubmitting(false);
        }
    }

    return (
        <section className="onboarding-page">
            <div className="onboarding-card">
                <header className="onboarding-header">
                    <h1 className="onboarding-title">Tell us about your crypto interests</h1>
                    <p className="onboarding-subtitle">
                        We&apos;ll use this to tailor your daily crypto dashboard.
                    </p>

                    <div className="onboarding-steps">
                        <div className={
                            "onboarding-step-pill" + (step === 1 ? " onboarding-step-pill--active" : "")
                        }>
                            <span className="onboarding-step-pill__index">1</span>
                            <span className="onboarding-step-pill__label">Assets</span>
                        </div>
                        <div className={
                            "onboarding-step-pill" + (step === 2 ? " onboarding-step-pill--active" : "")
                        }>
                            <span className="onboarding-step-pill__index">2</span>
                            <span className="onboarding-step-pill__label">Profile</span>
                        </div>
                        <div className={
                            "onboarding-step-pill" + (step === 3 ? " onboarding-step-pill--active" : "")
                        }>
                            <span className="onboarding-step-pill__index">3</span>
                            <span className="onboarding-step-pill__label">Content</span>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="onboarding-body">
                        {step === 1 && (
                            <div className="onboarding-step-section">
                                <h2 className="onboarding-question">
                                    Which crypto assets are you interested in?
                                </h2>
                                <p className="onboarding-hint">
                                    Pick at least one asset so we can fetch the right prices and news.
                                </p>

                                <div className="option-group">
                                    {ASSET_OPTIONS.map((asset) => {
                                        const selected = assets.includes(asset);
                                        return (
                                            <label
                                                key={asset}
                                                className={
                                                    "option-pill" + (selected ? " option-pill--selected" : "")
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="assets"
                                                    checked={selected}
                                                    onChange={() => toggleInArray(asset, assets, setAssets)}
                                                />
                                                <span className="option-pill__label">{asset}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="onboarding-step-section">
                                <h2 className="onboarding-question">
                                    What kind of crypto investor are you?
                                </h2>
                                <p className="onboarding-hint">
                                    This helps us tune the tone of your AI insights.
                                </p>

                                <div className="option-group">
                                    {INVESTOR_TYPES.map((type) => {
                                        const selected = investorType === type;
                                        return (
                                            <label
                                                key={type}
                                                className={
                                                    "option-pill" + (selected ? " option-pill--selected" : "")
                                                }
                                            >
                                                <input
                                                    type="radio"
                                                    name="investorType"
                                                    value={type}
                                                    checked={selected}
                                                    onChange={() => setInvestorType(type)}
                                                />
                                                <span className="option-pill__label">{type}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="onboarding-step-section">
                                <h2 className="onboarding-question">
                                    What kind of content do you want to see?
                                </h2>
                                <p className="onboarding-hint">
                                    Choose the mix that best fits how you like to follow the market.
                                </p>

                                <div className="option-group">
                                    {CONTENT_TYPES.map((ct) => {
                                        const selected = contentTypes.includes(ct);
                                        return (
                                            <label
                                                key={ct}
                                                className={
                                                    "option-pill" + (selected ? " option-pill--selected" : "")
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selected}
                                                    onChange={() => toggleInArray(ct, contentTypes, setContentTypes)}
                                                />
                                                <span className="option-pill__label">{ct}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <p className="form-error onboarding-error">{error}</p>}

                    {isSubmitting && (
                        <p className="onboarding-loading">
                            Building your personalized dashboard...
                        </p>
                    )}

                    <div className="onboarding-footer">
                        <button
                            type="button"
                            onClick={() => handleStepChange(-1)}
                            disabled={step === 1 || isSubmitting}
                            className="btn btn-ghost"
                        >
                            Previous
                        </button>
                        <p className="onboarding-step-counter">Step {step} of 3</p>
                        {step < 3 && (
                            <button
                                type="button"
                                onClick={() => handleStepChange(1)}
                                disabled={!canGoNext() || isSubmitting}
                                className="btn btn-primary"
                            >
                                Next
                            </button>
                        )}

                        {step === 3 && (
                            <button
                                type="submit"
                                disabled={!canGoNext() || isSubmitting}
                                className="btn btn-primary"
                            >
                                build my dashboard
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
