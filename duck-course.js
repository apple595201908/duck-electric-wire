/**
 * duck-course.js - 33,000px 真實經典《電流急急棒》(電流イライラ棒) 巨大動態主機關賽道核心
 * 
 * 1. 【巨大動態機關主導閃避 (Giant Dynamic Obstacles)】：
 *    - 徹底移除零碎、裝飾性無意義的靜態短鐵棒！全賽道每個區間均由 1~2 座「巨大動態機關」決定唯一逃生動線。
 *    - 大量配置【巨大三叉旋轉高壓鋼樑 (GiantTriSpokeRotor)】(半徑達 105px，橫跨 210px 賽道)：
 *      - 包含正轉 (CW 順時針) 與逆轉 (CCW 逆時針) 兩種動態。
 *      - 居中放置、左側偏置、右側偏置，強迫玩家必須掌握時差進行 2D 多元動態閃避！
 *    - 配置【巨大對向雙三叉旋轉鋼樑 (TwinCounterRotors)】：一正一逆雙輪咬合，形成極度驚險的時差沙漏通道！
 *    - 配置【巨大重型液壓活塞 (GiantHydraulicCompactor)】、【巨大金屬起重懸臂 (GiantCantileverBoom)】、【巨大重力破壞球 (GiantHeavyPendulum)】、【巨大斜向斷頭鍘 (GiantDiagonalSlicer)】。
 * 
 * 2. 【二維多元閃避軌跡 (X 左右微操 + Y 前後調速衝放)】：
 *    - 閃避不再只是單調的左右切換，玩家必須在上下方向（Y 軸）進行「後拉滯空等刀口過」、「前衝加速鑽縫隙」，達到極致緊張刺激感！
 * 
 * 3. 【隱藏引導軌跡線】：
 *    - 徹底移除場景中心虛擬虛線，回歸純粹的高壓電工廠黑暗氛圍與視覺專注度。
 */

class DuckCourse {
  constructor() {
    this.totalLength = 33000;
    this.centerX = 200;
    this.segments = [];
    this.mechanisms = [];
    this.sirenAngle = 0;

    this.zones = [
      { name: 'Stage 0: ⚡ 起跑衝刺整備區 (0:00)', startY: 0, endY: 1350, color: '#10b981', danger: 0.1 },
      { name: 'Stage 1: 🌪️ 巨型三叉旋轉鋼樑與交錯橫鋼初陣 (0:12)', startY: 1350, endY: 3400, color: '#00f0ff', danger: 0.2 },
      { name: 'Stage 2: ⚙️ 雙三叉咬合齒輪與波浪滑移橫桿狹道 (0:31)', startY: 3400, endY: 5450, color: '#38bdf8', danger: 0.25 },
      { name: 'Stage 3: 💥 巨型黑黃液壓活塞與交錯之字長桿 (0:50)', startY: 5450, endY: 7500, color: '#60a5fa', danger: 0.3 },
      { name: 'Stage 4: 🏗️ 巨型起重懸臂橫掃閘與對向滑軌橫桿 (1:08)', startY: 7500, endY: 9550, color: '#818cf8', danger: 0.35 },
      { name: 'Stage 5: 🔔 巨型重金屬破壞球與階梯瀑布格柵 (1:27)', startY: 9550, endY: 11600, color: '#a78bfa', danger: 0.4 },
      { name: 'Stage 6: 🌪️ 逆向旋轉三叉巨樑與高速扭動加長桿 (1:45)', startY: 11600, endY: 13650, color: '#c084fc', danger: 0.45 },
      { name: 'Stage 7: ⚔️ 斜向滑移斷頭鍘與交錯橫桿雙重突圍 (2:04)', startY: 13650, endY: 15700, color: '#e879f9', danger: 0.5 },
      { name: 'Stage 8: 🌪️ 雙輪咬合齒輪與液壓重衝夾桿 (2:23)', startY: 15700, endY: 17750, color: '#f43f5e', danger: 0.55 },
      { name: 'Stage 9: 💥 液壓重型壓縮與巨型破壞球復合陣 (2:41)', startY: 17750, endY: 19800, color: '#fb7185', danger: 0.6 },
      { name: 'Stage 10: 🌪️ 正逆雙三叉連環交錯與波浪橫桿 (3:00)', startY: 19800, endY: 21850, color: '#f87171', danger: 0.7 },
      { name: 'Stage 11: ⚙️ 雙軌滑移斷頭鍘與起重懸臂 (3:19)', startY: 21850, endY: 23900, color: '#fb923c', danger: 0.75 },
      { name: 'Stage 12: 🏗️ 雙向懸臂拍擊與高速對向滑軌 (3:37)', startY: 23900, endY: 25950, color: '#fbbf24', danger: 0.8 },
      { name: 'Stage 13: 🌪️ 逆轉巨型三叉鋼樑極限群與加長橫鋼陣 (3:56)', startY: 25950, endY: 28000, color: '#facc15', danger: 0.85 },
      { name: 'Stage 14: 🚨 雙三叉咬合與全機關狂暴過載區 (4:15)', startY: 28000, endY: 30050, color: '#ef4444', danger: 0.9 },
      { name: 'Stage 15: 💥 四分鐘極限死鬥終極旋轉海與十萬伏特橫鋼群 (4:33)', startY: 30050, endY: 32500, color: '#dc2626', danger: 1.0 },
      { name: '終點：🏆 十萬伏特特工鴨神殿堂 (5:00)', startY: 32500, endY: 33000, color: '#ffd700', danger: 0.0 }
    ];

    this.initCourse();
  }

