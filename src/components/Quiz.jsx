import React, { useState } from 'react';

// Thay bộ câu hỏi bằng 10 câu Gen Z và chấm theo khuynh hướng triết học
const genZQuestions = [
  {
    questionText: "Nếu thấy clip TikTok về phụ nữ thành công trong lĩnh vực STEM, bạn sẽ phản ứng sao?",
    answerOptions: [
      { answerText: "Thả tim và share để truyền cảm hứng phá vỡ định kiến giới.", philosophy: "Nữ quyền" },
      { answerText: "Phân tích: đó là kết quả của thay đổi quan hệ sản xuất.", philosophy: "Mác – Lênin" },
      { answerText: "Mỗi cá nhân đều tự tạo ý nghĩa cho lựa chọn nghề nghiệp.", philosophy: "Hiện sinh" },
      { answerText: "Thực tế thôi, miễn có hiệu quả thì giới tính không quan trọng.", philosophy: "Thực dụng" },
    ],
  },
  {
    questionText: "Nếu crush bảo: 'Con gái thì nên chọn nghề nhẹ nhàng thôi', bạn nghĩ gì?",
    answerOptions: [
      { answerText: "Đó là định kiến giới cần phá bỏ.", philosophy: "Nữ quyền" },
      { answerText: "Cấu trúc xã hội cũ vẫn duy trì áp đặt vai trò.", philosophy: "Mác – Lênin" },
      { answerText: "Cuộc đời mình, mình chọn, không ai quyết định hộ.", philosophy: "Hiện sinh" },
      { answerText: "Mỗi người có narrative riêng, không có chuẩn chung.", philosophy: "Hậu hiện đại" },
    ],
  },
  {
    questionText: "Nếu bạn thấy một meme chế nhạo phụ nữ làm lãnh đạo, bạn sẽ…",
    answerOptions: [
      { answerText: "Report ngay vì perpetuate định kiến giới.", philosophy: "Nữ quyền" },
      { answerText: "Phân tích nó phản ánh mâu thuẫn ý thức hệ.", philosophy: "Mác – Lênin" },
      { answerText: "Coi đó là thử thách để phụ nữ tự chứng minh bản thân.", philosophy: "Hiện sinh" },
      { answerText: "Ai cũng có cách diễn giải riêng, không có sự thật tuyệt đối.", philosophy: "Hậu hiện đại" },
    ],
  },
  {
    questionText: "Trong lớp học, khi giáo viên hỏi: 'Ai muốn làm nhóm trưởng?', bạn nghĩ gì nếu đa số chọn nam?",
    answerOptions: [
      { answerText: "Đây là ví dụ điển hình của thiên kiến giới cần thay đổi.", philosophy: "Nữ quyền" },
      { answerText: "Hệ thống xã hội lâu đời tạo ra bất bình đẳng này.", philosophy: "Mác – Lênin" },
      { answerText: "Quan trọng là mỗi người tự chịu trách nhiệm khi đã chọn.", philosophy: "Hiện sinh" },
      { answerText: "Miễn ai làm nhóm trưởng hiệu quả thì ổn.", philosophy: "Thực dụng" },
    ],
  },
  {
    questionText: "Nếu một bạn nữ bị body shaming vì không theo 'chuẩn đẹp' trên mạng, bạn nghĩ sao?",
    answerOptions: [
      { answerText: "Chuẩn mực sắc đẹp là công cụ áp bức phụ nữ.", philosophy: "Nữ quyền" },
      { answerText: "Đó là phản ánh của cơ chế văn hóa phục vụ giai cấp thống trị.", philosophy: "Mác – Lênin" },
      { answerText: "Mỗi người có quyền tự quyết định giá trị bản thân.", philosophy: "Hiện sinh" },
      { answerText: "Không có chuẩn nào tuyệt đối, tất cả chỉ là diễn ngôn.", philosophy: "Hậu hiện đại" },
    ],
  },
  {
    questionText: "Nếu công ty chỉ chọn nam vào vị trí quản lý, bạn sẽ…",
    answerOptions: [
      { answerText: "Đặt câu hỏi về công bằng và bình đẳng giới.", philosophy: "Nữ quyền" },
      { answerText: "Xem đó là duy trì cấu trúc quyền lực trong sản xuất.", philosophy: "Mác – Lênin" },
      { answerText: "Tin rằng ai cũng có cơ hội tự chứng minh, không phụ thuộc giới.", philosophy: "Hiện sinh" },
      { answerText: "Miễn công ty hoạt động hiệu quả thì giới tính không quan trọng.", philosophy: "Thực dụng" },
    ],
  },
  {
    questionText: "Khi một idol nữ Gen Z tuyên bố: 'Tôi không cần đàn ông mới có giá trị', bạn nghĩ gì?",
    answerOptions: [
      { answerText: "Đúng! Phụ nữ phải tự chủ và tự do định nghĩa bản thân.", philosophy: "Nữ quyền" },
      { answerText: "Đó là phản ứng tất yếu trước cấu trúc phụ hệ.", philosophy: "Mác – Lênin" },
      { answerText: "Mỗi người tự tạo ý nghĩa cuộc đời, không lệ thuộc vào ai.", philosophy: "Hiện sinh" },
      { answerText: "Câu nói này chỉ là một narrative giữa nhiều narrative.", philosophy: "Hậu hiện đại" },
    ],
  },
  {
    questionText: "Nếu một người bạn nữ muốn học ngành cơ khí nhưng bị gia đình ngăn cản, bạn sẽ…",
    answerOptions: [
      { answerText: "Ủng hộ hết mình: phá bỏ giới hạn nghề nghiệp theo giới.", philosophy: "Nữ quyền" },
      { answerText: "Nói rằng cấm đoán phản ánh sự bảo thủ của hệ thống xã hội.", philosophy: "Mác – Lênin" },
      { answerText: "Cổ vũ bạn ấy: 'Đời là của bạn, bạn chịu trách nhiệm.'", philosophy: "Hiện sinh" },
      { answerText: "Nếu học ngành khác có hiệu quả thực tế hơn thì sao?", philosophy: "Thực dụng" },
    ],
  },
  {
    questionText: "Nếu bạn thấy một podcast bàn về 'phụ nữ và AI', đâu là điều bạn quan tâm nhất?",
    answerOptions: [
      { answerText: "AI có tạo ra bất bình đẳng giới mới không?", philosophy: "Nữ quyền" },
      { answerText: "AI làm thay đổi quan hệ sản xuất trong xã hội.", philosophy: "Mác – Lênin" },
      { answerText: "Cách mỗi cá nhân tự định nghĩa mình trong kỷ nguyên AI.", philosophy: "Hiện sinh" },
      { answerText: "Miễn AI giải quyết vấn đề thực tế thì dùng.", philosophy: "Thực dụng" },
    ],
  },
  {
    questionText: "Nếu được chọn idol truyền cảm hứng, bạn sẽ chọn ai?",
    answerOptions: [
      { answerText: "Một nhà hoạt động nữ quyền như Simone de Beauvoir hoặc Malala.", philosophy: "Nữ quyền" },
      { answerText: "Một lãnh tụ cách mạng đấu tranh cho công bằng xã hội.", philosophy: "Mác – Lênin" },
      { answerText: "Một nghệ sĩ khẳng định tự do cá nhân, sống thật với mình.", philosophy: "Hiện sinh" },
      { answerText: "Một doanh nhân tạo ra sản phẩm hữu ích và hiệu quả.", philosophy: "Thực dụng" },
    ],
  },
];

