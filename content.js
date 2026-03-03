(function() {
    let isTranslated = false;
    let isDragging = false;
    const STORAGE_KEY = "__q_translate_ui_pos__";

//CSSの作成
    const style = document.createElement('style');
    style.textContent = `
//Google翻訳のUIを隠す
        .goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        body { top: 0 !important; position: static !important; }
///スイッチのデザイン
        #q-translate-toggle-ui {
            position: fixed; z-index: 2147483647;
            background: #ffffff; border: 1px solid #ddd; border-radius: 25px;
            padding: 5px 12px; display: flex; align-items: center; gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: sans-serif;
            font-size: 13px; color: #3c4043; cursor: move;
            transition: box-shadow 0.3s; user-select: none;
        }
        #q-translate-toggle-ui:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.2); }
        .q-switch { position: relative; display: inline-block; width: 34px; height: 18px; pointer-events: none; }
        .q-switch input { opacity: 0; width: 0; height: 0; }
        .q-slider {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-color: #ccc; transition: .4s; border-radius: 18px;
        }
        .q-slider:before {
            position: absolute; content: ""; height: 12px; width: 12px;
            left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;
        }
        input:checked + .q-slider { background-color: #1a73e8; }
        input:checked + .q-slider:before { transform: translateX(16px); }
    `;
    document.head.appendChild(style);
//スイッチの作成
    const ui = document.createElement('div');
    ui.id = 'q-translate-toggle-ui';
    ui.innerHTML = `
        <span>日本語翻訳</span>
        <label class="q-switch">
            <input type="checkbox" id="q-translate-checkbox">
            <span class="q-slider"></span>
        </label>
    `;

//保存された位置を読み込む
    const savedPos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"top":"15px","left":"15px"}');
    ui.style.top = savedPos.top;
    ui.style.left = savedPos.left;
    document.body.appendChild(ui);

    const checkbox = document.getElementById('q-translate-checkbox');

    let offsetX, offsetY;
    ui.addEventListener('mousedown', (e) => {
        isDragging = false;
        offsetX = e.clientX - ui.getBoundingClientRect().left;
        offsetY = e.clientY - ui.getBoundingClientRect().top;

        function onMouseMove(e) {
            isDragging = true;
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            ui.style.left = x + 'px';
            ui.style.top = y + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            // 位置を保存
            if (isDragging) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    top: ui.style.top,
                    left: ui.style.left
                }));
            }
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
//翻訳ロジック
    function triggerTranslation(shouldTranslate) {
        if (!document.getElementById('google_translate_element')) {
            initGoogleTranslate();
        }
        if (shouldTranslate) applyTranslation(); else restoreOriginal();
        isTranslated = shouldTranslate;
        checkbox.checked = shouldTranslate;
    }

    function initGoogleTranslate() {
        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.display = 'none';
        document.body.appendChild(div);
        window.googleTranslateElementInit = () => {
            new google.translate.TranslateElement({pageLanguage: 'auto', includedLanguages: 'ja', autoDisplay: false}, 'google_translate_element');
        };
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }

    function applyTranslation() {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = 'ja';
            select.dispatchEvent(new Event('change'));
        } else {
            setTimeout(applyTranslation, 500);
        }
    }

    function restoreOriginal() {
        const iframe = document.querySelector('.goog-te-banner-frame');
        if (iframe) {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const restoreBtn = innerDoc.getElementById(':1.restore');
            if (restoreBtn) { restoreBtn.click(); return; }
        }
        location.reload();
    }

    ui.addEventListener('click', () => { if (!isDragging) triggerTranslation(!isTranslated); });

    document.addEventListener('keydown', (e) => {
//ここでCTRLとqボタンのを変更できる。
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q') {
            e.preventDefault();
            triggerTranslation(!isTranslated);
        }
    });
})();
