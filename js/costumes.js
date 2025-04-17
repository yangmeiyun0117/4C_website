// 图片基础路径
const IMAGE_BASE = '../assets/images/costumes/';

// 初始化观察器
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;

            // 添加动画类
            card.classList.add('active');

            // 加载图片
            const imgElement = card.querySelector('.card-image');
            const imgName = card.dataset.img;

            // 使用 background-image 方式
            imgElement.style.backgroundImage = `url(${IMAGE_BASE}${imgName})`;

            // 图片加载失败处理
            imgElement.onerror = () => {
                imgElement.style.backgroundImage = 'url(../assets/images/costumes/default.png)';
            };
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

// 为所有卡片添加观察
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);

    // 点击交互（可选）
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// 轮播逻辑
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});





let currentIndex = 0;
function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
            slide.classList.remove('prev', 'next');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
            slide.classList.remove('active', 'next');
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add('next');
            slide.classList.remove('active', 'prev');
        } else {
            slide.classList.remove('active', 'prev', 'next');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

showSlide(currentIndex);





// 自动轮播（可选）
let autoPlayInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// 鼠标悬停时暂停自动轮播（可选）
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// 初始化显示第一张幻灯片
showSlide(currentSlide);

// 分类切换逻辑
let currentCategory = 0;
const categories = document.querySelectorAll('.category');
const categoryPrevBtn = document.querySelector('.category-btn.prev');
const categoryNextBtn = document.querySelector('.category-btn.next');

function showCategory(n) {
    categories.forEach(category => category.classList.remove('active'));
    currentCategory = (n + categories.length) % categories.length;
    categories[currentCategory].classList.add('active');
}

categoryPrevBtn.addEventListener('click', () => {
    showCategory(currentCategory - 1);
});

categoryNextBtn.addEventListener('click', () => {
    showCategory(currentCategory + 1);
});

// 初始化显示第一个分类
showCategory(currentCategory);

    // 统一导航交互逻辑
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.nav-item');
        
        // 页面过渡效果
        const handleNavigation = (e) => {
            e.preventDefault();
            const targetUrl = e.currentTarget.getAttribute('href');
            
            document.body.style.opacity = '0.5';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        };

        navLinks.forEach(link => {
            link.addEventListener('click', handleNavigation);
        });

        // 页面加载过渡
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        });

        // 左侧导航交互
        const sideNavLinks = document.querySelectorAll('.nav-links a');
        sideNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    });
