export default ({
  width,
  height,
  bbox,
}) => {
  const viewWidth = bbox[2] - bbox[0];
  const viewHeight = bbox[3] - bbox[1];

  const ratioWithView = viewHeight / viewWidth;
  const ratioWithContainer = height / width;
  if (ratioWithView > ratioWithContainer) {
    const scale = height / viewHeight;
    return {
      x: -bbox[0] * scale + (width - viewWidth * scale) / 2,
      y: -bbox[1] * scale - (height - viewHeight * scale) / 2,
      scale,
    };
  }
  const scale = width / viewWidth;
  return {
    x: -bbox[0] * scale - (width - viewWidth * scale) / 2,
    y: -bbox[1] * scale + (height - viewHeight * scale) / 2,
    scale,
  };
};
