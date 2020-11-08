/* 요소 갖고오기 */
const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

/* 설정 */
canvas.width = 700;     // 캔버스의 css속성과 같게 설정
canvas.height = 700;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";  // 선 색 (초반 검정색)
ctx.fillStyle = "#2c2c2c";  // 선 색 (초반 검정색)
ctx.lineWidth = 2.5;    // 선 굵기 (초반 2.5) 

let filling = false;    // 채우기 모드 on off
let painting = false;   // 마우스가 클릭되면 true가됨

/* 그리기 시작, 그리기 그만 */
function startPainting(){painting = true;}
function stopPainting(){painting = false;}

/* 마우스 이벤트 */
function onMouseMove(event)
{
  // 마우스의 위치를 실시간으로 가져옴
  const x = event.offsetX;
  const y = event.offsetY;

  // !painting = 그리기 모드
  if(!painting) {
    ctx.beginPath();  // 시작점부터 클릭한 곳까지 선을 만듬
    ctx.moveTo(x, y); // 시작점 (x, y)로 옮기기
  }
  else  // 그리기 멈춤
  {
    ctx.lineTo(x, y); // 현재 SubPath의 마지막 점을 특정 좌표와 직선으로 연결
    ctx.stroke();     // 그리기  
  }
}

/* 동작 */
// 1. 캔버스 이벤트
if (canvas) {
  // 마우스가 캔버스 안에서 움직일 때 이벤트
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스를 클릭 -> painting = true
  canvas.addEventListener("mousedown", startPainting);
  // 마우스를 클릭 -> painting = false
  canvas.addEventListener("mouseup", stopPainting);
  // 마우스가 캔버스를 벗어났을 때 -> painting = false
  canvas.addEventListener("mouseleave", stopPainting);
  // 캔버스를 클릭했을 때
  canvas.addEventListener("click", function(){
    if(filling)
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  })
  // 캔버스를 우클릭했을때 ContextMenu 안 뜨게 하기
  canvas.addEventListener("contextmenu", function(){
    console.log(event);
    event.preventDefault();
  });
}


// 2. 색 변경 이벤트
// Array.from : 오브젝트(colors)로 부터 Array를 만들고
Array.from(colors).forEach(color => 
  color.addEventListener("click", function(){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
  })
  // forEach로 color를 돌려 이벤트리스너 호출
);


// 3. 브러쉬 사이즈 변경 이벤트
if (range) {
  range.addEventListener("input", function() {
    ctx.lineWidth = event.target.value;
  });
}

// 4. 채우기 모드 변경 이벤트
if(mode){
  mode.addEventListener("click", function(){
    if(!filling){
      filling = true;
      mode.innerText = "Paint Mode";
    }
    else{
      filling = false;
      mode.innerText = "Fill Mode";
    }
  })
}

// 5. 이미지 저장 이벤트
if(save){
  save.addEventListener("click", function(){
    // canvas의 toDataURL로 확장자 jpeg형태의 파일의 url을 가져옴
    const img = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = img;    // <a>의 href속성을 img링크로 지정
    link.download = "PaintJS[EXPORT]";  // <a>의 download속성으로 다운받을 파일의 이름을 지정
    link.click();   // 링크 강제 클릭!
  });
}