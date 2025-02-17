export default ({
  bbox,
  viewBox,
}) => {
  const [width, height] = viewBox;
  const rect = {
    x: -bbox[0],
    y: -bbox[1],
    width: bbox[2] - bbox[0],
    height: bbox[3] - bbox[1],
    viewSize: Math.max(width, height),
    scale: 1,
  };
  rect.x += (rect.viewSize - rect.width) * 0.5;
  rect.y += (rect.viewSize - rect.height) * 0.5;
  rect.scale = rect.viewSize / Math.max(rect.width, rect.height);
  if (rect.scale !== 1) {
    rect.x += (1 - rect.scale) * 0.5 * rect.viewSize;
    rect.y += (1 - rect.scale) * 0.5 * rect.viewSize;
  }
  return rect;
};
