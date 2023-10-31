//HTMLで、それぞれのidがもつ要素をElementオブジェクトとして変数に格納する
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
console.log(timer);

let elapsedTime = 0;

let state = `start`;
let intervalId;

function updateTimer(elapsedTime) {
  const ms = elapsedTime % 1000;
  const s = Math.floor(elapsedTime / 1000) % 60;
  const m = Math.floor(elapsedTime / (1000 * 60)) % 60;
  const h = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;

  const msStr = ms.toString().padStart(3, "0");
  const sStr = s.toString().padStart(2, "0");
  const mStr = m.toString().padStart(2, "0");
  const hStr = h.toString().padStart(2, "0");

  return `${hStr}:${mStr}:${sStr}.${msStr}`;
}
//startボタンを押した瞬間にfunction関数を呼び出して、
//1秒ごとにsetInterval関数を実行する。
start.addEventListener("mousedown", function () {
  if (state === `start`) {
    state = `stop`;
    start.classList.add(`startInactive`);
    stop.classList.remove(`stopInactive`);
    let startTime = Date.now(); //開始時間取得
    startTime -= elapsedTime;

    intervalId = setInterval(function () {
      const now = Date.now();
      elapsedTime = now - startTime;
      timer.textContent = updateTimer(elapsedTime);
      console.log(elapsedTime);
    }, 10);
  }
});

stop.addEventListener("mousedown", function () {
  if (state === `stop`) {
    state = `start`;
    start.classList.remove(`startInactive`);
    start.textContent = `リスタート`;
    stop.classList.add(`stopInactive`);
  }
  clearInterval(intervalId);
});

reset.addEventListener("mousedown", function () {
  state = `start`;
  clearInterval(intervalId);
  start.textContent = `スタート`;
  start.classList.remove(`startInactive`);
  stop.classList.remove(`stopInactive`);
  elapsedTime = 0;
  timer.textContent = `00:00:00.000`;
});
