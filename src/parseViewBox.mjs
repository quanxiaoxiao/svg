export default (str, viewBox = [1024, 1024]) => {
  const [width, height] = viewBox;
  if (!str) {
    return [width, height];
  }
  const arr = str.trim().split(/\s+/);
  if (arr.length !== 4) {
    return [width, height];
  }
  const w = Number(arr[2]);
  const h = Number(arr[3]);
  if (`${w}` !== arr[2] || `${h}` !== arr[3]) {
    return [width, height];
  }
  if (w <= 0 || h <= 0) {
    return [width, height];
  }
  return [
    Math.floor(w),
    Math.floor(h),
  ];
};
