import './App.scss';
import {useEffect, useState} from 'react';
import Quiz from "../Quiz/Quiz";
import Header from "../Header/Header";




function App() {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
      getQuestions();
    }, []);

    const getQuestions = () => {
        fetch('https://649c820504807571923845c0.mockapi.io/api/questions/film-questions')
            .then(response => response.json())
            .then(questionsResponse => {
                console.log(questionsResponse);
                setQuestions(questionsResponse);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
      questions.length &&  /* służy do sprawdzenia, czy tablica questions istnieje i czy ma co najmniej jeden element. */
    <div className="App">
        <Header/>
        <Quiz questions={questions}/>
    </div>
  );
}

export default App;



