import "./UserInput.css"

export function UserInput():  JSX.Element {

    function changeUserInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        localStorage.setItem("userInput", event.target.value);
    }

    function changeSystemInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        localStorage.setItem("systemInput", event.target.value);
    }
    
    return (
        <div className="User-input">
            <div className="Row">
                <div className="Column">
                    <h2>User input:</h2>
                    <textarea placeholder="Enter user input here" onChange={changeUserInput} className="Text-box" rows={7}/>
                </div>
                <div className="Column">
                    <h2>System prompt:</h2>
                    <textarea placeholder="Enter system prompt here" onChange={changeSystemInput} className="Text-box" rows={7}/>
                </div>
            </div>
        </div>
    )
}