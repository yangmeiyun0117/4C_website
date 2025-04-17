
const descriptions = {
    '老生': '扮演中年以上的男性角色，通常唱工繁重，表演以唱、做为主，苍老、凝重、朴实是其主要特色，代表人物有关羽、包拯等。',
    '红生': '戴黑三绺，勾红脸，扮演勇试患直的人物，如关羽、赵匡等，外形威猛，性格豪爽。',
    '小生': '扮演年轻男性角色，唱腔清亮，分为文小生和武小生，通常表现出忠诚、勇敢、机智的特点，代表人物有李白、杨家将等。',
    '武生': '扮演擅长武艺的青壮年男子，以武打表演为主，具有很高的武技要求，动作快速且精确，代表人物有秦琼、程咬金等。',
    '娃娃生': '扮演少年儿童角色，多由童伶扮演，戏份较轻，表演特点为可爱、灵动，常出现在戏剧开头或插曲中。',
    '青衣': '扮演正派的女性角色，通常以端庄、文雅的形象出现，性格坚韧、聪慧，代表人物有林黛玉、孟丽君等。',
    '小旦': '扮演年轻女性角色，表演清丽可人，富有青春气息，常有娇媚、柔弱的形象，代表人物如宋美龄等。',
    '花衫': '花旦，扮演活泼、俏皮、机智的女性角色，通常表演喜剧角色，形象充满活力，代表人物如王宝钏等。',
    '老旦': '扮演年长的女性角色，注重表现其成熟稳重，通常用于表现贵妇、母亲等慈爱角色，代表人物如母亲杨贵妃。',
    '刀马旦': '扮演擅长武艺的女性角色，兼具美貌与武艺，勇敢、果敢，是晋剧中的武术形象，代表人物有王宝钏、花木兰等。',
    '大花脸': '扮演凶猛且具有权威感的男性角色，脸上画有大花脸，主要表演角色如唐僧、关羽等。',
    '二花脸': '扮演较为温和的男性角色，脸上画有二花脸，通常是配角，代表人物如牛郎、柳永等。',
    '武净': '扮演擅长武艺且具有超凡技巧的男性角色，表演较为粗犷、豪放，主要表演具有力量感的角色。',
    '文丑': '扮演幽默、滑稽、具有戏谑性格的男性角色，通常是剧情中的反派角色，性格上机智且有一些狡猾。',
    '武丑': '与文丑相比，武丑更具动作性和表现力，通常扮演那些复杂或多重角色，表演重在武艺展示，情节发展较为幽默和轻松。',
};

function showDescription(role, event) {
    event.stopPropagation();
    const descBox = document.getElementById('description');
    const characterContainer = event.target.closest('.character-container');
    const characterName = characterContainer.querySelector('.character-name').innerText;

    descBox.innerText = descriptions[role];
    descBox.style.display = 'block';
    
    // Position description box
    const characterWidth = characterContainer.offsetWidth;
    descBox.style.width = `${characterWidth}px`;
    descBox.style.position = 'absolute';
    descBox.style.left = `${characterContainer.offsetLeft}px`;
    descBox.style.top = `${characterContainer.offsetTop + characterContainer.offsetHeight + 10}px`;
}

function hideDescription() {
    document.getElementById('description').style.display = 'none';
}

function switchTab(type, event) {
    event.stopPropagation();
    hideDescription();
    document.getElementById('arrow').style.display = 'none';

    // Remove active class from all categories
    document.querySelectorAll('.category').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to the clicked category
    const activeTab = document.getElementById(`category${type}`);
    activeTab.classList.add('active');

    // Show the arrow
    const arrow = document.getElementById('arrow');
    arrow.style.left = `${activeTab.offsetLeft + activeTab.offsetWidth / 2}px`;
    arrow.style.display = 'block';

    // Populate characters dynamically based on selected tab
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = '';

    const roleImages = {
        '生': [
            { src: '../assets/images/roles/laosheng.png', alt: '老生', role: '老生' },
            { src: '../assets/images/roles/hongsheng.png', alt: '红生', role: '红生' },
            { src: '../assets/images/roles/xiaosheng.png', alt: '小生', role: '小生' },
            { src: '../assets/images/roles/wusheng.png', alt: '武生', role: '武生' },
            { src: '../assets/images/roles/wawasheng.png', alt: '娃娃生', role: '娃娃生' }
        ],
        '旦': [
            { src: '../assets/images/roles/qingyi.png', alt: '青衣', role: '青衣' },
            { src: '../assets/images/roles/xiaodan.png', alt: '小旦', role: '小旦' },
            { src: '../assets/images/roles/huashan.png', alt: '花衫', role: '花衫' },
            { src: '../assets/images/roles/laodan.png', alt: '老旦', role: '老旦' },
            { src: '../assets/images/roles/daomadan.png', alt: '刀马旦', role: '刀马旦' }
        ],
        '净': [
            { src: '../assets/images/roles/dahualian.png', alt: '大花脸', role: '大花脸' },
            { src: '../assets/images/roles/erhualian.png', alt: '二花脸', role: '二花脸' },
            { src: '../assets/images/roles/wujing.png', alt: '武净', role: '武净' }
        ],
        '丑': [
            { src: '../assets/images/roles/wenchou.png', alt: '文丑', role: '文丑' },
            { src: '../assets/images/roles/wuchou.png', alt: '武丑', role: '武丑' }
        ]
    };

    const selectedRoles = roleImages[type];

    selectedRoles.forEach(role => {
        const characterContainer = document.createElement('div');
        characterContainer.classList.add('character-container');

        const img = document.createElement('img');
        img.src = role.src;
        img.alt = role.alt;
        img.classList.add('character');
        img.onclick = (event) => showDescription(role.role, event);

        const name = document.createElement('div');
        name.classList.add('character-name');
        name.innerText = role.alt;

        characterContainer.appendChild(img);
        characterContainer.appendChild(name);

        charactersDiv.appendChild(characterContainer);
    });
}

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