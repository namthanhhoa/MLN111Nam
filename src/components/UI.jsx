import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import AIChat from "./AIChat.jsx";

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
    title: "Phụ nữ và hành trình khẳng định vị thế trong xã hội",
    sections: [
      {
        content:
          "Phụ nữ không chỉ gắn với thiên chức gia đình, mà còn có khả năng đóng góp mạnh mẽ trong học tập, lao động và sáng tạo. Quá trình giải phóng phụ nữ nhấn mạnh việc phá bỏ những định kiến giới tồn tại qua nhiều thế kỷ, giúp họ được thừa nhận như những cá nhân tự do và bình đẳng. Khi phụ nữ được trao quyền, họ trở thành lực lượng quan trọng trong công cuộc xây dựng xã hội tiến bộ và nhân văn, đồng thời khẳng định giá trị riêng trên nhiều lĩnh vực.",
      },
    ],
  },
  2: {
    title: "Phong trào nữ quyền và khát vọng tự do – công bằng",
    sections: [
      {
        content:
          "Phong trào nữ quyền xuất phát từ khát vọng được sống tự do, bình đẳng và được đối xử công bằng như nam giới. Đây là một hành trình đấu tranh bền bỉ để phụ nữ có quyền học tập, quyền lao động, quyền tham gia chính trị – xã hội và quyền tự quyết cuộc đời mình. Những thành quả đạt được không chỉ mang lại sự giải phóng cho phụ nữ, mà còn thúc đẩy sự phát triển dân chủ, nhân văn và tiến bộ cho toàn xã hội.",
      },
    ],
  },
  3: {
    title: "Giá trị phụ nữ trong lăng kính hiện sinh",
    sections: [
      {
        content:
          "Giá trị và bản sắc của phụ nữ không phải là thứ có sẵn ngay từ khi sinh ra, mà được hình thành qua lựa chọn, trải nghiệm và hành động của mỗi cá nhân. Quan điểm hiện sinh nhấn mạnh rằng phụ nữ là chủ thể tự do, có khả năng tự kiến tạo cuộc đời mình thay vì bị áp đặt bởi những chuẩn mực truyền thống khắt khe. Việc thừa nhận quyền tự quyết và sự sáng tạo của phụ nữ cũng đồng nghĩa với việc trao cho họ cơ hội khẳng định bản thân trong một thế giới đa dạng và luôn vận động.",
      },
    ],
  },
  4: {
    title: "Thách thức và cơ hội của phụ nữ trong xã hội hiện đại",
    sections: [
      {
        content:
          "Trong bối cảnh hiện đại, phụ nữ có nhiều cơ hội mới để học tập, làm việc và phát triển bản thân, nhưng đồng thời cũng phải đối mặt với những áp lực và định kiến giới vẫn còn tồn tại. Sự căng thẳng giữa truyền thống và hiện đại khiến hành trình khẳng định giá trị của họ vừa mở ra triển vọng, vừa đặt ra thách thức. Do đó, việc tiếp tục bảo vệ quyền bình đẳng, xoá bỏ rào cản xã hội và tạo điều kiện cho phụ nữ phát triển toàn diện là yêu cầu cấp thiết để xây dựng một xã hội công bằng và nhân văn.",
      },
    ],
  },
  5: {
    title: "Giải phóng phụ nữ và tiến bộ chung của nhân loại",
    sections: [
      {
        content:
          "Sự giải phóng phụ nữ luôn gắn liền với sự tiến bộ chung của dân tộc và nhân loại. Khi phụ nữ được trao quyền bình đẳng, xã hội được hưởng lợi từ trí tuệ, sức sáng tạo và tinh thần nhân văn mà họ mang lại. Giải phóng phụ nữ không chỉ là hành trình khẳng định giá trị cá nhân, mà còn là cách thức để kiến tạo một cộng đồng phát triển bền vững, nơi tự do và bình đẳng trở thành nền tảng chung cho tất cả mọi người.",
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

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="text-white p-4 pb-6">
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
            <p className="text-sm sm:text-base leading-relaxed break-words whitespace-pre-line">
              {currentContent?.content ||
                content.sections?.[0]?.content ||
                "Không có nội dung"}
            </p>
          </div>
        </div>

        {/* Fixed navigation buttons */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center p-3 gap-2 bg-gradient-to-t from-black/90 to-transparent border-t border-white/10">
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

  // Desktop layout: content ở bên trái
  return (
    <div className="fixed left-0 top-0 h-full w-[35vw] min-w-[350px] max-w-[500px] bg-gradient-to-r from-black/90 to-black/30 backdrop-blur-md z-50 pointer-events-none flex flex-col border-r border-purple-500/20">
      <div className="text-white max-w-full pointer-events-auto w-full flex-1 flex flex-col p-6 lg:p-8">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:mb-6 text-left break-words leading-tight">
          {content.title}
        </h2>
        {currentContent?.image && (
          <img
            src={currentContent.image}
            alt="Minh hoạ"
            className="w-full max-h-48 lg:max-h-64 object-contain rounded-lg mb-4 bg-white/5"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        )}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <p className="text-base lg:text-lg leading-relaxed text-left break-words whitespace-pre-line">
            {currentContent.content}
          </p>
        </div>

        {/* Nút chuyển đổi phần */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-4 lg:mt-6 gap-4 relative z-60 pt-4 border-t border-white/10">
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
  const [bgKey, setBgKey] = useState("1");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

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

      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
        {/* Header with logo area */}
        <div className="flex justify-between items-start p-3 sm:p-4 md:p-6 gap-2 sm:gap-3 md:gap-4">
          <div className="pointer-events-auto flex-shrink-0">
            <div className="bg-[#6256ca] backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 border border-white/20">
              <h1 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                VỊ NỮ
              </h1>
              <p className="text-white text-xs sm:text-sm md:text-sm leading-tight">
                Hành trình khẳng định bản thân
              </p>
            </div>
          </div>

          {/* Background selector - redesigned for mobile */}
          <div className="pointer-events-auto flex-shrink-0">
            <div className="bg-black/40 backdrop-blur-md rounded-full border border-white/30 p-1">
              <select
                className="bg-transparent text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-base focus:outline-none cursor-pointer min-w-[80px] sm:min-w-[120px]"
                value={bgKey}
                onChange={(e) => {
                  const value = e.target.value;
                  setBgKey(value);
                  const map = {
                    1: "/textures/background.jpg",
                    2: "/textures/backgroundVD1.mp4",
                    3: "/textures/BackgroundVD2.mp4",
                  };

                  if (map[value].endsWith(".mp4")) {
                    console.log("Setting video:", map[value]);
                    setVideoLoading(true);
                    setCurrentVideo(map[value]);
                    document.documentElement.style.setProperty(
                      "--app-bg-image",
                      "none"
                    );
                  } else {
                    console.log("Setting image:", map[value]);
                    setVideoLoading(false);
                    setCurrentVideo(null);
                    document.documentElement.style.setProperty(
                      "--app-bg-image",
                      `url('${map[value]}')`
                    );
                  }
                }}
              >
                <option value="1">🏛️ Lăng Bác</option>
                <option value="3">🌃 Sài Gòn</option>
              </select>
            </div>
          </div>

          {/* Static toggle button */}
          <div className="pointer-events-auto flex-shrink-0">
            <StaticToggleButton />
          </div>
        </div>

        {/* Bottom navigation - improved responsive */}
        <div className="w-full pointer-events-auto relative z-60">
          <div className="bg-gradient-to-t from-black/90 via-purple-900/50 to-transparent backdrop-blur-md border-t border-purple-500/30">
            {/* Navigation buttons container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 p-2 sm:p-3 md:p-4 lg:p-6 justify-start sm:justify-center min-w-max">
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
                    <span className="text-sm sm:text-base md:text-lg">📖</span>
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
                    <span className="text-sm sm:text-base md:text-lg">🌟</span>
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

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Close book button - responsive */}
      {bookOpen && (
        <button
          className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-40 bg-[#6256ca] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] md:min-h-[48px] min-w-[36px] sm:min-w-[44px] md:min-w-[48px] flex items-center justify-center shadow-lg font-medium border border-white/20 active:scale-95"
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

      {/* AI Chat button - responsive */}
      <button
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-30 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 sm:p-3 md:p-4 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl min-h-[48px] min-w-[48px] sm:min-h-[56px] sm:min-w-[56px] md:min-h-[64px] md:min-w-[64px] flex items-center justify-center group border-2 border-white/20 active:scale-95"
        onClick={() => setAiChatOpen(true)}
        title="Trợ lý AI - Hỏi về tư tưởng Hồ Chí Minh và nữ quyền"
      >
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform">
            🤖
          </span>
          <span className="text-xs sm:text-xs md:text-xs mt-0 sm:mt-1 opacity-80">
            AI
          </span>
        </div>
      </button>

      {/* AI Chat Component */}
      <AIChat
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        currentPage={page}
      />
    </>
  );
};
