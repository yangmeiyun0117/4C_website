// 点击幕布触发动画 使用requestAnimationFrame确保精确同步
document.getElementById('curtainContainer').addEventListener('click', function() {
    // 在同一个动画帧中处理所有元素
    requestAnimationFrame(() => {
        // 1. 首先停止所有动画
        const animatedElements = [
            document.querySelector('.click-prompt'),
            document.querySelector('.main-title'),
            ...document.querySelectorAll('.instrument-intro')
        ];
        
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'opacity 0.5s ease-out';
        });
        
        // 2. 然后统一设置opacity
        requestAnimationFrame(() => {
            animatedElements.forEach(el => {
                el.style.opacity = '0';
            });
            
            // 3. 触发幕布动画
            this.classList.add('curtain-open');
            
            setTimeout(() => {
                this.style.display = 'none';
                        
            }, 1500);
        });
    });
});



// 歌曲列表数据
const songCategories = {
    civil: [ // 文场乐器
        {
            title: "板胡（主奏乐器）",
            audio: "../assets/audio/晋胡 苦相思.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/晋胡.png",
            left: {
                title: "乐器介绍",
                desc: "板胡是晋剧文场的核心乐器，琴筒较小，覆以桐木板，琴杆较短，使用金属弦（传统为丝弦）。其音色高亢嘹亮，穿透力强，是晋剧'托腔保调'的核心乐器，演奏时多用滑音、揉弦等技法模拟人声唱腔的韵味58。板胡在晋剧中定弦一般为纯五度（如内弦g、外弦d¹），演奏风格灵活，既能表现激昂情绪，又能展现细腻情感。它的琴筒材质（椰壳或木质）和面板厚度直接影响音色，是晋剧音乐的灵魂乐器。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "板胡的音色清脆明亮，尤其擅长表现高亢、热烈的情绪，同时也能演奏柔美细腻的旋律。在晋剧中，它常作为领奏乐器，主导唱腔的走向，如《打金枝》中的主旋律。代表作品包括《晋剧板胡独奏：〈大起板〉》和《汾河流水哗啦啦》，前者展示快速运弓技巧，后者体现抒情性演奏。现代晋剧中，板胡也常与交响乐结合，如《走西口》的改编版本"
            }
        },

        {
            title: "二弦（辅助胡琴）",
            audio: "../assets/audio/二弦 打金枝.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/二股弦.png",
            left: {
                title: "乐器介绍",
                desc: "二弦是晋剧文场中的重要辅助乐器，形制与板胡相似但体积略大。琴筒直径约12厘米，蒙以优质蟒皮，琴杆长约70厘米。定弦比板胡低一个八度，内弦定G，外弦定D。演奏时强调顿弓技法的运用，左手快速换把和大幅度的滑音是其特色。传统晋剧中，二弦演奏者需要具备即兴加花的能力，根据剧情需要随时插入装饰音。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "二弦的音色较板胡更为浑厚，在中音区具有独特的穿透力。它既能与板胡形成八度呼应，又能独立承担旋律声部。在《算粮登殿》'劝兄'一折中，二弦通过连续的顿弓和滑音，生动刻画了人物内心的纠结；现代改编曲目《晋剧二弦随想曲》则充分展现了其丰富的表现力。由于音色独特，二弦在营造戏剧冲突时具有不可替代的作用。"
            }
        },

        {
            title: "三弦（弹拨乐器）",
            audio: "../assets/audio/三弦 小开门.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/三股弦.png",
            left: {
                title: "乐器介绍",
                desc: "三弦是晋剧文场的重要弹拨乐器，木质音箱蒙蟒皮，长柄无品，演奏时戴金属指套拨弦。演奏技法以滚奏和轮指为主"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "三弦的音色清脆明亮，颗粒感强，特别适合表现欢快的节奏。在《打金枝》'劝宫'一场中，三弦的快速轮指为紧张的剧情增添了动感；传统曲牌《柳青娘》的三弦伴奏则展现了其华丽的装饰技巧。现代演奏家还创作了《三弦协奏曲》等作品，进一步拓展了三弦的表现空间。"
            }
        },

        {
            title: "四弦（月琴变种）",
            audio: "../assets/audio/四弦 柳青娘.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/四股弦.png",
            left: {
                title: "乐器介绍",
                desc: "四弦是一种圆形共鸣箱的弹拨乐器，四根弦，用拨片弹奏。音色短促清脆，主要用于强化节奏。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "四弦擅长突出节奏骨架，传统剧目《渭水河》中与梆子的呼应展现了晋剧的民间音乐特色。现代晋剧中使用逐渐减少。"
            }
        },

        {
            title: "笛子（梆笛）",
            audio: "../assets/audio/笛子 迎亲.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/笛子.png",
            left: {
                title: "乐器介绍",
                desc: "晋剧使用的笛子多为G调或F调梆笛，高音清亮。演奏技法包括吐音、花舌、滑音等，能够模拟自然音响。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "梆笛的音色高亢明亮，极具穿透力。《芦花》中'风雪夜'的笛子独奏运用连续的长音和颤音，生动表现了风雪交加的意境；传统曲牌《哭皇天》则通过笛子的滑音和装饰音，表达了深沉的哀思。在新编剧目中，笛子还常与弦乐组配合，拓展了表现空间。"
            }
        },

        {
            title: "唢呐（海笛）",
            audio: "../assets/audio/唢呐 将军令.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/唢呐.png",
            left: {
                title: "乐器介绍",
                desc: "晋剧使用的海笛是小唢呐的一种，杆长约20厘米，音域达两个八度。演奏时强调循环换气法的运用，可以连续吹奏长音而不间断。在传统乐队中，唢呐主要用于特定场景的渲染，如武将出场、婚丧礼仪等。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "海笛的音色高亢嘹亮，极具震撼力。《金沙滩》中唢呐模拟战马嘶鸣的音效，配合马锣的轰鸣，生动再现了古战场的惨烈；《大开门》曲牌则通过欢快的旋律，营造出喜庆祥和的氛围。现代演奏家还创作了《唢呐与乐队》等作品，展现了这一乐器的丰富表现力。"
            }
        },

        {
            title: "笙（和声乐器）",
            audio: "../assets/audio/笙 晋调.mp3",
            front: "../assets/images/instruments/晋剧背景1.png",
            back: "../assets/images/instruments/笙.png",
            left: {
                title: "乐器介绍",
                desc: "晋剧使用的笙为17簧传统笙，音域达两个八度。演奏时通过口吹和手指按孔发声，可以同时演奏多个音符，形成丰富的和声效果。在现代晋剧乐队中，笙主要承担中声部的和声填充。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "笙的音色圆润柔和，具有独特的和声效果。在新编剧目《走西口》中，笙与弦乐组的配合营造出辽阔深远的意境；传统曲牌《朝天子》中，笙的持续音为音乐提供了稳定的和声基础。随着乐队编制的扩大，笙的运用越来越多样化。"
            }
        },
        // 其他文场乐器...
    ],
    military: [ // 武场乐器
        {
            title: "鼓板（单皮鼓+檀板）",
            audio: "../assets/audio/鼓板 紧煞机 .mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/鼓板.png",
            left: {
                title: "乐器介绍",
                desc: "鼓板是晋剧乐队的指挥中心，由单皮鼓和檀板组成。单皮鼓鼓面直径约25厘米，用双楗敲击；檀板由三块红木板组成，通过开合发声。鼓师需要熟记全剧的锣鼓经，根据剧情需要灵活指挥乐队。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "鼓板的节奏变化直接影响戏剧张力。《芦花》中'写休书'一段，鼓板通过渐快的节奏推动剧情发展；《打金枝》中则用稳重的节奏维持宫廷戏的庄重感。优秀的鼓师能够通过细微的力度变化，精准配合演员的表演。"
            }
        },

        {
            title: "马锣（晋剧特色锣）",
            audio: "../assets/audio/马锣 滚白帽子 苦相思 吊棒槌.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/马锣.png",
            left: {
                title: "乐器介绍",
                desc: "马锣是晋剧最具特色的打击乐器，铜制，直径约30厘米，中心凸起。演奏时悬挂在架上，用裹布软槌敲击，技法包括放音、闷音、边音等。马锣的音量极大，在武戏中具有震撼效果。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "马锣的'炸音'效果是晋剧的标志性音色。《金沙滩》中连续的马锣重击生动再现了战场厮杀；《三关排宴》中则通过马锣的强弱变化表现宴会的层次感。现代演出中，马锣的使用更加精细化，注重音色的控制。"
            }
        },

        {
            title: "铙钹（铜制对击）",
            audio: "../assets/audio/铙钹 三关上将.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/铙钹.png",
            left: {
                title: "乐器介绍",
                desc: "两铙钹是晋剧武场中重要的铜制打击乐器，由两片直径约20-25厘米的铜钹组成。铜钹中央隆起呈碗状，边缘渐薄，用牛皮带或布带系于手中。演奏技法丰富多样，包括：对击,搓击,闷击,扬击"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "铙钹音色铿锵尖锐，穿透力极强。在《三岔口》'夜斗'场景中，铙钹通过快速的闷击和搓击，生动模拟了黑暗中刀剑相碰的声响；《金沙滩》大战场面中，铙钹与马锣、战鼓的配合，营造出惊天动地的战争氛围。"
            }
        },

        {
            title: "小锣（高音点缀）",
            audio: "../assets/audio/小锣 凤点头.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/小锣.png",
            left: {
                title: "乐器介绍",
                desc: "小锣是晋剧武场中的高音乐器，铜制，直径约15厘米，中心略微凸起。演奏时左手提锣，右手持长约20厘米的薄木片（俗称'锣板'）敲击。主要技法包括：正击,边击,颤击,闷击"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "小锣音色清脆悦耳，在《喜荣归》中通过轻快的颤击表现喜剧氛围；《拾玉镯》中则用细腻的边击配合旦角的身段表演。现代晋剧中，小锣还发展出'花点'打法，在传统'仓才'节奏基础上加入装饰性音符。"
            }
        },

        {
            title: "梆子（节奏骨架）",
            audio: "../assets/audio/梆子 金水桥 .mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/梆子.png",
            left: {
                title: "乐器介绍",
                desc: "梆子是晋剧节奏体系的核心乐器，由两根枣木制成，长约25厘米，直径约3厘米。演奏时左手持略粗的'底板'，右手持'击棒'敲击。梆子的节奏型严格遵循晋剧的板式规律：慢板,二性,流水,介板"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "梆子音色清脆短促，在《算粮登殿》中通过精准的节奏控制引导唱腔转换；《打金枝》宫廷场景中则以稳重的击节维持庄重氛围。现代演出中，梆子演奏更注重与鼓板的配合，形成多层次的节奏网络。"
            }
        },

        {
            title: "战鼓",
            audio: "../assets/audio/战鼓 开门鼓水罗呤紧拜场.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/战鼓.png",
            left: {
                title: "乐器介绍",
                desc: "战鼓是晋剧武戏专用的大鼓，鼓面直径约50厘米，鼓身高约30厘米，双面蒙牛皮。演奏使用两根长约30厘米的鼓槌，主要技法包括：重击,轻击,滚奏,边击。"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "战鼓音色低沉浑厚，在《长坂坡》中通过密集的滚奏表现千军万马的奔腾；《金沙滩》大战中则以震撼的重击模拟炮声。现代演出中，战鼓常与电子低音配合，增强音响效果。"
            }
        },

        {
            title: "木鱼（辅助节奏）",
            audio: "../assets/audio/木鱼.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/木鱼.png",
            left: {
                title: "乐器介绍",
                desc: "木鱼是晋剧文戏中的辅助节奏乐器，硬木雕刻成鱼形，中空，长约15厘米。演奏时用小木槌敲击顶部，音色清脆短促。主要使用场景包括：慢板唱腔中的节奏细分,念白时的节奏点缀,佛道场景的特殊音效"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "木鱼音色空灵，在《白蛇传》'断桥'一折中辅助表现哀婉情绪；《蝴蝶杯》中则用于配合长篇念白。现代演出中，木鱼的使用更加精细化，常与碰铃组合营造特殊氛围。"
            }
        },

        {
            title: "碰铃（色彩点缀）",
            audio: "../assets/audio/碰铃 哭皇天.mp3",
            front: "../assets/images/instruments/晋剧背景3.png",
            back: "../assets/images/instruments/碰铃.png",
            left: {
                title: "乐器介绍",
                desc: "碰铃是晋剧中的色彩性乐器，由两个铜制小铃组成，直径约5厘米，用细绳系于手指。演奏技法包括：对击,颤击,单鸣"
            },
            right: {
                title: "乐器特点与代表作品",
                desc: "碰铃音色空灵缥缈，在《宝莲灯》仙境场景中营造神秘氛围；《游西湖》鬼戏中则用于表现阴森气氛。现代演出中，碰铃还常与电子音效结合，拓展表现空间。"
            }
        },
        // 其他武场乐器...
    ],
    classic: [ // 经典曲目
        {
            title: "打金枝（劝宫选段）",
            audio: "../assets/audio/打金枝（劝宫选段）.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/打金枝.jpg",
            left: {
                title: "曲目介绍",
                desc: "《打金枝》是晋剧经典剧目，讲述了唐代宗之女升平公主与驸马郭暧因家庭矛盾引发冲突，最终在皇帝的调解下和解的故事。该选段以“劝宫”为核心，展现了宫廷家庭矛盾与君臣伦理的戏剧冲突，是晋剧“宫闱戏”的代表作之一。"
            },
            right: {
                title: "艺术特色",
                desc: "晋剧代表性唱段，以晋胡的苍劲音色统领旋律，二弦高音点缀冲突情绪，三弦和月琴填充中低音声部，展现宫廷戏的庄重与家庭矛盾的张力。乐器组合：晋胡（主奏）、二弦、三弦、四弦（月琴）"
            }
        },

        {
            title: "穆桂英",
            audio: "../assets/audio/穆桂英.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/穆桂英.png",
            left: {
                title: "曲目介绍",
                desc: "《穆桂英》是晋剧经典武戏，改编自杨家将故事，讲述巾帼英雄穆桂英挂帅出征、大破天门阵的传奇。全剧以'招亲''挂帅''破阵'为核心场次，突出穆桂英的智勇双全，既有'辕门斩子'的刚烈，又有'夜探敌营'的机敏，通过武打与唱腔的巧妙结合，展现这位女将忠勇报国的英雄气概，是晋剧'刀马旦'行当的代表剧目。"
            },
            right: {
                title: "艺术特色",
                desc: "该剧以激昂的梆子腔为基调，穆桂英唱腔融合'流水板'的迅捷与'介板'的高亢，展现其飒爽英姿；武场运用马锣、战鼓营造战场气势，配合'刀花''枪花'等程式化武打动作。服饰上，穆桂英红靠白翎的造型英气逼人，与番将的夸张脸谱形成鲜明对比，通过晋胡与唢呐的交替演奏，既保留晋剧传统韵味，又强化了武戏的震撼力，充分体现'慷慨激昂、刚柔并济'的晋剧特色。"
            }
        },

        {
            title: "王宝钏绣楼抛绣球",
            audio: "../assets/audio/王宝钏绣楼抛绣球.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "《绣楼抛绣球》是晋剧传统剧目《红鬃烈马》（又名《王宝钏》）中的经典选段，讲述了宰相王允之女王宝钏在彩楼抛绣球招亲，选中乞丐薛平贵，并因此与父决裂的爱情故事。主要情节包括：彩楼招亲，绣球择婿，父女决裂"
            },
            right: {
                title: "艺术特色",
                desc: "晋剧《王宝钏·绣楼抛绣球》在艺术特色上集中体现了山西梆子高亢激越、质朴豪放的风格，以晋胡主奏的'四大件'伴奏体系（晋胡、二弦、三弦、四弦）营造出浓郁的晋韵特色。表演上通过细腻的水袖功、圆场步和'三击掌'时的激烈对白形成强烈戏剧冲突，文武场乐器的巧妙配合（梆子掌控节奏、小锣点缀轻快、马锣强化冲突）既保持了传统梆子戏的激昂特质，又通过板式变化细腻刻画人物心理，充分展现了晋剧'慷慨激昂不失婉转'的独特魅力。"
            }
        },

        {
            title: "唐丞相王允",
            audio: "../assets/audio/唐丞相王允.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "《该剧为《红鬃烈马》系列核心剧目，讲述唐丞相王允因门第偏见，执意反对女儿王宝钏与寒门薛平贵的婚姻，甚至以断绝父女关系相逼的故事。剧中通过“三击掌”“寒窑别”等经典桥段，深刻展现封建礼教与个人意志的激烈冲突，塑造了王允顽固守旧的封建家长形象，以及王宝钏为爱抗争的刚烈性格，是晋剧“忠贞爱情悲剧”的典范之作。"
            },
            right: {
                title: "艺术特色",
                desc: "全剧以晋胡苍劲悲怆的旋律贯穿，王允唱腔多采用沉郁的“慢板”和“介板”，凸显其威严与固执；王宝钏则以高亢的“流水板”唱出抗争决心。表演上运用“摔袖”“顿足”等程式化动作强化父女对峙的戏剧张力，梆子与马锣的急促节奏烘托冲突升级，青黑官袍与素色褶子的服饰对比暗喻阶级对立，充分体现晋剧“慷慨激昂中见细腻”的艺术魅力。"
            }
        },

        {
            title: "许配苏龙",
            audio: "../assets/audio/许配苏龙.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "《许配苏龙》是晋剧传统剧目，讲述相府千金王宝钏彩楼抛绣球选中乞丐薛平贵后，其父王允嫌贫爱富，执意要将女儿许配给官家子弟苏龙，引发父女激烈冲突的故事。该剧通过'三击掌'等经典桥段，展现了封建礼教与自由爱情的尖锐矛盾，是晋剧'王宝钏'系列中的重要组成部分，尤以'父女决裂'的戏剧冲突和感人唱段著称。"
            },
            right: {
                title: "艺术特色",
                desc: "该剧充分展现了晋剧高亢激越的艺术风格，采用晋胡领奏的'四大件'伴奏体系，王宝钏的唱腔以'流水板'为主，通过跌宕起伏的旋律表现其刚烈性格；王允则运用沉稳的'慢板'体现封建家长的威严。表演上注重程式化身段，尤以'水袖功'和'圆场'来强化戏剧冲突，配合梆子、马锣等打击乐器，在慷慨激昂中不失细腻的情感表达，生动刻画了父女间的激烈对抗。"
            }
        },

        {
            title: "许配魏虎",
            audio: "../assets/audio/许配魏虎.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "该剧是《红鬃烈马》系列中的重要折子戏，讲述王允为拆散女儿王宝钏与薛平贵的婚姻，强行将女儿许配给心腹将领魏虎的故事。剧中通过'逼婚''抗婚'等戏剧冲突，展现了封建家长专制与追求婚姻自由的尖锐矛盾，塑造了王允的专横与王宝钏的坚贞形象，是晋剧表现封建礼教压迫的经典剧目。"
            },
            right: {
                title: "艺术特色",
                desc: "该剧以激昂的梆子腔为基础，晋胡悲愤的音色贯穿全剧。王允唱腔采用沉郁的'慢板'展现其威严，王宝钏则运用高亢的'流水板'表现抗争精神。表演上突出'摔袖''跪步'等程式化动作，配合马锣、铙钹等打击乐强化戏剧冲突。剧中魏虎的花脸扮相与王宝钏的素装形成鲜明对比，通过脸谱和服饰的强烈反差突显人物对立，体现了晋剧粗犷豪放中见细腻的艺术特色。"
            }
        },

        {
            title: "平贵投军",
            audio: "../assets/audio/平贵投军.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "该剧是《红鬃烈马》系列中的重要折子戏，讲述薛平贵为建功立业离开寒窑，毅然投军西征的故事。剧中通过'别窑''从军'等经典场次，生动展现了薛平贵胸怀壮志的英雄气概和王宝钏深情送别的感人场景，塑造了一对患难夫妻在命运抉择时的动人形象，是晋剧表现家国情怀的经典剧目。"
            },
            right: {
                title: "艺术特色",
                desc: "该剧以高亢激越的梆子腔为基调，晋胡悲壮的音色贯穿全剧。薛平贵唱腔采用刚健的'二性板'展现其豪情壮志，王宝钏则运用婉转的'流水板'表达离别愁绪。表演上突出'趟马''圆场'等传统身段，配合战鼓、马锣等打击乐营造出征氛围。剧中薛平贵的武生扮相与王宝钏的青衣造型相得益彰，通过程式化表演和音乐唱腔的完美结合，体现了晋剧慷慨激昂中见深情的艺术特色。"
            }
        },

        {
            title: "被西凉国招为驸马",
            audio: "../assets/audio/被西凉国招为驸马.mp3",
            front: "../assets/images/instruments/晋剧背景4.png",
            back: "../assets/images/instruments/算粮登殿.png",
            left: {
                title: "曲目介绍",
                desc: "该剧是《红鬃烈马》系列重要折子戏，讲述薛平贵征西被俘后，因英勇过人被西凉王招为驸马的故事。剧中通过'比武招亲''洞房对质'等精彩场次，生动展现了薛平贵从战俘到驸马的身份转变，以及代战公主豪爽刚烈的草原儿女形象，是晋剧中独具异域风情的经典剧目。"
            },
            right: {
                title: "艺术特色",
                desc: "该剧音乐融合了晋剧传统唱腔与西域音乐元素，晋胡与唢呐交织出浓郁的塞外风情。薛平贵唱腔采用刚劲的'介板'展现英雄气概，代战公主则运用明快的'花腔'凸显草原儿女的豪迈性格。表演上突出'翎子功''马鞭功'等武戏身段，配合手鼓、铜锣等特色打击乐，通过华丽的异域服饰和独特的脸谱造型，在保持晋剧本色的同时创新性地融入了少数民族艺术特色。"
            }
        },
        // 其他经典曲目...
    ]
};

