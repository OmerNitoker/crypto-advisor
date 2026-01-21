import { useState } from "react";
import { userService } from "../services/user.service";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const ASSET_OPTIONS = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE']
const INVESTOR_TYPES = ['HODLer', 'Day Trader', 'DeFi Explorer', 'NFT Collector']
const CONTENT_TYPES = ['Market News', 'Charts', 'On-chain Data', 'Fun']


export function Onboarding() {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [step, setStep] = useState(1)
    const [assets, setAssets] = useState(user?.preferences?.assets || [])
    const [investorType, setInvestorType] = useState(user?.preferences?.investorType || '')
    const [contentTypes, setContentTypes] = useState(user?.preferences?.contentTypes || [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('');

    const { update } = useAuth()

    function handleStepChange(diff) {
         setError('')
        if (step + diff > 3 || step + diff < 1) return
        setStep((prevStep) => prevStep + diff)
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
        ev.preventDefault()

        if (!canGoNext()) {
            setError('Please fill in this step before continuing');
            return;
        }

        setIsSubmitting(true)

        try {
            const userUpdates = {
                _id: user._id,
                preferences: {
                    assets,
                    investorType,
                    contentTypes
                },
                onboardingCompleted: true
            }

            await update(userUpdates)
            navigate('/')

        } catch (err) {
            setError(err.message || 'Something went wrong');
            setIsSubmitting(false);
        }
    }

    return (
        <section style={{ maxWidth: 600, margin: '2rem auto' }}>
            <h1>Tell us about your crypto interests</h1>
            <p>Step {step} of 3</p>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <h2>Which crypto assets are you interested in?</h2>
                        {ASSET_OPTIONS.map((asset) => (
                            <label key={asset} style={{ display: 'block', marginBottom: '0.25rem' }}>
                                <input
                                    type="checkbox"
                                    name="assets"
                                    checked={assets.includes(asset)}
                                    onChange={() => toggleInArray(asset, assets, setAssets)}
                                />{' '}
                                {asset}
                            </label>
                        ))}
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>What kind of crypto investor are you?</h2>
                        {INVESTOR_TYPES.map((type) => (
                            <label key={type} style={{ display: 'block', marginBottom: '0.25rem' }}>
                                <input
                                    type="radio"
                                    name="investorType"
                                    value={type}
                                    checked={investorType === type}
                                    onChange={() => setInvestorType(type)}
                                />{' '}
                                {type}
                            </label>
                        ))}
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>What kind of content do you want to see?</h2>
                        {CONTENT_TYPES.map((ct) => (
                            <label key={ct} style={{ display: 'block', marginBottom: '0.25rem' }}>
                                <input
                                    type="checkbox"
                                    checked={contentTypes.includes(ct)}
                                    onChange={() => toggleInArray(ct, contentTypes, setContentTypes)}
                                />{' '}
                                {ct}
                            </label>
                        ))}
                    </div>
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {isSubmitting && (
                    <p style={{ marginTop: '1rem' }}>
                        Building your personalized dashboard...
                    </p>
                )}

                <div style={{ marginTop: '1.5rem' }}>

                    <button
                        type="button"
                        onClick={() => handleStepChange(-1)}
                        disabled={step === 1 || isSubmitting}
                        style={{ marginRight: '0.5rem' }}
                    >
                        Previous
                    </button>

                    {step < 3 && (
                        <button
                            type="button"
                            onClick={() => handleStepChange(1)}
                            disabled={!canGoNext() || isSubmitting}
                        >
                            Next
                        </button>
                    )}

                    {step === 3 && (
                        <button
                            type="submit"
                            disabled={!canGoNext() || isSubmitting}
                            style={{ marginLeft: '0.5rem' }}
                        >
                            Finish &amp; build my dashboard
                        </button>
                    )}
                </div>

            </form>
        </section >
    )
}