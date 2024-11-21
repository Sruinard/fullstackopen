const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}


const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((part, index) => <Part key={index} part={part} />)
      }
    </div>
  )
}

const Total = (props) => {

  const total = props.parts.reduce((acc, part) => acc + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )
}

export default App