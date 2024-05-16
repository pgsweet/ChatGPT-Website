import OpenAI from "openai";

export async function makeRequest(userInput: string, model: string, temperature: number, max_toekns: number, top_p: number, frequency_penalty: number, presence_penalty: number) {
    const key = localStorage.getItem("OPENAI_API_KEY")?.replace(/['"]+/g, '')
    if (key === null) {
        console.log("API key not found")
        return null;
    }

    const openai = new OpenAI({apiKey: key , dangerouslyAllowBrowser: true });
    const response = await openai.chat.completions.create({
        model: model, //"gpt-4o",
        messages: [
            {role: "system", content: "Please respond to the following question without any special formatting:"},
            {role: "user", content: userInput}
        ],
        temperature: temperature, //1,
        max_tokens: max_toekns, //256,
        top_p: top_p, //1,
        frequency_penalty: frequency_penalty, //0,
        presence_penalty: presence_penalty, //0,
      });
    return response.choices[0].message.content;
}