import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => (
  <>
    <p>{text} {value}</p>
  </>
)

const Statistics = (props) => {

  {
    if (props.total === 0) {
      return <p>No feedback given</p>
    } else return (
      <>
        <h1>Statistics</h1>
        <div>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={props.total} />
          <StatisticsLine text="average" value={props.average} />
          <StatisticsLine text="positive" value={props.positivePercentage} />
        </div>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Calculate total feedback
  const total = good + neutral + bad;

  // Calculate average score
  const average = total > 0 ? (good - bad) / total : 0;

  // Calculate percentage of positive feedback
  const positivePercentage = total > 0 ? (good / total) * 100 : 0;


  return (
    <div>
      <h1>give feedback</h1>
      <div style={{ display: 'flex' }}>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercentage={positivePercentage} />

    </div>
  )
}

export default App