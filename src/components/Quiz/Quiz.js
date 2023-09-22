import {useState} from "react";
import {resultInitialState} from "../../constance";
import "./Quiz.scss"
import Result from "../Result/Result";

const Quiz = ({questions}) => {

   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [answerIndex, setAnswerIndex] = useState(null);
   const [answer, setAnswer] = useState(null);
   const [result,setResult] = useState(resultInitialState);
   const [showResult,setShowResult] = useState(false)
   const {question,choices, correctAnswer} = questions[currentQuestion];


   const onAnswerClick = (answer,index) => {
       setAnswerIndex(index);
       if(answer === correctAnswer) {
           setAnswer(true);
       } else{
           setAnswer(false);
       }

   };

   const onClickNext = () => {
       setAnswerIndex(null);
       setResult((prev) =>
                 answer ? { ...prev, score:prev.score + 5,
                 correctAnswers: prev.correctAnswers + 1,
                 }  : { ...prev, wrongAnswers: prev.wrongAnswers +1
                 }
       );
       if (currentQuestion !== questions.length -1) {
           setCurrentQuestion((prev) => prev + 1);
       } else {setCurrentQuestion(0);
               setShowResult(true);
       }
   };


   const onTryAgain =() => {
       setResult(resultInitialState);
       setShowResult(false);
   };

   return(
       <div className="quiz-container">
           {!showResult ? ( <> <span className="active-question-no">{currentQuestion + 1}</span>
               <span className="total-question">/{questions.length}</span>
               <h2>{question}</h2>
               <ul>
                   {choices.map((choice,index) => (
                       <li onClick={() => onAnswerClick(choice,index)}
                           key={choice}
                           className={ answerIndex === index ? "selected-answer" : null}>
                           {choice}
                       </li>))}
               </ul>
               <div className="footer">
                   <button onClick={onClickNext}  disabled = {answerIndex === null}>
                       {currentQuestion === questions.length - 1 ? "Koniec" : `Następne pytanie   \u2192` }
                   </button>
               </div>
           </> ) : (
                 <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
           )}

       </div>
   );
}

export default Quiz;