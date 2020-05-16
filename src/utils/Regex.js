const Regex = () =>
  [
    /\s*(select)\s*([a-zA-Z,\s]+)(from)\s*([a-zA-Z]+)\s*$/g,
    /\s*(select)\s*([a-zA-Z,\s]+)(from)\s*([a-zA-Z]+)\s*(where)\s*(.*)(\s^\+|-|\*|\/|=|>|<|>=|&|\||%|!|\ˆ|\(|\))\s*(\d*)\s*$/g,
    /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*([a-zA-Z ]+)\(\s*([a-zA-Z_]+)\s*\)\s*\)/g
  ]

export const createTableSubRegex = /\s*([a-zA-Z_]+)\s*(varchar|int)\(?([0-9]+)?\)?\s*([a-zA-Z ]+)?$/gm

export default Regex
