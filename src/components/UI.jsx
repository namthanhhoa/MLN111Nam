import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";
import AIChat from "./AIChat.jsx";
import Podcast from "./Podcast.jsx";
import Quiz from "./Quiz.jsx";

const pictures = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
];

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);
export const contentSectionAtom = atom(0);
export const staticViewAtom = atom(false);

// Nội dung cho từng trang - mỗi trang có thể có nhiều phần
const pageContents = {
  0: {
    title: "VỊ NỮ & Hành Trình Khẳng Định Giá Trị Bản Thân",
    sections: [
      {
        content:
          "“Phụ nữ không sinh ra là phụ nữ, họ trở thành phụ nữ.” — Simone de Beauvoir. Câu nói này nhắc nhở rằng nữ tính không phải bản chất cố định, mà là kết quả của quá trình giáo dục, văn hóa, xã hội và lựa chọn cá nhân. Gắn với đó là khát vọng độc lập, tự do – quyền thiêng liêng của dân tộc Việt Nam. Từ Bản Yêu sách năm 1919, Chánh cương vắn tắt (1930), đến Tuyên ngôn độc lập 1945 và Lời kêu gọi Toàn quốc kháng chiến 1946, Hồ Chí Minh khẳng định: “Không có gì quý hơn độc lập, tự do”, đặt nền tảng cho hành trình khẳng định giá trị con người và dân tộc.",
      },
    ],
  },
  1: {
    title: "Vị Nữ – Hành Trình Khẳng Định Giá Trị",
    sections: [
      {
        content:
          "“Vị nữ” không chỉ còn là biểu tượng đấu tranh để giành quyền lợi, mà ngày nay đã trở thành sự tôn vinh bản thể, hương vị và giá trị riêng của phụ nữ. Đó là sự đa dạng trong lựa chọn và cách sống: có người chọn gia đình, có người theo đuổi sự nghiệp; có người mạnh mẽ, có người dịu dàng. Mọi sự lựa chọn ấy đều đáng được công nhận và trân trọng, vì chúng góp phần khẳng định vai trò thiết yếu của phụ nữ trong tiến bộ và nhân văn.\n" +
          "\n" +
          "Simone de Beauvoir từng nói: “Phụ nữ không sinh ra là phụ nữ, họ trở thành phụ nữ.” Câu nói này nhắc nhở rằng “nữ tính” không phải là bản chất có sẵn, mà được hình thành qua giáo dục, văn hóa, xã hội và quyết định cá nhân. Người phụ nữ có quyền và khả năng định hình chính mình, phá bỏ những ràng buộc đã tồn tại qua nhiều thế kỷ, để sống đúng với bản ngã và giá trị riêng.\n" +
          "\n" +
          "Những trang viết về “vị nữ” chính là lời khẳng định: phụ nữ hôm nay không chỉ dừng lại ở việc chống bất công, mà còn mở ra không gian để hiện diện với đầy đủ nhân phẩm và tự do. Đó là hành trình khẳng định giá trị, vừa kế thừa tiếng nói đấu tranh, vừa lan tỏa cảm hứng sống đúng với bản thân, trở thành một phần tất yếu của sự tiến bộ và nhân văn trong xã hội.",
      },
    ],
  },
  2: {
    title: "Chiếc Lồng Vô Hình của Định Kiến",
    sections: [
      {
        content:
          "Xã hội từ lâu gán cho phụ nữ những khuôn mẫu như “ngoan hiền, hy sinh, giỏi nội trợ”, coi đó là chuẩn mực tất yếu.\n" +
          "\n" +
          "Những định kiến này lặp đi lặp lại qua giáo dục, văn hóa, lời khen – chê thường ngày, biến thành chiếc “lồng vô hình” không song sắt, không khóa nhưng lại giam giữ phụ nữ trong vai trò cố định.\n" +
          "\n" +
          "Điều đó giới hạn tự do, triệt tiêu tiềm năng, ước mơ, khát vọng của phụ nữ.\n" +
          "\n" +
          "Khi các chuẩn mực này trở thành thước đo đạo đức và phẩm hạnh, phụ nữ ít cơ hội khẳng định bản thân, còn những giá trị khác như trí tuệ, sáng tạo, lãnh đạo lại bị xem nhẹ.\n" +
          "\n" +
          "👉 Định kiến giống như một nhà tù vô hình, ngăn phụ nữ bước ra khỏi những vai trò được định sẵn.",
      },
    ],
  },
  3: {
    title: "Triết Lý Giải Phóng: Simone de Beauvoir & Marx – Engels",
    sections: [
      {
        content:
          "Simone de Beauvoir: Khẳng định cái “Tôi”\n" +
          "\n" +
          "Beauvoir cho rằng con người không bị định nghĩa bởi bản chất sinh học mà bởi hành động và lựa chọn. Với phụ nữ, điều này có ý nghĩa đặc biệt: họ không nên chấp nhận bị xã hội đóng khung vào vai trò “Người Khác”, mà phải tự ý thức về sự tồn tại của mình để bước ra khỏi giới hạn.\n" +
          "Triết lý hiện sinh của bà khẳng định nữ quyền không chỉ là đòi quyền lợi, mà là hành trình ý thức – tự lựa chọn – tự chịu trách nhiệm. Phụ nữ phải giành quyền trở thành chính mình, sống đúng với bản ngã, từ đó khẳng định bình đẳng và nhân phẩm.\n" +
          "\n" +
          "Marx & Engels: Giải phóng khỏi áp bức kinh tế\n" +
          "\n" +
          "Theo Marx và Engels, sự áp bức phụ nữ bắt nguồn từ chế độ tư hữu và vai trò phụ thuộc trong sản xuất. Gia đình trở thành “nhà máy tư nhân”, giam hãm phụ nữ trong công việc nội trợ.\n" +
          "Engels nhấn mạnh: chỉ khi phụ nữ được tham gia lao động xã hội bình đẳng với nam giới, họ mới có thể tự do, tự quyết định cuộc sống của mình. Giải phóng kinh tế là điều kiện tiên quyết để phá bỏ định kiến, khẳng định vị thế bình đẳng trong xã hội.",
      },
    ],
  },
  4: {
    title: "Đối Thoại Giữa Truyền Thống và Hiện Đại",
    sections: [
      {
        content:
          "Đối thoại giữa các luồng tư tưởng\n" +
          "\n" +
          "Simone de Beauvoir khẳng định phụ nữ không nên chấp nhận vai trò bị xã hội áp đặt, mà phải tự ý thức về sự tồn tại của mình. Việc “trở thành phụ nữ” không phải là thuận theo những khuôn mẫu dựng sẵn (làm vợ, làm mẹ, làm “người phụ nữ ngoan hiền”), mà là hành trình phản kháng, vượt thoát và khẳng định bản ngã tự do. Nữ quyền, theo Beauvoir, là sự lựa chọn và tự chịu trách nhiệm của chính phụ nữ.\n" +
          "\n" +
          "Gen Z và cuộc đối thoại mới\n" +
          "\n" +
          "Trong xã hội hiện đại, Gen Z đang đặt lại nhiều câu hỏi về bình đẳng giới trong đời sống hằng ngày. Họ không nhìn việc “ai trả tiền khi hẹn hò” hay “nội trợ là trách nhiệm của phụ nữ” như chuẩn mực, mà coi đó là sự chia sẻ, linh hoạt và đồng thuận. Gen Z hướng đến sự tôn trọng khác biệt, đối thoại chân thành thay vì cực đoan, qua đó khẳng định lao động nội trợ cũng có giá trị và cần được công nhận bình đẳng trong gia đình.",
      },
    ],
  },
  5: {
    title: "“Vị Nữ” Hôm Nay – Tích Cực và Độc Hại",
    sections: [
      {
        content:
          "Nữ quyền tích cực\n" +
          "\n" +
          "Bình đẳng cơ hội: Mọi giới tính đều có quyền tiếp cận giáo dục, nghề nghiệp và cơ hội thăng tiến.\n" +
          "\n" +
          "Quyền tự quyết: Phụ nữ được lựa chọn con đường sống, sự nghiệp, hôn nhân theo ý chí riêng.\n" +
          "\n" +
          "Tôn trọng sự khác biệt: Không áp đặt chuẩn mực chung, thừa nhận đa dạng lựa chọn và trải nghiệm.\n" +
          "\n" +
          "Tinh thần hợp tác: Không phủ định nam giới, mà khuyến khích sự đồng hành và hỗ trợ lẫn nhau.\n" +
          "\n" +
          "Nữ quyền độc hại\n" +
          "\n" +
          "Biến bình đẳng thành đặc quyền: Chỉ đòi lợi ích riêng cho phụ nữ, bỏ qua công bằng toàn thể.\n" +
          "\n" +
          "Phủ nhận giới khác: Nhìn nam giới như “kẻ đối lập”, tạo mâu thuẫn thay vì hợp tác.\n" +
          "\n" +
          "Cực đoan hóa thông điệp: Áp đặt, công kích, sử dụng ngôn ngữ hằn học, gây chia rẽ xã hội.\n" +
          "\n" +
          "Mất tính đối thoại: Không còn tinh thần trao đổi, đối thoại để hiểu nhau, mà tạo khoảng cách.",
      },
    ],
  },
};

