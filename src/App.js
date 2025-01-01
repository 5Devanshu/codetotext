// src/App.js

import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [codeInput, setCodeInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://your-api-id.execute-api.region.amazonaws.com/v1/generate", {
        code: codeInput,
      });
      setGeneratedText(response.data.generated_text);
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Error generating text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Code to Text Generative AI</h1>
      <textarea
        value={codeInput}
        onChange={handleInputChange}
        placeholder="Enter your code here..."
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleGenerateText} disabled={loading}>
        {loading ? "Generating..." : "Generate Text"}
      </button>
      <div>
        <h3>Generated Text:</h3>
        <p>{generatedText}</p>
      </div>
    </div>
  );
}

export default App;

