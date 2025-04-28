// Get DOM elements
const form = document.getElementById('chatbot-form');
const input = document.getElementById('chatbot-input');
const body = document.getElementById('chatbot-body');

// Function to fetch bot response from Flask API on Render
async function getBotResponse(userText) {
  try {
    const response = await fetch('https://olwik-twitch.onrender.com//ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userText }),
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error('Server response error');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
}

// Function to add a message to the chat window
function addMessage(text, sender = 'user') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  body.appendChild(msgDiv);
  body.scrollTop = body.scrollHeight;
}

// Form submission event
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  // Show user message
  addMessage(userText, 'user');
  input.value = '';

  // Fetch and show bot reply
  const botReply = await getBotResponse(userText);
  addMessage(botReply, 'bot');
});
