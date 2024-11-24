import Part from "./Part"

const Content = ({ parts }) => {
    const total = parts.reduce((a, b) => {
        console.log("This is a:", a)
        console.log("This is b:", b)
        return a + b.exercises
    }, 0)
    return ( <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>
    </>
    )
}
  
export default Content