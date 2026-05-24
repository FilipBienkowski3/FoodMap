interface Step2Props {
    selectedCraving: string
    setSelectedCraving: (val: string) => void
    votedVenue: string
    setVotedVenue: (val: string) => void
}

export function Step2({ selectedCraving, setSelectedCraving, votedVenue, setVotedVenue }: Step2Props) {
    const cravings = [
        { id: 'Italian', label: 'ITALIAN', img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
        { id: 'American', label: 'AMERICAN', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
        { id: 'Japanese', label: 'JAPANESE', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop' },
    ]

    const venues = [
        { id: 'Osteria Marco', name: 'Osteria Marco', rating: 4.8, price: '$$$', distance: '0.8 MI AWAY', votes: 4, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop' },
        { id: 'Bar Dough', name: 'Bar Dough', rating: 4.6, price: '$$', distance: '1.2 MI AWAY', votes: 1, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop' },
        { id: 'Tavernetta', name: 'Tavernetta', rating: 4.9, price: '$$$$', distance: '2.5 MI AWAY', votes: 0, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop' },
    ]

    return (
        <div>
            <div className="vote-section-title" style={{ marginTop: '0' }}>
                <h2>Cravings</h2>
                <span style={{ color: '#8A5A19', cursor: 'pointer' }}>EDIT</span>
            </div>

            <div className="vote-cravings-row">
                {cravings.map(c => (
                    <div
                        key={c.id}
                        className={`vote-craving-card ${selectedCraving === c.id ? 'selected' : ''}`}
                        onClick={() => setSelectedCraving(c.id)}
                    >
                        <img src={c.img} alt={c.label} className="vote-craving-img" />
                        {selectedCraving === c.id && (
                            <div className="vote-craving-check">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</span>
                            </div>
                        )}
                        <p className="vote-craving-label">{c.label}</p>
                    </div>
                ))}
            </div>

            <div className="vote-section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderTop: '1px solid #E5E5E5', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <h2 className="vote-title" style={{ fontSize: '1.4rem' }}>Vote for a Venue</h2>
                    <div className="vote-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>groups</span> 4/6 VOTED
                    </div>
                </div>
                <p className="vote-subtitle">Select your top choice for {selectedCraving} tonight.</p>
            </div>

            <div className="vote-venues-list">
                {venues.map(v => {
                    const isVoted = votedVenue === v.id;
                    return (
                        <div key={v.id} className={`vote-venue-card ${isVoted ? 'selected' : ''}`} onClick={() => setVotedVenue(v.id)}>
                            <img src={v.img} alt={v.name} className="vote-venue-img" />
                            <div className="vote-venue-info">
                                <h3 className="vote-venue-name">{v.name}</h3>
                                <div className="vote-venue-meta">
                                    <span className="material-symbols-outlined" style={{ color: '#8A5A19', fontSize: '16px' }}>star</span>
                                    {v.rating} • {v.price}
                                </div>
                                <div className="vote-venue-distance">{v.distance}</div>
                            </div>
                            <div className="vote-venue-action">
                                <div className="vote-venue-count">{v.votes + (isVoted ? 1 : 0)}</div>
                                <div className="vote-venue-count-label">VOTES</div>
                                <button className={`vote-venue-btn ${isVoted ? 'voted' : ''}`} onClick={(e) => { e.stopPropagation(); setVotedVenue(v.id); }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>thumb_up</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
