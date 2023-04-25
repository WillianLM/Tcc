const inputQuestion = document.getElementById("inputQuestion");

const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
    if (inputQuestion.value && e.key === "Enter")
    SendQuestion();
});

const OPENAI_API_KEY = "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"

function SendQuestion() {
    var sQuestion = inputQuestion.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,            
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "fazer um redação sobre "+sQuestion,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5, // criatividade na resposta
        }),
    })

        .then((Response) => Response.json())
        .then((json) => {
            if (result.value) result.value += "\n";

            if (json.error?.message) {
                result.value += `Error: ${json.error.message}`;
            }
            else if (json.choices?.[0].text) {
                var text = json.choices[0].text || "Sem Resposta";

                result.value += "Chat GPT: " + text;
            }

            result.scrollTop = result.scrollHeight;

        })
        .catch((error) => console.error("Error:", error))
        .finally(() =>{
            inputQuestion.value = "";
            inputQuestion.disabled = false;
            inputQuestion.focus();
        })

    if (result.value) result.value += "\n\n\n";

    result.value += `EU: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    result.scrollTop = result.scrollHeight;
};