/**
 * 動的な機能とインタラクションを提供します
 */

// DOMが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール処理
    handleHeaderScroll();
    
    // ハンバーガーメニューの処理
    setupHamburgerMenu();
    
    // タブの処理
    setupTabs();
    
    // ギャラリーモーダルの処理
    setupGalleryModal();
    
    // 雪の効果を作成
    createSnowEffect();
    
    // ビデオプレイヤーの処理
    setupVideoPlayer();
    
    // イベントカレンダーの生成
    generateEventCalendar();
    
    // スムーススクロールの設定
    setupSmoothScroll();
});

/**
 * スクロール時のヘッダースタイル変更
 */
function handleHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * ハンバーガーメニューの設定
 */
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.global-nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.global-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

/**
 * タブ機能の設定
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブなタブボタンのクラスを削除
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // クリックされたボタンにアクティブクラスを追加
            this.classList.add('active');
            
            // すべてのタブコンテンツを非表示にする
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // クリックされたタブのコンテンツを表示
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * ギャラリーモーダルの設定
 */
function setupGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    
    if (!galleryItems.length || !modal || !modalImage || !closeModal) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-src');
            modalImage.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロールを無効にする
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // スクロールを有効に戻す
    });
    
    // モーダルの外側をクリックしても閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ESCキーでも閉じれるようにする
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * 雪の効果を作成
 */
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    
    if (!snowContainer) return;
    
    // 雪の量
    const snowflakeCount = 100;
    
    // 雪のサイズバリエーション
    const snowflakeSizes = ['tiny', 'small', 'medium', 'large'];
    
    // CSSを動的に作成
    const styleElement = document.createElement('style');
    let styleContent = `
        .snowflake {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0.8;
            pointer-events: none;
        }
        
        .snowflake.tiny {
            width: 3px;
            height: 3px;
        }
        
        .snowflake.small {
            width: 5px;
            height: 5px;
        }
        
        .snowflake.medium {
            width: 7px;
            height: 7px;
        }
        
        .snowflake.large {
            width: 10px;
            height: 10px;
        }
    `;
    
    // 各雪片のアニメーションを作成
    for (let i = 0; i < snowflakeCount; i++) {
        const duration = 10 + Math.random() * 20; // 10～30秒
        const delay = Math.random() * 20; // 0～20秒の遅延
        
        styleContent += `
            @keyframes fall-${i} {
                0% {
                    transform: translateY(-10%) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
            
            .snowflake:nth-child(${i + 1}) {
                left: ${Math.random() * 100}%;
                animation: fall-${i} ${duration}s linear infinite;
                animation-delay: ${delay}s;
            }
        `;
    }
    
    styleElement.textContent = styleContent;
    document.head.appendChild(styleElement);
    
    // 雪片を作成
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = `snowflake ${snowflakeSizes[Math.floor(Math.random() * snowflakeSizes.length)]}`;
        snowContainer.appendChild(snowflake);
    }
}

/**
 * ビデオプレイヤーの設定
 */
function setupVideoPlayer() {
    const videoContainer = document.getElementById('video-container');
    const playButton = document.getElementById('play-button');
    
    if (!videoContainer || !playButton) return;
    
    videoContainer.addEventListener('click', function() {
        // サムネイルと再生ボタンを削除
        const thumbnail = document.getElementById('video-thumbnail');
        
        if (thumbnail) {
            thumbnail.remove();
            playButton.remove();
            
            // iframeでYouTube動画を埋め込む（実際のYouTube IDに置き換える）
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            videoContainer.appendChild(iframe);
        }
    });
}

/**
 * イベントカレンダーの生成
 */