// DOM元素
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const cardContainer = document.querySelector('.card-container');
const frontCard = document.querySelector('.front-card');
const backCard = document.querySelector('.back-card');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const leftText = document.querySelector('.left-text');
const rightText = document.querySelector('.right-text');
const leftTitle = document.getElementById('left-title');
const leftDesc = document.getElementById('left-desc');
const rightTitle = document.getElementById('right-title');
const rightDesc = document.getElementById('right-desc');
const menuIcon = document.getElementById('menu-icon');
const tabContainer = document.getElementById('tab-container');
const navItems = document.querySelectorAll('.nav-item');
const mainCard = document.getElementById('main-card');
const mainContainer = document.querySelector('.main-container');

// 状态管理
let currentSongIndex = 0;
let currentCategory = 'civil'; // 默认显示文场乐器
const state = {
    playing: false,
    currentTime: 0,
    duration: 0
};

// 初始化播放器
function initPlayer() {
    loadSong(currentSongIndex);
    audio.loop = true;
    generateTabs();
}

// 生成选项卡
function generateTabs() {
    tabContainer.innerHTML = '';
    songCategories[currentCategory].forEach((song, index) => {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.setAttribute('data-index', index);
        tab.textContent = song.title;
        tabContainer.appendChild(tab);
    });
    
    // 修改选项卡点击事件，防止事件冒泡导致立即隐藏
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const index = parseInt(tab.getAttribute('data-index'));
            currentSongIndex = index;
            loadSong(currentSongIndex);
            tabContainer.classList.remove('active');
        });
    });
}

