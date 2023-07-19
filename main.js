//$in@
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const brushWidth= document.getElementById('brush-width');
const brushColor= document.getElementById('palette');
const brush= document.querySelector('div.brush');
const eraser= document.querySelector('div.eraser');
const btn= document.querySelectorAll('button');
let isDrawing= false, myBrushWidth= 5, myBrushColor= '';

window.addEventListener('load', ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0, canvas.width, canvas.height);
})
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
btn[0].addEventListener('click', save);
btn[1].addEventListener('click', clear);

brushWidth.addEventListener("change", ()=>{
    myBrushWidth = brushWidth.value;
})
brushColor.addEventListener("change", ()=>{
    myBrushColor = brushColor.value;
})
eraser.addEventListener('click', ()=>{
    eraser.classList.add('active');
    brush.classList.remove('active');
    myBrushColor = '#fff'
})
brush.addEventListener('click', ()=>{
    brush.classList.add('active');
    eraser.classList.remove('active');
    myBrushColor = brushColor.value;
})
function drawing(e) {
    if(!isDrawing){
        return;
    }
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.strokeStyle = `${myBrushColor}`;
}
function startDrawing() {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = myBrushWidth;
}
function stopDrawing() {
    isDrawing = false;
}
function save() {
    let link = document.createElement('a');
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
}
function clear() {
    ctx.fillRect(0,0, canvas.width, canvas.height);
}