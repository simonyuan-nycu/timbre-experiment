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
    const matrixContainer = document.getElementById('similarity-matrix-container');
    const thankYouMessage = document.getElementById('thank-you-message');

    function renderSimilarityMatrix() {
        let tableHTML = '<table class="similarity-matrix">';
        tableHTML += '<thead><tr><th></th>';
        for (let i = 0; i < sliderData.length - 1; i++) {
            tableHTML += `<th class="matrix-col-header"><div>${sliderData[i].label}</div></th>`;
        }
        tableHTML += '</tr></thead>';
        tableHTML += '<tbody>';
        for (let i = 1; i < sliderData.length; i++) {
            const rowDescriptor = sliderData[i];
            tableHTML += `<tr><td class="matrix-row-header">${rowDescriptor.label}</td>`;
            for (let j = 0; j < i; j++) {
                const colDescriptor = sliderData[j];
                const pairValue = `${rowDescriptor.name}-${colDescriptor.name}`;
                tableHTML += `<td><input type="checkbox" name="similar_pairs" value="${pairValue}"></td>`;
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</tbody></table>';
        matrixContainer.innerHTML = tableHTML;
    }

    function generateAndDownloadCSV() {
        if (allRatings.length === 0) { alert("沒有任何評分資料可供下載。"); return; }

        allRatings.sort((a, b) => {
            // 提取檔名進行比較 (支援中文與數字排序)
            return a.audioFile.localeCompare(b.audioFile, 'zh-Hant', { numeric: true });
        });
        // *************************************************
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
        // 1. 收集「困難描述詞」
        const difficultCheckboxes = document.querySelectorAll('input[name="difficult_descriptors"]:checked');
        const difficultValues = Array.from(difficultCheckboxes).map(cb => cb.value);

        // 2. 收集「推薦描述詞」 (新問題)
        // 記得：您必須在 HTML 中將第二題的 name 改為 "recommended_descriptors"
        const recommendedCheckboxes = document.querySelectorAll('input[name="recommended_descriptors"]:checked');
        const recommendedValues = Array.from(recommendedCheckboxes).map(cb => cb.value);

        // 檢查是否符合 6~8 項的要求 (可選，但建議加入)
        if (recommendedValues.length < 6 || recommendedValues.length > 8) {
            alert(`您在「推薦描述詞」選擇了 ${recommendedValues.length} 項。\n請依照題目要求，選擇 6 到 8 項描述詞。`);
            return; // 阻止提交，讓使用者繼續修改
        }

        // 3. 收集「相似度矩陣」
        const similarPairCheckboxes = document.querySelectorAll('input[name="similar_pairs"]:checked');
        const similarPairValues = Array.from(similarPairCheckboxes).map(cb => cb.value);

        demographicsData = {
            difficult_descriptors: difficultValues.join('; '),
            recommended_descriptors: recommendedValues.join('; '), // 新增的資料
            similar_pairs: similarPairValues.join('; ')
        };

        if (demographicsScreen) demographicsScreen.style.display = 'none';
        submitDemographicsBtn.style.display = 'none';
        
        if (thankYouMessage) thankYouMessage.style.display = 'block';
        if (finalSubmitBtn) finalSubmitBtn.style.display = 'block';
    });

    finalSubmitBtn.addEventListener('click', function() {
        generateAndDownloadCSV();
        localStorage.removeItem('allRatingsData');
    });

    renderSimilarityMatrix();
});