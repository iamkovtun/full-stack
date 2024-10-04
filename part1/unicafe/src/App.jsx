import React, { useState } from "react";

// Display Component
const Display = ({ text }) => <h1>{text}</h1>;

// Button Component
const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// StatisticLine Component
const StatisticLine = ({ name, number, symbol }) => (
  <td>{name} {number}{symbol}</td>
);

// Statistics Component
const Statistics = ({allStats}) => {

  if (allStats.find(stat => stat.name === 'all').number === 0) {
    return <p>no feedbacks</p>
  }

  return(
    <table>
        <tbody>
          {allStats.map((stat) => (
            <tr key = {stat.name}>
              <StatisticLine name={stat.name} number={stat.number} symbol={stat.symbol}/>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

const App = () => {
  // Initialize state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Handle good feedback
  const handleGood = () => setGood(good + 1);
  // Handle neutral feedback
  const handleNeutral = () => setNeutral(neutral + 1);
  // Handle bad feedback
  const handleBad = () => setBad(bad + 1);

  // Prepare statistics data
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : ((good - bad) / all).toFixed(2);
  const positivePercentage = all === 0 ? 0 : ((good / all) * 100).toFixed(2);

  const allStats = [
    { name: 'good', number: good, symbol: '' },
    { name: 'neutral', number: neutral, symbol: '' },
    { name: 'bad', number: bad, symbol: '' },
    { name: 'all', number: all, symbol: '' },
    { name: 'average', number: average, symbol: '' },
    { name: 'positive', number: positivePercentage, symbol: ' %' }
  ];

  // Return JSX
  return (
    <div>
      <Display text={"give feedback"} />
      <Button label={"good"} onClick={handleGood} />
      <Button label={"neutral"} onClick={handleNeutral} />
      <Button label={"bad"} onClick={handleBad} />
      <Display text={"statistics"} />
      <Statistics allStats={allStats} />
    </div>
  );
};

export default App;
