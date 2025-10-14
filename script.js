// script.js (修正版：正確觸發 CSV 下載)

document.addEventListener('DOMContentLoaded', function() {

    const audioFiles = [
        //"audio/1.wav",
        //"audio/2.wav",
        //"audio/3.wav",
        //"audio/4.wav",
        "audio/5.wav"
    ];
    let allRatings = [];
    let currentAudioIndex = 0;

    const mainTitle = document.querySelector('h1');
    const audioPlayer = document.getElementById('audio-player');
    const ratingForm = document.getElementById('rating-form');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const summaryContent = document.getElementById('summary-content');
    const confirmSubmitBtn = document.getElementById('confirm-submit-btn');
    const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
    const allSliders = document.querySelectorAll('input[type="range"]');
    const progressIndicator = document.getElementById('progress-indicator');
    const currentFileNumberSpan = document.getElementById('current-file-number');
    const totalFileNumberSpan = document.getElementById('total-file-number');
    const nextSongBtn = document.getElementById('next-song-btn');
    const finalSubmitBtn = document.getElementById('final-submit-btn');
    const instructions = document.getElementById('instructions');

    function loadAudio(index) {
        if (index >= audioFiles.length) return;
        if (mainTitle) mainTitle.style.display = 'block';
        if (progressIndicator) progressIndicator.style.display = 'inline-block';
        if (instructions) instructions.style.display = 'block';
        const fileName = audioFiles[index];
        audioPlayer.src = fileName;
        audioPlayer.load();
        
        playPauseBtn.style.display = 'inline-block';
        playPauseBtn.disabled = false;
        playPauseBtn.textContent = `播放音樂：第 ${index + 1} 首`;
        
        nextSongBtn.disabled = true;

        allSliders.forEach(slider => {
            slider.value = 5;
            const valueSpan = document.getElementById(slider.id.replace('-slider', '-value'));
            if (valueSpan) {
                valueSpan.textContent = 5;
            }
        });
        currentFileNumberSpan.textContent = index + 1;
        totalFileNumberSpan.textContent = audioFiles.length;
    }

    function saveCurrentRating() {
        const currentRating = { audioFile: audioFiles[currentAudioIndex] };
        allSliders.forEach(slider => { currentRating[slider.name] = slider.value; });
        allRatings.push(currentRating);
        console.log("目前的評分已儲存:", allRatings);
    }

    function generateAndDownloadCSV() {
        if (allRatings.length === 0) {
            alert("沒有任何評分資料可供下載。");
            return;
        }

        const headers = ['audioFile'];
        allSliders.forEach(slider => {
            headers.push(slider.name);
        });
        
        let csvContent = headers.join(',') + '\n';

        allRatings.forEach(rating => {
            const row = headers.map(header => rating[header]);
            csvContent += row.join(',') + '\n';
        });

        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); 
        const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "rating_results.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // *** 不再需要的函式，已刪除 ***
    // function submitAllRatings() { ... }

    playPauseBtn.addEventListener('click', () => audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause());

    audioPlayer.addEventListener('play', () => {
        playPauseBtn.disabled = true;
        playPauseBtn.textContent = '播放中...';
    });

    audioPlayer.addEventListener('ended', () => {
        playPauseBtn.textContent = `已播放完畢：第 ${currentAudioIndex + 1} 首`;
        nextSongBtn.disabled = false;
    });

    allSliders.forEach(slider => {
        const valueSpan = document.getElementById(slider.id.replace('-slider', '-value'));
        if (valueSpan) {
            slider.addEventListener('input', () => valueSpan.textContent = slider.value);
        }
    });

    ratingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let tableHeaderHTML = '';
        let tableBodyHTML = '';
        allSliders.forEach(slider => {
            const label = document.querySelector(`label[for="${slider.id}"]`);
            if (label) {
                const labelText = label.textContent.split(' ')[0];
                tableHeaderHTML += `<th>${labelText}</th>`;
                tableBodyHTML += `<td>${slider.value}</td>`;
            }
        });
        const summaryHTML = `<div id="summary-title">${audioFiles[currentAudioIndex]}</div><table id="summary-table"><thead><tr>${tableHeaderHTML}</tr></thead><tbody><tr>${tableBodyHTML}</tr></tbody></table>`;
        summaryContent.innerHTML = summaryHTML;
        modalOverlay.classList.add('visible');
    });

    cancelSubmitBtn.addEventListener('click', () => modalOverlay.classList.remove('visible'));

    confirmSubmitBtn.addEventListener('click', function() {
        saveCurrentRating();
        currentAudioIndex++;
        modalOverlay.classList.remove('visible');

        if (currentAudioIndex < audioFiles.length) {
            loadAudio(currentAudioIndex);
        } else {
            if (mainTitle) mainTitle.style.display = 'none';
            if (progressIndicator) progressIndicator.style.display = 'none';
            if (instructions) instructions.style.display = 'none';
            const fieldset = ratingForm.querySelector('fieldset');
            if (fieldset) fieldset.style.display = 'none';
            
            let thankYouMessage = document.getElementById('thank-you-message');
            if (!thankYouMessage) {
                thankYouMessage = document.createElement('div');
                thankYouMessage.id = 'thank-you-message';
                thankYouMessage.innerHTML = "<h2>感謝您的評分！</h2><p>所有音檔皆已評分完畢，請點擊下方按鈕來下載您的評分結果。</p><p>請將這份下載下來的excel(csv)檔案繳回給感知訊號處理實驗室</p>";
                ratingForm.prepend(thankYouMessage);
            }
            
            nextSongBtn.style.display = 'none';
            finalSubmitBtn.style.display = 'block';
        }
    });
    
    // *** 核心修正點 ***
    // 將按鈕的點擊事件，指向正確的 CSV 下載函式
    finalSubmitBtn.addEventListener('click', generateAndDownloadCSV);

    loadAudio(currentAudioIndex);
});