const toRadian = (angle) => angle / 180  * Math.PI;

export default ({
  cx,
  cy,
  rx,
  ry,
  start,
  end,
  count = 50,
}) => {
  const result = [];
  const per = (end - start) / (count - 1);

  for (let i = 0; i < count; i++) {
    const angle = start + per * i;
    const radian = toRadian(angle);
    result.push({
      x: cx + Math.cos(radian) * rx,
      y: cy + Math.sin(radian) * ry,
      radian,
      angle,
    });
  }

  return result;
};
