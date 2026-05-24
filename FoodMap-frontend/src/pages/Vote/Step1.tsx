interface Step1Props {
    roomName: string
    setRoomName: (val: string) => void
    searchFriends: string
    setSearchFriends: (val: string) => void
}

export function Step1({ roomName, setRoomName, searchFriends, setSearchFriends }: Step1Props) {
    const friends = [
        { id: 1, name: 'Alex', img: 'https://i.pravatar.cc/150?u=1', selected: true },
        { id: 2, name: 'Sarah', img: 'https://i.pravatar.cc/150?u=2', selected: true },
        { id: 3, name: 'David', img: 'https://i.pravatar.cc/150?u=3', selected: true },
        { id: 4, name: 'Emily', img: 'https://i.pravatar.cc/150?u=4', selected: false }
    ]

    const filteredFriends = friends.filter(f =>
        f.name.toLowerCase().includes(searchFriends.toLowerCase())
    )

    return (
        <div>
            <h1 className="vote-title">Create a Room</h1>
            <p className="vote-description">Set the details for your upcoming gathering.</p>

            <div className="vote-section-title">ROOM NAME</div>
            <div className="vote-input-wrapper">
                <input
                    type="text"
                    className="vote-input"
                    placeholder="e.g., Friday Feast"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </div>

            <div className="vote-section-title">INVITE FRIENDS</div>
            <div className="vote-input-wrapper">
                <span className="material-symbols-outlined">search</span>
                <input
                    type="text"
                    className="vote-input with-icon"
                    placeholder="Search friends..."
                    value={searchFriends}
                    onChange={(e) => setSearchFriends(e.target.value)}
                />
            </div>

            <div className="vote-friends-row">
                {filteredFriends.map(f => (
                    <div key={f.id} className={`vote-friend-item ${f.selected ? 'selected' : ''}`}>
                        <img src={f.img} alt={f.name} className="vote-friend-avatar" />
                        {f.selected && (
                            <div className="vote-friend-check">
                                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>check</span>
                            </div>
                        )}
                        <span className="vote-friend-name">{f.name}</span>
                    </div>
                ))}
                {filteredFriends.length === 0 && (
                    <p style={{ fontSize: '0.8rem', color: '#888', margin: '16px 0' }}>No friends found</p>
                )}
            </div>
        </div>
    )
}
