import { GoogleGenerativeAI } from '@google/generative-ai';

// Test function để kiểm tra models available
async function testGeminiModels() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('API key not found');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Danh sách các model names phổ biến để test
  const modelsToTest = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest', 
    'gemini-1.5-pro',
    'gemini-pro',
    'gemini-1.0-pro-latest',
    'gemini-1.0-pro'
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
      });
      
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ Model ${modelName} works! Response: ${text.substring(0, 50)}...`);
      return modelName; // Return first working model
      
    } catch (error) {
      console.log(`❌ Model ${modelName} failed:`, error.message);
    }
  }
  
  console.error('No working model found!');
  return null;
}

// Export để sử dụng trong console
window.testGeminiModels = testGeminiModels;

export { testGeminiModels };