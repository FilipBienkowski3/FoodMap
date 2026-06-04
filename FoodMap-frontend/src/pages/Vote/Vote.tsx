import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { trackEvent } from '../../config/analytics'
import './Vote.css'

export default function Vote() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showSnackbar, setShowSnackbar] = useState(false)

  // Step 1 State
  const [roomName, setRoomName] = useState('')
  const [searchFriends, setSearchFriends] = useState('')

  // Step 2 State
  const [selectedCraving, setSelectedCraving] = useState('Italian')
  const [votedVenue, setVotedVenue] = useState('Osteria Marco')

  // Step 3 State
  const [selectedDate, setSelectedDate] = useState('15')
  const [selectedTime, setSelectedTime] = useState('1:00 PM - 2:00 PM')

  const getStepSubtitle = () => {
    if (step === 1) return 'STEP 1 OF 3'
    if (step === 2) return 'STEP 2 OF 3: SET CRAVINGS AND VOTE FOR VENUE'
    return 'STEP 3 OF 3 (CUISINE, VENUE, TIME)'
  }

  return (
    <div className="vote-layout">
      <header className="vote-header">
        <button className="vote-header-back" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="vote-header-title">DineVote</span>
        <img src="https://i.pravatar.cc/150?u=me" alt="User" className="vote-header-avatar" />
      </header>

      <main className="vote-content">
        <div className="vote-step-indicator">{getStepSubtitle()}</div>

        {step === 1 && (
          <Step1
            roomName={roomName} setRoomName={setRoomName}
            searchFriends={searchFriends} setSearchFriends={setSearchFriends}
          />
        )}

        {step === 2 && (
          <Step2
            selectedCraving={selectedCraving} setSelectedCraving={setSelectedCraving}
            votedVenue={votedVenue} setVotedVenue={setVotedVenue}
          />
        )}

        {step === 3 && (
          <Step3
            selectedDate={selectedDate} setSelectedDate={setSelectedDate}
            selectedTime={selectedTime} setSelectedTime={setSelectedTime}
          />
        )}
      </main>

      <div className="vote-bottom-bar">
        {step === 2 && (
          <div className="vote-bottom-bar-text">
            Awaiting 2 more votes...
          </div>
        )}
        <button
          className="vote-btn-primary"
          onClick={() => {
            if (step < 3) {
              trackEvent('vote', 'step_completed', `step_${step}`);
              setStep(step + 1);
            } else {
              trackEvent('vote', 'vote_finalized', `${selectedCraving} / ${votedVenue} / ${selectedTime}`);
              setShowSnackbar(true);
              setTimeout(() => {
                setShowSnackbar(false);
                navigate(-1);
              }, 2000);
            }
          }}
        >
          {step === 1 && 'Next: Vote for Venue'}
          {step === 2 && 'Lock in vote and go to set date'}
          {step === 3 && 'Finalize Vote'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {showSnackbar && (
        <div className="vote-snackbar">
          <span className="material-symbols-outlined">check_circle</span>
          Vote Finalized!
        </div>
      )}
    </div>
  )
}