const Quiz = ({ onClose }) => {
  // Chọn ngẫu nhiên 5 câu khi mở quiz
  const [quizQuestions] = useState(() => {
    const shuffled = [...genZQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState([]); // lưu triết học đã chọn theo từng câu

  const handleAnswerOptionClick = (philosophy) => {
    setAnswers((prev) => [...prev, philosophy]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getSummary = () => {
    if (answers.length === 0) return null;
    const tally = answers.reduce((acc, p) => {
      acc[p] = (acc[p] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const [topPhilosophy, topCount] = sorted[0];
    return { tally, topPhilosophy, topCount };
  };

  const summary = getSummary();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/50 rounded-2xl shadow-2xl text-white w-full max-w-2xl p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl">&times;</button>
        {showScore ? (
          <div className='text-center'>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Kết quả</h2>
            {summary && (
              <>
                <p className="text-lg sm:text-xl mb-2">Bạn đã hoàn thành {answers.length} câu hỏi.</p>
                <p className="text-base sm:text-lg mb-4">Xu hướng nổi bật của bạn: <span className="font-semibold text-pink-300">{summary.topPhilosophy}</span> ({summary.topCount}/{answers.length})</p>
                <div className="text-sm sm:text-base space-y-1 opacity-80">
                  {Object.entries(summary.tally).map(([k, v]) => (
                    <div key={k}>{k}: {v}</div>
                  ))}
                </div>
              </>
            )}
            <button onClick={onClose} className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Đóng
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6'>
              <div className="text-lg sm:text-xl font-semibold mb-2">
                <span>Câu hỏi {currentQuestion + 1}</span>/{quizQuestions.length}
              </div>
              <p className="text-xl sm:text-2xl">{quizQuestions[currentQuestion].questionText}</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {quizQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(answerOption.philosophy)}
                  className={`bg-black/30 border-2 border-purple-500/50 rounded-lg p-4 text-left hover:bg-purple-500/30 transition-all duration-300`}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