function generateEventCalendar() {
    const calendarContainer = document.getElementById('calendar');
    
    if (!calendarContainer) return;
    
    // 現在の日付を取得
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // 月の名前
    const monthNames = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    
    // 月の最初の日を取得
    const firstDay = new Date(currentYear, currentMonth, 1);
    // 月の最後の日を取得
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // カレンダーのHTML
    let calendarHTML = `
        <div class="calendar-header">
            <h4>${currentYear}年 ${monthNames[currentMonth]}</h4>
        </div>
        <div class="calendar-body">
            <div class="calendar-weekdays">
                <div>日</div>
                <div>月</div>
                <div>火</div>
                <div>水</div>
                <div>木</div>
                <div>金</div>
                <div>土</div>
            </div>
            <div class="calendar-days">
    `;
    
    // 月の最初の日の曜日（0 = 日曜日）
    const firstDayOfWeek = firstDay.getDay();
    
    // 前月の空白セルを追加
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // イベント情報（サンプル）
    const events = {
        5: '樹氷ライトアップ開始',
        12: 'スキーこどもの日',
        15: '樹氷まつり',
        20: '雪上花火大会'
    };
    
    // 月の日数分のセルを追加
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth();
        const hasEvent = events[day] !== undefined;
        
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
                <span class="day-number">${day}</span>
                ${hasEvent ? `<div class="event-marker">${events[day]}</div>` : ''}
            </div>
        `;
    }
    
    calendarHTML += `
            </div>
        </div>
    `;
    
    // CSS
    const calendarCSS = `
        <style>
            .calendar-header {
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .calendar-header h4 {
                font-size: 1.2rem;
                color: var(--primary-color);
            }
            
            .calendar-weekdays {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                margin-bottom: 0.5rem;
                text-align: center;
                font-weight: bold;
            }
            
            .calendar-weekdays div:first-child {
                color: #e74c3c;
            }
            
            .calendar-weekdays div:last-child {
                color: #3498db;
            }
            
            .calendar-days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-gap: 5px;
            }
            
            .calendar-day {
                position: relative;
                min-height: 50px;
                padding: 5px;
                border-radius: 5px;
                background-color: #f5f5f5;
            }
            
            .calendar-day.empty {
                background-color: transparent;
            }
            
            .calendar-day.today {
                background-color: #e8f4fd;
                border: 1px solid #3498db;
            }
            
            .calendar-day.has-event {
                background-color: #fef2e7;
            }
            
            .day-number {
                position: absolute;
                top: 5px;
                left: 5px;
                font-weight: bold;
            }
            
            .event-marker {
                position: absolute;
                bottom: 5px;
                left: 0;
                right: 0;
                font-size: 0.7rem;
                text-align: center;
                color: var(--accent-color);
                font-weight: 500;
                padding: 2px;
            }
        </style>
    `;
    
    // カレンダーを挿入
    calendarContainer.innerHTML = calendarCSS + calendarHTML;
}

/**
 * スムーススクロールの設定
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            
            if (!targetElement && targetId === '#') {
                targetElement = document.documentElement; // ページのトップへ
            }
            
            if (targetElement) {
                // ヘッダーの高さを考慮してスクロール位置を調整
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 雪が落ちるアニメーション
 * メインビジュアル背景をスクロールしたときのパララックス効果
 */
window.addEventListener('scroll', function() {
    const mainVisual = document.getElementById('main-visual');
    
    if (mainVisual) {
        const scrollPosition = window.pageYOffset;
        // スクロール位置の20%の速度でパララックス効果を適用
        mainVisual.style.backgroundPosition = `center calc(50% + ${scrollPosition * 0.2}px)`;
    }
});

/**
 * 画像の遅延ロード
 * ユーザー体験を向上させるために、必要なときに画像を読み込む
 */
document.addEventListener('DOMContentLoaded', function() {
    // 画像IDと実際のソースのマッピング
    const imageMapping = {
        'logo-img': 'images/my-logo.png',
        'footer-logo-img': 'images/my-logo-white.png',
        'snow-monsters-img': 'images/my-snow-monsters.jpg',
        'course-map-img': 'images/my-course-map.jpg',
        'hot-springs-img': 'images/my-onsen.jpg',
        'access-map-img': 'images/my-access-map.jpg',
        'plan1-img': 'images/my-plan1.jpg',
        'plan2-img': 'images/my-plan2.jpg',
        'plan3-img': 'images/my-plan3.jpg',
        'video-thumbnail': 'images/my-video-thumbnail.jpg',
        'gallery1-img': 'images/my-gallery1.jpg',
        'gallery2-img': 'images/my-gallery2.jpg',
        'gallery3-img': 'images/my-gallery3.jpg',
        'gallery4-img': 'images/my-gallery4.jpg',
        'gallery5-img': 'images/my-gallery5.jpg',
        'gallery6-img': 'images/my-gallery6.jpg'
    };
    
    // 各画像を設定
    for (const [id, src] of Object.entries(imageMapping)) {
        const imgElement = document.getElementById(id);
        if (imgElement) {
            // 実際のソースをdata-srcから取得してimgのsrcに設定
            imgElement.src = src;
        }
    }
});

/**
 * プログレスバー
 * ページの読み込み進行状況を示す
 */
window.addEventListener('load', function() {
    // ローディングインジケータがあれば表示を消す
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
});

/**
 * アニメーション付きカウンターを実装
 * スクロール時に数値が増加するエフェクト
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// IntersectionObserverを使用して、要素が画面に表示されたときにカウンターアニメーションを開始
document.addEventListener('DOMContentLoaded', function() {
    const counterElements = document.querySelectorAll('.data-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 1500); // 1.5秒かけてアニメーション
                observer.unobserve(target); // 一度アニメーションが始まったら監視を止める
            }
        });
    }, { threshold: 0.1 });
    
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
});
