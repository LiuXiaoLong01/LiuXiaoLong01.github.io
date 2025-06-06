// 一言
// 获取一言数据的函数
function fetchHitokoto() {
    fetch('https://international.v1.hitokoto.cn/')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            // 格式化显示内容
            let displayText = '';
            if (data.hitokoto) {
                displayText += data.hitokoto;
            }

            if (data.from_who) {
                displayText += ' —— ' + data.from_who;
            } else {
                displayText += ' —— 匿名';
            }

            if (data.from) {
                displayText += ' 【' + data.from + '】';
            }

            // 更新DOM
            document.getElementById('hitokototext').textContent = displayText;
        })
        .catch(error => {
            console.error('获取一言时出错:', error);
            document.getElementById('hitokototext').textContent = '获取一言失败，请稍后再试';
        });
}

// 初始加载
fetchHitokoto();

// 设置定时器，每10秒更新一次
setInterval(fetchHitokoto, 10000);


// 网站运行时间
const startTime = new Date("2019-08-01T00:00:00"); // 设置建站时间
// 更新运行时间的函数
function updateUptime() {
    const now = new Date();
    const uptime = now - startTime; // 运行时间（毫秒）
    // 将毫秒转换为天、小时、分钟、秒
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    // 格式化时间显示，美化输出，添加零前导
    const uptimeString = `网站已运行时间：${pad(days)} 天 ${pad(hours)} 时 ${pad(minutes)} 分 ${pad(seconds)} 秒`;
    // 将运行时间显示在页面上
    document.getElementById("uptime").textContent = uptimeString;
}
// 辅助函数，用于添加零前导
function pad(number) {
    return number.toString().padStart(2, '0');
}
// 每秒调用一次updateUptime函数
setInterval(updateUptime, 1000);


// 时间，日期，星期
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    $('#timeDateWeek').text(
        `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日⠀${hour.toString().padStart(2, '0')}时${minute.toString().padStart(2, '0')}分${second.toString().padStart(2, '0')}秒⠀星期${week}`
    );
}
// 每秒更新时间
setInterval(updateTime, 1000);
// 初始时也更新一次时间
updateTime();
