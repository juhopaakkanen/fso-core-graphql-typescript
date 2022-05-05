import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Display = ({ anecdote, votes }) => {
    return (
      <>
        <p>{anecdote} </p>
        <p>has {votes} votes</p>
      </>
    )
} 

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const len = anecdotes.length 
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(len).fill(0))
  
  const title1 = 'Anecdote of the day'
  const title2 = 'Anecdote with most votes'  

  const handleAnecdoteClick = () => setSelected(Math.floor(Math.random() * len))

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  } 

  const mostVotesIndex = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header title={title1} />
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <Header title={title2} />
      <Display anecdote={anecdotes[mostVotesIndex()]} votes={votes[mostVotesIndex()]} />
    </div>
  )
}

export default App
