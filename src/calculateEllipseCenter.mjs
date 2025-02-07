export default (
  x0,
  y0,
  rx,
  ry,
  xAxisRotation,
  largeArcFlag,
  sweepFlag,
  x1,
  y1,
)  => {
  // 将角度转换为弧度
  const rad = (xAxisRotation * Math.PI) / 180;
  const cosRad = Math.cos(rad);
  const sinRad = Math.sin(rad);

  // 计算起点和终点的中点
  const dx = (x0 - x1) / 2;
  const dy = (y0 - y1) / 2;

  // 旋转坐标系，使其对齐 x1 轴
  const x1p = cosRad * dx + sinRad * dy;
  const y1p = -sinRad * dx + cosRad * dy;

  // 计算半径校正，防止无效半径
  const rxSq = rx * rx;
  const rySq = ry * ry;
  const x1pSq = x1p * x1p;
  const y1pSq = y1p * y1p;

  let radiusCorrection = Math.sqrt(
    Math.max(0, (rxSq * rySq - rxSq * y1pSq - rySq * x1pSq) / (rxSq * y1pSq + rySq * x1pSq)),
  );
  if (largeArcFlag === sweepFlag) {
    radiusCorrection = -radiusCorrection;
  };

  // 计算旋转后椭圆中心点 (cx', cy')
  const cxp = radiusCorrection * ((rx * y1p) / ry);
  const cyp = radiusCorrection * (-(ry * x1p) / rx);

  // 旋转回原坐标系
  const cx = cosRad * cxp - sinRad * cyp + (x0 + x1) / 2;
  const cy = sinRad * cxp + cosRad * cyp + (y0 + y1) / 2;

  return [cx, cy];
};
