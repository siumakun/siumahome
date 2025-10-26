const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const playPauseIcon = playPauseBtn.querySelector('i');
const seekBar = document.getElementById('seekBar');
const volume = document.getElementById('volume');
const currentTimeText = document.getElementById('currentTime');
const durationText = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreen');
const fullscreenIcon = fullscreenBtn.querySelector('i');
const controls = document.getElementById('controls');
const player = document.getElementById('player');
const muteBtn = document.getElementById('muteBtn');
const muteIcon = document.getElementById('muteIcon');

const videoSrc = "hls/video.m3u8";

// --- HLS 再生設定 ---
if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
}

// --- 再生・停止 ---
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener('play', () => {
  playPauseIcon.classList.remove('fa-play');
  playPauseIcon.classList.add('fa-pause');
});

video.addEventListener('pause', () => {
  playPauseIcon.classList.remove('fa-pause');
  playPauseIcon.classList.add('fa-play');
});

// --- シークバー ---
video.addEventListener('loadedmetadata', () => {
  durationText.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
  seekBar.value = (100 * video.currentTime / video.duration);
  currentTimeText.textContent = formatTime(video.currentTime);
});

seekBar.addEventListener('input', () => {
  video.currentTime = video.duration * (seekBar.value / 100);
});

// --- 音量 ---
volume.addEventListener('input', () => {
  video.volume = volume.value;
});

// --- フルスクリーン ---
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    fullscreenIcon.classList.remove('fa-expand');
    fullscreenIcon.classList.add('fa-compress');
  } else {
    document.exitFullscreen();
    fullscreenIcon.classList.remove('fa-compress');
    fullscreenIcon.classList.add('fa-expand');
  }
});

// --- タップで再生/停止 ---
video.addEventListener('click', () => {
  if (video.paused) video.play();
  else video.pause();
});

// --- ダブルタップ & 長押し（スマホ） ---
let lastTap = 0;
let longPressTimer = null;

player.addEventListener('touchstart', e => {
  if (e.touches.length > 1) return;

  const x = e.touches[0].clientX;
  const center = player.offsetWidth / 2;
  const now = Date.now();

  if (now - lastTap < 300) {
    // ダブルタップ
    if (x < center) {
      video.currentTime = Math.max(0, video.currentTime - 5);
    } else {
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
    lastTap = 0;
  } else {
    lastTap = now;
    longPressTimer = setTimeout(() => video.playbackRate = 2.0, 500);
  }
});

player.addEventListener('touchend', () => {
  clearTimeout(longPressTimer);
  video.playbackRate = 1.0;
});

// --- 長押し（PC） ---
player.addEventListener('mousedown', e => {
  if (e.target.closest('.controls')) return;
  longPressTimer = setTimeout(() => video.playbackRate = 2.0, 500);
});

player.addEventListener('mouseup', () => {
  clearTimeout(longPressTimer);
  video.playbackRate = 1.0;
});

// --- フォーマット関数 ---
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
let lastVolume = volume.value; // ミュート解除時に戻す音量保存用

// 音量スライダー変更時
volume.addEventListener('input', () => {
  video.volume = volume.value;
  if (video.volume === 0) {
    muteIcon.classList.remove('fa-volume-high');
    muteIcon.classList.add('fa-volume-xmark');
  } else {
    muteIcon.classList.remove('fa-volume-xmark');
    muteIcon.classList.add('fa-volume-high');
    lastVolume = volume.value;
  }
});

// ミュートボタン押下時
muteBtn.addEventListener('click', () => {
  if (video.volume > 0) {
    // ミュートにする
    lastVolume = video.volume;
    video.volume = 0;
    volume.value = 0;
    muteIcon.classList.remove('fa-volume-high');
    muteIcon.classList.add('fa-volume-xmark');
  } else {
    // ミュート解除
    video.volume = lastVolume || 1;
    volume.value = video.volume;
    muteIcon.classList.remove('fa-volume-xmark');
    muteIcon.classList.add('fa-volume-high');
  }
});
video.addEventListener('timeupdate', () => {
  const progress = (100 * video.currentTime / video.duration);
  seekBar.value = progress;
  currentTimeText.textContent = formatTime(video.currentTime);

  // 再生済み：オレンジ (#ff9900)、未再生：グレー (#444)
  seekBar.style.background = `linear-gradient(to right, #ff9900 ${progress}%, #444 ${progress}%)`;
});
video.addEventListener('progress', () => {
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const duration = video.duration;
    const percent = 100 * bufferedEnd / duration;
    const played = 100 * video.currentTime / duration;

    // 再生済み：オレンジ (#f38020)、バッファ済み：灰 (#999)、未読：黒 (#222)
    seekBar.style.background = `linear-gradient(to right,
      #f38020 0%, 
      #f38020 ${played}%,
      #999 ${played}%,
      #999 ${percent}%,
      #222 ${percent}%)`;
  }
});
const loadingOverlay = document.getElementById('loadingOverlay');

// 表示
video.addEventListener('waiting', () => {
  loadingOverlay.style.display = 'flex';
});

// 非表示（再生開始時）
video.addEventListener('playing', () => {
  loadingOverlay.style.display = 'none';
});

// 初期ロード時にも表示
video.addEventListener('loadstart', () => {
  loadingOverlay.style.display = 'flex';
});
const startOverlay = document.getElementById('startOverlay');
const startButton = document.getElementById('startButton');

// 初回再生ボタン処理
startButton.addEventListener('click', () => {
  video.play().then(() => {
    startOverlay.style.display = 'none';
  }).catch(err => {
    console.warn('Autoplay blocked or failed:', err);
  });
});

// 自動再生試行 → 失敗時にオーバーレイ表示
function tryAutoplay() {
  video.play().then(() => {
    startOverlay.style.display = 'none';
  }).catch(() => {
    startOverlay.style.display = 'flex';
  });
}

// ページ読み込み時に試す
document.addEventListener('DOMContentLoaded', () => {
  tryAutoplay();
});
