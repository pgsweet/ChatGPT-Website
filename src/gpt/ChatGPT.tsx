import { useState } from "react";

export function ChatGPT(): JSX.Element {
    const [userInput, setUserInput] = useState<string>("");


    function getResults() {
        setUserInput(localStorage.getItem("userInput") || "");
    }

    return (
        <div>
            <button onClick={getResults}>Get Results</button>
            <p>ChatGPT with "{userInput}" </p>
        </div>
    )
}