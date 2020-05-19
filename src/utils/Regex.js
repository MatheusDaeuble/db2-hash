const Regex = () =>
  [
    /\s*(select)\s*([a-zA-Z,\s]+)(from)\s*([a-zA-Z]+)\s*$/g,
    /\s*(select)\s*([a-zA-Z,\s]+)(from)\s*([a-zA-Z]+)\s*(where)\s*(.*)(\s^\+|-|\*|\/|=|>|<|>=|&|\||%|!|\ˆ|\(|\))\s*(\d*)\s*$/g,
    // /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*([a-zA-Z ]+)\(\s*([a-zA-Z_]+)\s*\)\s*\)/g,
    // /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*([a-zA-Z ]+)\(\s*([a-zA-Z_]+)\s*\)\s*,\s*constraint\s*([a-zA-Z_]+)\s*([a-zA-Z ]+)\(\s*([a-zA-Z_]+)\)\s*([a-zA-Z_]+)\s*([a-zA-Z_]+)\s*\)/g,
    //tests
    // /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*primary\s*key\(\s*([a-zA-Z_]+)\s*\)\s*\)/g,
    // /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*primary\s*key\(\s*([a-zA-Z_]+)\s*\)\s*,\s*constraint\s*([a-zA-Z_]+)\s*foreign\s*key\(\s*([a-zA-Z_]+)\)\s*references\s*([a-zA-Z_]+)\s*\)/g,
    //multiplie primary keys
    /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*primary\s*key\(\s*([a-zA-Z_\s*,]+)\s*\)\s*\)/g,
    /\s*(create table)\s*([a-zA-Z]+)\s*\(\s*([a-zA-Z_\s*,(0-9)]+)\s*constraint\s*([a-zA-Z_]+)\s*primary\s*key\(\s*([a-zA-Z_\s*,]+)\s*\)\s*,\s*constraint\s*([a-zA-Z_]+)\s*foreign\s*key\(\s*([a-zA-Z_]+)\)\s*references\s*([a-zA-Z_]+)\s*\)/g
  ]

export const createTableSubRegex = /\s*([a-zA-Z_]+)\s*(varchar|int|decimal)?\(?([0-9\s*,]+)?\)?([not\s*null]+)?\s*,/gm

export const testQuerie = (str, regex) => {
  let groups = []
  let group
  while ((m = regex.exec(str)) !== null) {
      group = []
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      groups.push(m)
  }
  return groups
}


export default Regex