  initCourse() {
    this.buildCorridors();
    this.populateMechanisms();
  }

  buildCorridors() {
    const waypoints = [
      { y: 0, left: 30, right: 370 },
      { y: 1500, left: 30, right: 370 },
      { y: 5500, left: 32, right: 368 },
      { y: 11500, left: 34, right: 366 },
      { y: 17500, left: 36, right: 364 },
      { y: 23500, left: 38, right: 362 },
      { y: 28000, left: 40, right: 360 },
      { y: 30500, left: 42, right: 358 },
      { y: 32500, left: 36, right: 364 },
      { y: 33000, left: 20, right: 380 }
    ];

    this.segments = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
      this.segments.push({
        y1: waypoints[i].y,
        y2: waypoints[i + 1].y,
        left1: waypoints[i].left,
        left2: waypoints[i + 1].left,
        right1: waypoints[i].right,
        right2: waypoints[i + 1].right
      });
    }
  }

  getCorridorBoundsAt(y) {
    for (const seg of this.segments) {
      if (y >= seg.y1 && y <= seg.y2) {
        const ratio = (y - seg.y1) / (seg.y2 - seg.y1);
        const left = seg.left1 + (seg.left2 - seg.left1) * ratio;
        const right = seg.right1 + (seg.right2 - seg.right1) * ratio;
        return { left, right };
      }
    }
    return { left: 30, right: 370 };
  }

  // 最佳理想連續動態閃避中線（靈活蛇行扭動曲線，左右擺幅約 70~90px）
  getIdealPathX(y) {
    return 200 + 70 * Math.sin(y * 0.011) + 20 * Math.sin(y * 0.0043 + 1.5);
  }

  // ===========================================================================
  // 鋪設 100% 人類反應合理性之「巨大動態機關」與「加長橫鋼桿」豐富賽道
  // ===========================================================================
  populateMechanisms() {
    this.mechanisms = [];
    const stepY = 155; // 每 155px 一處震撼主題機關 (全賽道 207 組，節奏緊湊無冷場)
    let mCount = 0;

    for (let y = 450; y <= 32500; y += stepY) {
      mCount++;
      const idealX = this.getIdealPathX(y);
      const typeChoice = mCount % 13;

      if (typeChoice === 0) {
        // 1. 巨型加長左右交錯橫鋼桿 (ElongatedSlalomRod) - 跨越中線，強烈左右扭動感
        const isRight = idealX >= 200;
        const side = isRight ? 'left' : 'right';
        const tipX = isRight
          ? Math.min(235, Math.max(185, idealX - 55))
          : Math.max(165, Math.min(215, idealX + 55));
        this.mechanisms.push(new window.ElongatedSlalomRod({
          cy: y, side, tipX, thickness: 13, swayAmp: 8, swayFreq: 1.0, color: '#00f0ff', style: 'hazard'
        }));
      } else if (typeChoice === 1) {
        // 2. 巨大三叉旋轉鋼樑 (正轉 CW) - 依據避障路徑偏置，開闢 155px 逃生通道
        const cx = idealX >= 200 ? 140 : 260;
        this.mechanisms.push(new window.GiantTriSpokeRotor({
          cy: y, cx, length: 75, speed: 0.50, startAngle: (mCount * 1.1) % 6.28
        }));
      } else if (typeChoice === 2) {
        // 3. 巨型 S 型波浪滑移金屬套管陣 (SlalomWaveBars) - 波浪位移橫桿，155px 寬裕走廊
        this.mechanisms.push(new window.SlalomWaveBars({
          cy: y, baseCenterX: idealX, gapWidth: 155, amplitude: 25, freq: 0.9, color: '#38bdf8', style: 'conduit'
        }));
      } else if (typeChoice === 3) {
        // 4. 巨大對向雙三叉旋轉鋼樑 (TwinCounterRotors) - 縱向錯位 90px，S 型齒輪咬合門
        this.mechanisms.push(new window.TwinCounterRotors({
          cy: y, cx1: 140, cx2: 260
        }));
      } else if (typeChoice === 4) {
        // 5. 巨型加長左右交錯橫鋼桿 (ElongatedSlalomRod - 反向對稱) - 經典鍍鉻鏡面質感
        const isRight = idealX >= 200;
        const side = isRight ? 'left' : 'right';
        const tipX = isRight
          ? Math.min(230, Math.max(180, idealX - 50))
          : Math.max(170, Math.min(220, idealX + 50));
        this.mechanisms.push(new window.ElongatedSlalomRod({
          cy: y, side, tipX, thickness: 13, swayAmp: 8, swayFreq: 1.1, color: '#fbbf24', style: 'chrome'
        }));
      } else if (typeChoice === 5) {
        // 6. 巨大黑黃液壓重型壓縮活塞 (GiantHydraulicCompactor) - 最小開口 155px，絕無壓殺
        this.mechanisms.push(new window.GiantHydraulicCompactor({
          cy: y, period: 3.8, phase: mCount * 0.4
        }));
      } else if (typeChoice === 6) {
        // 7. 巨型對向滑移雙聯軌道橫桿 (ReciprocatingSlideBars) - 雙軌平滑開闔
        this.mechanisms.push(new window.ReciprocatingSlideBars({
          cy: y, gapWidth: 156, period: 3.6, color: '#e879f9', style: 'double_rail'
        }));
      } else if (typeChoice === 7) {
        // 8. 巨大三叉旋轉鋼樑 (逆轉 CCW) - 反向破壞慣性節奏，提供 155px 逃生大道
        const cx = idealX >= 200 ? 140 : 260;
        this.mechanisms.push(new window.GiantTriSpokeRotor({
          cy: y, cx, length: 75, speed: -0.50, startAngle: (mCount * 1.3) % 6.28
        }));
      } else if (typeChoice === 8) {
        // 9. 巨型之字交錯橫桿走廊 (ZigzagChicaneBars) - 鋸齒折線急轉橫桿
        this.mechanisms.push(new window.ZigzagChicaneBars({
          cy: y, gapWidth: 160, color: '#f43f5e', style: 'serrated'
        }));
      } else if (typeChoice === 9) {
        // 10. 巨大重金屬起重懸臂橫掃鋼樑 (GiantCantileverBoom) - 對側保留 195px 完整半場通衢
        const side = idealX >= 200 ? 'left' : 'right';
        this.mechanisms.push(new window.GiantCantileverBoom({
          cy: y, side, phase: mCount * 0.5
        }));
      } else if (typeChoice === 10) {
        // 11. 巨型階梯瀑布交錯格柵 (WaterfallConveyorBars) - 階梯式滑動橫格柵
        this.mechanisms.push(new window.WaterfallConveyorBars({
          cy: y, gapWidth: 155, color: '#facc15', style: 'conduit'
        }));
      } else if (typeChoice === 11) {
        // 12. 巨大重金屬鐘擺破壞球 (GiantHeavyPendulum) - 中心蕩漾，左右各 110px 避風港
        this.mechanisms.push(new window.GiantHeavyPendulum({
          cy: y, phase: mCount * 0.3
        }));
      } else {
        // 13. 巨大斜向滑移斷頭鍘 (GiantDiagonalSlicer) - 156px 寬裕斜切滑道
        this.mechanisms.push(new window.GiantDiagonalSlicer({
          cy: y, period: 3.8, phase: mCount * 0.4
        }));
      }
    }
  }

  getCurrentZone(y) {
    for (const z of this.zones) {
      if (y >= z.startY && y <= z.endY) {
        return z;
      }
    }
    return this.zones[this.zones.length - 1];
  }

  update(dt, duck) {
    this.sirenAngle += dt * 4;

    for (const m of this.mechanisms) {
      if (m.update) m.update(dt);
    }
  }

  checkCollision(px, py, pr) {
    const bounds = this.getCorridorBoundsAt(py);
    if (px - pr < bounds.left) return { hit: true, cause: 'wall_left' };
    if (px + pr > bounds.right) return { hit: true, cause: 'wall_right' };

    for (const m of this.mechanisms) {
      const my = m.cy || 0;
      if (Math.abs(py - my) < 140) {
        if (m.checkCollision(px, py, pr)) {
          return { hit: true, cause: m.type };
        }
      }
    }
    return { hit: false };
  }

  checkNearWarning(px, py, pr) {
    const bounds = this.getCorridorBoundsAt(py);
    const warnDist = 18;
    if (px - pr - bounds.left < warnDist || bounds.right - (px + pr) < warnDist) {
      return true;
    }
    for (const m of this.mechanisms) {
      const my = m.cy || 0;
      if (Math.abs(py - my) < 120) {
        if (m.checkCollision(px, py, pr + 14)) {
          return true;
        }
      }
    }
    return false;
  }

  drawEnvironment(ctx, viewY, viewHeight) {
    const minY = viewY - 100;
    const maxY = viewY + viewHeight + 100;

    // 1. 深色高壓工廠背景
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(-100, minY, 600, maxY - minY);

    // 2. 工業背景格線
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    const startGridY = Math.floor(minY / gridSpacing) * gridSpacing;
    ctx.beginPath();
    for (let gy = startGridY; gy <= maxY; gy += gridSpacing) {
      ctx.moveTo(-100, gy);
      ctx.lineTo(500, gy);
    }
    for (let gx = 0; gx <= 400; gx += gridSpacing) {
      ctx.moveTo(gx, minY);
      ctx.lineTo(gx, maxY);
    }
    ctx.stroke();

    // ★ 依據使用者反饋：徹底移除引導虛線，還原乾淨刺激的高壓電工廠氛圍！

    // 3. 左右邊界高壓電弧壁
    for (const seg of this.segments) {
      if (seg.y2 < minY || seg.y1 > maxY) continue;

      ctx.fillStyle = '#050811';
      ctx.fillRect(-100, seg.y1, seg.left1 + 100, seg.y2 - seg.y1);
      ctx.fillRect(seg.right1, seg.y1, 500 - seg.right1, seg.y2 - seg.y1);

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(seg.left1, seg.y1);
      ctx.lineTo(seg.left2, seg.y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(seg.right1, seg.y1);
      ctx.lineTo(seg.right2, seg.y2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 4. 繪製視野內之巨大動態機關
    for (const m of this.mechanisms) {
      const my = m.cy || 0;
      if (my >= minY - 160 && my <= maxY + 160) {
        m.draw(ctx);
      }
    }
  }
}

window.DuckCourse = DuckCourse;
