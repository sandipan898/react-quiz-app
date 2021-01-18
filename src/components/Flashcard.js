import React, {useState} from 'react'

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)

    return (
        <div onClick={() => setFlip(!flip)} className={`card ${flip ? `flip` : ``}`}>
            {/* <button onClick={() => setFlip(!flip)}>Flip</button> */}
            <div className="front">
                {flashcard.question} 
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option">{option}</div>
                    })}
                </div>
            </div>
            <div className="back">{flashcard.answer}</div>
        </div>
    )
}
