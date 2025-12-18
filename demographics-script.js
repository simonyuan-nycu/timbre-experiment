// demographics-script.js (支援相近與相反矩陣版)

document.addEventListener('DOMContentLoaded', function () {
    const ratingsJSON = localStorage.getItem('allRatingsData');
    const allRatings = ratingsJSON ? JSON.parse(ratingsJSON) : [];

    // 在本地端測試時允許空資料
    if (allRatings.length === 0 && window.location.hostname !== "127.0.0.1" && window.location.protocol !== "file:") { 
        alert("找不到評分資料或評分資料為空，將返回首頁。");
        window.location.href = 'index.html';
        return;
    }
    
    let demographicsData = {};
    
    // 確保這裡與 survey-script.js 的 18 個描述詞一致
    const sliderData = [
        { name: 'slim', label: '纖細' }, { name: 'bright', label: '明亮' }, { name: 'dark', label: '黯淡' },
        { name: 'sharp', label: '尖銳' }, { name: 'thick', label: '渾厚' }, { name: 'thin', label: '單薄' },
        { name: 'rich', label: '厚實' }, { name: 'crisp', label: '清脆' }, { name: 'shriveled', label: '乾癟' },
        { name: 'round', label: '豐滿' }, { name: 'rough', label: '粗糙' }, { name: 'pure', label: '純淨' },
        { name: 'hoarse', label: '嘶啞' }, { name: 'harmonize', label: '和諧' }, { name: 'soft', label: '柔和' },
        { name: 'muddy', label: '混濁' }, { name: 'low', label: '低沉' }, { name: 'magnetic', label: '磁性' }
    ];

    const demographicsScreen = document.getElementById('demographics-screen');
    const submitDemographicsBtn = document.getElementById('submit-demographics-btn');
    const finalSubmitBtn = document.getElementById('final-submit-btn');
    const thankYouMessage = document.getElementById('thank-you-message');

    // *** 修改：將渲染矩陣的函式通用化，可以接受「容器ID」和「Checkbox名稱」 ***
    function renderMatrix(containerId, inputName) {
        const container = document.getElementById(containerId);
        if (!container) return; // 如果找不到容器就跳過

        let tableHTML = '<table class="similarity-matrix">';
        
        // 表頭
        tableHTML += '<thead><tr><th></th>';
        for (let i = 0; i < sliderData.length - 1; i++) {
            tableHTML += `<th class="matrix-col-header"><div>${sliderData[i].label}</div></th>`;
        }
        tableHTML += '</tr></thead>';
        
        // 表格內容
        tableHTML += '<tbody>';
        for (let i = 1; i < sliderData.length; i++) {
            const rowDescriptor = sliderData[i];
            tableHTML += `<tr><td class="matrix-row-header">${rowDescriptor.label}</td>`;
            for (let j = 0; j < i; j++) {
                const colDescriptor = sliderData[j];
                const pairValue = `${rowDescriptor.name}-${colDescriptor.name}`;
                // 注意：這裡使用傳入的 inputName
                tableHTML += `<td><input type="checkbox" name="${inputName}" value="${pairValue}"></td>`;
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
    }

    function generateAndDownloadCSV() {
        if (allRatings.length === 0) { alert("沒有任何評分資料可供下載。"); return; }
        
        // 依照音檔名稱排序
        allRatings.sort((a, b) => {
            return a.audioFile.localeCompare(b.audioFile, 'zh-Hant', { numeric: true });
        });

        const ratingHeaders = ['audioFile'].concat(sliderData.map(d => d.name));
        const demoHeaders = Object.keys(demographicsData);
        const headers = ratingHeaders.concat(demoHeaders);
        let csvContent = headers.join(',') + '\n';
        allRatings.forEach(rating => {
            let rowData = [];
            ratingHeaders.forEach(header => { rowData.push(rating[header] || ''); });
            demoHeaders.forEach(header => { rowData.push(demographicsData[header] || ''); });
            csvContent += rowData.join(',') + '\n';
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

    submitDemographicsBtn.addEventListener('click', function() {
        // 1. 困難描述詞
        const difficultCheckboxes = document.querySelectorAll('input[name="difficult_descriptors"]:checked');
        const difficultValues = Array.from(difficultCheckboxes).map(cb => cb.value);

        // 2. 推薦描述詞
        const recommendedCheckboxes = document.querySelectorAll('input[name="recommended_descriptors"]:checked');
        const recommendedValues = Array.from(recommendedCheckboxes).map(cb => cb.value);

        if (recommendedValues.length < 6 || recommendedValues.length > 8) {
            alert(`您在「推薦描述詞」選擇了 ${recommendedValues.length} 項。\n請依照題目要求，選擇 6 到 8 項描述詞。`);
            return; 
        }

        // 3. 相近矩陣 (similar_pairs)
        const similarPairCheckboxes = document.querySelectorAll('input[name="similar_pairs"]:checked');
        const similarPairValues = Array.from(similarPairCheckboxes).map(cb => cb.value);

        // 4. *** 新增：相反矩陣 (opposite_pairs) ***
        const oppositePairCheckboxes = document.querySelectorAll('input[name="opposite_pairs"]:checked');
        const oppositePairValues = Array.from(oppositePairCheckboxes).map(cb => cb.value);

        demographicsData = {
            difficult_descriptors: difficultValues.join('; '),
            recommended_descriptors: recommendedValues.join('; '),
            similar_pairs: similarPairValues.join('; '),
            opposite_pairs: oppositePairValues.join('; ') // 將新資料加入物件
        };

        if (demographicsScreen) demographicsScreen.style.display = 'none';
        submitDemographicsBtn.style.display = 'none';
        
        if (thankYouMessage) thankYouMessage.style.display = 'block';
        if (finalSubmitBtn) finalSubmitBtn.style.display = 'block';
    });

    finalSubmitBtn.addEventListener('click', function() {
        generateAndDownloadCSV();
        localStorage.removeItem('allRatingsData');
        localStorage.removeItem('experimentPlaylist'); // 建議也清除播放清單順序
    });

    // *** 這裡呼叫兩次函式，分別渲染兩個矩陣 ***
    // 參數1: HTML容器的 ID
    // 參數2: Checkbox 的 name 屬性 (用於之後收集資料)
    renderMatrix('similarity-matrix-container', 'similar_pairs');
    renderMatrix('opposite-matrix-container', 'opposite_pairs');
});