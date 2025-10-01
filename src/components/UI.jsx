import { atom, useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FcFeedback } from "react-icons/fc";
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
  6: {
    title: "📚 Nguồn và Tài liệu tham khảo",
    sections: [
      {
        content:
          "LỜI KẾT\n" +
          "\n" +
          "Trong quá trình tìm hiểu và xây dựng nội dung, nhóm dựa vào các nguồn triết học và tư tưởng lớn:\n" +
          "\n" +
          'Simone de Beauvoir – Le Deuxième Sexe (1949): "Người ta không sinh ra đã là phụ nữ, mà trở thành phụ nữ." → Tác phẩm nền tảng cho triết học nữ quyền hiện đại.\n' +
          "\n" +
          "Hồ Chí Minh – Lời kêu gọi Toàn quốc kháng chiến (1946), Thư gửi phụ nữ nhân dịp Hai Bà Trưng (1952): khẳng định vai trò, sức mạnh và tinh thần yêu nước của phụ nữ Việt Nam.\n" +
          "\n" +
          "F. Engels – Nguồn gốc của gia đình, chế độ tư hữu và Nhà nước (1884): phân tích địa vị phụ nữ trong mối quan hệ gia đình – xã hội, đặt nền tảng cho việc nhìn nhận phụ nữ trong bối cảnh kinh tế – chính trị.\n" +
          "\n" +
          "Các trích đoạn khác từ Beauvoir (Hiện hữu có trước bản chất, Tự do của mình gắn liền với tự do của người khác) cho thấy chiều sâu triết lý hiện sinh khi bàn về nữ quyền.\n" +
          "\n" +
          "📝 Kết luận\n" +
          "\n" +
          '"Chân dung Vị Nữ" không chỉ là một tập hợp trích dẫn, mà là bức tranh khái quát về hành trình tư tưởng:\n' +
          "\n" +
          "Từ triết học hiện sinh (Beauvoir) → phụ nữ không mang sẵn bản chất, họ kiến tạo chính mình qua tự do và lựa chọn.\n" +
          "\n" +
          "Từ chủ nghĩa duy vật lịch sử (Engels) → bình đẳng giới không thể tách rời khỏi quan hệ sản xuất và cấu trúc xã hội.\n" +
          "\n" +
          "Từ tư tưởng cách mạng Việt Nam (Hồ Chí Minh) → phụ nữ vừa là người giữ gìn văn hóa, vừa là lực lượng tiên phong trong đấu tranh độc lập dân tộc.\n" +
          "\n" +
          "👉 Như vậy, nữ quyền không chỉ là một phong trào xã hội, mà là một hành trình triết học và nhân văn. Hành trình ấy khẳng định rằng: tự do của phụ nữ cũng chính là thước đo tự do của cả nhân loại.",
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
  const [page, setPage] = useAtom(pageAtom);
  // Mobile bottom sheet state
  const [sheetHeight, setSheetHeight] = useState(60); // in vh
  const minSheet = 30; // collapsed height in vh
  const maxSheet = 90; // expanded height in vh
  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(60);
  const movedRef = useRef(false);

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
    const clampVh = (v) => Math.max(minSheet, Math.min(maxSheet, v));

    const onPointerStart = (clientY) => {
      draggingRef.current = true;
      movedRef.current = false;
      startYRef.current = clientY;
      startHeightRef.current = sheetHeight;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      onPointerStart(e.clientY);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        e.preventDefault();
        onPointerStart(e.touches[0].clientY);
      }
    };

    const updateByClientY = (clientY) => {
      const dy = startYRef.current - clientY; // drag up => positive
      const deltaVh = (dy / window.innerHeight) * 100;
      const next = clampVh(startHeightRef.current + deltaVh);
      if (Math.abs(deltaVh) > 0.5) movedRef.current = true;
      setSheetHeight(next);
    };

    const onMouseMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      updateByClientY(e.clientY);
    };

    const onTouchMove = (e) => {
      if (!draggingRef.current) return;
      // prevent page scroll while dragging
      e.preventDefault();
      if (e.touches && e.touches.length > 0) {
        updateByClientY(e.touches[0].clientY);
      }
    };

    const endDrag = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      // Optional snap behavior
      const mid = (minSheet + maxSheet) / 2;
      setSheetHeight((h) => (h < mid ? minSheet : maxSheet));
    };

    const onMouseUp = () => endDrag();
    const onTouchEnd = () => endDrag();

    const onHandleClick = () => {
      // If not dragged, toggle collapsed/expanded
      if (!movedRef.current) {
        const mid = (minSheet + maxSheet) / 2;
        setSheetHeight((h) => (h < mid ? maxSheet : minSheet));
      }
    };

    return (
      <div
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-black/60 backdrop-blur-md flex flex-col border-t border-purple-500/30 z-[80]"
        style={{ height: `${sheetHeight}vh` }}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-2 select-none" style={{ touchAction: "none" }}>
          <div
            className={`w-12 h-1 bg-white/30 rounded-full ${draggingRef.current ? "opacity-70" : "opacity-100"}`}
            role="button"
            aria-label="Kéo để mở rộng/thu gọn"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onClick={onHandleClick}
            style={{ cursor: draggingRef.current ? "grabbing" : "grab" }}
          ></div>
        </div>

        {/* Mobile page selector inside sheet */}
        <div className="px-2 pb-1 pointer-events-auto">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 p-1 justify-center min-w-max">
              {/* Front cover button */}
              <button
                className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shrink-0 border-2 min-h-[36px] relative overflow-hidden group active:scale-95 ${
                  0 === page
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg"
                    : "bg-black/30 text-white border-white/30 hover:border-purple-400 hover:bg-purple-500/20"
                }`}
                onClick={() => setPage(0)}
                title="Bìa Trước"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base">📖</span>
                  <span className="hidden sm:inline text-xs sm:text-sm">Bìa Trước</span>
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
                    key={`mobile-sheet-page-${pageNum}`}
                    className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shrink-0 border-2 min-h-[36px] relative overflow-hidden group active:scale-95 ${
                      pageNum === page
                        ? "bg-[#6256ca] text-white border-[#6256ca] shadow-lg"
                        : "bg-black/30 text-white border-white/30 hover:border-[#6256ca] hover:bg-[#6256ca]/20"
                    }`}
                    onClick={() => setPage(pageNum)}
                    title={`Chương ${pageNum}`}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base">✨</span>
                      <span className="hidden sm:inline text-xs sm:text-sm">Chương </span>
                      <span className="text-xs sm:text-sm">{pageNum}</span>
                    </div>
                    {pageNum === page && (
                      <div className="absolute inset-0 bg-[#6256ca]/20 rounded-lg sm:rounded-xl"></div>
                    )}
                  </button>
                );
              })}

              {/* Back cover button */}
              <button
                className={`transition-all duration-300 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shrink-0 border-2 min-h-[36px] relative overflow-hidden group active:scale-95 ${
                  page === pages.length
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg"
                    : "bg-black/30 text-white border-white/30 hover:border-purple-400 hover:bg-purple-500/20"
                }`}
                onClick={() => setPage(pages.length)}
                title="Bìa Sau"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base">🌟</span>
                  <span className="hidden sm:inline text-xs sm:text-sm">Bìa Sau</span>
                </div>
                {page === pages.length && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg sm:rounded-xl"></div>
                )}
              </button>
            </div>
          </div>
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
    // Cho phép đổi trang trong mọi trường hợp
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
          <div className="p-2 sm:p-3 md:p-4 lg:p-6 gap-1 sm:gap-2 md:gap-3">
            {/* Desktop layout: Logo left, buttons right */}
            <div className="hidden lg:flex justify-between items-start">
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

              {/* Desktop: Action buttons on the right */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                {/* ...existing desktop buttons code... */}
                <div className="pointer-events-auto flex-shrink-0 bg-gradient-to-r from-purple-900/70 via-pink-900/70 to-purple-900/70 backdrop-blur-xl rounded-xl border border-purple-400/40 shadow-xl p-1.5 sm:p-2 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setQuizOpen(true)}
                    className="group relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Trắc nghiệm kiến thức về Vị Nữ"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm animate-bounce group-hover:animate-pulse relative z-10">
                      🧠
                    </span>
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      QUIZ
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  <button
                    onClick={() => setPodcastOpen(true)}
                    className="group relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 hover:from-purple-400 hover:via-pink-400 hover:to-purple-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Nghe Podcast về hành trình Vị Nữ"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm animate-pulse group-hover:animate-bounce relative z-10">
                      🎙️
                    </span>
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      PODCAST
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  <button
                    onClick={() => setAiChatOpen(true)}
                    className="group relative bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Trò chuyện với AI về Vị Nữ"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm animate-spin group-hover:animate-pulse relative z-10">
                      🤖
                    </span>
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      AI
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  <a
                    href="https://www.facebook.com/profile.php?id=61581248485989"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Theo dõi Facebook - Cập nhật nội dung mới"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-sm animate-pulse group-hover:animate-bounce relative z-10"
                    />
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      FB
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>

                  <a
                    href="https://www.tiktok.com/@chandungvinu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-pink-500 via-red-500 to-black hover:from-pink-400 hover:via-red-400 hover:to-gray-800 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Theo dõi TikTok - Video thú vị về Vị Nữ"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FontAwesomeIcon
                      icon={faTiktok}
                      className="text-sm animate-bounce group-hover:animate-pulse relative z-10"
                    />
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      TIKTOK
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-black rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>

                  {/* Mobile Feedback Button */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeta8pGPb9rNXywXKh1829AcWxYb8F2uOHNYJIIcqn-048stg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 hover:from-green-400 hover:via-teal-400 hover:to-emerald-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none cursor-pointer min-w-[50px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40"
                    title="Giúp chúng mình 1 feedback nhé"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FcFeedback className="text-sm animate-bounce group-hover:animate-pulse relative z-10" />
                    <span className="text-xs font-extrabold relative z-10 tracking-wide">
                      FEEDBACK
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>
                </div>
                {/* Static toggle button (desktop) */}
                <div className="pointer-events-auto flex-shrink-0 ml-1 sm:ml-2">
                  <StaticToggleButton />
                </div>
              </div>
            </div>

            {/* Mobile layout: Logo and buttons in header area */}
            <div className="lg:hidden flex flex-col gap-2">
              {/* Logo */}
              <div className="pointer-events-auto flex-shrink-0">
                <div className="bg-[#6256ca] backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2 border border-white/20">
                  <h1 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight">
                    VỊ NỮ
                  </h1>
                  <p className="text-white text-xs leading-tight">
                    Hành trình khẳng định bản thân
                  </p>
                </div>
              </div>

              {/* Action buttons directly under logo */}
              <div className="pointer-events-auto bg-gradient-to-r from-purple-900/70 via-pink-900/70 to-purple-900/70 backdrop-blur-xl rounded-xl border border-purple-400/40 shadow-xl p-2 overflow-x-auto scrollbar-hide whitespace-nowrap snap-x snap-mandatory touch-pan-x">
                <div className="flex items-center gap-1 sm:gap-2 min-w-max">
                  {/* Mobile Quiz Button */}
                  <button
                    onClick={() => setQuizOpen(true)}
                    className="group relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Trắc nghiệm kiến thức về Vị Nữ"
                    aria-label="Quiz"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm sm:text-base animate-bounce group-hover:animate-pulse relative z-10">
                      🧠
                    </span>
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      QUIZ
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  {/* Mobile Podcast Button */}
                  <button
                    onClick={() => setPodcastOpen(true)}
                    className="group relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 hover:from-purple-400 hover:via-pink-400 hover:to-purple-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Nghe Podcast về hành trình Vị Nữ"
                    aria-label="Podcast"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm sm:text-base animate-pulse group-hover:animate-bounce relative z-10">
                      🎙️
                    </span>
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      PODCAST
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  {/* Mobile AI Button */}
                  <button
                    onClick={() => setAiChatOpen(true)}
                    className="group relative bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Trò chuyện với AI về Vị Nữ"
                    aria-label="AI"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-sm sm:text-base animate-spin group-hover:animate-pulse relative z-10">
                      🤖
                    </span>
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      AI
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </button>

                  {/* Mobile Facebook Button */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61581248485989"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Theo dõi Facebook - Cập nhật nội dung mới"
                    aria-label="Facebook"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-sm sm:text-base animate-pulse group-hover:animate-bounce relative z-10"
                    />
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      FB
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>

                  {/* Mobile TikTok Button */}
                  <a
                    href="https://www.tiktok.com/@chandungvinu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-pink-500 via-red-500 to-black hover:from-pink-400 hover:via-red-400 hover:to-gray-800 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Theo dõi TikTok - Video thú vị về Vị Nữ"
                    aria-label="TikTok"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FontAwesomeIcon
                      icon={faTiktok}
                      className="text-sm sm:text-base animate-bounce group-hover:animate-pulse relative z-10"
                    />
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      TIKTOK
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-black rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>

                  {/* Mobile Feedback Button */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeta8pGPb9rNXywXKh1829AcWxYb8F2uOHNYJIIcqn-048stg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 hover:from-green-400 hover:via-teal-400 hover:to-emerald-500 transition-all duration-300 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none cursor-pointer min-w-[56px] sm:min-w-[70px] flex flex-col items-center justify-center gap-0.5 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transform-gpu flex-shrink-0 border border-white/20 hover:border-white/40 snap-start"
                    title="Giúp chúng mình 1 feedback nhé"
                    aria-label="Feedback"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <FcFeedback className="text-sm sm:text-base group-hover:animate-bounce relative z-10" />
                    <span className="hidden sm:inline text-xs font-extrabold relative z-10 tracking-wide">
                      FEEDBACK
                    </span>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-200 -z-10"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile: Book control button */}
          </div>

          {/* Remove the old mobile section that was in the middle */}

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
                      <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
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
                      <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
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
          className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-[120] bg-[#6256ca] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[44px] md:min-h-[48px] min-w-[36px] sm:min-w-[44px] md:min-w-[48px] flex items-center justify-center shadow-lg font-medium border border-white/20 active:scale-95"
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
