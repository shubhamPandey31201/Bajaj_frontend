import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error('Invalid JSON format');
      const res = await axios.post('https://bajaj-project.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
      setShowDropdown(true);
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
      setShowDropdown(false);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) => 
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const result = {};
    if (selectedOptions.includes('Numbers')) result.numbers = response.numbers;
    if (selectedOptions.includes('Alphabets')) result.alphabets = response.alphabets;
    if (selectedOptions.includes('Highest alphabet')) result.highest_alphabet = response.highest_alphabet;
    return (
      <pre>{JSON.stringify(result, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>Data Form</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON input'
          rows='10'
          cols='50'
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showDropdown && (
        <div>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            /> Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest alphabet"
              onChange={handleOptionChange}
            /> Highest alphabet
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
};

export default DataForm;