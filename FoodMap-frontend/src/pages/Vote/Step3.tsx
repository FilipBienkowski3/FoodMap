interface Step3Props {
    selectedDate: string
    setSelectedDate: (val: string) => void
    selectedTime: string
    setSelectedTime: (val: string) => void
}

export function Step3({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }: Step3Props) {
    const dates = [
        { day: 'THU', num: '14' },
        { day: 'FRI', num: '15' },
        { day: 'SAT', num: '16' },
        { day: 'SUN', num: '17' },
    ]

    return (
        <div>
            <h1 className="vote-title" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Find the Best Time</h1>

            <div className="vote-dates-row">
                {dates.map(d => (
                    <div
                        key={d.num}
                        className={`vote-date-chip ${selectedDate === d.num ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(d.num)}
                    >
                        <span className="vote-date-day">{d.day}</span>
                        <span className="vote-date-num">{d.num}</span>
                    </div>
                ))}
            </div>

            <div className="vote-time-section">
                <span className="material-symbols-outlined">light_mode</span> Morning
            </div>
            <div className={`vote-time-slot ${selectedTime === '9:00 AM - 10:00 AM' ? 'selected' : ''}`} onClick={() => setSelectedTime('9:00 AM - 10:00 AM')}>
                <div className="vote-time-slot-label">9:00 AM - 10:00 AM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 1/6 AVAILABLE
                </div>
            </div>
            <div className={`vote-time-slot ${selectedTime === '10:00 AM - 11:00 AM' ? 'selected' : ''}`} onClick={() => setSelectedTime('10:00 AM - 11:00 AM')}>
                <div className="vote-time-slot-label">10:00 AM - 11:00 AM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 2/6 AVAILABLE
                </div>
            </div>

            <div className="vote-time-section">
                <span className="material-symbols-outlined">restaurant</span> Lunch
            </div>
            <div className={`vote-time-slot ${selectedTime === '12:00 PM - 1:00 PM' ? 'selected' : ''}`} onClick={() => setSelectedTime('12:00 PM - 1:00 PM')}>
                <div className="vote-time-slot-label">12:00 PM - 1:00 PM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 5/6 AVAILABLE
                </div>
            </div>
            <div className={`vote-time-slot ${selectedTime === '1:00 PM - 2:00 PM' ? 'selected' : ''}`} onClick={() => setSelectedTime('1:00 PM - 2:00 PM')}>
                <div className="vote-time-slot-label">1:00 PM - 2:00 PM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 6/6 AVAILABLE
                </div>
                {selectedTime === '1:00 PM - 2:00 PM' && (
                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#8A5A19' }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                )}
            </div>

            <div className="vote-time-section">
                <span className="material-symbols-outlined">night_shelter</span> Dinner
            </div>
            <div className={`vote-time-slot ${selectedTime === '6:00 PM - 7:00 PM' ? 'selected' : ''}`} onClick={() => setSelectedTime('6:00 PM - 7:00 PM')}>
                <div className="vote-time-slot-label">6:00 PM - 7:00 PM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 3/6 AVAILABLE
                </div>
            </div>
            <div className={`vote-time-slot ${selectedTime === '7:00 PM - 8:00 PM' ? 'selected' : ''}`} onClick={() => setSelectedTime('7:00 PM - 8:00 PM')}>
                <div className="vote-time-slot-label">7:00 PM - 8:00 PM</div>
                <div className="vote-time-slot-avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span> 4/6 AVAILABLE
                </div>
            </div>

        </div>
    )
}
