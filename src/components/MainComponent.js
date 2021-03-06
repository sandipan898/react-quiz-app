import React, { useState, useEffect, useRef } from 'react'
import FlashcardList from './FlashcardList';
import axios from 'axios';
import { Button, Container, FormControl, Typography, TextField, Select, InputLabel } from '@material-ui/core';

export default function MainComponent() {

    const [flashcards, setFlashcards] = useState([])
    const [categories, setCategories] = useState([])
    const [select, setSelect] = useState()
    const [score, setScore] = useState(0)
    // const [totalScore, setTotalScore] = useState(10)

    const categoryEl = useRef()
    const amountEl = useRef()

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => {
                setCategories(res.data.trivia_categories)
            })
    }, [])

    useEffect(() => {

    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        setScore(0)

        axios
            .get('https://opentdb.com/api.php', {
                params: {
                    amount: amountEl.current.value,
                    category: categoryEl.current.value
                }
            })
            .then(res => {
                // console.log(res.data)
                setFlashcards(res.data.results.map((questionItem, index) => {
                    const answer = decodeString(questionItem.correct_answer)
                    const options = [
                        ...questionItem.incorrect_answers.map(a => decodeString(a)), answer
                    ]
                    return {
                        id: `${index}-${Date.now()}`,
                        question: decodeString(questionItem.question),
                        answer: answer,
                        options: options.sort(() => Math.random() - .5)
                    }
                }))
            })
    }

    const handleSelectChange = (event) => {
        setSelect(event.target.value,);
    };


    function decodeString(str) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str;
        return textArea.value;
    }

    return (
        <>
            <Container className="">
                <form className="header" onSubmit={handleSubmit}>
                    <FormControl variant="outlined" className="form-group">
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            native
                            value={select}
                            onChange={handleSelectChange}
                            label="Question Category"
                            inputProps={{
                                id: 'category',
                            }}
                            inputRef={categoryEl}
                        >
                            {categories.map(category => {
                                return <option value={category.id} key={category.id}>{category.name}</option>
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-number"
                        label="Number of questions"
                        type="number"
                        min="1" step="1" defaultValue={10}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        inputRef={amountEl}
                        style={{ margin: "10px" }}
                    />
                    <div className="form-group">
                        {/* <button className="btn">Generate</button> */}
                        <Button onClick={handleSubmit} variant="contained" color="primary">Generate</Button>
                    </div>
                    <Typography variant="h5" >Score: {score} </Typography>
                </form>
            </Container>
            <Container className='container'>
                <FlashcardList flashcards={flashcards} score= {score} setScore={setScore} />
            </Container>
        </>
    );

}