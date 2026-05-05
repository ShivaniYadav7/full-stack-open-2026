const Persons = (props) => {
    return (
        <>
        {props.personsToShow.map(person => <p key={person.name}>{person.name}  {person.number}
            <button onClick = {() => props.delete(person.id)}>delete</button>
        </p>)}
        </>
    )    
}

export default Persons;