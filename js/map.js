class MapApplication {
    constructor() {
        this.canvas = document.getElementById('map-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.svg = document.getElementById('arrows-svg');
        this.tooltip = document.getElementById('tooltip');
        this.infoDisplay = document.getElementById('info-display');
        this.infoContent = this.infoDisplay.querySelector('.info-content');
        this.animationFrame = null;

        this.SPECIAL_CITIES = ['太原市', '晋中市', '大同市', '长治市', '吕梁市'];
        this.NEIGHBOR_PROVINCES = ['内蒙古自治区', '河北省', '陕西省'];
        this.PROVINCE_COLORS = {
            '内蒙古自治区': '#95D5B2',
            '河北省': '#FFD166',
            '陕西省': '#EF476F'
        };

        this.arrows = [
            {
                from: { x: 111.73, y: 37.87 },
                to: { x: 111.68, y: 41.82 },
                color: '#EF476F',
                progress: 0,
                speed: 0.0065,
                id: 'arrow-inner-mongolia',
                particles: true
            },
            {
                from: { x: 111.73, y: 37.87 },
                to: { x: 115.77, y: 38.44 },
                color: '#95D5B2',
                progress: 0,
                speed: 0.007,
                id: 'arrow-hebei',
                particles: true
            },
            {
                from: { x: 111.73, y: 37.87 },
                to: { x: 108.95, y: 34.27 },
                color: '#FFD166',
                progress: 0,
                speed: 0.006,
                id: 'arrow-shaanxi',
                particles: true
            }
        ];

        this.cityInfos = {
            '太原市': {
                content: '太原作为山西省会，是晋剧发展的核心城市。清末民初，太原的"字号班"如"锦梨园"培养了大批晋剧名角，奠定了晋剧的表演体系。新中国成立后，山西省晋剧院、太原市实验晋剧院等机构推动了晋剧的现代化改革，使其在唱腔、剧本和舞台表现上更加规范化。此外，太原的广播电视媒体（如山西卫视《走进大戏台》）对晋剧的普及和推广起到了重要作用，使其在全省乃至全国保持影响力。'
            },
            '晋中市': {
                content: '晋中地区是晋剧的重要发源地，尤其以太谷、祁县、平遥等晋商聚集地为核心。晋商经济的繁荣为晋剧提供了资金支持，富商家族常聘请戏班演出，促进了晋剧艺术的精细化发展。太谷的"三多堂"等商号甚至拥有自己的戏班，推动了"中路梆子"（晋剧前身）的形成。祁县、平遥的民间戏曲活动也十分活跃，使晋中成为晋剧早期传播的中心区域。'
            },
            '大同市': {
                content: '大同地处晋北，历史上是晋剧向内蒙古、河北传播的重要枢纽。大同戏班常赴内蒙古的呼和浩特、包头等地演出，形成"口外班"，使晋剧在"走西口"移民潮中扎根塞外。此外，大同的"北路梆子"与晋剧相互影响，使晋剧在跨区域传播时更具适应性，最终在内蒙古、河北北部等地形成稳定的观众群体。'
            },
            '长治市': {
                content: '长治位于晋东南，与河北、河南接壤，是晋剧向中原地区扩散的重要通道。上党梆子与晋剧的交流使长治戏班在跨省演出时更具灵活性，部分晋剧艺人曾赴河北南部、河南北部演出，影响了当地的梆子戏发展。长治的戏曲文化底蕴深厚，庙会、节庆活动为晋剧的对外传播提供了舞台。'
            },
            '吕梁市': {
                content: '吕梁地区的孝义、汾阳等地与陕西接壤，是晋剧向陕北传播的重要节点。孝义的皮影戏、碗碗腔等民间艺术与晋剧有互动，部分晋剧艺人曾赴陕西榆林等地演出。此外，汾阳的晋商曾资助戏班，使晋剧在陕西部分地区形成一定的影响力，成为连接晋陕戏曲文化的桥梁。'
            }
        };

        this.geoData = { china: null, shanxi: null };
        this.mapState = {
            left: {
                scale: 7,
                scaleY: 7*1.3,
                offsetX: -450,
                offsetY: -30
            },
            right: {
                scale: 65,  // 原65→68
                offsetX: -6580, // 原-6650→-6720
                offsetY: -2050, // 原-2150→-2230
                hoveredProvince: null,
                clickedProvince: null
            }
        };

        this.initEventListeners();
        this.resizeCanvas();
        this.loadData();
    }

    initEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
        this.canvas.addEventListener('click', e => this.handleMouseClick(e));
        this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    resizeCanvas() {
        const container = document.getElementById('map-container');
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = container.clientWidth * dpr;
        this.canvas.height = container.clientHeight * dpr;
        this.canvas.style.width = container.clientWidth + 'px';
        this.canvas.style.height = container.clientHeight + 'px';
        
        this.ctx.scale(dpr, dpr);
        this.svg.setAttribute('width', container.clientWidth);
        this.svg.setAttribute('height', container.clientHeight);
        
        if (this.geoData.china || this.geoData.shanxi) this.drawMaps();
    }

    async loadData() {
        try {
            const [chinaResponse, shanxiResponse] = await Promise.all([
                fetch('../assets/data/中国_省.geojson'),
                fetch('../assets/data/山西省_市.geojson')
            ]);
            
            this.geoData.china = await chinaResponse.json();
            this.geoData.shanxi = await shanxiResponse.json();
            
            this.drawMaps();
            this.startAnimation();
        } catch (error) {
            console.error('加载地图数据失败:', error);
        }
    }

    startAnimation() {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        
        const animate = () => {
            let needsRedraw = false;
            this.arrows.forEach(arrow => {
                if (arrow.progress < 1) {
                    arrow.progress += arrow.speed;
                    arrow.progress > 1 && (arrow.progress = 1);
                    needsRedraw = true;
                }
            });
            
            if (needsRedraw) {
                this.drawAnimatedArrows();
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                setTimeout(() => this.resetAnimation(), 3000);
            }
        };
        this.animationFrame = requestAnimationFrame(animate);
    }

    resetAnimation() {
        this.arrows.forEach(arrow => arrow.progress = 0);
        this.startAnimation();
    }

    drawMaps() {
        const dpr = window.devicePixelRatio || 1;
        const w = this.canvas.width / dpr;
        const h = this.canvas.height / dpr;
        
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, w, h);
        this.svg.innerHTML = '';
        
        if (this.geoData.china) this.drawGeoData(this.geoData.china, this.mapState.left, '#ccccff', true);
        if (this.geoData.shanxi) {
            this.drawGeoData(this.geoData.shanxi, this.mapState.left, '#ccccff', false);
            this.drawGeoData(this.geoData.shanxi, this.mapState.right, '#ccccff', true);
        }
        
        this.drawDashedLines();
        this.drawAnimatedArrows();
    }

    drawGeoData(geoData, mapState, fillColor, drawShadow) {
        if (!geoData) return;
        
        if (drawShadow) {
            this.ctx.save();
            this.ctx.shadowColor = 'rgba(0, 0, 0, 1)';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowOffsetX = 5;
            this.ctx.shadowOffsetY = 10;
            
            this.ctx.beginPath();
            geoData.features.forEach(feature => this.drawFeaturePath(feature, mapState));
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
            this.ctx.restore();
        }
        
        geoData === this.geoData.china ? 
            this.drawChinaMap(geoData, mapState) : 
            this.drawShanxiMap(geoData, mapState);
    }

    drawChinaMap(geoData, mapState) {
        geoData.features.forEach(feature => {
            if (!feature.properties) return;
            const provinceName = feature.properties.name;
            
            if (provinceName === '山西省') {
                this.ctx.beginPath();
                this.drawFeaturePath(feature, mapState);
                this.ctx.fillStyle = '#ff0000';
                this.ctx.fill();
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 0.8;
                this.ctx.stroke();
            } else if (this.NEIGHBOR_PROVINCES.includes(provinceName)) {
                this.ctx.beginPath();
                this.drawFeaturePath(feature, mapState);
                this.ctx.fillStyle = this.PROVINCE_COLORS[provinceName];
                this.ctx.fill();
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();
                this.drawFeaturePath(feature, mapState);
                this.ctx.fillStyle = getComputedStyle(document.documentElement)
                    .getPropertyValue('--default-fill').trim();
                this.ctx.fill();
                this.ctx.strokeStyle = '#666';
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }
        });
    }

    drawShanxiMap(geoData, mapState) {
        geoData.features.forEach(feature => {
            const isSpecial = this.SPECIAL_CITIES.includes(feature.properties?.name);
            const isActive = feature.properties?.name === mapState.clickedProvince;
            const isHovered = feature.properties?.name === mapState.hoveredProvince;

            this.ctx.beginPath();
            this.drawFeaturePath(feature, mapState);
            
            let fillColor = isSpecial ? '#D4E157' : '#FFF3C7';
            if (isHovered) fillColor = isSpecial ? '#C0CA33' : '#FFE082';
            if (isActive) fillColor = isSpecial ? '#9E9D24' : '#FFB74D';

            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
            this.ctx.strokeStyle = isActive ? 
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color')
                    .trim() : 
                '#666';
            this.ctx.lineWidth = isActive ? 1.5 : 0.8;
            this.ctx.stroke();
        });
    }

    drawFeaturePath(feature, mapState) {
        if (!feature.geometry) return;
        
        const coords = feature.geometry.coordinates;
        const type = feature.geometry.type;
        
        const processRing = ring => {
            ring.forEach((coord, i) => {
                const [x, y] = this.transformCoord(coord[0], coord[1], mapState);
                i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
            });
        };

        if (type === 'MultiPolygon') {
            coords.forEach(polygon => polygon.forEach(processRing));
        } else if (type === 'Polygon') {
            coords.forEach(processRing);
        }
    }

    drawDashedLines() {
        const dpr = window.devicePixelRatio || 1;
        const w = this.canvas.width / dpr;
        const h = this.canvas.height / dpr;
        
        this.ctx.beginPath();
        [
        { x1: 0.2, y1: 0.596, x2: 0.476, y2: 0.289, dash: [5,3] },
        { x1: 0.2, y1: 0.596, x2: 0.432, y2: 0.7, dash: [8,4] }
        ].forEach(line => {
            this.ctx.setLineDash(line.dash);
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(line.x1 * w, line.y1 * h);
            this.ctx.lineTo(line.x2 * w, line.y2 * h);
            this.ctx.stroke();
        });
        this.ctx.setLineDash([]);
    }

    drawAnimatedArrows() {
        let defs = document.getElementById('arrow-defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.id = 'arrow-defs';
            this.svg.appendChild(defs);
        }
        
        this.arrows.forEach(arrow => {
            if (arrow.progress <= 0) return;
            
            const [startX, startY] = this.transformCoord(arrow.from.x, arrow.from.y, this.mapState.left);
            const [endX, endY] = this.transformCoord(arrow.to.x, arrow.to.y, this.mapState.left);
            
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const offset = distance * 0.3;
            
            const normalX = -dy / distance;
            const normalY = dx / distance;
            
            const controlX = midX + normalX * offset;
            const controlY = midY + normalY * offset;
            
            const t = arrow.progress;
            const currentX = Math.pow(1-t, 2) * startX + 2 * (1-t) * t * controlX + t * t * endX;
            const currentY = Math.pow(1-t, 2) * startY + 2 * (1-t) * t * controlY + t * t * endY;
            
            const tangentX = 2 * (1-t) * (controlX - startX) + 2 * t * (endX - controlX);
            const tangentY = 2 * (1-t) * (controlY - startY) + 2 * t * (endY - controlY);
            const angle = Math.atan2(tangentY, tangentX);
            
            let gradient = document.getElementById(`${arrow.id}-gradient`);
            if (!gradient) {
                gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.id = `${arrow.id}-gradient`;
                gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
                
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', arrow.color);
                stop1.setAttribute('stop-opacity', '0.7');
                
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '50%');
                stop2.setAttribute('stop-color', '#ffffff');
                stop2.setAttribute('stop-opacity', '0.9');
                
                const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop3.setAttribute('offset', '100%');
                stop3.setAttribute('stop-color', arrow.color);
                stop3.setAttribute('stop-opacity', '1');
                
                gradient.appendChild(stop1);
                gradient.appendChild(stop2);
                gradient.appendChild(stop3);
                
                defs.appendChild(gradient);
            }
            
            gradient.setAttribute('x1', startX);
            gradient.setAttribute('y1', startY);
            gradient.setAttribute('x2', endX);
            gradient.setAttribute('y2', endY);
            
            let path = document.getElementById(arrow.id);
            if (!path) {
                path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.id = arrow.id;
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', `url(#${arrow.id}-gradient)`);
                path.setAttribute('stroke-width', '2.5');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');
                this.svg.appendChild(path);
            }
            
            let filter = document.getElementById(`${arrow.id}-filter`);
            if (!filter) {
                filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                filter.id = `${arrow.id}-filter`;
                filter.setAttribute('x', '-20%');
                filter.setAttribute('y', '-20%');
                filter.setAttribute('width', '140%');
                filter.setAttribute('height', '140%');
                
                const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
                feGaussianBlur.setAttribute('stdDeviation', '2');
                feGaussianBlur.setAttribute('result', 'blur');
                
                const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
                feComposite.setAttribute('operator', 'over');
                feComposite.setAttribute('in', 'SourceGraphic');
                feComposite.setAttribute('in2', 'blur');
                
                filter.appendChild(feGaussianBlur);
                filter.appendChild(feComposite);
                
                defs.appendChild(filter);
            }
            
            path.setAttribute('filter', `url(#${arrow.id}-filter)`);
            
            const pathData = `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
            path.setAttribute('d', pathData);
            
            const pathLength = path.getTotalLength() || distance * 1.2;
            const visibleLength = pathLength * arrow.progress;
            
            path.setAttribute('stroke-dasharray', `${visibleLength} ${pathLength}`);
            path.setAttribute('stroke-dashoffset', '0');
            
            let marker = document.getElementById(`${arrow.id}-marker`);
            if (!marker) {
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                marker.id = `${arrow.id}-marker`;
                marker.setAttribute('fill', arrow.color);
                marker.setAttribute('filter', `url(#${arrow.id}-filter)`);
                this.svg.appendChild(marker);
            }
            
            const arrowSize = 10;
            const arrowWidth = 6;
            
            marker.setAttribute('transform', `translate(${currentX},${currentY}) rotate(${angle * 180 / Math.PI})`);
            marker.setAttribute('d', `M0,0 L-${arrowSize},-${arrowWidth} L-${arrowSize*0.6},0 L-${arrowSize},${arrowWidth} Z`);
            
            if (arrow.progress > 0.98) {
                let ripple = document.getElementById(`${arrow.id}-ripple`);
                if (!ripple) {
                    ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    ripple.id = `${arrow.id}-ripple`;
                    ripple.setAttribute('cx', endX);
                    ripple.setAttribute('cy', endY);
                    ripple.setAttribute('r', '0');
                    ripple.setAttribute('fill', 'none');
                    ripple.setAttribute('stroke', arrow.color);
                    ripple.setAttribute('stroke-width', '1.5');
                    ripple.setAttribute('opacity', '0.7');
                    
                    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    animate.setAttribute('attributeName', 'r');
                    animate.setAttribute('from', '0');
                    animate.setAttribute('to', '20');
                    animate.setAttribute('dur', '1.5s');
                    animate.setAttribute('begin', '0s');
                    animate.setAttribute('repeatCount', 'indefinite');
                    
                    const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    animateOpacity.setAttribute('attributeName', 'opacity');
                    animateOpacity.setAttribute('from', '0.7');
                    animateOpacity.setAttribute('to', '0');
                    animateOpacity.setAttribute('dur', '1.5s');
                    animateOpacity.setAttribute('begin', '0s');
                    animateOpacity.setAttribute('repeatCount', 'indefinite');
                    
                    ripple.appendChild(animate);
                    ripple.appendChild(animateOpacity);
                    this.svg.appendChild(ripple);
                }
            }
        });
    }

    transformCoord(geoX, geoY, mapState) {
        const dpr = window.devicePixelRatio || 1;
        const h = this.canvas.height / dpr;
        return [
            geoX * mapState.scale + mapState.offsetX,
            h - (geoY * (mapState.scaleY || mapState.scale) + mapState.offsetY)
        ];
    }

    handleMouseMove(event) {
        const pos = this.getMousePosition(event);
        const province = this.detectProvince(pos);
        
        this.tooltip.classList.toggle('active', !!province);
        if (province) {
            this.tooltip.textContent = province;
            this.tooltip.style.left = `${event.clientX + 15}px`;
            this.tooltip.style.top = `${event.clientY + 15}px`;
        }
        
        if (this.mapState.right.hoveredProvince !== province) {
            this.mapState.right.hoveredProvince = province;
            this.drawMaps();
        }
    }

    handleMouseClick(event) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${event.clientX - 5}px`;
        ripple.style.top = `${event.clientY - 5}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);

        const pos = this.getMousePosition(event);
        const province = this.detectProvince(pos);
        
        this.mapState.right.clickedProvince = province;
        this.showCityInfo(province);
        this.drawMaps();
    }

    getMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        return [
            event.clientX - rect.left,
            event.clientY - rect.top
        ];
    }

    detectProvince([x, y]) {
        const geoPoint = this.inverseTransformCoord(x, y, this.mapState.right);
        for (const feature of this.geoData.shanxi.features) {
            if (feature.properties && this.isPointInFeature(geoPoint, feature)) {
                return feature.properties.name;
            }
        }
        return null;
    }

    inverseTransformCoord(screenX, screenY, mapState) {
        const dpr = window.devicePixelRatio || 1;
        const h = this.canvas.height / dpr;
        return [
            (screenX - mapState.offsetX) / mapState.scale,
            (h - screenY - mapState.offsetY) / (mapState.scaleY || mapState.scale)
        ];
    }

    isPointInFeature(point, feature) {
        if (!feature.geometry) return false;
        
        const coords = feature.geometry.coordinates;
        const type = feature.geometry.type;
        
        const checkPolygon = polygon => {
            let inside = false;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const xi = polygon[i][0], yi = polygon[i][1];
                const xj = polygon[j][0], yj = polygon[j][1];
                
                const intersect = ((yi > point[1]) !== (yj > point[1])) &&
                    (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
        };

        if (type === 'MultiPolygon') {
            return coords.some(polygon => polygon.some(checkPolygon));
        } else if (type === 'Polygon') {
            return checkPolygon(coords[0]);
        }
        return false;
    }

    showCityInfo(cityName) {
        const container = this.infoDisplay;
        const contentWrapper = this.infoContent;
        
        const animateContentChange = (newContent) => {
            // 第一阶段：记录当前高度并开始收缩
            const startHeight = contentWrapper.offsetHeight;
            container.style.maxHeight = `${startHeight}px`;
            contentWrapper.style.opacity = 0;

            // 等待过渡完成
            setTimeout(() => {
                // 更新内容
                contentWrapper.innerHTML = newContent;
                
                // 强制重排确保新内容尺寸更新
                void contentWrapper.offsetHeight;

                // 获取新内容高度
                const endHeight = contentWrapper.offsetHeight + 40; // 包含padding

                // 第二阶段：展开到新高度并淡入
                container.style.maxHeight = `${endHeight}px`;
                contentWrapper.style.opacity = 1;

                // 最终清理
                setTimeout(() => {
                    container.style.maxHeight = '';
                }, 350);
            }, 300);
        };

        if (cityName && this.cityInfos[cityName]) {
            const content = `
                <h3 style="color: var(--primary-color); margin: 0 0 15px 0;">${cityName}</h3>
                <p>${this.cityInfos[cityName].content}</p>
            `;
            animateContentChange(content);
            container.classList.add('visible');
        } else {
            animateContentChange(`
                <p>晋剧起源于清朝中叶的山西省，以太原市为中心，逐步在晋中、晋北等地区传播并流行开来，形成了不同的地方流派。随着时间的推移，晋剧的影响力逐渐扩展到省外，特别是在邻近的内蒙古地区以及河北省与陕西省，晋剧以其独特的艺术魅力受到了当地民众的广泛欢迎和喜爱。</p>
            `);
            this.mapState.right.clickedProvince = null;
        }
    }

    handleMouseLeave() {
        this.mapState.right.hoveredProvince = null;
        this.tooltip.classList.remove('active');
        this.drawMaps();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MapApplication();
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
