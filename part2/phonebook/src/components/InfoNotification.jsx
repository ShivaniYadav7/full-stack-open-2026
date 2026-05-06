const InfoNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notifStyle = {
        color: 'gray',
        border: '2px solid green'
    }

    return (
       <><div style = {notifStyle}>{message}</div></>
    )
}

export default InfoNotification