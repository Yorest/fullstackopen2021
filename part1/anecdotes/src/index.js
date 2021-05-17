import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    const [maxvote, setMaxvote] = useState(0);

    useEffect(() => {
        let maxValue = 0;
        let keyvote = 0;

        for (const key in points) {
            if (points[key] > maxValue) {
                maxValue = points[key];
                keyvote = key;
            }
        }

        setMaxvote(keyvote);
    }, [points]);

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleRandom = () => {
        setSelected(random(0, anecdotes.length - 1));
    };

    const handleVote = (num) => {
        setPoints({ ...points, [num]: points[num] + 1 });
    };

    return (
        <>
            {' '}
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>{points[selected]}</div>
            <button onClick={() => handleVote(selected)}>Vote</button>
            <button onClick={handleRandom}>next anecdote</button>
            <br /> <br />
            <h3>Anecdote with most votes</h3>
            <div>
                {anecdotes[maxvote]}.
                <strong>has {points[maxvote]} votes</strong>
            </div>
        </>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));