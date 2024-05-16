import "./UserInput.css"

export function UserInput():  JSX.Element {

    function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
        localStorage.setItem("userInput", event.target.value);
    }
    
    return (
        <div className="User-input">
            <h2>Enter input here:</h2>
            <input type="text" placeholder="Enter text here" onChange={changeInput} className="Text-box"/>
        </div>
    )
}