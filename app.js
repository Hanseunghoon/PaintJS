const canvas = document.getElementById("jsCanvas");
// 캔버스 요소 안에 컨텍스트(2d)를 가져온다.
const ctx = canvas.getContext("2d");

// 캔버스의 css속성과 같게 설정
canvas.width = 700;
canvas.height = 700;

// 마우스가 클릭되면 true가됨
let painting = false;

// 색상이나 스타일을 라인에 사용할 수 있음(처음에는 검정색으로 지정)
ctx.strokeStyle = "#2c2c2c";
// 선 굵기 (초반 2.5) 
ctx.lineWidth = 2.5;

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function startPainting(){painting = true;}
function stopPainting(){painting = false;}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 컨버스 안에 있는 움직이는 마우스의 좌표를 출력
function onMouseMove(event){
  // event가 가진 화면 좌표를 저장
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting) {
    ctx.beginPath();  // 시작점부터 클릭한 곳까지 선을 만듬
    ctx.moveTo(x, y); // 시작점 (x, y)로 옮기기
  }
  else{
    ctx.lineTo(x, y); // 현재 SubPath의 마지막 점을 특정 좌표와 직선으로 연결
    ctx.stroke();     // 그리기  
  }
}

// 선의 시작점 
function onMouseDown(event){
  painting = true;
}

if (canvas) {
  // 마우스가 캔버스 안에서 움직일 때 이벤트
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스를 클릭했을 때 (딸)
  canvas.addEventListener("mousedown", startPainting);
  // 마우스를 클릭했을 때 (깍)
  canvas.addEventListener("mouseup", stopPainting)
  // 마우스가 캔버스를 벗어났을 때
  canvas.addEventListener("mouseleave", stopPainting)
}