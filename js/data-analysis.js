// 原始数据
const data = [
    { 
        name: '太原市', 
        value: 92, 
        shows: 580, 
        troupes: 12, 
        audience: 85, 
        culture: 90,
        audienceGroups: [
            { age: '18岁以下', value: 15 },
            { age: '18-30岁', value: 25 },
            { age: '30-50岁', value: 40 },
            { age: '50岁以上', value: 20 }
        ]
    },
    { 
        name: '晋中市', 
        value: 80, 
        shows: 420, 
        troupes: 8, 
        audience: 62, 
        culture: 75,
        audienceGroups: [
            { age: '18岁以下', value: 10 },
            { age: '18-30岁', value: 20 },
            { age: '30-50岁', value: 35 },
            { age: '50岁以上', value: 25 }
        ]
    },
    { 
        name: '大同市', 
        value: 73, 
        shows: 380, 
        troupes: 6, 
        audience: 55, 
        culture: 68,
        audienceGroups: [
            { age: '18岁以下', value: 12 },
            { age: '18-30岁', value: 18 },
            { age: '30-50岁', value: 30 },
            { age: '50岁以上', value: 40 }
        ]
    },
    { 
        name: '长治市', 
        value: 67, 
        shows: 320, 
        troupes: 5, 
        audience: 48, 
        culture: 60,
        audienceGroups: [
            { age: '18岁以下', value: 8 },
            { age: '18-30岁', value: 15 },
            { age: '30-50岁', value: 25 },
            { age: '50岁以上', value: 52 }
        ]
    },
    { 
        name: '吕梁市', 
        value: 60, 
        shows: 260, 
        troupes: 4, 
        audience: 36, 
        culture: 55,
        audienceGroups: [
            { age: '18岁以下', value: 5 },
            { age: '18-30岁', value: 12 },
            { age: '30-50岁', value: 20 },
            { age: '50岁以上', value: 63 }
        ]
    }
];

// 计算汇总数据
const totalShows = data.reduce((sum, d) => sum + d.shows, 0);
const totalTroupes = data.reduce((sum, d) => sum + d.troupes, 0);
const totalAudience = data.reduce((sum, d) => sum + d.audience, 0);
const totalAudienceAll = data.reduce((sum, d) => sum + d.audience, 0);

// 计算全量受众群体分布（加权平均）
const ageGroups = ['18岁以下', '18-30岁', '30-50岁', '50岁以上'];
const audienceGroupsTotal = ageGroups.map(age => {
    let total = 0;
    data.forEach(city => {
        const group = city.audienceGroups.find(g => g.age === age);
        total += city.audience * (group.value / 100);
    });
    return {
        age: age,
        value: (total / totalAudienceAll * 100).toFixed(1)
    };
});

// 主题配色
const colors = ['#8B0000', '#DAA520', '#556B2F', '#8FBC8F', '#CD5C5C'];
const chartStyle = {
    textStyle: {
        fontFamily: '"华文楷体", "KaiTi", "Microsoft YaHei", sans-serif',
        color: '#5A3E36',
        fontSize: 14
    },
    grid: {
        containLabel: true,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderColor: '#8B0000',
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowBlur: 6
    }
};

// 1. 综合排名柱状图
const rankChart = echarts.init(document.getElementById('rankChart'));
rankChart.setOption({
    ...chartStyle,
    tooltip: { 
        trigger: 'item',
        formatter: '{b}<br/>综合评分: {c}分',
        backgroundColor: '#F4F1DE',
        borderColor: '#8B0000',
        textStyle: { color: '#5A3E36' }
    },
    xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: { 
            fontSize: 14,
            color: '#5A3E36'
        },
        axisLine: { lineStyle: { color: '#8B0000' } }
    },
    yAxis: { 
        type: 'value',
        name: '综合评分',
        nameTextStyle: { color: '#8B0000', fontSize: 14 },
        axisLine: { lineStyle: { color: '#8B0000' } },
        splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [{
        type: 'bar',
        barWidth: '40%',
        data: data.map((d, index) => ({
            value: d.value,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colors[index] },
                    { offset: 1, color: '#DAA520' }
                ]),
                borderRadius: [6, 6, 0, 0],
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowBlur: 5
            }
        })),
        label: {
            show: true,
            position: 'top',
            formatter: '{c}分',
            color: '#8B0000',
            fontWeight: 'bold',
            fontSize: 16
        }
    }]
});

