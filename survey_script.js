// survey-script.js (隨機播放 + 斷點續傳版)

document.addEventListener('DOMContentLoaded', function () {
    /*const originalAudioFiles = [
        "audio/1.wav",
        "audio/2.wav",
        "audio/3.wav",
        "audio/4.wav",
        "audio/5.wav",
    ]*/
    // ===== 原始音檔清單 (這裡放您的所有檔案，順序不重要) =====
    const originalAudioFiles = [
        "audio/DH/DH_但愿人长久.wav", 
        "audio/DH/DH_如果没有你.wav",
        "audio/DH/DH_我只在乎你.wav",
        "audio/DH/DH_月亮代表我的心.wav",
        "audio/DH/DH_至少还有你.wav",
        "audio/DH/DH_甜蜜蜜.wav",
        "audio/DL/DL_但愿人长久.wav", 
        "audio/DL/DL_如果没有你.wav",
        "audio/DL/DL_我只在乎你.wav",
        "audio/DL/DL_月亮代表我的心.wav",
        "audio/DL/DL_至少还有你.wav",
        "audio/DL/DL_甜蜜蜜.wav",
        "audio/DZW/DZW_但愿人长久.wav", 
        "audio/DZW/DZW_如果没有你.wav",
        "audio/DZW/DZW_我只在乎你.wav",
        "audio/DZW/DZW_月亮代表我的心.wav",
        "audio/DZW/DZW_至少还有你.wav",
        "audio/DZW/DZW_甜蜜蜜.wav",
        "audio/GY/GY_但愿人长久.wav", 
        "audio/GY/GY_如果没有你.wav",
        "audio/GY/GY_我只在乎你.wav",
        "audio/GY/GY_月亮代表我的心.wav",
        "audio/GY/GY_至少还有你.wav",
        "audio/GY/GY_甜蜜蜜.wav",
        "audio/HY/HY_但愿人长久.wav", 
        "audio/HY/HY_如果没有你.wav",
        "audio/HY/HY_我只在乎你.wav",
        "audio/HY/HY_月亮代表我的心.wav",
        "audio/HY/HY_至少还有你.wav",
        "audio/HY/HY_甜蜜蜜.wav",
        "audio/HYW/HYW_但愿人长久.wav", 
        "audio/HYW/HYW_如果没有你.wav",
        "audio/HYW/HYW_我只在乎你.wav",
        "audio/HYW/HYW_月亮代表我的心.wav",
        "audio/HYW/HYW_至少还有你.wav",
        "audio/HYW/HYW_甜蜜蜜.wav",
        "audio/KYX/KYX_但愿人长久.wav", 
        "audio/KYX/KYX_如果没有你.wav",
        "audio/KYX/KYX_我只在乎你.wav",
        "audio/KYX/KYX_月亮代表我的心.wav",
        "audio/KYX/KYX_至少还有你.wav",
        "audio/KYX/KYX_甜蜜蜜.wav",
        "audio/LJQ/LJQ_但愿人长久.wav", 
        "audio/LJQ/LJQ_如果没有你.wav",
        "audio/LJQ/LJQ_我只在乎你.wav",
        "audio/LJQ/LJQ_月亮代表我的心.wav",
        "audio/LJQ/LJQ_至少还有你.wav",
        "audio/LJQ/LJQ_甜蜜蜜.wav",
        "audio/LX/LX_但愿人长久.wav", 
        "audio/LX/LX_如果没有你.wav",
        "audio/LX/LX_我只在乎你.wav",
        "audio/LX/LX_月亮代表我的心.wav",
        "audio/LX/LX_至少还有你.wav",
        "audio/LX/LX_甜蜜蜜.wav",
        "audio/LYH/LYH_但愿人长久.wav", 
        "audio/LYH/LYH_如果没有你.wav",
        "audio/LYH/LYH_我只在乎你.wav",
        "audio/LYH/LYH_月亮代表我的心.wav",
        "audio/LYH/LYH_至少还有你.wav",
        "audio/LYH/LYH_甜蜜蜜.wav",
        "audio/LYR/LYR_但愿人长久.wav", 
        "audio/LYR/LYR_如果没有你.wav",
        "audio/LYR/LYR_我只在乎你.wav",
        "audio/LYR/LYR_月亮代表我的心.wav",
        "audio/LYR/LYR_至少还有你.wav",
        "audio/LYR/LYR_甜蜜蜜.wav",
        "audio/LZQ/LZQ_但愿人长久.wav", 
        "audio/LZQ/LZQ_如果没有你.wav",
        "audio/LZQ/LZQ_我只在乎你.wav",
        "audio/LZQ/LZQ_月亮代表我的心.wav",
        "audio/LZQ/LZQ_至少还有你.wav",
        "audio/LZQ/LZQ_甜蜜蜜.wav",
        "audio/OYYX/OYYX_但愿人长久.wav", 
        "audio/OYYX/OYYX_如果没有你.wav",
        "audio/OYYX/OYYX_我只在乎你.wav",
        "audio/OYYX/OYYX_月亮代表我的心.wav",
        "audio/OYYX/OYYX_至少还有你.wav",
        "audio/OYYX/OYYX_甜蜜蜜.wav",
        "audio/SCX/SCX_但愿人长久.wav", 
        "audio/SCX/SCX_如果没有你.wav",
        "audio/SCX/SCX_我只在乎你.wav",
        "audio/SCX/SCX_月亮代表我的心.wav",
        "audio/SCX/SCX_至少还有你.wav",
        "audio/SCX/SCX_甜蜜蜜.wav",
        "audio/TGL/TGL_但愿人长久.wav", 
        "audio/TGL/TGL_如果没有你.wav",
        "audio/TGL/TGL_我只在乎你.wav",
        "audio/TGL/TGL_月亮代表我的心.wav",
        "audio/TGL/TGL_至少还有你.wav",
        "audio/TGL/TGL_甜蜜蜜.wav",
        "audio/WHL/WHL_但愿人长久.wav", 
        "audio/WHL/WHL_如果没有你.wav",
        "audio/WHL/WHL_我只在乎你.wav",
        "audio/WHL/WHL_月亮代表我的心.wav",
        "audio/WHL/WHL_至少还有你.wav",
        "audio/WHL/WHL_甜蜜蜜.wav",
        "audio/WYW/WYW_但愿人长久.wav", 
        "audio/WYW/WYW_如果没有你.wav",
        "audio/WYW/WYW_我只在乎你.wav",
        "audio/WYW/WYW_月亮代表我的心.wav",
        "audio/WYW/WYW_至少还有你.wav",
        "audio/WYW/WYW_甜蜜蜜.wav",
        "audio/WZB/WZB_但愿人长久.wav", 
        "audio/WZB/WZB_如果没有你.wav",
        "audio/WZB/WZB_我只在乎你.wav",
        "audio/WZB/WZB_月亮代表我的心.wav",
        "audio/WZB/WZB_至少还有你.wav",
        "audio/WZB/WZB_甜蜜蜜.wav",
        "audio/YFC/YFC_但愿人长久.wav", 
        "audio/YFC/YFC_如果没有你.wav",
        "audio/YFC/YFC_我只在乎你.wav",
        "audio/YFC/YFC_月亮代表我的心.wav",
        "audio/YFC/YFC_至少还有你.wav",
        "audio/YFC/YFC_甜蜜蜜.wav",
        "audio/YHA/YHA_但愿人长久.wav", 
        "audio/YHA/YHA_如果没有你.wav",
        "audio/YHA/YHA_我只在乎你.wav",
        "audio/YHA/YHA_月亮代表我的心.wav",
        "audio/YHA/YHA_至少还有你.wav",
        "audio/YHA/YHA_甜蜜蜜.wav",
        "audio/YHD/YHD_但愿人长久.wav", 
        "audio/YHD/YHD_如果没有你.wav",
        "audio/YHD/YHD_我只在乎你.wav",
        "audio/YHD/YHD_月亮代表我的心.wav",
        "audio/YHD/YHD_至少还有你.wav",
        "audio/YHD/YHD_甜蜜蜜.wav",
        "audio/YYH/YYH_但愿人长久.wav", 
        "audio/YYH/YYH_如果没有你.wav",
        "audio/YYH/YYH_我只在乎你.wav",
        "audio/YYH/YYH_月亮代表我的心.wav",
        "audio/YYH/YYH_至少还有你.wav",
        "audio/YYH/YYH_甜蜜蜜.wav" 
    ];

    // *** 核心修改：處理隨機播放列表 ***
    // 1. 嘗試從 localStorage 讀取「已經隨機好的播放列表」
    const savedPlaylistJSON = localStorage.getItem('experimentPlaylist');
    let audioFiles;

    if (savedPlaylistJSON) {
        // 如果有存檔，直接用之前存好的順序
        audioFiles = JSON.parse(savedPlaylistJSON);
        console.log("讀取到已存在的隨機播放列表");
    } else {
        // 如果沒有存檔（第一次進入），則進行隨機打亂，並存起來
        audioFiles = [...originalAudioFiles]; // 複製一份
        shuffleArray(audioFiles); // 打亂
        localStorage.setItem('experimentPlaylist', JSON.stringify(audioFiles)); // 存檔
        console.log("已生成新的隨機播放列表並存檔");
    }

    // *** 讀取評分進度 ***
    const savedRatingsJSON = localStorage.getItem('allRatingsData');
    let allRatings = savedRatingsJSON ? JSON.parse(savedRatingsJSON) : [];
    
    // 設定目前的進度索引
    let currentAudioIndex = allRatings.length;

    // 檢查是否完成
    if (currentAudioIndex >= audioFiles.length && audioFiles.length > 0) {
        alert("檢測到您已完成所有評分，將跳轉至調查頁面。");
        window.location.href = 'demographics.html';
        return;
    }

    // ... (sliderData, DOM 元素宣告維持不變) ...
    const sliderData = [
        { name: 'slim', label: '纖細' }, { name: 'bright', label: '明亮' }, { name: 'dark', label: '黯淡' },
        { name: 'sharp', label: '尖銳' }, { name: 'thick', label: '渾厚' }, { name: 'thin', label: '單薄' },
        { name: 'rich', label: '厚實' }, { name: 'crisp', label: '清脆' }, { name: 'shriveled', label: '乾癟' },
        { name: 'round', label: '豐滿' }, { name: 'rough', label: '粗糙' }, { name: 'pure', label: '純淨' },
        { name: 'hoarse', label: '嘶啞' }, { name: 'harmonize', label: '和諧' }, { name: 'soft', label: '柔和' },
        { name: 'muddy', label: '混濁' }, { name: 'low', label: '低沉' }, { name: 'magnetic', label: '磁性' }
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
    const instructions = document.getElementById('instructions');

    // 通用的洗牌函式 (Fisher-Yates Shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderSliders() {
        // ... (維持不變) ...
        shuffleArray(sliderData); // 注意：這裡也隨機化了滑桿順序
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
        
        const fileName = audioFiles[index]; // 這裡取到的是隨機後的檔案
        audioPlayer.src = fileName;
        audioPlayer.load(); 
        
        playPauseBtn.style.display = 'inline-block';
        playPauseBtn.disabled = false;
        playPauseBtn.textContent = `播放音樂：第 ${index + 1} 首`; // 顯示目前是第幾首
        
        replayBtn.style.display = 'none';
        nextSongBtn.disabled = true;
        
        currentFileNumberSpan.textContent = index + 1;
        totalFileNumberSpan.textContent = audioFiles.length;
    }

    function saveCurrentRating() {
        const currentRating = { audioFile: audioFiles[currentAudioIndex] };
        allSliders.forEach(slider => { currentRating[slider.name] = slider.value; });
        
        allRatings.push(currentRating);
        
        try {
            const ratingsJSON = JSON.stringify(allRatings);
            localStorage.setItem('allRatingsData', ratingsJSON);
            console.log(`第 ${currentAudioIndex + 1} 首已存檔。目前共 ${allRatings.length} 筆資料。`);
        } catch (e) {
            console.error("存檔失敗:", e);
            alert("瀏覽器存儲空間不足，請聯繫實驗人員。");
        }
    }

    // ... (事件監聽器維持不變) ...
    playPauseBtn.addEventListener('click', () => audioPlayer.play());
    replayBtn.addEventListener('click', () => { audioPlayer.currentTime = 0; audioPlayer.play(); });
    audioPlayer.addEventListener('play', () => { playPauseBtn.disabled = true; replayBtn.disabled = true; playPauseBtn.textContent = '播放中...'; });
    audioPlayer.addEventListener('ended', () => { playPauseBtn.style.display = 'none'; replayBtn.style.display = 'inline-block'; replayBtn.disabled = false; nextSongBtn.disabled = false; });

    ratingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let tableHeaderHTML = '';
        let tableBodyHTML = '';
        // 為了讓確認表格的順序固定，這裡可以用一個固定順序的列表來生成表格，或者就照著現在的順序
        // 為了簡單，這裡沿用目前頁面上滑桿的隨機順序
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
            window.scrollTo(0, 0);
        } else {
            // *** 全部完成後，清除隨機播放列表的記憶，以免下次實驗還是同一個順序（這行可加可不加，視需求而定） ***
            localStorage.removeItem('experimentPlaylist'); 
            window.location.href = 'demographics.html';
        }
    });

    loadAudio(currentAudioIndex);
});