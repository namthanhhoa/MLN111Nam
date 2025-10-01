import React, { useState } from 'react';

const podcasts = [
  {
    title: "Podcast #1 - Phụ nữ sinh ra hay trở thành?",
    videoId: "V_iJHDd96EI",
    duration: "07:21", // Thời gian thực tế của video
  },
  {
    title: "Podcast #2 - Phụ nữ dưới bóng \"tha thể\"",
    videoId: "ZWreanBWyek",
    duration: "07:11", // Thời gian thực tế của video
  },
  {
    title: "Hành trình khẳng định bản thân",
    videoId: "DOR6CDIFd7Q",
    duration: "32:15", // Thời gian thực tế của video
  },
];

const Podcast = ({ onClose }) => {
  const [selectedPodcast, setSelectedPodcast] = useState(podcasts[0]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-1 sm:p-4">
      {/* Container - Two column layout for desktop, single column for mobile */}
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl text-white w-full h-full sm:h-auto max-w-7xl sm:max-h-[90vh] p-2 sm:p-4 md:p-6 lg:p-8 relative flex flex-col overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:top-3 sm:right-3 lg:top-4 lg:right-4 text-white hover:text-red-400 text-xl sm:text-2xl lg:text-3xl z-10 bg-black/70 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center hover:bg-black/90 transition-all duration-200 border-2 border-white/20"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-2 sm:mb-3 lg:mb-4 pr-12">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            🎙️ Podcast VỊ NỮ
          </h1>
        </div>

        {/* Main content - Flex layout for desktop, column for mobile */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden min-h-0">

          {/* Video Player Section - Left side on desktop, top on mobile */}
          <div className="flex-1 lg:flex-[2] flex flex-col min-h-0">
            {/* Video Player */}
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
            </div>

            {/* Current podcast info - Below video */}
            <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/30">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-300 leading-tight mb-2">
                🎵 {selectedPodcast.title}
              </h3>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>Thời lượng: {selectedPodcast.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="animate-pulse text-green-400">▶</span>
                  <span className="text-green-400 font-semibold">Đang phát</span>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Section - Right side on desktop, bottom on mobile */}
          <div className="flex-1 lg:flex-[1] flex flex-col min-h-0 lg:max-w-md">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 text-purple-300 flex items-center gap-2">
              <span>📋</span>
              <span>Danh sách ({podcasts.length} tập)</span>
            </h2>

            {/* Playlist container with improved scrolling */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-500 space-y-2 sm:space-y-3 min-h-0 pr-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {podcasts.map((podcast, index) => (
                <button
                  key={podcast.videoId}
                  onClick={() => setSelectedPodcast(podcast)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 border-2 group touch-manipulation ${
                    selectedPodcast.videoId === podcast.videoId
                      ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 border-purple-400 shadow-lg scale-[1.02]'
                      : 'bg-black/40 border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-400/70 active:scale-95'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Episode number */}
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold border-2 ${
                      selectedPodcast.videoId === podcast.videoId
                        ? 'bg-purple-400 text-white border-white/50 shadow-lg'
                        : 'bg-purple-500/30 text-purple-200 border-purple-400/50 group-hover:bg-purple-400 group-hover:text-white'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Podcast info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-xs sm:text-sm lg:text-base leading-tight mb-1 ${
                        selectedPodcast.videoId === podcast.videoId
                          ? 'text-white'
                          : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {podcast.title}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Duration */}
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{podcast.duration}</span>
                        </div>

                        {/* Status */}
                        {selectedPodcast.videoId === podcast.videoId ? (
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <span className="animate-pulse">▶</span>
                            <span>Đang phát</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-purple-500">
                            <span className="text-gray-300 text-xs group-hover:text-white">▶</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Helper text */}
            <div className="mt-3 pt-3 border-t border-purple-500/30">
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                <span>👆</span>
                <span className="hidden sm:inline">Chọn tập để phát</span>
                <span className="sm:hidden">Chạm để chọn</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
