document.getElementById('submitButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const chatContainer = document.getElementById('chat');
    const apiKey = 'add your API key'; 

    if (!inputText.trim()) {
        return;
    }

    // Add user's message to chat
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerText = inputText;
    chatContainer.appendChild(userMessage);

    // Clear input
    document.getElementById('inputText').value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: inputText }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            // Add bot's response to chat
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerText = data.choices[0].message.content.trim();
            chatContainer.appendChild(botMessage);

            // Scroll to bottom of chat
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            console.error('No response from API.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
