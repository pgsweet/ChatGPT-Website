import React from "react";
import { useState } from "react";
import { makeRequest } from "./OpenAI";
import "./ChatGPT.css";

export function ChatGPT(): JSX.Element {
    const [userInput, setUserInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [model, setModel] = useState<string>("Select Model");
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
        const response = await makeRequest(userInput, model, temperature, maxTokens, topP, frequencyPenalty, presencePenalty);
        setResponse(response || "");
    }

    return (
        <div>
            <button onClick={getResults}>Get Answer</button>
            <br></br>
            <div>
                <label htmlFor="options">Choose a model: </label> 
                <select id="options" value={model} onChange={updateModel}> 
                    <option value="" disabled>Select one</option> 
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3">GPT-3</option>
                </select> 
            </div>
            <br></br>
            <div>
                <label htmlFor="temperature">Temperature:</label>
                <input type="text" value={temperature} onChange={updateTemperature}/>
                default 1
                <br></br>
                <input type="range" min="0" max="2" step="0.01" value={temperature} onChange={updateTemperature}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="maxTokens">Max Tokens:</label>
                <input type="text" value={maxTokens} onChange={updateMaxTokens}/>
                default 750
            </div>
            <br></br>
            <div>
                <label htmlFor="topP">Top P:</label>
                <input type="text" value={topP} onChange={updateTopP}/>
                default 1
                <br></br>
                <input type="range" min="0" max="1" step="0.01" value={topP} onChange={updateTopP}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="frequencyPenalty">Frequency Penalty:</label>
                <input type="text" value={frequencyPenalty} onChange={updateFrequencyPenalty}/>
                default 0
                <br></br>
                <input type="range" min="0" max="2" step="0.01" value={frequencyPenalty} onChange={updateFrequencyPenalty}/>
            </div>
            <br></br>
            <div>
                <label htmlFor="presencePenalty">Presence Penalty:</label>
                <input type="text" value={presencePenalty} onChange={updatePresencePenalty}/>
                default 0
                <br></br>
                <input type="range" min="0" max="2" step="0.01" value={presencePenalty} onChange={updatePresencePenalty}/>
            </div>
            <p>Response with:</p>
            <div className="Response">
                {response}
            </div>
        </div>
    )
}