export const pages = [
  {
    front: "HCM",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "back",
});

// Bổ sung thêm trang để có thể lật tới các nội dung Trang 5,6,7,8,10
// Tái sử dụng các ảnh 1-4 làm placeholder cho đủ số trang

// Component hiển thị nội dung trang
const PageContent = ({ pageNumber, isOpen }) => {
  const content = pageContents[pageNumber] || pageContents[0];
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useAtom(contentSectionAtom);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset section khi chuyển trang
  useEffect(() => {
    setCurrentSection(0);
  }, [pageNumber, setCurrentSection]);

  if (!isOpen) return null;

  const sections = content.sections || [];
  const currentContent = sections[currentSection] || sections[0];
  const hasNextSection = currentSection < sections.length - 1;
  const hasPrevSection = currentSection > 0;

  // Mobile layout: content ở dưới màn hình
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-black/95 to-black/60 backdrop-blur-md z-50 flex flex-col border-t border-purple-500/30">
        {/* Drag handle */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Scrollable content area - improved scrolling */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll-container"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="text-white p-4 pb-6 min-h-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 break-words leading-tight">
              {content.title}
            </h2>
            {currentContent?.image && (
              <img
                src={currentContent.image}
                alt="Minh hoạ"
                className="w-full max-h-48 object-contain rounded-lg mb-3 bg-white/5"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x450?text=No+Image";
                }}
              />
            )}
            <div className="prose prose-invert max-w-none">
              <p className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-line text-white/90">
                {currentContent?.content ||
                  content.sections?.[0]?.content ||
                  "Không có nội dung"}
              </p>
            </div>
            {/* Thêm padding bottom để đảm bảo có thể cuộn hết nội dung */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Fixed navigation buttons */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center p-3 gap-2 bg-gradient-to-t from-black/90 to-transparent border-t border-white/10 flex-shrink-0">
            <button
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 flex-1 max-w-[120px] bg-gradient-to-r from-[#6256ca] to-[#ffffff] text-[#6256ca] font-semibold hover:from-[#6256ca] hover:to-[#e0e0ff] disabled:opacity-50`}
              onClick={() => {
                if (hasPrevSection) {
                  setCurrentSection(currentSection - 1);
                }
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-xs sm:text-sm text-white/70 px-2">
              {currentSection + 1}/{sections.length}
            </span>

            <button
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 flex-1 max-w-[120px] bg-gradient-to-r from-[#6256ca] to-[#ffffff] text-[#6256ca] font-semibold hover:from-[#6256ca] hover:to-[#e0e0ff] disabled:opacity-50`}
              onClick={() => {
                if (hasNextSection) {
                  setCurrentSection(currentSection + 1);
                }
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout: content ở bên trái - improved scrolling
  return (
    <div className="fixed left-0 top-0 h-full w-[35vw] min-w-[350px] max-w-[500px] bg-gradient-to-r from-black/90 to-black/30 backdrop-blur-md z-50 pointer-events-none flex flex-col border-r border-purple-500/20">
      <div className="text-white max-w-full pointer-events-auto w-full flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:mb-6 text-left break-words leading-tight flex-shrink-0">
          {content.title}
        </h2>
        {currentContent?.image && (
          <img
            src={currentContent.image}
            alt="Minh hoạ"
            className="w-full max-h-48 lg:max-h-64 object-contain rounded-lg mb-4 bg-white/5 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        )}

        {/* Improved scrollable content area */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide pr-2"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-base lg:text-lg leading-relaxed text-left break-words whitespace-pre-line text-white/90 mb-6">
              {currentContent.content}
            </p>
          </div>
          {/* Padding bottom để đảm bảo cuộn hết nội dung */}
          <div className="h-8"></div>
        </div>

        {/* Navigation buttons - fixed at bottom */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-4 lg:mt-6 gap-4 relative z-60 pt-4 border-t border-white/10 flex-shrink-0">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 pointer-events-auto cursor-pointer relative z-70 ${
                hasPrevSection
                  ? "bg-gradient-to-r from-[#6256ca] to-[#ffffff] text-[#6256ca] hover:from-[#6256ca] hover:to-[#e0e0ff]"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                if (hasPrevSection) {
                  setCurrentSection(currentSection - 1);
                }
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-sm text-white/70">
              {currentSection + 1}/{sections.length}
            </span>

            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 pointer-events-auto cursor-pointer relative z-70 ${
                hasNextSection
                  ? "bg-gradient-to-r from-[#6256ca] to-[#ffffff] text-[#6256ca] hover:from-[#6256ca] hover:to-[#e0e0ff]"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                if (hasNextSection) {
                  setCurrentSection(currentSection + 1);
                }
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StaticToggleButton = () => {
  const [staticView, setStaticView] = useAtom(staticViewAtom);
  return (
    <button
      className="bg-[#6256ca] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px] md:min-h-[48px] min-w-[40px] sm:min-w-[44px] md:min-w-[48px] flex items-center justify-center shadow-lg font-medium border border-white/20 active:scale-95"
      onClick={() => setStaticView(!staticView)}
      title={
        staticView
          ? "Kích hoạt chế độ tương tác 3D"
          : "Chuyển sang chế độ tĩnh 2D"
      }
    >
      <span className="flex items-center gap-1 sm:gap-2">
        {staticView ? (
          <>
            <span className="text-sm sm:text-base md:text-lg">✨</span>
            <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
              Kích Hoạt 3D
            </span>
          </>
        ) : (
          <>
            <span className="text-sm sm:text-base md:text-lg">⏸️</span>
            <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
              Tạm Dừng
            </span>
          </>
        )}
      </span>
    </button>
  );
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [bookOpen, setBookOpen] = useAtom(bookOpenAtom);
  const [staticView] = useAtom(staticViewAtom);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(1);

  // Initial loading effect
  useEffect(() => {
    let interval;
    if (initialLoading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            setInitialLoading(false);
            return 100;
          }
          return prev + Math.random() * 3 + 1; // Random increment cho tự nhiên hơn
        });
      }, 50);
    }

    return () => {
      clearInterval(interval);
    };
  }, [initialLoading]);

  // Khởi tạo audio và enable sau user interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (!audioEnabled) return;

    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.volume = 0.3; // Giảm volume để không quá to

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Audio play failed:", error.message);
        // Không hiển thị error để tránh làm phiền user
      }
    };

    playAudio();
  }, [page, audioEnabled]);

  // Tự động mở sách khi click vào trang
  const handlePageClick = (pageNumber) => {
    if (staticView) return; // chặn đổi trang ở chế độ 2D cố định
    setPage(pageNumber);
    setBookOpen(true);
  };

  // Khi bật chế độ 2D: ép về một trạng thái cố định (mở giữa sách)
  useEffect(() => {
    if (staticView) {
      const middlePage = Math.floor(pages.length / 2);
      setPage(middlePage);
      setBookOpen(true);
    }
  }, [staticView, setPage, setBookOpen]);

  return (
    <>
      {/* Cute Feminine Loading Screen */}
      {initialLoading && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#EAF0FE" }}
        >
          {/* Floating hearts background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`,
                  color: "#B3A8DA",
                }}
              >
                💖
              </div>
            ))}
            {[...Array(15)].map((_, i) => (
              <div
                key={i + 20}
                className="absolute opacity-15 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 15 + 8}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 1.5 + 1}s`,
                  color: "#B3A8DA",
                }}
              >
                ✨
              </div>
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={i + 35}
                className="absolute opacity-25"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 12 + 6}px`,
                  animation: `float ${
                    Math.random() * 3 + 2
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  color: "#B3A8DA",
                }}
              >
                🌸
              </div>
            ))}
          </div>

          {/* Main loading content */}
          <div className="text-center z-10 px-6">
            {/* Logo with cute animation */}
            <div className="mb-8 transform hover:scale-110 transition-transform duration-500">
              <div
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 animate-pulse"
                style={{ color: "#B3A8DA" }}
              >
                VỊ NỮ
              </div>
              <div
                className="text-sm sm:text-base md:text-lg font-medium"
                style={{ color: "#B3A8DA" }}
              >
                Hành trình khẳng định bản thân ✨
              </div>
            </div>

            {/* Cute loading spinner */}
            <div className="mb-6 relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto relative">
                <div
                  className="absolute inset-0 border-4 rounded-full animate-spin"
                  style={{
                    borderColor: "#B3A8DA",
                    borderTopColor: "transparent",
                  }}
                ></div>
                <div
                  className="absolute inset-2 border-3 rounded-full animate-spin animation-delay-150"
                  style={{
                    borderColor: "#B3A8DA",
                    borderRightColor: "transparent",
                  }}
                ></div>
                <div
                  className="absolute inset-4 border-2 rounded-full animate-spin animation-delay-300"
                  style={{
                    borderColor: "#B3A8DA",
                    borderBottomColor: "transparent",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce">
                  💫
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-64 sm:w-80 mx-auto mb-4">
              <div
                className="bg-white/50 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner"
                style={{ borderColor: "#B3A8DA", borderWidth: "1px" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out shadow-sm relative overflow-hidden"
                  style={{
                    width: `${Math.min(loadingProgress, 100)}%`,
                    backgroundColor: "#B3A8DA",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div
                className="text-center mt-2 text-sm sm:text-base font-medium"
                style={{ color: "#B3A8DA" }}
              >
                {Math.round(loadingProgress)}% ✨
              </div>
            </div>

            {/* Loading messages */}
            <div
              className="text-sm sm:text-base font-medium animate-pulse"
              style={{ color: "#B3A8DA" }}
            >
              {loadingProgress < 30 && "Đang chuẩn bị hành trình... 🌸"}
              {loadingProgress >= 30 &&
                loadingProgress < 60 &&
                "Khám phá giá trị bản thân... 💖"}
              {loadingProgress >= 60 &&
                loadingProgress < 90 &&
                "Gần hoàn thành rồi... ✨"}
              {loadingProgress >= 90 && "Chào mừng bạn đến với VỊ NỮ! 🎉"}
            </div>

            {/* Cute decorative elements */}
            <div className="mt-8 flex justify-center space-x-4 text-2xl sm:text-3xl">
              <span
                className="animate-bounce animation-delay-0"
                style={{ color: "#B3A8DA" }}
              >
                🌸
              </span>
              <span
                className="animate-bounce animation-delay-150"
                style={{ color: "#B3A8DA" }}
              >
                💖
              </span>
              <span
                className="animate-bounce animation-delay-300"
                style={{ color: "#B3A8DA" }}
              >
                ✨
              </span>
              <span
                className="animate-bounce animation-delay-450"
                style={{ color: "#B3A8DA" }}
              >
                🌸
              </span>
            </div>
          </div>

          {/* CSS for custom animations */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-10px) rotate(180deg);
              }
            }
            .animation-delay-150 {
              animation-delay: 150ms;
            }
            .animation-delay-300 {
              animation-delay: 300ms;
            }
            .animation-delay-450 {
              animation-delay: 450ms;
            }
          `}</style>
        </div>
      )}

      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}
      {podcastOpen && <Podcast onClose={() => setPodcastOpen(false)} />}
      {/* Video background */}
      {currentVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`fixed inset-0 w-full h-full object-cover z-[-1] transition-opacity duration-500 ${
            videoLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadStart={() => {
            console.log("Video loading:", currentVideo);
            setVideoLoading(true);
          }}
          onCanPlay={() => {
            console.log("Video can play:", currentVideo);
            setTimeout(() => setVideoLoading(false), 300);
          }}
          onError={(e) => {
            console.log("Video error:", e, currentVideo);
            setVideoLoading(false);
          }}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}

      {/* Loading overlay */}
      {videoLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] flex items-center justify-center">
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 sm:border-3 md:border-4 border-purple-500 border-t-transparent mx-auto mb-3 md:mb-4"></div>
            <div className="text-white text-base sm:text-lg md:text-xl font-medium">
              Đang tải nội dung...
            </div>
            <div className="text-purple-300 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
              Vui lòng chờ trong giây lát
            </div>
          </div>
        </div>
      )}

      {/* Main content - only show when loading is complete */}
      {!initialLoading && (
        <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
          {/* Header with logo area */}
          <div className="flex justify-between items-start p-2 sm:p-3 md:p-4 lg:p-6 gap-1 sm:gap-2 md:gap-3">
            <div className="pointer-events-auto flex-shrink-0">
              <div className="bg-[#6256ca] backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 border border-white/20">
                <h1 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
                  VỊ NỮ
                </h1>
                <p className="text-white text-xs sm:text-xs md:text-sm leading-tight">
                  Hành trình khẳng định bản thân
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* QUIZ, Podcast, AI, Facebook, TikTok buttons - all in one group */}
              <div className="pointer-events-auto flex-shrink-0 bg-black/40 backdrop-blur-md rounded-full border border-white/30 p-1 flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setQuizOpen(true)}
                  className="bg-[#6256ca] hover:bg-purple-700 transition-colors text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none cursor-pointer min-w-[32px] sm:min-w-[80px] flex items-center justify-center gap-0.5 sm:gap-1 hover:scale-105 active:scale-95 shadow-lg flex-shrink-0"
                  title="Trắc nghiệm"
                >
                  <span className="animate-pulse text-xs sm:text-sm">❓</span>
                  <span className="hidden sm:inline text-xs">QUIZ</span>
                </button>
                <button
                  onClick={() => setPodcastOpen(true)}
                  className="bg-[#6256ca] hover:bg-purple-700 transition-colors text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none cursor-pointer min-w-[32px] sm:min-w-[80px] flex items-center justify-center gap-0.5 sm:gap-1 hover:scale-105 active:scale-95 shadow-lg flex-shrink-0"
                  title="Podcast"
                >
                  <span className="animate-bounce text-xs sm:text-sm">🎙️</span>
                  <span className="hidden sm:inline text-xs">PODCAST</span>
                </button>
                <button
                  onClick={() => setAiChatOpen(true)}
                  className="bg-[#6256ca] hover:bg-purple-700 transition-colors text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none cursor-pointer min-w-[32px] sm:min-w-[80px] flex items-center justify-center gap-0.5 sm:gap-1 hover:scale-105 active:scale-95 shadow-lg flex-shrink-0"
                  title="Trợ lý AI"
                >
                  <span className="animate-spin text-xs sm:text-sm">🤖</span>
                  <span className="hidden sm:inline text-xs">AI</span>
                </button>
                <a
                  href="https://www.facebook.com/profile.php?id=61581248485989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none cursor-pointer min-w-[32px] flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg flex-shrink-0"
                  title="Theo dõi Facebook"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-sm sm:text-lg"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@chandungvinu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 transition-all duration-300 text-white px-1.5 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm focus:outline-none cursor-pointer min-w-[32px] flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg flex-shrink-0"
                  title="Theo dõi TikTok"
                >
                  <FontAwesomeIcon
                    icon={faTiktok}
                    className="text-sm sm:text-lg"
                  />
                </a>
              </div>

              {/* Static toggle button */}
              <div className="pointer-events-auto flex-shrink-0">
                <StaticToggleButton />
              </div>
            </div>
          </div>

          {/* Bottom navigation - improved responsive */}
          <div className="w-full pointer-events-auto relative z-60">
            <div className="bg-gradient-to-t from-black/90 via-purple-900/50 to-transparent backdrop-blur-md border-t border-purple-500/30">
              {/* Navigation buttons container */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4 lg:p-6 justify-center min-w-max">
                  {/* Front cover button */}
                  <button
                    className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-6 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium shrink-0 border-2 min-h-[36px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px] relative overflow-hidden group active:scale-95 ${
                      0 === page
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg"
                        : "bg-black/30 text-white border-white/30 hover:border-purple-400 hover:bg-purple-500/20"
                    }`}
                    onClick={() => handlePageClick(0)}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base md:text-lg">
                        📖
                      </span>
                      <span className="hidden xs:inline text-xs sm:text-sm md:text-base">
                        Bìa Trước
                      </span>
                    </div>
                    {0 === page && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg sm:rounded-xl"></div>
                    )}
                  </button>

                  {/* Page buttons */}
                  {[...pages].slice(1).map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium shrink-0 border-2 min-h-[36px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px] relative overflow-hidden group active:scale-95 ${
                          pageNum === page
                            ? "bg-[#6256ca] text-white border-[#6256ca] shadow-lg"
                            : "bg-black/30 text-white border-white/30 hover:border-[#6256ca] hover:bg-[#6256ca]/20"
                        }`}
                        onClick={() => handlePageClick(pageNum)}
                      >
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-sm sm:text-base md:text-lg">
                            ✨
                          </span>
                          <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                            Chương{" "}
                          </span>
                          <span className="text-xs sm:text-sm md:text-base">
                            {pageNum}
                          </span>
                        </div>
                        {pageNum === page && (
                          <div className="absolute inset-0 bg-[#6256ca]/20 rounded-lg sm:rounded-xl"></div>
                        )}
                      </button>
                    );
                  })}

                  {/* Back cover button */}
                  <button
                    className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 lg:px-6 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium shrink-0 border-2 min-h-[36px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px] relative overflow-hidden group active:scale-95 ${
                      page === pages.length
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg"
                        : "bg-black/30 text-white border-white/30 hover:border-purple-400 hover:bg-purple-500/20"
                    }`}
                    onClick={() => handlePageClick(pages.length)}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base md:text-lg">
                        🌟
                      </span>
                      <span className="hidden xs:inline text-xs sm:text-sm md:text-base">
                        Bìa Sau
                      </span>
                    </div>
                    {page === pages.length && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg sm:rounded-xl"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="px-3 sm:px-4 md:px-6 pb-2 sm:pb-3 md:pb-4">
                <div className="w-full bg-white/20 rounded-full h-1 sm:h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${(page / pages.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center mt-1 sm:mt-2">
                  <span className="text-white/70 text-xs sm:text-sm">
                    Chương {page} / {pages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Close book button - responsive */}
      {bookOpen && !initialLoading && (
        <button
          className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50 bg-[#6256ca] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] md:min-h-[48px] min-w-[36px] sm:min-w-[44px] md:min-w-[48px] flex items-center justify-center shadow-lg font-medium border border-white/20 active:scale-95"
          onClick={() => setBookOpen(false)}
        >
          <span className="flex items-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-base md:text-lg">✕</span>
            <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
              Đóng Sách
            </span>
          </span>
        </button>
      )}

      {/* AI Chat Component */}
      {!initialLoading && (
        <AIChat
          isOpen={aiChatOpen}
          onClose={() => setAiChatOpen(false)}
          currentPage={page}
        />
      )}
    </>
  );
};
