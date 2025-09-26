import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import AIChat from "./AIChat.jsx"


const pictures = [
  "1.png", // Trang đầu tiên
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
  "17.png",
  "18.png",
];

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);
export const contentSectionAtom = atom(0);
export const staticViewAtom = atom(false);

// Nội dung cho từng trang - mỗi trang có thể có nhiều phần
const pageContents = {
  0: {
    title: "VỊ NỮ",
    sections: [
      {
        content:
          "Phụ nữ không sinh ra là phụ nữ, họ trở thành phụ nữ.” — Simone de Beauvoir.Câu nói này là kim chỉ nam, nhắc nhở rằng “nữ tính” không phải bản chất cố định, mà là kết quả của một quá trình hình thành qua giáo dục, văn hóa, xã hội và lựa chọn cá nhân.",
      },
    ],
  },
  1: {
    title:
      "Hành Trình Khẳng Định Giá Trị Bản Thân: Vị Nữ và Sự Tự Do",
    sections: [
      {
        content:
          "Độc lập, tự do là quyền thiêng liêng, bất khả xâm phạm của mọi dân tộc. Từ ngàn xưa, lịch sử Việt Nam gắn liền với truyền thống yêu nước và đấu tranh chống giặc ngoại xâm, thể hiện khát vọng có được nền độc lập và tự do cho nhân dân – một giá trị thiêng liêng mà Hồ Chí Minh luôn hiện thân.\n\n Năm 1919, nhân dịp các nước Đồng minh thắng trận trong Chiến tranh thế giới thứ nhất họp Hội nghị Vécxây (Pháp), thay mặt những người Việt Nam yêu nước, Hồ Chí Minh gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Vécxây, bao gồm 8 điểm với hai nội dung chính là đời quyền bình đẳng về mặt pháp lý và đòi các quyển tự do, dân chủ của người dân Đông Dương, Bản yêu sách không được Hội nghị chấp nhận nhưng qua sự kiện trên cho thấy lần đầu tiên, tư tưởng Hồ Chí Minh về quyền của các dân tộc thuộc địa mà trước hết là quyền bình đẳng và tự do đã hình thành, thể hiện tư tưởng về quyền dân tộc và quyền con người hình thành từ sớm. ",
      },

      {
        content:
          "Trong Chánh cương vắn tắt của Đảng (1930), Người xác định mục tiêu chính trị là đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến và Làm cho nước Nam hoàn toàn độc lập.\n\n Trong Tuyên ngôn độc lập 1945, Hồ Chí Minh trịnh trọng tuyên bố Việt Nam có quyền hưởng tự do và độc lập, đồng thời kêu gọi toàn dân quyết tâm bảo vệ nền độc lập đó. Tư tưởng này được cụ thể hóa qua các cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, người đã nói với đồng bào và các quốc gia trên thế giới : “Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thực đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mệnh và của cải để giữ vững quyền tự do và độc lập ấy”. ",
      },
      {
        content:
          "Trong Lời kêu gọi toàn quốc kháng chiến  19/12/1946 với những lời hiệu triệu nổi tiếng như “Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ” và “Không có gì quý hơn độc lập, tự do”, trở thành tuyên ngôn bất hủ, khích lệ nhân dân Việt Nam anh dũng chiến đấu, bảo vệ chủ quyền, toàn vẹn lãnh thổ và quyền dân tộc cơ bản.",
      },
    ],
  },
  2: {
    title: "Độc lập dân tộc phải gắn liền với tự do, hạnh phúc của nhân dân",
    sections: [
      {
        content:
          " Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với tự do và hạnh phúc của nhân dân. Người đánh giá cao học thuyết Tam dân của Tôn Trung Sơn về “dân tộc độc lập, dân quyền tự do và dân sinh hạnh phúc” và khẳng định: dân tộc Việt Nam đương nhiên phải được tự do và bình đẳng về quyền lợi, đó là lẽ phải không ai chối cãi được. Trong Chánh cương vắn tắt của Đảng (1930), Hồ Chí Minh xác định mục tiêu cách mạng là làm cho nước Nam hoàn toàn độc lập, tiêu diệt mọi thứ áp bức, chia ruộng đất cho dân nghèo, bỏ sưu thuế, và bảo đảm quyền lợi lao động. ",
      },
      {
        content:
          " Sau thắng lợi Cách mạng Tháng Tám 1945, Người nhấn mạnh: “Nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì” và yêu cầu thực hiện ngay các quyền cơ bản cho dân: có ăn, có mặc, có chỗ ở và được học hành. Suốt đời hoạt động cách mạng, Hồ Chí Minh luôn coi độc lập gắn liền với tự do và hạnh phúc cho nhân dân, bộc bạch tâm huyết: “Tôi chỉ có một sự ham muốn tột bậc là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.”",
      },
    ],
  },
  3: {
    title: "Độc lập dân tộc phải là nền độc lập thật sự, hoàn toàn và triệt để",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, độc lập dân tộc phải là nền độc lập thật sự, hoàn toàn và triệt để, không thể chỉ là độc lập giả hiệu do thực dân, đế quốc tạo ra thông qua các chính phủ bù nhìn nhằm che đậy bản chất xâm lược và bóc lột. Người nhấn mạnh rằng nền độc lập mà nhân dân không có quyền tự quyết về ngoại giao, không có quân đội riêng, không có tài chính riêng… thì độc lập đó chẳng có ý nghĩa gì. Trên tinh thần này, ngay sau Cách mạng Tháng Tám, trong bối cảnh đất nước gặp nhiều khó khăn và thù trong giặc ngoài, Hồ Chí Minh cùng Chính phủ Việt Nam Dân chủ Cộng hòa đã sử dụng nhiều biện pháp, đặc biệt là ngoại giao, để bảo đảm nền độc lập thật sự của đất nước.",
      },
    ],
  },
  4: {
    title: "Độc lập dân tộc gắn liền với thống nhất và toàn vẹn lãnh thổ",
    sections: [
      {
        content:
          "Trong lịch sử, dân tộc Việt Nam luôn đối mặt với âm mưu xâm lược và chia cắt đất nước. Thực dân Pháp từng chia nước ta thành ba kỳ với chế độ cai trị riêng, sau Cách mạng Tháng Tám, miền Bắc bị quân Tưởng Giới Thạch chiếm đóng, miền Nam bị Pháp xâm lược, và Pháp còn đưa ra “Nam Kỳ tự trị” nhằm chia cắt đất nước. Trước thực trạng này, Hồ Chí Minh khẳng định: “Đồng bào Nam Bộ là dân nước Việt Nam. Sông có thể cạn, núi có thể mòn, song chân lý đó không bao giờ thay đổi”. \n\n   Sau Hiệp định Giơnevơ (1954), khi đất nước tạm thời chia cắt hai miền, Người vẫn kiên trì đấu tranh cho thống nhất, nhấn mạnh: “Nước Việt Nam là một, dân tộc Việt Nam là một”. Trong Di chúc, Hồ Chí Minh bày tỏ niềm tin tuyệt đối vào thắng lợi cách mạng, vào sự thống nhất Tổ quốc và sự sum họp của đồng bào Nam – Bắc. Có thể khẳng định rằng, tư tưởng độc lập dân tộc luôn gắn liền với thống nhất và toàn vẹn lãnh thổ là tư tưởng xuyên suốt trong cuộc đời hoạt động cách mạng của Hồ Chí Minh.",
      },
    ],
  },
  5: {
    title:
      "Cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo con đường cách mạng vô sản",
    sections: [
      {
        content:
          "Khi thực dân Pháp xâm lược, Việt Nam đứng trước vấn đề sống còn là phải đấu tranh giải phóng dân tộc. Các phong trào yêu nước trước đó thất bại do khủng hoảng giai cấp lãnh đạo và đường lối cách mạng. Hồ Chí Minh đi tìm con đường cứu nước ở phương Tây nhưng nhận thấy cách mạng tư sản không giải phóng được dân chúng và thuộc địa, vì vậy Người quyết định lựa chọn con đường cách mạng vô sản sau khi nghiên cứu Cách mạng Tháng Mười Nga 1917 và luận cương của Lênin (1920).",
      },
      {
        content:
          "Theo Hồ Chí Minh, ở các nước thuộc địa như Việt Nam, giải phóng dân tộc phải đi trước, gắn với giải phóng xã hội, giai cấp và con người, khác với con đường ở châu Âu. Sau này Người khẳng định: Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản. Đây là con đường cách mạng triệt để nhất phù hợp với yêu cầu của cách mạng Việt Nam và xu thế phát triển của thời đại.  Trong Chánh cương vắn tắt của Đảng (1930), Người xác định chiến lược là làm tư sản dân quyền cách mạng và thổ địa cách mạng để tiến tới xã hội chủ nghĩa, nhưng đặt giải phóng dân tộc, đánh đổ đế quốc lên hàng đầu, còn chống phong kiến sẽ thực hiện từng bước. Đây là điểm sáng tạo của Hồ Chí Minh, kết hợp nhiệm vụ giải phóng dân tộc với con đường cách mạng vô sản phù hợp với điều kiện Việt Nam và xu thế thời đại.",
      },
    ],
  },
  6: {
    title:
      "Cách mạng giải phóng dân tộc, trong điều kiện Việt Nam, muốn thắng lợi phải do Đảng Cộng sản lãnh đạo",
    sections: [
      {
        content:
          "Theo Hồ Chí Minh, Đảng Cộng sản là nhân tố chủ quan quyết định thành công của cách mạng giải phóng dân tộc. Chủ nghĩa Mác – Lênin chỉ rõ, giai cấp công nhân phải có chính đảng để giác ngộ, tập hợp, huấn luyện quần chúng và đưa họ vào đấu tranh. Hồ Chí Minh tiếp thu lý luận này và nhấn mạnh vai trò của đảng trong tác phẩm Đường cách mệnh (1927): cách mạng trước hết phải có đảng cách mạng, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với các dân tộc bị áp bức và giai cấp vô sản toàn thế giới; đảng vững thì cách mạng mới thành công.\n\n",
      },
      {
        content:
          "Trong bối cảnh Việt Nam là nước thuộc địa – phong kiến, Người cho rằng Đảng Cộng sản vừa là đội tiên phong của giai cấp công nhân, vừa là đội tiên phong của nhân dân lao động, trong sạch, tận tâm phục vụ Tổ quốc, trở thành Đảng của cả dân tộc Việt Nam. Hồ Chí Minh khẳng định: “Chính vì Đảng Lao động Việt Nam là Đảng của giai cấp công nhân và nhân dân lao động, cho nên nó phải là Đảng của dân tộc Việt Nam”, là một luận điểm quan trọng, bổ sung và phát triển lý luận Mác-xít về vai trò của đảng.",
      },
    ],
  },
  7: {
    title:
      "Cách mạng giải phóng dân tộc phải dựa trên lực lượng đại đoàn kết toàn dân tộc, lấy liên minh công – nông làm nền tảng",
    sections: [
      {
        content:
          "Hồ Chí Minh quan niệm rằng cách mạng là sự nghiệp chung của toàn dân, dựa vào đại đoàn kết dân tộc, vì “có dân là có tất cả, được lòng dân thì được tất cả, mất lòng dân thì mất tất cả”. Người kế thừa tư tưởng Mác – Lênin, nhấn mạnh rằng quần chúng nhân dân là chủ thể sáng tạo ra lịch sử; cách mạng không phải việc của một vài người mà là của toàn dân. Theo Hồ Chí Minh, công nông là gốc cách mạng, liên minh công – nông là nền tảng, đồng thời Đảng phải tập hợp dân cày nghèo, tiểu tư sản, trí thức, trung nông, lợi dụng hoặc trung lập hóa các giai cấp khác chưa rõ mặt phần cách mạng. Khi thực dân Pháp xâm lược lần hai, Người kêu gọi mọi người Việt Nam, không phân biệt giai tầng, tôn giáo, dân tộc hay đẳng phái, đoàn kết chống kẻ thù chung. Hồ Chí Minh nhấn mạnh, công nhân và nông dân là hai giai cấp đông đảo, bị bóc lột nặng nề, nên “lòng cách mạng càng bền, chí cách mạng càng quyết; nếu họ thắng sẽ được cả thế giới, nếu thua chỉ mất một kiếp khổ”.",
      },
    ],
  },
  8: {
    title:
      "Cách mạng giải phóng dân tộc cần chủ động, sáng tạo, có khả năng giành thắng lợi trước cách mạng vô sản ở chính quốc",
    sections: [
      {
        content:
          "Hồ Chí Minh chỉ ra rằng cách mạng thuộc địa không phụ thuộc vào cách mạng vô sản ở chính quốc mà có thể giành thắng lợi trước, trái ngược với quan điểm từng được Quốc tế Cộng sản xem nhẹ vai trò cách mạng thuộc địa. Người nhấn mạnh mối quan hệ bình đẳng, tác động qua lại giữa cách mạng thuộc địa và cách mạng vô sản ở chính quốc; mỗi bên có vai trò riêng nhưng không lệ thuộc lẫn nhau.\n\n",
      },
      {
        content:
          "Hồ Chí Minh lập luận rằng thuộc địa có vị trí chiến lược đặc biệt đối với chủ nghĩa đế quốc, là nơi tập trung “nọc độc và sức sống” của chủ nghĩa tư bản, và nhấn mạnh tinh thần đấu tranh cách mạng quyết liệt của các dân tộc thuộc địa, khi được tập hợp và giác ngộ sẽ hình thành một lực lượng khổng lồ, giúp tiêu diệt chủ nghĩa đế quốc, đồng thời hỗ trợ cách mạng vô sản ở chính quốc. Người viết trong Tuyên ngôn của Hội Liên hiệp thuộc địa rằng công cuộc giải phóng phải do chính dân tộc thuộc địa nỗ lực thực hiện. Thực tiễn thắng lợi cách mạng Việt Nam năm 1945 và phong trào giải phóng dân tộc thế giới những năm 1960 chứng minh luận điểm này của Hồ Chí Minh vừa sáng tạo, vừa có giá trị lý luận và thực tiễn to lớn.",
      },
    ],
  },
  9: {
    title:
      "Cách mạng giải phóng dân tộc phải được tiến hành bằng phương pháp bạo lực cách mạng",
    sections: [
      {
        content:
          'Hồ Chí Minh vận dụng sáng tạo quan điểm của các nhà kinh điển Mác – Ăngghen và Lênin về bạo lực cách mạng, cho rằng “bạo lực là bà đỡ của một chế độ xã hội cũ đang thai nghén một chế độ mới” và không có bạo lực cách mạng thì không thể giành chính quyền từ tay kẻ thù.\n\nTrong bộ Tư bản, quyển I, tập thứ nhất, xuất bản lần đầu tiên năm 1867, C. Mác viết: “Bạo lực là bà đỡ của một chế độ xã hội cũ đang thai nghén một chế độ mới”. Năm 1878, trong tác phẩm Chống Đuyrinh, Ph. Ăngghen nhắc lại: "Bạo lực còn đóng một vai trò khác trong lịch sử, vai trò cách mạng; nói theo Mác, bạo lực còn là bà đỡ cho mọi xã hội cũ đang thai nghén một xã hội mới; bạo lực là công cụ mà sự vận động xã hội dùng để tự mở đường cho mình và đập tan những hình thức chính trị đã hóa đá và chết cứng"',
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
  back: "Chủ Tịch Hồ Chí Minh",
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

  // Debug
  console.log("Debug mobile content:", {
    content,
    sections,
    currentSection,
    currentContent,
    hasNextSection,
    hasPrevSection,
  });

  // Mobile layout: content ở dưới màn hình
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black/90 to-black/50 backdrop-blur-sm z-50 flex flex-col">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll-container">
          <div className="text-white p-4 pb-2 min-h-full">
            <h2 className="text-2xl font-bold mb-4 break-words">
              {content.title}
            </h2>
            {currentContent?.image && (
              <img
                src={currentContent.image}
                alt="Minh hoạ"
                className="w-full max-h-60 object-contain rounded-lg mb-3 bg-white/5"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x450?text=No+Image";
                }}
              />
            )}
            <p className="text-base leading-relaxed break-words whitespace-pre-line">
              {currentContent?.content ||
                content.sections?.[0]?.content ||
                "Không có nội dung"}
            </p>
          </div>
        </div>

        {/* Fixed navigation buttons */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center p-4 pt-2 gap-2 bg-gradient-to-t from-black/80 to-transparent">
            <button
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                hasPrevSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Previous button clicked", {
                  hasPrevSection,
                  currentSection,
                });
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
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                hasNextSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Next button clicked", {
                  hasNextSection,
                  currentSection,
                });
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
    <div className="fixed left-0 top-0 h-full w-[30vw] min-w-[300px] max-w-[90vw] bg-gradient-to-r from-black/80 to-black/20 backdrop-blur-sm z-50 pointer-events-none flex flex-col p-8 pb-28 transform transition-transform duration-500 ease-in-out">
      <div className="text-white max-w-lg pointer-events-auto w-full flex-1 flex flex-col">
        <h2 className="text-4xl font-bold mb-6 text-left break-words">
          {content.title}
        </h2>
        {currentContent?.image && (
          <img
            src={currentContent.image}
            alt="Minh hoạ"
            className="w-full max-h-64 object-contain rounded-lg mb-4 bg-white/5"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=No+Image";
            }}
          />
        )}
        <p className="text-lg leading-relaxed text-left break-words whitespace-pre-line flex-1">
          {currentContent.content}
        </p>

        {/* Nút chuyển đổi phần */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-6 gap-4 relative z-60">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 pointer-events-auto cursor-pointer relative z-70 ${
                hasPrevSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Desktop Previous button clicked", {
                  hasPrevSection,
                  currentSection,
                });
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
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Desktop Next button clicked", {
                  hasNextSection,
                  currentSection,
                });
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
      className="bg-white/90 text-black px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base min-h-[44px] min-w-[44px] flex items-center justify-center"
      onClick={() => setStaticView(!staticView)}
      title="Bật/Tắt chế độ 2D (Pause hiệu ứng)"
    >
      {staticView ? "Chế độ 3D" : "Di chuyển/Đứng im"}
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
            // Delay để đảm bảo video load xong
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] flex items-center justify-items-center">
          <div className="text-white text-lg">Đang tải video...</div>
          <div className="text-red-800 text-lg">
            Bạn có thể về lại Lăng Bác rồi qua map khác để tải video
          </div>
        </div>
      )}

      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
        <a className="pointer-events-auto mt-10 ml-10" href="">
          {/* <img
            className="w-20 max-w-full"
            src="/images/wawasensei-white.png"
            alt="WAWA SENSEI"
          /> */}
        </a>
        {/* Switch background options - dropdown top-center */}
        <div className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 z-30">
          <select
            className="bg-black/40 text-white px-3 py-2 rounded-lg border border-white/30 backdrop-blur-sm text-sm md:text-base"
            value={bgKey}
            onChange={(e) => {
              const value = e.target.value;
              setBgKey(value);
              const map = {
                1: "/textures/background.jpg",
                2: "/textures/backgroundVD1.mp4",
                3: "/textures/BackgroundVD2.mp4",
              };

              // Check if it's a video file
              if (map[value].endsWith(".mp4")) {
                // Set video background with loading state
                console.log("Setting video:", map[value]);
                setVideoLoading(true);
                setCurrentVideo(map[value]);
                document.documentElement.style.setProperty(
                  "--app-bg-image",
                  "none"
                );
              } else {
                // Set image background
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
            <option value="1">Lăng Bác</option>
            {/* <option value="2">Vịnh Hạ Long</option> */}
            <option value="3">Sài Gòn</option>
          </select>
        </div>
        <div className="pointer-events-auto fixed top-6 right-6 z-30">
          <StaticToggleButton />
        </div>
        <div className="w-full overflow-x-auto pointer-events-auto flex justify-center relative z-60 bg-gradient-to-t from-black/60 to-transparent">
          <div className="overflow-x-auto flex items-center gap-2 md:gap-4 max-w-full p-2 md:p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => handlePageClick(index)}
              >
                {index === 0 ? "Mặt trước" : `Trang ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => handlePageClick(pages.length)}
            >
              Mặt sau
            </button>
          </div>
        </div>
      </main>

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Nút đóng sách */}
      {bookOpen && (
        <button
          className="fixed top-4 right-4 z-30 bg-white/90 text-black px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setBookOpen(false)}
        >
          ✕ Đóng
        </button>
      )}

      {/* Nút AI Chat - Luôn hiển thị */}
      <button
        className="fixed bottom-4 right-4 z-30 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg min-h-[56px] min-w-[56px] flex items-center justify-center"
        onClick={() => setAiChatOpen(true)}
        title="Trợ lý AI - Hỏi về tư tưởng Hồ Chí Minh"
      >
        🤖
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
