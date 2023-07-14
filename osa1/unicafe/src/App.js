import { useState } from 'react'

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>    {text}  </button>)

const StatisticsLine = ({text, value}) => (

  <tbody>
    <tr> 
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>

  
)


const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>{"statistics"}</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>{"statistics"}</h1>
      <table>
      <StatisticsLine text={"good"} value={props.good} />
      <StatisticsLine text={"neutral"} value={props.neutral} />
      <StatisticsLine text={"bad"} value={props.bad} />
      <StatisticsLine text={"total"} value={props.total} />
      <StatisticsLine text={"average"} value={props.average} />
      <StatisticsLine text={"positive"} value={props.pospersentage} />
      </table>
    </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const average = (good-bad) / total
  const pospersentage = (good / total)*100 + " %"


  const goodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const neutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const badClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
  }

  return (
    <div>
      <h1>{"give feedback"}</h1>
        <Button handleClick={goodClick} text='good' />        
        <Button handleClick={neutralClick} text='neutral' />
        <Button handleClick={badClick} text='bad' />
        <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} pospersentage={pospersentage}/>
    </div>
  )
}

export default App