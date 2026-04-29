import Part from './Part'

const Content = (props) => {
    return (
    <>
        <p>Part name = {props.part1} exercises = {props.ex1}</p>
        <p>Part name = {props.part2} exercises = {props.ex2}</p>
        <p>Part name = {props.part3} exercises = {props.ex3}</p>
    </>
    )
}

export default Content