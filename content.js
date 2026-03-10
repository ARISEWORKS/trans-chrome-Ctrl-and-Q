(function() {
  if (window._googleTranslateToggleInitialized) return;
  window._googleTranslateToggleInitialized = true;
  const translateToJapanese = () => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = 'ja';
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const checkbox = document.getElementById('gt-toggle-checkbox');
    if (checkbox) checkbox.checked = true;
  };

  const restoreToOriginal = () => {
    const iframes = document.querySelectorAll('iframe');
    for (let iframe of iframes) {
      try {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (innerDoc) {
          const restoreBtn = innerDoc.querySelector('[id$=".restore"]');
          if (restoreBtn) {
            restoreBtn.click();
            break;
          }
          const buttons = innerDoc.querySelectorAll('button');
          let clicked = false;
          for (let btn of buttons) {
            if (btn.innerText.includes('原文') || btn.innerText.includes('Original')) {
              btn.click();
              clicked = true;
              break;
            }
          }
          if (clicked) break;
        }
      } catch (err) {}
    }
    const checkbox = document.getElementById('gt-toggle-checkbox');
    if (checkbox) checkbox.checked = false;
  };

//左上のトグルスイッチUIを追加
  const createToggleSwitch = () => {
    const container = document.createElement('div');
    container.id = 'gt-toggle-container';
    
    container.innerHTML = `
      <label class="gt-switch" title="翻訳を切り替え">
        <input type="checkbox" id="gt-toggle-checkbox">
        <span class="gt-slider"></span>
      </label>
      <span id="gt-toggle-text">あ / A</span>
    `;
    
    document.body.appendChild(container);

    const checkbox = document.getElementById('gt-toggle-checkbox');
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
　　　　 //ONで日本語
        translateToJapanese();
      } else {
　　　　//それ以外
        restoreToOriginal();
      }
    });
  };

//バナー非表示とスイッチのデザイン
  const injectCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
      body { top: 0px !important; position: static !important; }
      .goog-te-banner-frame {
        position: absolute !important;
        top: -9999px !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -9999 !important;
      }
      .goog-tooltip, .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; border: none !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }

      #gt-toggle-container {
        position: fixed !important;
        top: 15px !important;
        left: 15px !important;
        z-index: 2147483647 !important;
        display: flex !important;
        align-items: center !important;
        background: rgba(255, 255, 255, 0.9) !important;
        padding: 6px 12px !important;
        border-radius: 20px !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
        font-family: sans-serif !important;
        user-select: none !important;
      }
      .gt-switch {
        position: relative !important;
        display: inline-block !important;
        width: 40px !important;
        height: 22px !important;
        margin: 0 !important;
        margin-right: 8px !important;
      }
      .gt-switch input { opacity: 0 !important; width: 0 !important; height: 0 !important; }
      .gt-slider {
        position: absolute !important;
        cursor: pointer !important;
        top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
        background-color: #ccc !important;
        transition: .4s !important;
        border-radius: 34px !important;
      }
      .gt-slider:before {
        position: absolute !important;
        content: "" !important;
        height: 16px !important; width: 16px !important;
        left: 3px !important; bottom: 3px !important;
        background-color: white !important;
        transition: .4s !important;
        border-radius: 50% !important;
      }
      .gt-switch input:checked + .gt-slider { background-color: #2196F3 !important; }
      .gt-switch input:checked + .gt-slider:before { transform: translateX(18px) !important; }
      #gt-toggle-text { font-size: 12px !important; color: #333 !important; font-weight: bold !important; }
    `;
    document.head.appendChild(style);
  };

  const startBannerHider = () => {
    const observer = new MutationObserver(() => {
      if (document.body && document.body.style.top !== '0px' && document.body.style.top !== '') {
        document.body.style.top = '0px';
      }
      if (document.documentElement && document.documentElement.style.top !== '0px' && document.documentElement.style.top !== '') {
        document.documentElement.style.top = '0px';
      }
      const banner = document.querySelector('iframe.goog-te-banner-frame');
      if (banner) {
        banner.style.setProperty('opacity', '0', 'important');
        banner.style.setProperty('position', 'fixed', 'important');
        banner.style.setProperty('top', '-9999px', 'important');
        banner.style.setProperty('left', '-9999px', 'important');
      }
      const skiptranslates = document.querySelectorAll('body > div.skiptranslate');
      skiptranslates.forEach(div => {
        if (div.id !== 'google_translate_element') {
          div.style.setProperty('opacity', '0', 'important');
          div.style.setProperty('position', 'fixed', 'important');
          div.style.setProperty('top', '-9999px', 'important');
          div.style.setProperty('left', '-9999px', 'important');
        }
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  };

  const loadGoogleTranslate = () => {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none'; 
    document.body.appendChild(div);

    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement({ pageLanguage: 'auto', autoDisplay: false }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
  };

  injectCSS();
  createToggleSwitch();
  startBannerHider();
  loadGoogleTranslate();

  window.addEventListener('keydown', (e) => {
    if (e.code !== 'KeyQ') return;

    if (e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      translateToJapanese();
      return;
    }

    if (e.ctrlKey && e.shiftKey && !e.altKey) {
      e.preventDefault();
      restoreToOriginal();
      return;
    }
  });

})();
