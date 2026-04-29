import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'
import Part from './components/Part'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <div>
        <Header course={course} />
        <Content 
          part1 = {part1} ex1 = {exercises1} 
          part2 = {part2} ex2 = {exercises2} 
          part3 = {part3} ex3 = {exercises3}
          />
        <Total total = {exercises1 + exercises2 + exercises3} />
      </div>
      
    </div>
  )
}

export default App