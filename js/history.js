
// 轮盘控制系统
const wheel = document.getElementById('mainWheel');
const markers = document.querySelectorAll('.era-marker');
const centerImage = document.querySelector('.center-image');
const centerDescription = document.querySelector('.center-description');
let currentAngle = 0;
let isRotating = false;

// 定义每个阶段的图片和简介
const eraData = [
    { 
        image: '../assets/images/historys/中心图片/民国戏台.jpg', 
        description: '民国革新时期，晋剧在传统基础上融入新元素，坤班兴起，抗战剧社活跃...' 
    },
    { 
        image: '../assets/images/historys/中心图片/戏改运动.jpg', 
        description: '建国新生时期，晋剧经历戏改运动，传统剧目得到整理改编...' 
    },
    { 
        image: '../assets/images/historys/中心图片/晋剧走向国际.jpg', 
        description: '改革春风时期，晋剧走向国际，校园传承体系逐步建立...' 
    },
    { 
        image: '../assets/images/historys/中心图片/非遗晋剧.jpg', 
        description: '世纪新声时期，晋剧入选国家级非遗，数字典藏项目启动...' 
    },
    { 
        image: '../assets/images/historys/中心图片/云上晋剧.jpg', 
        description: '数字传承时期，晋剧拥抱新技术，云上晋剧和元宇宙剧场兴起...' 
    }
];

// 轮盘点击事件
markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
        if(isRotating) return;
        isRotating = true;
        
        const targetAngle = -index * 72;
        gsap.to(wheel, {
            duration: 1.5,
            rotate: targetAngle,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => isRotating = false
        });

        showEraContent(index);
    });
});

// 内容展示控制
function showEraContent(index) {
    const cards = document.querySelectorAll('.era-card');
    const events = document.querySelectorAll('.timeline-event');
    
    // 更新中心内容
    gsap.to(centerImage, { opacity: 0, duration: 0.3, onComplete: () => {
        centerImage.src = eraData[index].image;
        gsap.to(centerImage, { opacity: 1, duration: 0.5 });
    }});

    gsap.to(centerDescription, { opacity: 0, duration: 0.3, onComplete: () => {
        centerDescription.textContent = eraData[index].description;
        gsap.to(centerDescription, { opacity: 1, duration: 0.5 });
    }});

    // 卡片切换动画
    gsap.to(cards, { 
        opacity: 0, 
        y: 50, 
        duration: 0.5, 
        onComplete: () => {
            cards.forEach(card => card.classList.remove('active'));
            cards[index].classList.add('active');
            gsap.fromTo(cards[index], 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 }
            );
        }
    });

    // 时间线动画
    gsap.fromTo(events,
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            stagger: 0.3,
            ease: "power2.out",
            duration: 1
        }
    );
}

// 自动旋转
let autoRotation = setInterval(() => {
    if(isRotating) return;
    currentAngle -= 72;
    gsap.to(wheel, {
        duration: 3,
        rotate: currentAngle,
        ease: "power2.inOut",
        onComplete: () => {
            showEraContent((Math.abs(currentAngle)/72)%5);
        }
    });
}, 10000);


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
    'use strict';

// 页面加载时的过渡效果
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

});
// 导航菜单点击跳转
document.addEventListener('DOMContentLoaded', function() {
const navLinks = document.querySelectorAll('.nav-item');

navLinks.forEach(link => {
link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = this.getAttribute('href');
    
    // 添加页面过渡效果
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 300);
});
});
});


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
        video.setAttribute('poster', '../assets/images/home/首页背景图2.png');
    });
}
});
// // 添加滚轮控制功能
// let wheelTimeout;
// let currentEraIndex = 0;
// const totalEras = 5;

// // 滚轮事件监听
// window.addEventListener('wheel', function(e) {
//     // 防止快速滚动导致多次触发
//     if (wheelTimeout) return;
//     wheelTimeout = setTimeout(() => {
//         wheelTimeout = null;
//     }, 800);

//     // 判断滚动方向
//     if (e.deltaY > 0) {
//         // 向下滚动 - 下一个时代
//         currentEraIndex = (currentEraIndex + 1) % totalEras;
//     } else {
//         // 向上滚动 - 上一个时代
//         currentEraIndex = (currentEraIndex - 1 + totalEras) % totalEras;
//     }

//     // 计算目标角度
//     const targetAngle = -currentEraIndex * 72;

//     // 旋转轮盘
//     isRotating = true;
//     gsap.to(wheel, {
//         duration: 1.5,
//         rotate: targetAngle,
//         ease: "elastic.out(1, 0.3)",
//         onComplete: () => isRotating = false
//     });

//     // 显示对应内容
//     showEraContent(currentEraIndex);

//     // 阻止默认滚动行为
//     e.preventDefault();
// }, { passive: false });

// 初始化展示
showEraContent(0);
