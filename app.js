const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const textLabel = document.getElementById("text-label");
const fileInput = document.getElementById("file");
const eraseBtn = document.getElementById("eraser-btn");
const eraseWidth = document.getElementById("eraser-width");
const eraseWidthValue = document.getElementById("eraser-width-value");
const destroyBtn = document.getElementById("destroy-btn");
const drawBtn = document.getElementById("draw-btn");
const fillBtn = document.getElementById("fill-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const lineWidthValue = document.getElementById("line-width-value");
const color = document.getElementById("color");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = "800";
const CANVAS_HEIGHT = "800";
const HIDDEN_CLASSNAME = "hidden";

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
  if (isFilling) {
    lineWidth.value = 1;
  } else {
    const width = event.target.value;
    ctx.lineWidth = width;
    lineWidthValue.innerText = width;
  }
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

function onButton(event) {
  event.style.color = "white";
  event.style.textShadow = "1px 1px 5px gray";
}

function offButton() {
  drawBtn.style.color = "inherit";
  drawBtn.style.textShadow = "none";
  fillBtn.style.color = "inherit";
  fillBtn.style.textShadow = "none";
  destroyBtn.style.color = "inherit";
  destroyBtn.style.textShadow = "none";
  eraseBtn.style.color = "inherit";
  eraseBtn.style.textShadow = "none";
  saveBtn.style.color = "inherit";
  saveBtn.style.textShadow = "none";
  textLabel.style.color = "inherit";
  textLabel.style.textShadow = "none";
  textInput.classList.add(HIDDEN_CLASSNAME);
  lineWidth.classList.add(HIDDEN_CLASSNAME);
  lineWidthValue.classList.add(HIDDEN_CLASSNAME);
  eraseWidth.classList.add(HIDDEN_CLASSNAME);
  eraseWidthValue.classList.add(HIDDEN_CLASSNAME);
}

function onDrawClick() {
  isFilling = false;
  ctx.strokeStyle = color.value;
  ctx.lineWidth = lineWidth.value;
  offButton();
  onButton(drawBtn);
  lineWidth.classList.remove(HIDDEN_CLASSNAME);
  lineWidthValue.classList.remove(HIDDEN_CLASSNAME);
}

function onFillClick() {
  isFilling = true;
  offButton();
  onButton(fillBtn);
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
  offButton();
  onButton(destroyBtn);
  lineWidth.value = "1";
  ctx.lineCap = "round";
}

function onElaseClick() {
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = eraseWidth.value;
  isFilling = false;
  offButton();
  onButton(eraseBtn);
  eraseWidth.classList.remove(HIDDEN_CLASSNAME);
  eraseWidthValue.classList.remove(HIDDEN_CLASSNAME);
}

function onEraseWidthChange(event) {
  const eraseWidth = event.target.value;
  ctx.lineWidth = eraseWidth;
  eraseWidthValue.innerText = eraseWidth;
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
  offButton();
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px sans-serif";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(text, event.offsetX, event.offsetY);

    ctx.restore();
  }
}

function onTextClick() {
  isFilling = false;
  onButton(textLabel);
  offButton();
  textInput.classList.remove(HIDDEN_CLASSNAME);
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
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
eraseWidth.addEventListener("change", onEraseWidthChange)
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
textInput.addEventListener("click", onTextClick);