// 加载歌曲
function loadSong(index) {
    const songs = songCategories[currentCategory];
    const song = songs[index];

    // 更新文字内容
    leftTitle.textContent = song.left.title;
    leftDesc.textContent = song.left.desc;
    rightTitle.textContent = song.right.title;
    rightDesc.textContent = song.right.desc;
    
    // 更新音乐名称
    document.getElementById('music-title').textContent = song.title;
    
    // 更新音频源
    audio.src = song.audio;
    
    // 更新卡片图片
    frontCard.style.backgroundImage = `url('${song.front}')`;
    backCard.style.backgroundImage = `url('${song.back}')`;

    // 重置播放状态
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
        if (state.playing) {
            audio.play().catch(() => {
                state.playing = false;
                cardContainer.classList.remove('playing');
            });
        }
    }, { once: true });

    // 重置进度条
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '00:00';
}

mainCard.addEventListener('click', (e) => {
    // 如果点击的是播放器内部元素（按钮、进度条等），则不处理
    if (e.target.closest('.music-player')) {
        return;
    }
    
    // 切换文字显示状态
    toggleTextVisibility();
});

// 添加卡片点击事件处理
cardContainer.addEventListener('click', (e) => {
    // 阻止事件冒泡，避免触发main-card的点击事件
    e.stopPropagation();
    
    // 切换文字显示状态
    toggleTextVisibility();
});

