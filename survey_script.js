document.addEventListener('DOMContentLoaded', function () {

    const audioFiles =
        [    //"audio/1.wav", 
            //"audio/2.wav", 
            //"audio/3.wav",
            //"audio/4.wav",
            "audio/5.wav"];
    let allRatings = [];
    let currentAudioIndex = 0;

    // Use the simpler, cleaner data structure
    const sliderData = [
        { name: 'slim', label: '纖細' }, { name: 'bright', label: '明亮' }, { name: 'dark', label: '黯淡' },
        { name: 'sharp', label: '尖銳' }, { name: 'thick', label: '渾厚' }, { name: 'thin', label: '單薄' },
        { name: 'rich', label: '厚實' }, { name: 'crisp', label: '清脆' }, { name: 'shriveled', label: '乾癟' },
        { name: 'round', label: '豐滿' }, { name: 'rough', label: '粗糙' }, { name: 'pure', label: '純淨' },
        { name: 'hoarse', label: '嘶啞' }, { name: 'harmonize', label: '和諧' }, { name: 'soft', label: '柔和' },
        { name: 'muddy', label: '混濁' }
    ];

    // --- Find ONLY the elements that exist on survey.html ---
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
            const sliderId = `${data.name}-slider`;
            const fullLabel = `${data.label} (${data.name.charAt(0).toUpperCase() + data.name.slice(1)}):`;
            slidersHTML += `
                <div class="rating-options">
                    <label for="${sliderId}">${fullLabel}</label>
                    <div class="slider-container">
                        <input type="range" id="${sliderId}" name="${data.name}" min="1" max="10" value="5" step="1">
                        <span id="${sliderId.replace('-slider', '-value')}" class="slider-value">5</span>
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

    playPauseBtn.addEventListener('click', () => audioPlayer.play());
    replayBtn.addEventListener('click', () => { audioPlayer.currentTime = 0; audioPlayer.play(); });
    audioPlayer.addEventListener('play', () => { playPauseBtn.disabled = true; replayBtn.disabled = true; playPauseBtn.textContent = '播放中...'; });
    audioPlayer.addEventListener('ended', () => { playPauseBtn.style.display = 'none'; replayBtn.style.display = 'inline-block'; replayBtn.disabled = false; nextSongBtn.disabled = false; });
    
    ratingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let tableHeaderHTML = '';
        let tableBodyHTML = '';
        // Use the original sliderData to maintain a consistent order in the modal
        sliderData.forEach(data => {
            const slider = document.getElementById(`${data.name}-slider`);
            if (slider) {
                tableHeaderHTML += `<th>${data.label}</th>`;
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
            // All songs are rated, save to localStorage and navigate
            try {
                const ratingsJSON = JSON.stringify(allRatings);
                localStorage.setItem('allRatingsData', ratingsJSON);
                window.location.href = 'demographics.html'; // Navigate to the next page
            } catch (e) {
                console.error("Error saving ratings to localStorage:", e);
                alert("無法儲存評分資料，請聯繫實驗人員。");
            }
        }
    });

    // --- Initialize the page ---
    loadAudio(currentAudioIndex);
});