import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Menu from "./components/Menu";
import { nanoid } from "nanoid";

function App() {
  //state to for the start quiz button
  const [started, setStarted] = React.useState(false);

  //passed as prop to Menu
  function start() {
    setStarted((prevStarted) => !prevStarted);
  }

  //a state to hold all the questions obtained from the api call
  const [questions, setQuestions] = useState([]);

  //a state upon which useeffect depends
  const [count, SetCount] = useState(0);

  //function to shuffle the array of answers to be obtained from the api call
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  //the state of the chekc answer btn why am i even writing this
  const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);

  //correct answers
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  //game over
  const [isGameOver, setIsGameOver] = useState(false);

  

  //on answering every question,each of the question object must have a non empty string for selectedAnswer
  const allQuestionsAnswered = questions.every(
    (question) => question.selectedAnswer !== ""
  );

  //api call for the question and answers.
  useEffect(() => {
    let q = [];
    
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
      .then((res) => res.json())
      .then((apiData) =>
        apiData.results.forEach((item) => {
          q.push({
            id: nanoid(),
            question: item.question,
            correct: item.correct_answer,
            incorrect: [...item.incorrect_answers],
            answers: shuffleArray([
              ...item.incorrect_answers,
              item.correct_answer,
            ]), //maybe dont need this as well now
            selectedAnswer: "",
            showAnswer: false,
          });
        })
      );
      
    setQuestions(q);
  }, [count]);


  //for the score
  useEffect(() => {
    if(questions.length !== 0 && allQuestionsAnswered){
      let correctCount = 0;
      questions.forEach(item => {
        if(item.correct === item.selectedAnswer){
          correctCount++;
        }
      });
      console.log(correctCount);
      setCorrectAnswersCount(correctCount);
      setCheckAnswerBtn(true);

    }
  },[questions]);

  // function handleSelectAnswer(questionID, answer){
  //   if(!isGameOver){
  //     setQuestions(prevQuestions => prevQuestions.map(item => {
  //       item.id === questionID ? {...item,selectedAnswer:answer} : item
  //     }))
  //   }
  // }

  //if game not over
  //setQuestions so that the selected answer can change for that particualr question block
  //do not ever forger the return statement for the map method.
  function handleSelectAnswer(questionID, answer) {
    if (!isGameOver) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((item) => {
          return item.id === questionID
            ? { ...item, selectedAnswer: answer }
            : item;
        })
      );
    }
  }

  //for all questions answered and check answer button pressed
  function checkAnswers() {
    if (allQuestionsAnswered) {
      setIsGameOver(true);

      setQuestions((prevQuestions) =>
        prevQuestions.map((item) => {
          return {
            ...item,
            showAnswer: true,
          };
        })
      );

      // let correctCount = 0
      // questions.forEach((item) => {
      //   if (item.correct === item.selectedAnswer) {
      //     correctCount = correctCount + 1;
      //   }
      // });
      // console.log(correctCount);
      // setCorrectAnswersCount(correctCount);
      // console.log(correctAnswersCount);


    }
  }

  function resetGame(){
    setIsGameOver(false);
    setCheckAnswerBtn(false);
    SetCount(prevCount => prevCount + 1);
    setStarted(false);
  }

  const questionElement = questions
    ? questions.map((item) => {
        return (
          <Question
            key={item.id}
            id={item.id}
            question={item.question}
            answersArr={item.answers} //maybe dont need this and the shuffle function to go
            correct={item.correct}
            incorrect={item.incorrect}
            selectedAnswer={item.selectedAnswer}
            showAnswer={item.showAnswer}
            handleSelectAnswer={handleSelectAnswer}
          />
        );
      })
    : [];

  return (
    <div className="main-container">
      
      <div className="content-container">
        {started ? (
          <div className="start-content-container">
            {questionElement}
            <div className="end-content">
              {isGameOver && 
                <h3 className="correct-answers-text">
                  You scored {correctAnswersCount}/5 correct answers.
                </h3>
              }
              <button 
              className={`btn-primary ${checkAnswerBtn? "btn-check-answers": "btn-check-answers-disabled"}`}
              onClick={isGameOver? resetGame : checkAnswers}
              >
                {isGameOver ? "Play Again" : "Check Answers"}
              </button>
            </div>
          </div>
        ) : (
          <Menu start={start} />
        )
}
      </div>

    </div>
  );
}

export default App;
