import { React, useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = ({ text, value }) => {
    return (
        <>
            {text} {value}
        </>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const average =
        (good + neutral * 0 + bad * -1) / (good + neutral + bad)
            ? (good + neutral * 0 + bad * -1) / (good + neutral + bad)
            : 0;
    const positive =
        good / (good + neutral + bad) ? good / (good + neutral + bad) : 0;

    const feedback =
        good + neutral + bad > 0 ? (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Statistics</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Statistic text="Good" value={good} />{' '}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Statistic text="Neutral" value={neutral} />{' '}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Statistic text="Bad" value={bad} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Statistic
                                    text="all"
                                    value={good + neutral + bad}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Statistic text="average" value={average} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Statistic text="positive" value={positive} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        ) : (
            'No feedback given'
        );

    return <>{feedback} </>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const setToGood = () => {
        setGood(good + 1);
    };

    const setToNeutral = () => {
        setNeutral(neutral + 1);
    };

    const setToBad = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>give feedback</h1>
            <p>
                <Button handleClick={() => setToGood()} text="Good" />
                <Button handleClick={() => setToNeutral()} text="Neutral" />
                <Button handleClick={() => setToBad()} text="Bad" />
            </p>

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
