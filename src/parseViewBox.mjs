export default (str) => {
  if (!str) {
    return null;
  }
  const arr = str.trim().split(/\s+/);
  if (arr.length !== 4) {
    return null;
  }
  const w = Number(arr[2]);
  const h = Number(arr[3]);
  if (`${w}` !== arr[2] || `${h}` !== arr[3]) {
    return null;
  }
  if (w <= 0 || h <= 0) {
    return null;
  }
  return [
    Math.floor(w),
    Math.floor(h),
  ];
};
