const Notifications = ({notification}) =>{
    return <div id="notification" className={notification.length > 0 ? "shown" : ""}>
        <b>Alerta: </b>{notification}
    </div>
}
export default Notifications