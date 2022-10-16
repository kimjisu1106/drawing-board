const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraseBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const drawBtn = document.getElementById("draw-btn");
const fillBtn = document.getElementById("fill-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = "800";
const CANVAS_HEIGHT = "800";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";
ctx.fillStyle = "white";
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
  isPainting = true;
}

function cancelPainting(event) {
  ctx.beginPath();
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  chageColor(event.target.value);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  chageColor(colorValue);
  color.value = colorValue;
}

function chageColor(color) {
  if (isFilling) {
    ctx.fillStyle = color;
  } else {
    ctx.strokeStyle = color;
  }
}

function onDrawClick() {
  isFilling = false;
  drawBtn.classList.add("on-btn");
  fillBtn.classList.remove("on-btn");
  eraseBtn.classList.remove("on-btn");
}

function onFillClick() {
  isFilling = true;
  drawBtn.classList.remove("on-btn");
  fillBtn.classList.add("on-btn");
  eraseBtn.classList.remove("on-btn");
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();
  }
}

function onDestoryClick() {
  canvas.width = CANVAS_WIDTH;
  ctx.fillStyle = "white";
  drawBtn.classList.add("on-btn");
  fillBtn.classList.remove("on-btn");
  eraseBtn.classList.remove("on-btn");
  lineWidth.value = "1";
  ctx.lineCap = "round";
}

function onElaseClick() {
  ctx.strokeStyle = ctx.fillStyle;
  isFilling = false;
  drawBtn.classList.remove("on-btn");
  fillBtn.classList.remove("on-btn");
  eraseBtn.classList.add("on-btn");
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
  fileInput.value = null;
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
drawBtn.addEventListener("click", onDrawClick);
fillBtn.addEventListener("click", onFillClick);
destroyBtn.addEventListener("click", onDestoryClick);
eraseBtn.addEventListener("click", onElaseClick);
fileInput.addEventListener("change", onFileChange);
