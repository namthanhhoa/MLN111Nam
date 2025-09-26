import React, { useState } from 'react';
import geminiService from './components/ai.js';

const TestGemini = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const result = await geminiService.generateText('Xin chào, bạn là ai?');
      setResponse(result);
    } catch (error) {
      setResponse(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      left: 10, 
      zIndex: 1000, 
      background: 'white', 
      padding: '20px', 
      border: '1px solid black',
      maxWidth: '300px'
    }}>
      <h3>Test Gemini AI</h3>
      <button onClick={testAPI} disabled={loading}>
        {loading ? 'Đang test...' : 'Test API'}
      </button>
      {response && (
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          <strong>Response:</strong> {response.substring(0, 100)}...
        </div>
      )}
    </div>
  );
};

export default TestGemini;