import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const QuoteDisplay = (props) => (
  <div>
    <h1>{props.title}</h1>
    <div>
      <p> {props.quote} </p>
      <p>has {props.votes} votes</p>
    </div>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })


  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    console.log(random)
    setSelected(random)
  }

  const handleVote = () => {
    setVotes({...votes, [selected]: votes[selected] + 1})
  }

  return (
    <div>
      <QuoteDisplay
        title="Anecdote of the day"
        quote={anecdotes[selected]}
        votes={votes[selected] || 0}
      />
      <div>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={handleClick} text="next quote"/>
      </div>
      <QuoteDisplay
        title="Anecdote with most votes"
        quote={anecdotes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]}
        votes={votes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]}
      />
    </div>
  )
}

export default App