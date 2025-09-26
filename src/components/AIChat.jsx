import React, { useState, useRef, useEffect } from 'react';
import { useGemini } from '../hooks/useGemini.js';
import geminiService from './ai.js';

const AIChat = ({ isOpen, onClose, currentPage }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  
  const { 
    isLoading, 
    error, 
    askAboutHCM, 
    explainPage, 
    generateQuiz,
    resetStates 
  } = useGemini();

  // Scroll to bottom khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Xử lý gửi câu hỏi
  const handleSendQuestion = async () => {
    if (!question.trim() || isLoading) return;

    const userMessage = { type: 'user', content: question, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentQuestion = question;
    setQuestion('');

    try {
      const response = await askAboutHCM(currentQuestion);
      
      if (!response || response.trim().length === 0) {
        throw new Error('Không nhận được phản hồi từ AI');
      }
      
      const aiMessage = { 
        type: 'ai', 
        content: response, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { 
        type: 'error', 
        content: `Lỗi: ${err.message}`, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // Giải thích trang hiện tại
  const handleExplainCurrentPage = async () => {
    if (isLoading) return;

    const pageMessage = { 
      type: 'system', 
      content: `Đang giải thích nội dung trang ${currentPage}...`, 
      timestamp: new Date() 
    };
    setChatHistory(prev => [...prev, pageMessage]);

    try {
      const response = await explainPage(currentPage);
      const aiMessage = { 
        type: 'ai', 
        content: response, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { 
        type: 'error', 
        content: `Lỗi: ${err.message}`, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // Tạo quiz
  const handleGenerateQuiz = async () => {
    if (isLoading) return;

    const quizMessage = { 
      type: 'system', 
      content: 'Đang tạo quiz về tư tưởng Hồ Chí Minh...', 
      timestamp: new Date() 
    };
    setChatHistory(prev => [...prev, quizMessage]);

    try {
      const quiz = await generateQuiz('tư tưởng Hồ Chí Minh về độc lập dân tộc', 3);
      const aiMessage = { 
        type: 'quiz', 
        content: quiz, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { 
        type: 'error', 
        content: `Lỗi: ${err.message}`, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setChatHistory([]);
    resetStates();
  };

  // Test function đơn giản
  const handleSimpleTest = async () => {
    if (isLoading) return;

    console.log('🧪 AIChat: Starting simple test...');
    
    const testMessage = { 
      type: 'system', 
      content: 'Đang test kết nối API...', 
      timestamp: new Date() 
    };
    setChatHistory(prev => [...prev, testMessage]);

    try {
      // Test trực tiếp với geminiService
      const response = await geminiService.generateText('Xin chào! Bạn có thể trả lời tiếng Việt không?');
      console.log('🎉 AIChat: Simple test response:', response);
      
      const aiMessage = { 
        type: 'ai', 
        content: response, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('💥 AIChat: Simple test error:', err);
      const errorMessage = { 
        type: 'error', 
        content: `Test failed: ${err.message}`, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // Render tin nhắn
  const renderMessage = (message, index) => {
    const { type, content, timestamp } = message;
    const timeStr = timestamp.toLocaleTimeString('vi-VN');

    switch (type) {
      case 'user':
        return (
          <div key={index} className="flex justify-end mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs lg:max-w-md">
              <p className="text-sm">{content}</p>
              <p className="text-xs opacity-75 mt-1">{timeStr}</p>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs lg:max-w-md">
              <p className="text-sm whitespace-pre-wrap">{content}</p>
              <p className="text-xs opacity-75 mt-1">{timeStr}</p>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="bg-green-100 text-gray-800 p-3 rounded-lg max-w-xs lg:max-w-md">
              <h4 className="font-bold mb-2">🧠 Quiz</h4>
              {content.questions?.map((q, idx) => (
                <div key={idx} className="mb-3 p-2 bg-white rounded">
                  <p className="font-medium">{idx + 1}. {q.question}</p>
                  <ul className="ml-4 mt-1">
                    {q.options?.map((option, optIdx) => (
                      <li 
                        key={optIdx} 
                        className={`text-sm ${optIdx === q.correct ? 'text-green-600 font-medium' : ''}`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {option}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-600 mt-1">
                    <strong>Giải thích:</strong> {q.explanation}
                  </p>
                </div>
              ))}
              <p className="text-xs opacity-75 mt-1">{timeStr}</p>
            </div>
          </div>
        );

      case 'system':
        return (
          <div key={index} className="flex justify-center mb-4">
            <div className="bg-yellow-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {content}
            </div>
          </div>
        );

      case 'error':
        return (
          <div key={index} className="flex justify-start mb-4">
            <div className="bg-red-100 text-red-800 p-3 rounded-lg max-w-xs lg:max-w-md">
              <p className="text-sm">{content}</p>
              <p className="text-xs opacity-75 mt-1">{timeStr}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-4/5 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="text-lg font-semibold">🤖 AI Trợ lý - Tư tưởng Hồ Chí Minh</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExplainCurrentPage}
              disabled={isLoading}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50"
            >
              📖 Giải thích trang {currentPage}
            </button>
            <button
              onClick={handleGenerateQuiz}
              disabled={isLoading}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
            >
              🧠 Tạo Quiz
            </button>
            <button
              onClick={handleClearChat}
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              🗑️ Xóa chat
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2"
        >
          {chatHistory.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>💡 Hỏi tôi bất kỳ điều gì về tư tưởng Hồ Chí Minh!</p>
              <p className="text-sm mt-2">Ví dụ: "Độc lập dân tộc có ý nghĩa gì?"</p>
            </div>
          )}
          {chatHistory.map(renderMessage)}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
              placeholder="Hỏi về tư tưởng Hồ Chí Minh..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendQuestion}
              disabled={!question.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2">❌ {error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;