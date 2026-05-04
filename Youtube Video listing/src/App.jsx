import { useState, useEffect } from "react";

const URL = "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript";

function formatViews(count) {
  if (!count) return "0 views";
  const n = parseInt(count);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M views";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K views";
  return n + " views";
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  if (diff < 2592000) return Math.floor(diff / 86400) + " days ago";
  if (diff < 31536000) return Math.floor(diff / 2592000) + " months ago";
  return Math.floor(diff / 31536000) + " years ago";
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-thumb" />
      <div className="skeleton-info">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-sub" />
        <div className="skeleton skeleton-sub short" />
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const snippet = video.items.snippet;
  const stats = video.items.statistics;
  const thumb = snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url;
  const videoId = video.items.id;

  return (
    <a
      className="video-card"
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="thumb-wrapper">
        <img src={thumb} alt={snippet.title} loading="lazy" />
        <div className="play-overlay">▶</div>
      </div>
      <div className="card-info">
        <div className="avatar">{snippet.channelTitle[0]}</div>
        <div className="meta">
          <p className="video-title">{snippet.title}</p>
          <p className="channel-name">{snippet.channelTitle}</p>
          <p className="stats">
            {formatViews(stats?.viewCount)} &bull; {timeAgo(snippet.publishedAt)}
          </p>
        </div>
      </div>
    </a>
  );
}

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((json) => {
        setVideos(json.data.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const filtered = videos.filter((v) =>
    v.items.snippet.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">▶</span>
            <span className="logo-text">VideoHub</span>
          </div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="main">
        {error && <p className="error">⚠ {error}</p>}

        <div className="grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
            ? filtered.map((v) => <VideoCard key={v.items.id} video={v} />)
            : <p className="no-results">No videos found for "{search}"</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
