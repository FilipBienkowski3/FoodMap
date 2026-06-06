import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar'
import { Button } from '../../components/common/Button/Button'
import { restaurantRoute, ROUTES } from '../../constants/routes'
import { trackEvent } from '../../config/analytics'
import { MOCK_USERS } from '../../data/users'
import './Activity.css'

const REVIEWER = MOCK_USERS.find(u => u.id === 'sarah-m') ?? MOCK_USERS[0]
const REVIEW_DISH = REVIEWER.visitedDishes[0]

const MEETUP = { id: 4, name: 'Wierzynek' }

const INVITE = { from: 'Sarah M.', room: 'Weekend Brunch' }

export default function Activity() {
  const nav = useNavigate()
  const [inviteOpen, setInviteOpen] = useState(true)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  const joinRoom = () => {
    trackEvent('activity', 'invite_join', INVITE.room)
    nav(ROUTES.VOTE, { state: { step: 2 } })
  }

  const declineInvite = () => {
    trackEvent('activity', 'invite_decline', INVITE.room)
    setInviteOpen(false)
    showToast('Invite declined')
  }

  return (
    <div className="activity">
      <header className="activity__header">
        <button className="activity__back" onClick={() => nav(-1)} aria-label="Go back">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="activity__brand">
          <span className="material-symbols-outlined activity__brand-icon">restaurant</span>
          FoodMap
        </span>
      </header>

      <div className="activity__scroll">
        <div className="activity__list">
          {/* Upcoming meetup */}
          <article className="ac-card ac-meetup">
            <div className="ac-meetup__top">
              <span className="ac-meetup__icon material-symbols-outlined">calendar_month</span>
              <div className="ac-meetup__info">
                <span className="ac-label">Upcoming Meetup</span>
                <p className="ac-text">
                  Dinner at <span className="ac-accent">{MEETUP.name}</span> tomorrow at 7:00 PM.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              className="ac-btn"
              onClick={() => { trackEvent('activity', 'meetup_view_details', MEETUP.name); nav(restaurantRoute(MEETUP.id)) }}
            >
              VIEW DETAILS
            </Button>
          </article>

          {/* Voting complete */}
          <article className="ac-card ac-voting">
            <div className="ac-voting__media">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                alt="Dinner table"
                className="ac-voting__img"
              />
              <span className="ac-voting__badge">VOTING COMPLETE</span>
            </div>
            <div className="ac-voting__body">
              <h2 className="ac-voting__title">Voting complete</h2>
              <p className="ac-text">
                Everyone has finished voting for tonight's dinner! See the results summary.
              </p>
              <Button
                variant="outline"
                fullWidth
                className="ac-btn ac-btn--summary"
                onClick={() => { trackEvent('activity', 'voting_view_summary'); nav(ROUTES.VOTE_SUMMARY) }}
              >
                VIEW SUMMARY
              </Button>
            </div>
          </article>

          {/* New review */}
          <article
            className="ac-card ac-review"
            role="button"
            tabIndex={0}
            onClick={() => { trackEvent('activity', 'open_review'); nav(restaurantRoute(REVIEW_DISH.restaurantId)) }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(restaurantRoute(REVIEW_DISH.restaurantId)) } }}
          >
            <img
              src={REVIEW_DISH.image}
              alt={REVIEW_DISH.name}
              className="ac-review__img"
            />
            <div className="ac-review__body">
              <div className="ac-review__head">
                <span className="ac-label">New Review</span>
                <span className="ac-rating">
                  <span className="material-symbols-outlined ac-rating__star">star</span>
                  {REVIEW_DISH.rating}
                </span>
              </div>
              <p className="ac-text">
                <span className="ac-accent">{REVIEWER.name}</span> reviewed {REVIEW_DISH.name} at{' '}
                <span className="ac-em">{REVIEW_DISH.restaurant}</span>
              </p>
            </div>
          </article>

          {/* New invite */}
          {inviteOpen && (
            <article className="ac-card ac-invite">
              <div className="ac-invite__top">
                <img
                  src="https://i.pravatar.cc/80?img=5"
                  alt="Sarah M."
                  className="ac-invite__avatar"
                />
                <div className="ac-invite__info">
                  <span className="ac-label">New Invite</span>
                  <p className="ac-text">
                    <span className="ac-accent">{INVITE.from}</span> invited you to{' '}
                    <span className="ac-accent">{INVITE.room}</span>
                  </p>
                </div>
              </div>
              <div className="ac-invite__actions">
                <Button
                  variant="primary"
                  className="ac-btn ac-btn--half"
                  onClick={joinRoom}
                >
                  JOIN ROOM
                </Button>
                <Button
                  variant="outline"
                  className="ac-btn ac-btn--half"
                  onClick={declineInvite}
                >
                  DECLINE
                </Button>
              </div>
            </article>
          )}

          {/* Poll vote */}
          <article className="ac-card ac-poll">
            <span className="ac-poll__icon material-symbols-outlined">how_to_vote</span>
            <div className="ac-poll__body">
              <p className="ac-text">
                <span className="ac-accent">Alex M.</span> voted in your 'Pizza Night' poll.
              </p>
              <span className="ac-time">2 minutes ago</span>
            </div>
          </article>
        </div>
      </div>

      {toast && (
        <div className="ac-toast" role="status">
          <span className="material-symbols-outlined ac-toast__icon">check_circle</span>
          {toast}
        </div>
      )}

      <Navbar />
    </div>
  );
}
