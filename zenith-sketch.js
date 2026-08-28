/* Zenith — schematické nákresy k princípom. Jednoduché tvary: kyblíky, palíčkové postavy, tabuľa. */
(function () {
  var R = window.React;
  var ink = 'var(--color-neutral-800)';
  var acc = 'var(--color-accent)';
  var sage = 'var(--color-accent-2-500)';

  function e(tag, props, children) { return R.createElement(tag, props, children); }
  function txt(x, y, s, anchor, size) {
    return e('text', { x: x, y: y, textAnchor: anchor || 'middle', fontSize: size || 11, fill: ink, fontFamily: 'var(--font-body)' }, s);
  }

  function buckets(L) {
    var fills = [0.78, 0.42, 0.2];
    var cols = [acc, sage, 'var(--color-neutral-400)'];
    var g = [];
    for (var i = 0; i < 3; i++) {
      var x = 26 + i * 92, w = 62, top = 22, h = 68;
      var fh = h * fills[i];
      g.push(e('g', { key: 'b' + i }, [
        e('path', { key: 'f', d: 'M' + (x + 5) + ' ' + (top + h - fh) + ' L' + (x + w - 5) + ' ' + (top + h - fh) + ' L' + (x + w - 9) + ' ' + (top + h) + ' L' + (x + 9) + ' ' + (top + h) + ' Z', fill: cols[i], opacity: 0.85 }),
        e('path', { key: 'o', d: 'M' + x + ' ' + top + ' L' + (x + w) + ' ' + top + ' L' + (x + w - 9) + ' ' + (top + h) + ' L' + (x + 9) + ' ' + (top + h) + ' Z', fill: 'none', stroke: ink, strokeWidth: 2.2, strokeLinejoin: 'round' }),
        e('ellipse', { key: 'r', cx: x + w / 2, cy: top, rx: w / 2, ry: 5, fill: 'none', stroke: ink, strokeWidth: 2.2 }),
        txt(x + w / 2, top + h + 18, (L[i] || '').slice(0, 14))
      ]));
    }
    return g;
  }

  function figure(cx, cy, scale, color) {
    var s = scale || 1;
    return e('g', { stroke: color || ink, strokeWidth: 2.4, strokeLinecap: 'round', fill: 'none' }, [
      e('circle', { key: 'h', cx: cx, cy: cy - 22 * s, r: 9 * s, fill: 'var(--color-bg)' }),
      e('line', { key: 'b', x1: cx, y1: cy - 13 * s, x2: cx, y2: cy + 10 * s }),
      e('line', { key: 'a1', x1: cx, y1: cy - 6 * s, x2: cx - 13 * s, y2: cy + 3 * s }),
      e('line', { key: 'a2', x1: cx, y1: cy - 6 * s, x2: cx + 13 * s, y2: cy + 3 * s }),
      e('line', { key: 'l1', x1: cx, y1: cy + 10 * s, x2: cx - 10 * s, y2: cy + 28 * s }),
      e('line', { key: 'l2', x1: cx, y1: cy + 10 * s, x2: cx + 10 * s, y2: cy + 28 * s })
    ]);
  }

  function stick(L) {
    return [
      figure(56, 58, 1, ink),
      figure(244, 58, 1, ink),
      e('path', { key: 'arr', d: 'M92 56 C 130 34, 172 34, 208 56', fill: 'none', stroke: acc, strokeWidth: 2.6, strokeLinecap: 'round' }),
      e('path', { key: 'ah', d: 'M200 48 L209 57 L198 62', fill: 'none', stroke: acc, strokeWidth: 2.6, strokeLinecap: 'round' }),
      txt(150, 30, (L[2] || '').slice(0, 18), 'middle', 11),
      txt(56, 108, (L[0] || '').slice(0, 14)),
      txt(244, 108, (L[1] || '').slice(0, 14))
    ];
  }

  function board(L) {
    return [
      e('rect', { key: 'b', x: 16, y: 14, width: 268, height: 84, rx: 6, fill: 'var(--color-neutral-200)', stroke: ink, strokeWidth: 2.4 }),
      e('rect', { key: 'l', x: 16, y: 98, width: 268, height: 7, rx: 3, fill: ink }),
      e('circle', { key: 'c1', cx: 58, cy: 52, r: 17, fill: 'var(--color-bg)', stroke: ink, strokeWidth: 2.2 }),
      e('circle', { key: 'c2', cx: 152, cy: 52, r: 17, fill: 'var(--color-bg)', stroke: ink, strokeWidth: 2.2 }),
      e('circle', { key: 'c3', cx: 246, cy: 52, r: 17, fill: acc, stroke: ink, strokeWidth: 2.2 }),
      e('path', { key: 'a1', d: 'M79 52 L127 52', stroke: ink, strokeWidth: 2.2, strokeLinecap: 'round' }),
      e('path', { key: 'a1h', d: 'M120 46 L128 52 L120 58', fill: 'none', stroke: ink, strokeWidth: 2.2, strokeLinecap: 'round' }),
      e('path', { key: 'a2', d: 'M173 52 L221 52', stroke: ink, strokeWidth: 2.2, strokeLinecap: 'round' }),
      e('path', { key: 'a2h', d: 'M214 46 L222 52 L214 58', fill: 'none', stroke: ink, strokeWidth: 2.2, strokeLinecap: 'round' }),
      txt(58, 84, (L[0] || '').slice(0, 12)),
      txt(152, 84, (L[1] || '').slice(0, 12)),
      txt(246, 84, (L[2] || '').slice(0, 12))
    ];
  }

  function ZenithSketch(props) {
    var L = Array.isArray(props.labels) ? props.labels : ['', '', ''];
    var kind = props.kind || 'buckets';
    var body = kind === 'stick' ? stick(L) : kind === 'board' ? board(L) : buckets(L);
    return e('svg', {
      viewBox: '0 0 300 122', width: '100%', style: { display: 'block', height: 'auto', maxHeight: 170 },
      role: 'img', 'aria-label': 'Schematický nákres princípu'
    }, body);
  }

  window.ZenithSketch = ZenithSketch;
})();
