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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 border border-purple-500/50 rounded-2xl shadow-2xl text-white w-full max-w-4xl p-6 sm:p-8 relative aspect-video flex flex-col sm:flex-row gap-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10">&times;</button>

        {/* Video Player */}
        <div className="w-full sm:w-2/3 aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-purple-500/30">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedPodcast.videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Playlist */}
        <div className="w-full sm:w-1/3 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Danh sách Podcast</h2>
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
                {podcasts.map((podcast) => (
                <button
                    key={podcast.videoId}
                    onClick={() => setSelectedPodcast(podcast)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 border-2 ${
                    selectedPodcast.videoId === podcast.videoId
                        ? 'bg-purple-500/40 border-purple-400'
                        : 'bg-black/30 border-purple-500/50 hover:bg-purple-500/20'
                    }`}
                >
                    <p className="font-semibold">{podcast.title}</p>
                </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;

