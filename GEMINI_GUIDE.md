# 🤖 Hướng dẫn sử dụng Gemini AI

## 📋 Các bước đã hoàn thành:

### ✅ 1. Cài đặt SDK
- Đã cài đặt `@google/generative-ai`
- Package ready để sử dụng

### ✅ 2. Environment Configuration
- File `.env` đã tạo với template API key
- File `.gitignore` đã cấu hình để bảo vệ sensitive data

### ✅ 3. Service Module
- `src/components/ai.js` - GeminiService class với đầy đủ tính năng
- Error handling và retry logic
- Specialized methods cho educational content

### ✅ 4. React Integration
- `src/hooks/useGemini.js` - Custom hook
- `src/components/AIChat.jsx` - Interactive chat component
- Tích hợp vào `UI.jsx` với nút chat

### ✅ 5. Testing Tools
- `test/gemini-test.js` - Test utilities

## 🚀 Cách sử dụng:

### Bước 1: Lấy API Key
1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google account
3. Tạo new API key
4. Copy API key

### Bước 2: Cấu hình API Key
1. Mở file `.env` 
2. Thay thế `your_api_key_here` bằng API key thực:
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. Save file

### Bước 3: Restart Development Server
```bash
npm run dev
```

### Bước 4: Test API
1. Mở browser console (F12)
2. Chạy: `testGeminiAPI()`
3. Kiểm tra kết quả

### Bước 5: Sử dụng trong App
1. Mở sách (click vào sách 3D)
2. Click nút 🤖 ở góc dưới bên phải
3. Bắt đầu chat với AI!

## 🎯 Tính năng AI Chat:

### 🔹 Quick Actions:
- **📖 Giải thích trang N**: AI giải thích nội dung trang hiện tại
- **🧠 Tạo Quiz**: Tạo câu hỏi trắc nghiệm
- **🗑️ Xóa chat**: Clear conversation history

### 🔹 Chat Features:
- Hỏi bất kỳ câu hỏi nào về tư tưởng Hồ Chí Minh
- AI trả lời dựa trên context giáo dục
- Real-time responses với loading indicators
- Error handling và retry logic

### 🔹 Responsive Design:
- Mobile-friendly interface
- Touch-optimized controls
- Adaptive layout

## 🛠️ API Methods:

### GeminiService:
```javascript
// Hỏi về tư tưởng HCM
await geminiService.askAboutHCMThought(question)

// Giải thích nội dung trang
await geminiService.explainPageContent(pageNumber, content)

// Tạo quiz
await geminiService.generateQuiz(topic, questionCount)

// Generate text tự do
await geminiService.generateText(prompt, options)
```

### useGemini Hook:
```javascript
const { 
  isLoading, 
  error, 
  response,
  askAboutHCM, 
  explainPage, 
  generateQuiz,
  generateText 
} = useGemini();
```

## ⚠️ Lưu ý quan trọng:

1. **API Key Security**: 
   - Không commit API key vào Git
   - Sử dụng environment variables

2. **Rate Limits**: 
   - Gemini có giới hạn requests/minute
   - Implement loading states

3. **Error Handling**: 
   - Always wrap API calls trong try-catch
   - Provide user-friendly error messages

4. **Performance**: 
   - Cache responses khi có thể
   - Debounce user inputs
   - Use loading indicators

## 🐛 Troubleshooting:

### Lỗi "API_KEY not found":
- Kiểm tra file `.env` có đúng format
- Restart dev server sau khi thêm API key

### Lỗi "Failed to fetch":
- Kiểm tra internet connection
- Verify API key còn valid

### Lỗi 429 (Rate limit):
- Đợi vài phút rồi thử lại
- Consider implementing exponential backoff

## 📚 Resources:
- [Gemini API Documentation](https://ai.google.dev/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Jotai State Management](https://jotai.org/)

---
🎉 **Chúc bạn sử dụng thành công Gemini AI trong dự án SlideBook!**