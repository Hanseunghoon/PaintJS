const canvas = document.getElementById("jsCanvas");

// 마우스가 클릭되면 true가됨
let painting = true;

// 컨버스 안에 있는 움직이는 마우스의 좌표를 출력
function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;

  // console.log(x, y);
}

function onMouseDown(event){
  painting = true;
}

function onMouseUp(event){
  painting = false;
}

function onMouseLeave(event){
  painting = false;
}

if (canvas) {
  // 마우스가 캔버스 안에서 움직일 때 이벤트
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스를 클릭했을 때 (딸)
  canvas.addEventListener("mousedown", onMouseDown);
  // 마우스를 클릭했을 때 (깍)
  canvas.addEventListener("mouseup", onMouseUp)
  // 마우스가 캔버스를 벗어났을 때
  canvas.addEventListener("mouseleave", onMouseLeave)
}