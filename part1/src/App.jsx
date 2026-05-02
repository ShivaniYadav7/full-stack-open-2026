import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.onClick}>{props.text}</button>
  )
}

const  StatisticLine = (props) => {
  return(
    <>
      <p>{props.text} {props.value}</p>
    </>
  );
}

const Statistics = (props) => {
      const good = props.good
      const neutral = props.neutral
      const bad = props.bad
      const all = good + neutral + bad

      if(all === 0) {
        return (
          <>
          <h2>Statistics</h2>
          <p>No feedback given</p>
          </>
        );
      }
      
      const average = (good - bad) / all
      const positive = (good / all) * 100

  return(
    <>      
      <StatisticLine text = 'good' value = {good} />
      <StatisticLine  text = 'neutral' value = {neutral} />
      <StatisticLine text = 'bad' value = {bad} />
      <StatisticLine text = 'all' value = {all} />
      <StatisticLine text = 'average' value = {average} />
      <StatisticLine text = 'positive' value = {positive + '%'} />
    </>
  );
}
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral

      return (
      <>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Button onClick={() => setBad(bad + 1)} text = 'bad'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      </>
    );
}

export default App