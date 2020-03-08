export function formatId(id) {
  return `#${id > 9 ? id : `0${id}`}`;
}
