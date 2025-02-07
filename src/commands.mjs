const translateX = (v, point) => v + point[0];
const translateY = (v, point) => v + point[1];

export default {
  m: {
    command: 'moveto',
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
  h: {
    command: 'horizontal lineto',
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
    command: 'vertical lineto',
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
  l: {
    command: 'lineto',
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
  a: {
    command: 'elliptical arc',
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
    command: 'curveto',
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
    command: 'smooth curveto',
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
    command: 'quadratic curveto',
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
    command: 'smooth quadratic curveto',
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
    command: 'closepath',
    translate: () => [],
    scale: () => [],
    point: () => ({
      x: null,
      y: null,
    }),
  },
};
