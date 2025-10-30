import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Title, Tooltip, Legend);

Chart.register({
  id: 'doughnutTextInside',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
    const { text, font, color, subText } = options;
    
    if (!text) return;

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    // แสดงข้อความหลัก
    ctx.font = '8px';
    ctx.fillText(text, centerX, centerY - 20); // ปรับตำแหน่งตามต้องการ
    // แสดงข้อความรอง
    if (subText) {
      ctx.font = '24px Verdana'; // ขนาดฟอนต์สำหรับข้อความรอง
      ctx.fillText(subText, centerX, centerY + 10); // ปรับตำแหน่งตามต้องการ
    }

    ctx.restore();
  },
});
