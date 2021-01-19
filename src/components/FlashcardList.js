import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards, setScore, score }) {
    return (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                return <Flashcard score={score} setScore={setScore} flashcard={flashcard} key={flashcard.id} />
            })}
        </div>
    )
}
