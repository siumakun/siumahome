const windowElement = document.getElementById("myWindow");
const header = document.getElementById("myWindowHeader");
const openButton = document.getElementById("openButton");
const closeButton = document.querySelector(".close-button");

let offsetX = 0, offsetY = 0;
let isDragging = false;

// 開くボタン
openButton.addEventListener("click", () => {
  windowElement.style.display = "block";
});

// 閉じるボタン
closeButton.addEventListener("click", () => {
  windowElement.style.display = "none";
});

// マウス操作（PC）
header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - windowElement.offsetLeft;
  offsetY = e.clientY - windowElement.offsetTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    windowElement.style.left = (e.clientX - offsetX) + "px";
    windowElement.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});

// タッチ操作（スマホ・タブレット）
header.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - windowElement.offsetLeft;
  offsetY = touch.clientY - windowElement.offsetTop;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    windowElement.style.left = (touch.clientX - offsetX) + "px";
    windowElement.style.top = (touch.clientY - offsetY) + "px";
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
});
