import React, { useState, useRef, useEffect } from 'react';
import { useGemini } from '../hooks/useGemini.js';

const sampleQuestions = [
  "Nữ quyền là gì?",
  "Quyền lực và giới tính?",
  "Nữ giới bị áp bức?",
  "Nữ quyền và tự do?",
  "Nữ quyền hiện nay?",
];

const AIChat = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  
  const { 
    isLoading, 
    askFeministPhilosopher,
    resetStates
  } = useGemini();

  // Scroll to bottom khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Xử lý gửi câu hỏi (dùng cho cả input và nút câu hỏi mẫu)
  const handleSendQuestion = async (q) => {
    const questionToSend = q || question;
    if (!questionToSend.trim() || isLoading) return;

    const userMessage = { type: 'user', content: questionToSend, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    
    if (!q) {
      setQuestion('');
    }

    try {
      const response = await askFeministPhilosopher(questionToSend);

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

  // Clear chat
  const handleClearChat = () => {
    setChatHistory([]);
    resetStates();
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

      case 'system':
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/70 border border-purple-500/50 rounded-2xl shadow-2xl text-white w-full max-w-lg h-[90vh] max-h-[700px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
          <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Chuyên gia Triết học Nữ quyền
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl">&times;</button>
        </div>

        {/* Chat History */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
              <span className="text-4xl mb-4">🤖</span>
              <p className="font-semibold mb-3">Gợi ý một số câu hỏi:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendQuestion(q)}
                    className="bg-purple-600/50 hover:bg-purple-600/80 text-white text-xs sm:text-sm px-3 py-2 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatHistory.map(renderMessage)
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs lg:max-w-md">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                  <span className="text-sm">Đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-2 sm:p-4 border-t border-purple-500/30">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleClearChat}
              disabled={isLoading}
              className="bg-red-600/50 hover:bg-red-600/80 text-white text-xs sm:text-sm px-3 py-2 rounded-full transition-colors disabled:opacity-50"
            >
              Xóa cuộc trò chuyện
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500/30">
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
              placeholder="Hỏi chuyên gia về nữ quyền..."
              className="flex-1 bg-black/30 border-2 border-purple-500/50 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendQuestion()}
              disabled={isLoading || !question.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold p-2 sm:p-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
