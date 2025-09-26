import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // Lấy API key từ environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY không được tìm thấy trong environment variables');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Tạo văn bản từ prompt
   * @param {string} prompt - Câu hỏi hoặc yêu cầu
   * @param {Object} options - Tùy chọn bổ sung
   * @returns {Promise<string>} - Kết quả từ Gemini AI
   */
  async generateText(prompt, options = {}) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      if (!text || text.trim().length === 0) {
        throw new Error('API trả về response rỗng');
      }
      
      return text.trim();
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      throw new Error(`Không thể tạo nội dung: ${error.message}`);
    }
  }

  /**
   * Test function để thử các cách gọi API khác nhau
   */
  async testAPI() {
    console.log('🧪 Testing API calls...');
    const testPrompt = 'Xin chào! Hãy trả lời bằng tiếng Việt.';
    
    // Test 1: Gọi trực tiếp với string
    try {
      console.log('🧪 Test 1: Simple string prompt');
      const result1 = await this.model.generateContent(testPrompt);
      const text1 = result1.response.text();
      console.log('✅ Test 1 success:', text1);
      return { method: 'simple', response: text1 };
    } catch (error) {
      console.error('❌ Test 1 failed:', error.message);
    }

    // Test 2: Gọi với object format
    try {
      console.log('🧪 Test 2: Object format');
      const result2 = await this.model.generateContent({
        contents: [{ parts: [{ text: testPrompt }] }]
      });
      const text2 = result2.response.text();
      console.log('✅ Test 2 success:', text2);
      return { method: 'object', response: text2 };
    } catch (error) {
      console.error('❌ Test 2 failed:', error.message);
    }

    // Test 3: Gọi với role format
    try {
      console.log('🧪 Test 3: Role format');
      const result3 = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: testPrompt }] }]
      });
      const text3 = result3.response.text();
      console.log('✅ Test 3 success:', text3);
      return { method: 'role', response: text3 };
    } catch (error) {
      console.error('❌ Test 3 failed:', error.message);
    }

    throw new Error('All API test methods failed');
  }

  /**
   * Tạo nội dung với context về tư tưởng Hồ Chí Minh
   * @param {string} question - Câu hỏi về tư tưởng HCM
   * @returns {Promise<string>} - Câu trả lời chi tiết
   */
  async askAboutHCMThought(question) {
    const context = `
    Bạn là một chuyên gia về tư tưởng Hồ Chí Minh. Hãy trả lời câu hỏi sau 
    dựa trên kiến thức về tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội.
    
    Câu hỏi: ${question}
    
    Hãy trả lời một cách:
    - Chính xác và có căn cứ lịch sử
    - Dễ hiểu cho học sinh, sinh viên
    - Khoảng 200-300 từ
    - Có thể đưa ra ví dụ cụ thể
    `;

    return await this.generateText(context, {
      temperature: 0.7,
      maxOutputTokens: 1024
    });
  }

  /**
   * Giải thích nội dung trang sách
   * @param {number} pageNumber - Số trang cần giải thích
   * @param {string} content - Nội dung trang (optional)
   * @returns {Promise<string>} - Giải thích chi tiết
   */
  async explainPageContent(pageNumber, content = '') {
    const prompt = `
    Hãy giải thích nội dung trang ${pageNumber} trong sách về tư tưởng Hồ Chí Minh.
    ${content ? `Nội dung trang: ${content}` : ''}
    
    Hãy đưa ra:
    1. Tóm tắt ý chính
    2. Giải thích các khái niệm quan trọng
    3. Liên hệ với thực tiễn hiện tại
    4. Câu hỏi tư duy cho người đọc
    
    Trả lời bằng tiếng Việt, khoảng 150-250 từ.
    `;

    return await this.generateText(prompt, {
      temperature: 0.6,
      maxOutputTokens: 800
    });
  }

  /**
   * Tạo quiz về nội dung đã học
   * @param {string} topic - Chủ đề cần tạo quiz
   * @param {number} questionCount - Số câu hỏi
   * @returns {Promise<Object>} - Danh sách câu hỏi và đáp án
   */
  async generateQuiz(topic, questionCount = 5) {
    const prompt = `
    Tạo ${questionCount} câu hỏi trắc nghiệm về "${topic}" trong tư tưởng Hồ Chí Minh.
    
    Format trả lời JSON như sau:
    {
      "questions": [
        {
          "question": "Câu hỏi",
          "options": ["A", "B", "C", "D"],
          "correct": 0,
          "explanation": "Giải thích đáp án"
        }
      ]
    }
    
    Chỉ trả lời JSON, không cần text khác.
    `;

    try {
      const response = await this.generateText(prompt, {
        temperature: 0.5,
        maxOutputTokens: 1500
      });
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Lỗi khi tạo quiz:', error);
      throw new Error('Không thể tạo quiz');
    }
  }
}

// Tạo instance duy nhất (Singleton pattern)
const geminiService = new GeminiService();

// Export để test từ console
window.testGeminiAPI = () => geminiService.testAPI();
window.geminiService = geminiService;

export default geminiService;