// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了第一个线索...");
        }, 1000);
      });
    }
  
    static crossJungle() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.3) reject("迷路了!");
          else {
            resolve("成功穿越丛林，找到了线索。");
          }
        }, 2000);
      });
    }

    static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!clue) {
            reject("没有线索可以解码!");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }
  
    static searchTemple(location) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            reject("糟糕!遇到了神庙守卫!");
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }
  
    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 1000);
      });
    }
  }

  function logMessage(m){
    const log = document.getElementById("log");
    const p = document.createElement("div");//创建一个新的 <div> 元素，用来显示一条日志
    p.className = "step"; //class
    p.textContent = m;
    log.appendChild(p); //把新元素加到log容器里
    log.scrollTop = log.scrollHeight; //自动滚动到底部

  
 const history = JSON.parse(localStorage.getItem('logHistory') || "[]");
  history.push(m);
  localStorage.setItem('logHistory', JSON.stringify(history));
}

async function startTreasureHunt() {
  document.getElementById("log").innerHTML = ""; // 清空日志
  try {
    const clue = await TreasureMap.getInitialClue();
    logMessage(clue);

    const jungle = await TreasureMap.crossJungle();
    logMessage(jungle);

    const location = await TreasureMap.decodeAncientScript(clue);
    logMessage(location);

    const box = await TreasureMap.searchTemple(location);
    logMessage(box);

    const treasure = await TreasureMap.openTreasureBox();
    logMessage(treasure);
  } catch (error) {
    logMessage("任务失败: " + error);
  }
}

// 恢复进度
window.addEventListener('DOMContentLoaded', () => {
  const savedLogs = JSON.parse(localStorage.getItem('logHistory') || "[]");
  if (savedLogs.length > 0) {
    savedLogs.forEach(logMessage);
  }

  // 自动恢复到上次场景
  const lastScene = localStorage.getItem('lastScene');
  if (lastScene && location.pathname.endsWith('index.html') === false) {
    console.log("恢复场景:", lastScene);
  }
});