export default function Menu(props){
    return (
        <div className="menu">
            <h1 className="menu-title">Quizzical</h1>
            <span className="menu-description">A random list of questions for you to answer!</span>
            <button className="menu-btn" onClick={() => props.start()}>Start Quizzical</button>
        </div>
    )
}