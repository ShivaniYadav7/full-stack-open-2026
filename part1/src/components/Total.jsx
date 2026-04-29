const Total = (props) => {
    const totalAmount = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
    return (
    <p>This course has total {totalAmount} exercises</p>
    )
}

export default Total