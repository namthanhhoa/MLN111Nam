import { useState, useCallback } from 'react';
import geminiService from '../components/ai.js';

/**
 * Custom hook để sử dụng Gemini AI
 * @returns {Object} - Các methods và states để tương tác với AI
 */
export const useGemini = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');

  // Reset states
  const resetStates = useCallback(() => {
    setError(null);
    setResponse('');
  }, []);

  // Hỏi về tư tưởng Hồ Chí Minh
  const askAboutHCM = useCallback(async (question) => {
    if (!question.trim()) return;

    setIsLoading(true);
    resetStates();

    try {
      const result = await geminiService.askAboutHCMThought(question);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [resetStates]);

  // Giải thích nội dung trang
  const explainPage = useCallback(async (pageNumber, content) => {
    setIsLoading(true);
    resetStates();

    try {
      const result = await geminiService.explainPageContent(pageNumber, content);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [resetStates]);

  // Tạo quiz
  const generateQuiz = useCallback(async (topic, questionCount = 5) => {
    setIsLoading(true);
    resetStates();

    try {
      const result = await geminiService.generateQuiz(topic, questionCount);
      setResponse(JSON.stringify(result, null, 2));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [resetStates]);

  // Tạo câu hỏi tự do
  const generateText = useCallback(async (prompt, options) => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    resetStates();

    try {
      const result = await geminiService.generateText(prompt, options);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [resetStates]);

  return {
    // States
    isLoading,
    error,
    response,
    
    // Methods
    askAboutHCM,
    explainPage,
    generateQuiz,
    generateText,
    resetStates
  };
};