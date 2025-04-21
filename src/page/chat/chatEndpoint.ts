async function sendMessageToAI(message: string) {
  try {
    const response = await fetch("http://127.0.0.1:8889/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: message }),
    });

    return response.json();
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}

export { sendMessageToAI };
