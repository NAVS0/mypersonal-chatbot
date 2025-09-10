import { useRef, useState } from "react";

const ChatForm = ({ chatHistory,setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
      e.preventDefault();
      const userMessage = inputRef.current.value.trim();
      if (!userMessage || isSubmitting) return;
      
      setIsSubmitting(true);
      inputRef.current.value = "";

      // Update chat history with the user's message
      setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

      //Delay 600 ms before showing "Thinking..." and generating response
      setTimeout(() => {
          // Add a "Thinking...." placeholder for the bot's response
          setChatHistory((history) => [...history, { role: "model", text: "Halat lang..."}]);

        // Call the function to generate the bot's response
        const snapshot = [...chatHistory];
        const prompt = `Using the details provided above, please address this query: ${userMessage}`;
        
        // Generate response and handle any errors
        generateBotResponse([...snapshot, { role: "user", text: prompt }]).catch((error) => {
          console.error("Error generating response:", error);
          // Remove the "Halat lang..." message if there's an error
          setChatHistory((history) => history.filter(msg => msg.text !== "Halat lang..."));
        }).finally(() => {
          setIsSubmitting(false);
        });
      }, 600);
    };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  return ( 
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="message-input"
        onKeyPress={handleKeyPress}
        disabled={isSubmitting}
        required
      />
      <button 
        type="submit" 
        className={`submit-button ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        <span className="material-symbols-rounded">
          {isSubmitting ? 'hourglass_empty' : 'send'}
        </span>
      </button>
    </form>
  );
};

export default ChatForm;