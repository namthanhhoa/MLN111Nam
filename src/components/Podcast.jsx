import React, { useState } from 'react';

const podcasts = [
  {
    title: "Podcast #1 - Phụ nữ sinh ra hay trở thành?",
    videoId: "V_iJHDd96EI",
  },
  {
    title: "Podcast #2 - Phụ nữ dưới bóng \"tha thể\"",
    videoId: "ZWreanBWyek",
  },
  {
    title: "Hành trình khẳng định bản thân",
    videoId: "BgCry3hGT9U",
  },
];

const Podcast = ({ onClose }) => {
  const [selectedPodcast, setSelectedPodcast] = useState(podcasts[0]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-1 sm:p-4">
      {/* iPhone optimized container */}
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl text-white w-full h-full sm:h-auto max-w-4xl sm:max-h-[90vh] p-2 sm:p-4 md:p-6 lg:p-8 relative flex flex-col overflow-hidden">

        {/* Close button - iPhone optimized */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:top-3 sm:right-3 lg:top-4 lg:right-4 text-white hover:text-red-400 text-xl sm:text-2xl lg:text-3xl z-10 bg-black/70 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center hover:bg-black/90 transition-all duration-200 border-2 border-white/20"
        >
          ✕
        </button>

        {/* Header - iPhone optimized */}
        <div className="mb-2 sm:mb-3 lg:mb-4 pr-12">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            🎙️ Podcast VỊ NỮ
          </h1>
        </div>

        {/* Content container - iPhone first layout */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">

          {/* Video Player - iPhone optimized */}
          <div className="w-full flex-shrink-0 mb-3 sm:mb-4">
            <div className="aspect-video bg-black rounded-md sm:rounded-lg overflow-hidden shadow-lg border border-purple-500/30">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedPodcast.videoId}?autoplay=0&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Current podcast title - always visible on mobile */}
            <div className="mt-2 sm:mt-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-300 leading-tight">
                🎵 {selectedPodcast.title}
              </h3>
            </div>
          </div>

          {/* Playlist - iPhone optimized with larger touch targets */}
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-purple-300 flex items-center gap-2">
              <span>📋</span>
              <span>Chọn tập khác ({podcasts.length} tập)</span>
            </h2>

            {/* Playlist container - iPhone optimized scrolling */}
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 sm:space-y-3 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
              {podcasts.map((podcast, index) => (
                <button
                  key={podcast.videoId}
                  onClick={() => setSelectedPodcast(podcast)}
                  className={`w-full text-left p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl transition-all duration-300 border-2 group touch-manipulation min-h-[80px] sm:min-h-[90px] ${
                    selectedPodcast.videoId === podcast.videoId
                      ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 border-purple-400 shadow-lg scale-[1.02]'
                      : 'bg-black/40 border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-400/70 active:scale-95'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Episode number - larger for iPhone */}
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold border-2 ${
                      selectedPodcast.videoId === podcast.videoId
                        ? 'bg-purple-400 text-white border-white/50 shadow-lg'
                        : 'bg-purple-500/30 text-purple-200 border-purple-400/50 group-hover:bg-purple-400 group-hover:text-white'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Podcast info - improved readability */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm sm:text-base lg:text-lg leading-tight mb-1 ${
                        selectedPodcast.videoId === podcast.videoId
                          ? 'text-white'
                          : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {podcast.title}
                      </p>

                      {/* Play indicator - more prominent */}
                      {selectedPodcast.videoId === podcast.videoId && (
                        <div className="flex items-center gap-2 text-sm sm:text-base text-purple-200 mt-1">
                          <span className="animate-pulse text-green-400">▶</span>
                          <span className="font-semibold">Đang phát</span>
                        </div>
                      )}

                      {/* Duration - visible on all sizes */}
                      <div className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center gap-1">
                        <span>⏱️</span>
                        <span>~ {Math.floor(Math.random() * 20 + 10)} phút</span>
                      </div>
                    </div>

                    {/* Status icon - visual indicator */}
                    <div className="flex-shrink-0">
                      {selectedPodcast.videoId === podcast.videoId ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-purple-500">
                          <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white">▶</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* iPhone bottom helper text */}
            <div className="mt-3 pt-3 border-t border-purple-500/30">
              <p className="text-xs sm:text-sm text-gray-400 text-center flex items-center justify-center gap-2">
                <span>👆</span>
                <span>Kéo xuống và chạm để chọn tập podcast</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
