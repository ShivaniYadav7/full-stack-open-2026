const Filter = (props) => {

    return (
        <>
            <form onSubmit = {props.search}>
            <p>filter shown with
            <input value={props.searchName} onChange={props.handleSearchName}/>
            </p>
            </form>
        </>
    )
    
}

export default Filter