import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function Question(props){

    // let answers = props.answersArr;
    

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    //will be mapping the incorrect answer and correct answer separetely 
    //if selected answer is one of the incorrect answer --> ceratain class name else
    //also if the checkanswerbtn is clicked and selected is one of the incorrect answer: question-btn-incorrect

    //using different className to handle the different styles of the clikced button,correct answer and incorrect answer
    //for incorrect,checkanswer btn must be clikced and then the selected answer must be one of the incorrect answer 
    //else it becomes a correct answer

    const incorrectAnswersElement = props.incorrect.map(answer => {
        const incorrectAnswerClassName = `
        ${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn" }
        ${(props.showAnswer && props.selectedAnswer === answer) && "question-btn-incorrect"}
        `;

        return (
            <button
            key={nanoid()}
            className={incorrectAnswerClassName}
            onClick={() => props.handleSelectAnswer(props.id, answer)}
            >
                {window.atob(answer)}
                {/* {answer} */}
            </button>
        )

    });


    const correctAnswerClassName = `
    ${props.selectedAnswer === props.correct ? "question-btn-selected" : "question-btn"}
    ${props.showAnswer && "question-btn-correct"}
    `;

    const correctAnswerElement = 
        <button
            key={nanoid()}
            className={correctAnswerClassName}
            onClick={() => props.handleSelectAnswer(props.id,props.correct)}
        >
            {window.atob(props.correct)}
            {/* {props.correct} */}
        </button>
    

    const answersElement = [];
    answersElement.push(incorrectAnswersElement);
    answersElement.push(correctAnswerElement);

    //had to put the shuffleArray function inside a useEffect as it was moving the buttons with every click 
    //had done this in the app.jsx fetch but was not used
    
    useEffect(() => {
        shuffleArray(answersElement);
    },[])
    

   

    
    


    // const answersElement =  answers.map(item => {
    //     return (
    //         <button
    //         key={nanoid()}
    //         >
    //             {window.atob(item)}
    //         </button>
    //     )
    // })

    return (
        <div className='question-container'>
            <h3 className='question-title'>{atob(props.question)}</h3>
            {answersElement}
            <div className='line'></div>
        </div>
    )
}
