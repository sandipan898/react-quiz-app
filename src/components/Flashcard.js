import React, {useState, useEffect, useRef} from 'react'
import { Button, Container, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isDisabled, setIsDisabled ] = useState(true)
    const [checkMsg, setCheckMsg ] = useState()
    const [color, setColor ] = useState()
    
    const handleChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 300))
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    function handleCheckAnswer() {
        if (selectedAnswer === flashcard.answer) {
            setCheckMsg("Correct Answer");
            setColor('primary');
        } else {
            setCheckMsg("Wrong Answer")
            setColor('error');
        }
        setIsDisabled(false)
    }

    return (
        <>
        <FormControl>
            <div
                className={`card ${flip ? `flip` : ``}`}
                style={{ height: height }}
            >    
            <Container style={{backgroundColor:{color}}} className="front" ref={frontEl}>
                {/* {flashcard.question} 
                <div className="flashcard-options" value={answer} onChange={handleChange}>
                    {flashcard.options.map(option => {
                        return <input type="radio" className="flashcard-option" key={option} value={option} />
                    })}
                </div> */}
                <Typography color={color}>{checkMsg}</Typography>
                <Typography>{flashcard.question}</Typography> 
                <br/>
                <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={selectedAnswer} onChange={handleChange}>
                {flashcard.options.map(option => {
                    return <FormControlLabel value={option} control={<Radio />} label={option} />
                })}
                </RadioGroup>
                </FormControl>
            </Container>
            <Typography className="back" ref={backEl}>{flashcard.answer}</Typography>
            </div>
            <span className="card">
                <Button 
                    id="check-answer" 
                    variant="contained" 
                    color="secondary" 
                    className="btn" 
                    onClick={handleCheckAnswer} 
                >
                    Check Answer
                </Button>
                <Button 
                    disabled={isDisabled} 
                    id="show-answer" 
                    variant="contained" 
                    color="primary" 
                    className="btn" 
                    onClick={() => {setFlip(!flip);}} 
                >
                    Show Answer
                </Button>
            </span>
        </FormControl>
        </>
    )
}