// 提取文字显示/隐藏逻辑为单独函数
function toggleTextVisibility() {
    const isActive = mainCard.classList.toggle('active');
    
    // 根据状态显示/隐藏文字
    if (isActive) {
        leftText.classList.add('active');
        rightText.classList.add('active');
    } else {
        leftText.classList.remove('active');
        rightText.classList.remove('active');
    }
}



// 事件监听
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('play', () => {
    state.playing = true;
    cardContainer.classList.add('playing');
    playBtn.textContent = '⏸';
    // 播放时显示文字
    showText();
});

audio.addEventListener('pause', () => {
    state.playing = false;
    cardContainer.classList.remove('playing');
    playBtn.textContent = '▶';
    // 如果卡片不是主动激活状态，则隐藏文字
    if (!mainCard.classList.contains('active')) {
        hideText();
    }
});
audio.addEventListener('ended', () => audio.play());


// 提取显示/隐藏文字的函数
function showText() {
    mainCard.classList.add('active');
    leftText.classList.add('active');
    rightText.classList.add('active');
}

function hideText() {
    mainCard.classList.remove('active');
    leftText.classList.remove('active');
    rightText.classList.remove('active');
}

document.getElementById('prev-btn').addEventListener('click', () => {
    const songs = songCategories[currentCategory];
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

document.getElementById('next-btn').addEventListener('click', () => {
    const songs = songCategories[currentCategory];
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

playBtn.addEventListener('click', () => state.playing ? audio.pause() : audio.play());

// 进度条控制
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
});

// 修改菜单图标点击事件
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    tabContainer.classList.toggle('active');
});

// 添加全局点击事件处理
document.addEventListener('click', (e) => {
    // 如果点击的不是选项卡相关元素，则隐藏选项卡
    if (!e.target.closest('.tab-container') && !e.target.closest('#menu-icon')) {
        tabContainer.classList.remove('active');
    }
});

// 分类导航切换
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        // 更新活动状态
        document.querySelectorAll('.category-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // 切换分类
        currentCategory = this.getAttribute('data-category');
        currentSongIndex = 0;
        generateTabs();
        loadSong(currentSongIndex);
    });
});

// 在DOM加载完成后添加视频检测逻辑
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    
    // 检测视频是否可播放
    if(video) {
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
    }

    // 原有其他JavaScript代码保持不变
    // ...
});
// 辅助函数
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 初始化
initPlayer();