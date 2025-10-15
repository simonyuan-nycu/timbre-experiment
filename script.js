document.addEventListener('DOMContentLoaded', function () {

    const audioFiles =
        [   //"audio/1.wav", 
            //"audio/2.wav", 
            "audio/3.wav",
            "audio/4.wav",
            "audio/5.wav"];
    let allRatings = [];
    let currentAudioIndex = 0;

    const sliderData = [
        { id: 'slim-slider', name: 'slim', label: '纖細 (Slim):' },
        { id: 'bright-slider', name: 'bright', label: '明亮 (Bright):' },
        { id: 'dark-slider', name: 'dark', label: '黯淡 (Dark):' },
        { id: 'sharp-slider', name: 'sharp', label: '尖銳 (Sharp):' },
        { id: 'thick-slider', name: 'thick', label: '渾厚 (Thick):' },
        { id: 'thin-slider', name: 'thin', label: '單薄 (Thin):' },
        { id: 'rich-slider', name: 'rich', label: '厚實 (Rich):' },
        { id: 'crisp-slider', name: 'crisp', label: '清脆 (Crisp):' },
        { id: 'shriveled-slider', name: 'shriveled', label: '乾癟 (Shriveled):' },
        { id: 'round-slider', name: 'round', label: '豐滿 (Round):' },
        { id: 'rough-slider', name: 'rough', label: '粗糙 (Rough):' },
        { id: 'pure-slider', name: 'pure', label: '純淨 (Pure):' },
        { id: 'hoarse-slider', name: 'hoarse', label: '嘶啞 (Hoarse):' },
        { id: 'harmonize-slider', name: 'harmonize', label: '和諧 (Harmonize):' },
        { id: 'soft-slider', name: 'soft', label: '柔和 (Soft):' },
        { id: 'muddy-slider', name: 'muddy', label: '混濁 (Muddy):' }
    ];

    const sliderFieldset = document.getElementById('slider-fieldset');
    let allSliders;
    const mainTitle = document.querySelector('h1');
    const audioPlayer = document.getElementById('audio-player');
    const ratingForm = document.getElementById('rating-form');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const replayBtn = document.getElementById('replay-btn');
    const playerControls = document.querySelector('.player-controls');
    const modalOverlay = document.getElementById('modal-overlay');
    const summaryContent = document.getElementById('summary-content');
    const confirmSubmitBtn = document.getElementById('confirm-submit-btn');
    const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
    const progressIndicator = document.getElementById('progress-indicator');
    const currentFileNumberSpan = document.getElementById('current-file-number');
    const totalFileNumberSpan = document.getElementById('total-file-number');
    const nextSongBtn = document.getElementById('next-song-btn');
    const finalSubmitBtn = document.getElementById('final-submit-btn');
    const instructions = document.getElementById('instructions');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderSliders() {
        shuffleArray(sliderData);
        let slidersHTML = `<legend>在聽完音樂後，請根據您的感受在不同屬性給出您的評分：</legend>`;
        sliderData.forEach(data => {
            slidersHTML += `
                <div class="rating-options">
                    <label for="${data.id}">${data.label}</label>
                    <div class="slider-container">
                        <input type="range" id="${data.id}" name="${data.name}" min="1" max="10" value="5" step="1">
                        <span id="${data.id.replace('-slider', '-value')}" class="slider-value">5</span>
                    </div>
                </div>
            `;
        });
        sliderFieldset.innerHTML = slidersHTML;
        allSliders = document.querySelectorAll('input[type="range"]');
        allSliders.forEach(slider => {
            const valueSpan = document.getElementById(slider.id.replace('-slider', '-value'));
            if (valueSpan) {
                slider.addEventListener('input', () => valueSpan.textContent = slider.value);
            }
        });
    }

    function loadAudio(index) {
        if (index >= audioFiles.length) return;
        renderSliders();
        if (mainTitle) mainTitle.style.display = 'block';
        if (progressIndicator) progressIndicator.style.display = 'inline-block';
        if (instructions) instructions.style.display = 'block';
        if (playerControls) playerControls.style.display = 'flex';
        const fileName = audioFiles[index];
        audioPlayer.src = fileName;
        audioPlayer.load();
        playPauseBtn.style.display = 'inline-block';
        playPauseBtn.disabled = false;
        playPauseBtn.textContent = `播放音樂：第 ${index + 1} 首`;
        replayBtn.style.display = 'none';
        nextSongBtn.disabled = true;
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
        const headers = ['audioFile'].concat(sliderData.map(d => d.name));
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

    playPauseBtn.addEventListener('click', () => audioPlayer.play());

    replayBtn.addEventListener('click', () => {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });

    audioPlayer.addEventListener('play', () => {
        playPauseBtn.disabled = true;
        replayBtn.disabled = true;
        playPauseBtn.textContent = '播放中...';
    });

    audioPlayer.addEventListener('ended', () => {
        playPauseBtn.style.display = 'none';
        replayBtn.style.display = 'inline-block';
        replayBtn.disabled = false;
        nextSongBtn.disabled = false;
    });

    ratingForm.addEventListener('submit', function (event) {
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

    confirmSubmitBtn.addEventListener('click', function () {
        saveCurrentRating();
        currentAudioIndex++;
        modalOverlay.classList.remove('visible');
        if (currentAudioIndex < audioFiles.length) {
            loadAudio(currentAudioIndex);
        } else {
            if (mainTitle) mainTitle.style.display = 'none';
            if (progressIndicator) progressIndicator.style.display = 'none';
            if (instructions) instructions.style.display = 'none';
            if (playerControls) playerControls.style.display = 'none';
            const fieldset = ratingForm.querySelector('fieldset');
            if (fieldset) fieldset.style.display = 'none';
            let thankYouMessage = document.getElementById('thank-you-message');
            if (!thankYouMessage) {
                thankYouMessage = document.createElement('div');
                thankYouMessage.id = 'thank-you-message';
                thankYouMessage.innerHTML = "<h2>感謝您的評分！</h2><p>所有音檔皆已評分完畢，請點擊下方按鈕來下載您的評分結果。</p><p>請將這份下載下來的excel(csv)檔案繳回給感知認知處理實驗室</p>";
                ratingForm.prepend(thankYouMessage);
            }
            nextSongBtn.style.display = 'none';
            finalSubmitBtn.style.display = 'block';
        }
    });

    finalSubmitBtn.addEventListener('click', generateAndDownloadCSV);

    loadAudio(currentAudioIndex);
});
