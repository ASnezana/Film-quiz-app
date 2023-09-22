import "./Result.scss"
import {useState,useEffect} from "react";

const Result = ({totalQuestions, result, onTryAgain}) => {

    const [name,setName] = useState("");
    const [highScores,setHighscores] = useState([]);
    const [showScores,setShowScores] =useState(false);

    useEffect(() => {
        setHighscores(JSON.parse(localStorage.getItem('highScores')) || []);
    },[] )
    const handleSave = () => {
        const score = {
            name:name,
            score:result.score
        };



        const newHighScores = [...highScores,score].sort((a,b) => b.score - a.score);
        setHighscores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
    };

    const handleTryAgain = () => {
        setShowScores(false);
        setHighscores([]);
        onTryAgain();
    };

    return (
        <div className="result">
            <h3>Twoje wyniki</h3>
            <p>Ilość pytań : <span> {totalQuestions} </span> </p>
            <p>Ilość punktów : <span> {result.score} </span> </p>
            <p>Ilość poprawnych odpowiedzi : <span> {result.correctAnswers} </span> </p>
            <p>Ilość złych odpowiedzi : <span> {result.wrongAnswers} </span> </p>

            <button onClick={handleTryAgain}>Spróbuj ponownie !</button>

            {!showScores ? <>
                <h4> Zapisz swoje imię <br/> i zobacz ranking </h4>
                <input   placeholder= "Twoje imię" value={name} onChange={(event) => setName(event.target.value)}/>
                <button onClick={handleSave}>Zapisz</button>
            </>  : <>
               <table>
                   <thead>
                    <tr>
                       <th>Ranking</th>
                       <th>Imię</th>
                       <th>Punkty</th>
                    </tr>
                  </thead>
                  <tbody>
                  {highScores.map((highScore,i) => {
                  return ( <tr key={`${highScore.score} ${highScore.name} ${i}`}>
                            <td>{i + 1}</td>
                            <td>{highScore.name}</td>
                            <td>{highScore.score}</td>
                         </tr> );
                  })}

                  </tbody>
               </table>
            </> }
        </div>
    );
};

export default Result;