// 2. 指标分布饼图（初始显示汇总数据）
const pieChart = echarts.init(document.getElementById('pieChart'));
pieChart.setOption({
    ...chartStyle,
    tooltip: { 
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}',
        backgroundColor: '#F4F1DE',
        borderColor: '#8B0000',
        textStyle: { color: '#5A3E36' }
    },
    legend: {
        orient: 'horizontal',
        top: -5,
        left: 'center',
        textStyle: { color: '#5A3E36', fontSize: 14 }
    },
    series: [{
        name: '指标分布',
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '55%'],
        itemStyle: { borderWidth: 2, borderColor: '#F4F1DE' },
        label: {
            show: true,
            position: 'outside',
            formatter: '{d}%',
            color: '#5A3E36',
            fontSize: 14
        },
        labelLine: { length: 15, length2: 15 },
        data: [
            { name: '演出场次', value: totalShows },
            { name: '专业剧团', value: totalTroupes },
            { name: '观众人次', value: totalAudience }
        ].map((item, index) => ({
            ...item,
            itemStyle: { color: colors[index] }
        }))
    }]
});

// 3. 多维对比雷达图
const radarChart = echarts.init(document.getElementById('radarChart'));
radarChart.setOption({
    ...chartStyle,
    tooltip: {
        trigger: 'item',
        backgroundColor: '#F4F1DE',
        borderColor: '#8B0000',
        textStyle: { color: '#5A3E36' }
    },
    legend: {
        data: data.map(d => d.name),
        orient: 'horizontal',
        top: -5,
        left: 'center',
        textStyle: { color: '#5A3E36', fontSize: 14 }
    },
    radar: {
        indicator: [
            { name: '演出场次', max: 600 },
            { name: '剧团数量', max: 15 },
            { name: '观众人次', max: 100 },
            { name: '文化指数', max: 100 }
        ],
        center: ['50%', '55%'],
        radius: '60%',
        axisName: {
            color: '#5A3E36',
            fontSize: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
        },
        splitArea: { areaStyle: { color: ['rgba(255, 255, 255, 0.5)'] } }
    },
    series: [{
        name: '地区对比',
        type: 'radar',
        data: data.map(d => ({
            value: [d.shows, d.troupes, d.audience, d.culture],
            name: d.name,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.1 },
            itemStyle: { color: colors[data.indexOf(d) % colors.length] }
        }))
    }]
});

// 4. 受众群体分布图
const audienceChart = echarts.init(document.getElementById('audienceChart'));
audienceChart.setOption({
    ...chartStyle,
    tooltip: { 
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}%',
        backgroundColor: '#F4F1DE',
        borderColor: '#8B0000',
        textStyle: { color: '#5A3E36' }
    },
    legend: {
        orient: 'horizontal',
        top: -5,
        left: 'center',
        textStyle: { color: '#5A3E36', fontSize: 14 }
    },
    series: [{
        name: '受众群体',
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '55%'],
        itemStyle: { borderWidth: 2, borderColor: '#F4F1DE' },
        label: {
            show: true,
            position: 'outside',
            formatter: '{c}%',
            color: '#5A3E36',
            fontSize: 14
        },
        labelLine: { length: 15, length2: 15 },
        data: audienceGroupsTotal.map((g, index) => ({
            name: g.age,
            value: parseFloat(g.value),
            itemStyle: { color: colors[index] }
        }))
    }]
});

