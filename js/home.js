// 简介内容区滚动动画控制
const introSection = document.querySelector('.intro-section');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollPos > windowHeight * 0.6) {
        introSection.classList.add('visible');
    }
});

// 导航栏滚动效果
const navMenu = document.querySelector('.nav-menu');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) {
//         navMenu.style.top = '1rem';
//         navMenu.style.right = '1rem';
//     } else {
//         navMenu.style.top = '2rem';
//         navMenu.style.right = '2rem';
//     }
// });

// 视频加载备用方案
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');

    // 检测视频是否可播放
    video.addEventListener('error', function() {
        document.querySelector('.video-overlay').style.background = 
            'rgba(245, 239, 230, 0.9)';
        video.style.display = 'none';
    });

    // 移动端触控播放
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        video.play().catch(() => {
            video.controls = false;
            video.setAttribute('poster', '首页背景图2.png');
        });
    }
});

// 行当分类动画
const rolesSection = document.querySelector('.roles-section');

window.addEventListener('scroll', () => {
    const sectionTop = rolesSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
        rolesSection.classList.add('visible');
    }
});

// 音频播放函数
let currentAudio = null;

function playAudio(src) {
    // 如果已有音频在播放，先暂停
    if (currentAudio) {
        currentAudio.pause();
    }

    // 创建新音频
    currentAudio = new Audio(src);
    currentAudio.play().catch(e => console.log('音频播放失败:', e));
}

// 行当卡片滚动动画
const roleCards = document.querySelectorAll('.role-card');

function checkCards() {
    roleCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }
    });
}

// 团队部分滚动动画
const teamSection = document.querySelector('.team-section');

window.addEventListener('scroll', () => {
    const sectionTop = teamSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
        teamSection.classList.add('visible');
    }
});

// 初始检查
checkCards();

// 滚动时检查
window.addEventListener('scroll', checkCards);

// 导航菜单点击跳转
document.addEventListener('DOMContentLoaded', function() {
    // 确保所有导航链接使用正确的相对路径
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        // 移除之前的点击事件监听
        link.onclick = null;
        
        // 添加新的点击处理
        link.addEventListener('click', function(e) {
            // 阻止默认行为（如果使用a标签）
            e.preventDefault();
            
            // 获取目标URL
            const targetUrl = this.getAttribute('href');
            
            // 添加页面过渡效果
            document.body.style.opacity = '0.5';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // 延迟跳转以显示过渡效果
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });

    // 页面加载时的过渡效果
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
});

// 3DAR体验提示框点击事件
function openARExperience() {
    // 添加页面过渡效果
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.3s ease';
    
    // 延迟跳转以显示过渡效果
    setTimeout(() => {
        window.location.href = '3D.html';
    }, 300);
}

// 在滚动监听逻辑中添加AR区块动画
const arSection = document.querySelector('.ar-section');
window.addEventListener('scroll', () => {
    const rect = arSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        arSection.classList.add('visible');
    }
});

// AR体验按钮交互
let isARActive = false;
function openARExperience() {
    if(!isARActive) {
        document.querySelector('.ar-iframe').style.opacity = '1';
        arSection.classList.add('active');
        isARActive = true;
    }
    // 这里可以添加更多AR交互逻辑
}