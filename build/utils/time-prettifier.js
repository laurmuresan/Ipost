export default function prettify(time) {
  return (time > 999) ? `${(time / 1000).toFixed(2)}s` : `${time}ms`
}