// 5. 详细数据柱状图
const barChart = echarts.init(document.getElementById('barChart'));
barChart.setOption({
    ...chartStyle,
    tooltip: { 
        trigger: 'axis',
        backgroundColor: '#F4F1DE',
        borderColor: '#8B0000',
        textStyle: { color: '#5A3E36' }
    },
    legend: { 
        top: -5,
        left: 'center',
        textStyle: { color: '#5A3E36', fontSize: 14 }
    },
    grid: {
        left: '3%',
        right: '3%',
        top: '15%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: { color: '#5A3E36', fontSize: 14 },
        axisLine: { lineStyle: { color: '#8B0000' } }
    },
    yAxis: { 
        type: 'value',
        axisLine: { lineStyle: { color: '#8B0000' } }
    }, // 修复这里缺少的闭合括号
    series: [
        {
            name: '演出场次',
            type: 'bar',
            barGap: 0,
            barWidth: '20%',
            data: data.map(d => d.shows),
            itemStyle: { color: '#8B0000' },
            label: { show: true, position: 'top' }
        },
        {
            name: '观众人次',
            type: 'bar',
            barWidth: '20%',
            data: data.map(d => d.audience),
            itemStyle: { color: '#DAA520' },
            label: { show: true, position: 'top' }
        },
        {
            name: '文化指数',
            type: 'bar',
            barWidth: '20%',
            data: data.map(d => d.culture),
            itemStyle: { color: '#556B2F' },
            label: { show: true, position: 'top' }
        }
    ]
});

// 图表联动逻辑
let currentSelectedArea = null;

function syncCharts(selectedName) {
    currentSelectedArea = selectedName;
    const selectedData = data.find(d => d.name === selectedName);

    // 更新指标分布
    pieChart.setOption({
        series: [{
            data: [
                { name: '演出场次', value: selectedData.shows },
                { name: '专业剧团', value: selectedData.troupes },
                { name: '观众人次', value: selectedData.audience }
            ].map((item, index) => ({
                ...item,
                itemStyle: { color: colors[index] }
            }))
        }]
    });

    // 更新受众分布
    audienceChart.setOption({
        series: [{
            data: selectedData.audienceGroups.map((g, index) => ({
                name: g.age,
                value: g.value,
                itemStyle: { color: colors[index] }
            }))
        }]
    });

    // 高亮相关图表
    rankChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: data.findIndex(d => d.name === selectedName) });
    barChart.dispatchAction({ type: 'highlight', seriesIndex: [0, 1, 2], dataIndex: data.findIndex(d => d.name === selectedName) });
}

function resetAllCharts() {
    currentSelectedArea = null;
    
    // 重置指标分布
    pieChart.setOption({
        series: [{
            data: [
                { name: '演出场次', value: totalShows },
                { name: '专业剧团', value: totalTroupes },
                { name: '观众人次', value: totalAudience }
            ].map((item, index) => ({
                ...item,
                itemStyle: { color: colors[index] }
            }))
        }]
    });

    // 重置受众分布
    audienceChart.setOption({
        series: [{
            data: audienceGroupsTotal.map((g, index) => ({
                name: g.age,
                value: parseFloat(g.value),
                itemStyle: { color: colors[index] }
            }))
        }]
    });

    // 取消高亮
    rankChart.dispatchAction({ type: 'downplay' });
    barChart.dispatchAction({ type: 'downplay' });
}

// 事件绑定
rankChart.on('click', params => syncCharts(params.name));
barChart.on('click', params => syncCharts(data[params.dataIndex].name));
document.querySelectorAll('.chart-container').forEach(container => {
    container.addEventListener('dblclick', () => currentSelectedArea && resetAllCharts());
});

// 响应式调整
window.addEventListener('resize', () => {
    [rankChart, pieChart, radarChart, audienceChart, barChart].forEach(chart => chart.resize());
});

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