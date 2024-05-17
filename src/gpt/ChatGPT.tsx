import React from "react";
import { useState } from "react";
import { makeRequest } from "./OpenAI";
import "./ChatGPT.css";

export function ChatGPT(): JSX.Element {
    const [userInput, setUserInput] = useState<string>("");
    const [systemInput, setSystemInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [model, setModel] = useState<string>("gpt-4o");
    const [temperature, setTemperature] = useState<number>(1);
    const [maxTokens, setMaxTokens] = useState<number>(750);
    const [topP, setTopP] = useState<number>(1);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
    const [presencePenalty, setPresencePenalty] = useState<number>(0);

    function updateModel(event: React.ChangeEvent<HTMLSelectElement>) {
        setModel(event.target.value);
    }

    function updateTemperature(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseFloat(event.target.value);

        if (value > 2) {
            value = 2;
        } else if (value < 0) {
            value = 0;
        } else if(isNaN(value)) {
            value = 1;
        }

        setTemperature(value);
    }

    function updateMaxTokens(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseInt(event.target.value);
        if (value < 1) {
            value = 1;
        } else if(isNaN(value)) {
            value = 750;
        }

        setMaxTokens(value);
    }

    function updateTopP(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseFloat(event.target.value);
        if (value > 1) {
            value = 1;
        } else if (value < 0) {
            value = 0;
        } else if(isNaN(value)) {
            value = 1;
        }

        setTopP(value);
    }

    function updateFrequencyPenalty(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseFloat(event.target.value);
        if (value > 2) {
            value = 2;
        } else if (value < 0) {
            value = 0;
        } else if(isNaN(value)) {
            value = 0;
        }

        setFrequencyPenalty(value);
    }

    function updatePresencePenalty(event: React.ChangeEvent<HTMLInputElement>) {
        let value = parseFloat(event.target.value);
        if (value > 2) {
            value = 2;
        } else if (value < 0) {
            value = 0;
        } else if(isNaN(value)) {
            value = 0;
        }

        setPresencePenalty(value);
    }

    async function getResults() {
        setUserInput(localStorage.getItem("userInput") || "");
        setSystemInput(localStorage.getItem("systemInput") || "");
        const response = await makeRequest(userInput, systemInput, model, temperature, maxTokens, topP, frequencyPenalty, presencePenalty);
        setResponse(response || "");
    }

    return (
        <div>
            <div className="Customization">
                <h3>Customize your response:</h3>
                <div className="Customization-fields">
                    <div className="Field">
                        <label>Choose a model: </label>
                        <br></br> 
                        <select id="options" value={model} onChange={updateModel}> 
                            <option value="" disabled>Select Model</option> 
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4-turbo">GPT-4 Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3">GPT-3</option>
                        </select> 
                    </div>
                    <br></br>
                    <div className="Field">
                        <label>Temperature:</label>
                        <br></br>
                        <input type="text" value={temperature} onChange={updateTemperature}/>
                        <br></br>
                        <input type="range" min="0" max="2" step="0.01" value={temperature} onChange={updateTemperature}/>
                        <br></br>
                        default 1
                    </div>
                    <br></br>
                    <div className="Field">
                        <label >Max Tokens:</label>
                        <br></br>
                        <input type="text" value={maxTokens} onChange={updateMaxTokens}/>
                        <br></br>
                        default 750
                    </div>
                    <br></br>
                    <div className="Field">
                        <label>Top P:</label>
                        <br></br>
                        <input type="text" value={topP} onChange={updateTopP}/>
                        <br></br>
                        <input type="range" min="0" max="1" step="0.01" value={topP} onChange={updateTopP}/>
                        <br></br>
                        default 1
                    </div>
                    <br></br>
                    <div className="Field">
                        <label>Frequency Penalty:</label>
                        <br></br>
                        <input type="text" value={frequencyPenalty} onChange={updateFrequencyPenalty}/>
                        <br></br>
                        <input type="range" min="0" max="2" step="0.01" value={frequencyPenalty} onChange={updateFrequencyPenalty}/>
                        <br></br>
                        default 0
                    </div>
                    <br></br>
                    <div className="Field">
                        <label>Presence Penalty:</label>
                        <br></br>
                        <input type="text" value={presencePenalty} onChange={updatePresencePenalty}/>
                        <br></br>
                        <input type="range" min="0" max="2" step="0.01" value={presencePenalty} onChange={updatePresencePenalty}/>
                        <br></br>
                        default 0
                    </div>
                </div>
            </div>
            <br></br>
            <button onClick={getResults}>Get Answer</button>
            <br></br>
            {response !== "" && <div>
                <p>Response with:</p>
                <div className="Response">
                    {response}
                </div>
            </div>}
        </div>
    )
}