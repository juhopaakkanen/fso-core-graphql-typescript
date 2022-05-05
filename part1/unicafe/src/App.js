import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ stat, value}) => {
  return (
    <tr>
      <td>{stat} {value}</td>
    </tr>
  )
}

const Statistics = ({ data })=> {
  if (data.every(entry => entry === 0) ) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const total = data.reduce((sum, n) => sum + n) 
  const [good, neutral, bad] = data
  let average = ((good-bad)/total)
  average = +average.toFixed(2) //to get rid of trailing 0
  const positive = ((good/total)*100).toFixed(1)

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine stat="good" value={good} />
          <StatisticLine stat="neutral" value={neutral} />
          <StatisticLine stat="bad" value={bad} />
          <StatisticLine stat="all" value={good+neutral+bad} />
          <StatisticLine stat="average" value={average} />
          <StatisticLine stat="positive" value={positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const title1 = 'give feedback'
  const title2 = 'statistics'

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header header={title1}/>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Header header={title2}/>
      <Statistics data={[good, neutral, bad]} />
    </div>
  )
}

export default App