import React, { useState } from 'react';

const questions = [
  {
    questionText: 'Ai là tác giả của câu nói nổi tiếng: “Người ta không sinh ra là phụ nữ, người ta trở thành phụ nữ”?',
    answerOptions: [
      { answerText: 'Simone de Beauvoir', isCorrect: true },
      { answerText: 'Karl Marx', isCorrect: false },
      { answerText: 'Jean-Paul Sartre', isCorrect: false },
      { answerText: 'Virginia Woolf', isCorrect: false },
    ],
  },
  {
    questionText: 'Lý thuyết nữ quyền làn sóng thứ hai (Second-wave feminism) tập trung chủ yếu vào vấn đề gì?',
    answerOptions: [
        { answerText: 'Quyền bầu cử của phụ nữ.', isCorrect: false },
        { answerText: 'Bình đẳng tại nơi làm việc, phá bỏ các định kiến giới và vai trò truyền thống.', isCorrect: true },
        { answerText: 'Nữ quyền giao thoa (Intersectionality).', isCorrect: false },
        { answerText: 'Quyền sở hữu tài sản.', isCorrect: false },
    ],
  },
  {
    questionText: 'Khái niệm "Patriarchy" (Chế độ phụ hệ) trong triết học nữ quyền có nghĩa là gì?',
    answerOptions: [
      { answerText: 'Một hệ thống xã hội trong đó nam giới nắm giữ quyền lực chính và chiếm ưu thế trong các vai trò lãnh đạo.', isCorrect: true },
      { answerText: 'Một hình thức chính phủ do phụ nữ lãnh đạo.', isCorrect: false },
      { answerText: 'Một xã hội không có giới tính.', isCorrect: false },
      { answerText: 'Tình mẫu tử.', isCorrect: false },
    ],
  },
  {
    questionText: '"Nữ quyền giao thoa" (Intersectionality) là một khái niệm nhấn mạnh điều gì?',
    answerOptions: [
        { answerText: 'Chỉ có phụ nữ da trắng mới phải đối mặt với sự phân biệt đối xử.', isCorrect: false },
        { answerText: 'Các hình thức áp bức khác nhau (như giới tính, chủng tộc, giai cấp) có mối liên hệ và chồng chéo lên nhau.', isCorrect: true },
        { answerText: 'Phụ nữ và nam giới nên có vai trò tách biệt.', isCorrect: false },
        { answerText: 'Tất cả phụ nữ đều có chung trải nghiệm về sự áp bức.', isCorrect: false },
    ],
  },
  {
    questionText: 'Mục tiêu cuối cùng của các phong trào nữ quyền là gì?',
    answerOptions: [
        { answerText: 'Đưa phụ nữ lên vị trí thống trị.', isCorrect: false },
        { answerText: 'Tạo ra một xã hội nơi mọi giới đều có quyền và cơ hội bình đẳng.', isCorrect: true },
        { answerText: 'Loại bỏ hoàn toàn vai trò giới.', isCorrect: false },
        { answerText: 'Quay trở lại các giá trị truyền thống.', isCorrect: false },
    ],
  },
];

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getConclusion = () => {
    if (score >= 4) {
      return "Tuyệt vời! Bạn có kiến thức rất tốt về các khái niệm cốt lõi của nữ quyền triết học. Hành trình trao quyền cho phụ nữ là một phần quan trọng để xây dựng một xã hội công bằng và tiến bộ.";
    } else if (score >= 2) {
      return "Khá tốt! Bạn đã nắm được một số ý tưởng chính. Triết học nữ quyền là một lĩnh vực rộng lớn và đầy cảm hứng, khám phá nó sẽ giúp chúng ta hiểu sâu hơn về bình đẳng giới.";
    } else {
      return "Cảm ơn bạn đã tham gia! Đây là một chủ đề phức tạp. Mỗi câu hỏi đều mở ra một cánh cửa để tìm hiểu thêm về hành trình đấu tranh cho sự bình đẳng và tự do của phụ nữ trên toàn thế giới.";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/50 rounded-2xl shadow-2xl text-white w-full max-w-2xl p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl">&times;</button>
        {showScore ? (
          <div className='text-center'>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Kết quả Quiz</h2>
            <p className="text-lg sm:text-xl mb-6">Bạn đã trả lời đúng {score} trên {questions.length} câu.</p>
            <p className="text-base sm:text-lg leading-relaxed">{getConclusion()}</p>
             <button onClick={onClose} className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                Đóng
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6'>
              <div className="text-lg sm:text-xl font-semibold mb-2">
                <span>Câu hỏi {currentQuestion + 1}</span>/{questions.length}
              </div>
              <p className="text-xl sm:text-2xl">{questions[currentQuestion].questionText}</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                    className="bg-black/30 border-2 border-purple-500/50 rounded-lg p-4 text-left hover:bg-purple-500/30 hover:border-purple-400 transition-all duration-300"
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

