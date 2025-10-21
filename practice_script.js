document.addEventListener('DOMContentLoaded', function () {
    const practiceItems = document.querySelectorAll('.practice-item');
    const startSurveyBtn = document.getElementById('start-survey-btn');
    let listenedCount = 0; // 用來計算已聽完的範例數量

    practiceItems.forEach((item, index) => {
        const audio = item.querySelector('audio');
        const playBtn = item.querySelector('.play-practice-btn');
        const answerDiv = item.querySelector('.practice-answer');
        const statusP = item.querySelector('.listen-status');
        const audioSrc = item.dataset.audioSrc;
        let hasListened = false; // 標記此範例是否已聽過

        // 載入音訊
        audio.src = audioSrc;

        playBtn.addEventListener('click', () => {
            // 如果正在播放，則暫停 (雖然這裡可能不太需要暫停功能)
            if (!audio.paused) {
                audio.pause();
                playBtn.textContent = `繼續播放範例 ${index + 1}`;
                playBtn.disabled = false; // 允許繼續播放
            } else {
                audio.play();
                playBtn.textContent = '播放中...';
                playBtn.disabled = true; // 播放時禁用按鈕
            }
        });

        audio.addEventListener('play', () => {
             // 確保播放時按鈕是禁用的
            playBtn.disabled = true;
            playBtn.textContent = '播放中...';
        });
        
        audio.addEventListener('pause', () => {
            // 如果不是因為播放結束而暫停，則恢復按鈕
             if (!audio.ended) {
                 playBtn.textContent = `繼續播放範例 ${index + 1}`;
                 playBtn.disabled = false;
             }
        });

        audio.addEventListener('ended', () => {
            playBtn.textContent = `重新播放範例 ${index + 1}`; // 結束後改為重播
            playBtn.disabled = false; // 允許重播
            answerDiv.style.display = 'block'; // 顯示答案

            // 更新狀態，只在第一次聽完時增加計數
            if (!hasListened) {
                hasListened = true;
                listenedCount++;
                statusP.textContent = '已聆聽完畢';
                statusP.classList.remove('not-listened');
                statusP.classList.add('listened');

                // 檢查是否所有範例都已聽完
                checkAllListened();
            }
        });

        // 初始化狀態文字
        statusP.classList.add('not-listened');

    });

    function checkAllListened() {
        if (listenedCount === practiceItems.length) {
            startSurveyBtn.classList.remove('disabled'); // 啟用按鈕
            startSurveyBtn.textContent = '開始正式實驗！'; // (可選) 更改按鈕文字
            console.log("所有範例已聽完，可以開始實驗。");
        } else {
             console.log(`已聽完 ${listenedCount} / ${practiceItems.length} 個範例。`);
        }
    }
});