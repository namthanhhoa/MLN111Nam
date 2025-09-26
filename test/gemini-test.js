// Test file để kiểm tra API Gemini
// Chỉ sử dụng khi đã có API key trong file .env

import geminiService from '../src/components/ai.js';

async function testGeminiAPI() {
  try {
    console.log('🧪 Testing Gemini API Connection...');
    
    // Test 1: Câu hỏi cơ bản
    console.log('\n1️⃣ Testing basic question:');
    const basicResponse = await geminiService.askAboutHCMThought(
      'Độc lập dân tộc có ý nghĩa gì trong tư tưởng Hồ Chí Minh?'
    );
    console.log('✅ Response:', basicResponse.substring(0, 200) + '...');

    // Test 2: Giải thích nội dung trang
    console.log('\n2️⃣ Testing page explanation:');
    const pageResponse = await geminiService.explainPageContent(1);
    console.log('✅ Response:', pageResponse.substring(0, 200) + '...');

    // Test 3: Tạo quiz
    console.log('\n3️⃣ Testing quiz generation:');
    const quiz = await geminiService.generateQuiz('độc lập dân tộc', 2);
    console.log('✅ Quiz generated:', JSON.stringify(quiz, null, 2));

    console.log('\n🎉 All tests passed! Gemini API is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Hướng dẫn khắc phục lỗi
    if (error.message.includes('API_KEY')) {
      console.log('\n🔧 Khắc phục:');
      console.log('1. Lấy API key từ: https://aistudio.google.com/app/apikey');
      console.log('2. Thêm vào file .env: VITE_GEMINI_API_KEY=your_api_key_here');
      console.log('3. Restart development server');
    }
  }
}

// Chỉ chạy khi được import trực tiếp
if (typeof window !== 'undefined') {
  // Chạy trong browser console
  window.testGeminiAPI = testGeminiAPI;
  console.log('💡 Run testGeminiAPI() in browser console to test');
}

export { testGeminiAPI };