import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // Sử dụng API key được cung cấp trực tiếp (không dùng .env)
    const apiKey = "AIzaSyDDQpPl-bcYirclhdvvUToSu2dIeH92sdA";

    if (!apiKey) {
      throw new Error('Gemini API key is missing');
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
   * Trả lời câu hỏi với tư cách là chuyên gia triết học nữ quyền
   * @param {string} question - Câu hỏi của người dùng
   * @returns {Promise<string>} - Câu trả lời chi tiết
   */
  async askFeministPhilosopher(question) {
    const context = `
    Bạn là một chuyên gia về triết học nữ quyền. Hãy trả lời câu hỏi sau đây một cách ngắn gọn, súc tích nhưng vẫn dễ hiểu cho người mới bắt đầu.
    
    Câu hỏi: ${question}
    
    Hãy trả lời trong khoảng 100-150 từ.
    `;
    return this.generateText(context);
  }
}

const geminiService = new GeminiService();

export default geminiService;