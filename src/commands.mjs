const translateX = (v, point) => v + point[0];
const translateY = (v, point) => v + point[1];

export default {
  m: {
    name: 'Move to',
    description: 'M {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
    ],
    point: (v) => ({
      x: v[0],
      y: v[1],
    }),
    coordinates: (v) => [
      [v[0], v[1]],
    ],
  },
  l: {
    name: 'Line to',
    description: 'L {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
    ],
    point: (v) => ({
      x: v[0],
      y: v[1],
    }),
    coordinates: (v, coordinate) => [
      [v[0] + coordinate[0], v[1] + coordinate[1]],
    ],
  },
  h: {
    name: 'Horizontal Line to',
    description: 'H {{number:x}}',
    translate: (v, point) => [
      translateX(v[0], point),
    ],
    scale: (v, s) => [
      v[0] * s,
    ],
    point: (v) => ({
      x: v[0],
      y: null,
    }),
    coordinates: (v, coordinate) => [
      [v[0] + coordinate[0], coordinate[1]],
    ],
  },
  v: {
    name: 'Vertical Line to',
    description: 'V {{number:x}}',
    translate: (v, point) => [
      translateY(v[0], point),
    ],
    scale: (v, s) => [
      v[0] * s,
    ],
    point: (v) => ({
      x: null,
      y: v[0],
    }),
    coordinates: (v, coordinate) => [
      [coordinate[0], v[0] + coordinate[1]],
    ],
  },
  a: {
    name: 'Arc to',
    description: 'A {{number:rx}} {{number:ry}} {{x-axis-rotation:0||1}} {{large-arc-flag}:0||1} {{sweep-flag}:0||1} {{number:x}} {{number:y}}',
    translate: (v, point) => [
      v[0],
      v[1],
      v[2],
      v[3],
      v[4],
      translateX(v[5], point),
      translateY(v[6], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
      v[2],
      v[3],
      v[4],
      v[5] * s,
      v[6] * s,
    ],
    point: (v) => ({
      x: v[5],
      y: v[6],
    }),
  },
  c: {
    name: 'Cubic Bézier Curve',
    description: 'C {{number:x}} {{number:y}}, {{number:x}} {{number:y}}, {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
      translateX(v[2], point),
      translateY(v[3], point),
      translateX(v[4], point),
      translateY(v[5], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
      v[2] * s,
      v[3] * s,
      v[4] * s,
      v[5] * s,
    ],
    point: (v) => ({
      x: v[4],
      y: v[5],
    }),
  },
  s: {
    name: 'Smooth Cubic Bézier Curve',
    description: 'S {{number:x}} {{number:y}}, {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
      translateX(v[2], point),
      translateY(v[3], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
      v[2] * s,
      v[3] * s,
    ],
    point: (v) => ({
      x: v[2],
      y: v[3],
    }),
  },
  q: {
    name: 'Quadratic Bézier Curve',
    description: 'Q {{number:x}} {{number:y}}, {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
      translateX(v[2], point),
      translateY(v[3], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
      v[2] * s,
      v[3] * s,
    ],
    point: (v) => ({
      x: v[2],
      y: v[3],
    }),
  },
  t: {
    name: 'Smooth Quadratic Bézier Curve',
    description: 'T {{number:x}} {{number:y}}',
    translate: (v, point) => [
      translateX(v[0], point),
      translateY(v[1], point),
    ],
    scale: (v, s) => [
      v[0] * s,
      v[1] * s,
    ],
    point: (v) => ({
      x: v[0],
      y: v[1],
    }),
  },
  z: {
    name: 'Close Path',
    description: 'Z',
    translate: () => [],
    scale: () => [],
    point: () => ({
      x: null,
      y: null,
    }),
  },
};
