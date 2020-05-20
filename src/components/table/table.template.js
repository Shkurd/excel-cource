const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="excel__table-row-data-cell" contenteditable> </div>
  `
}

function toColumn(col) {
  return `
    <div class="excel__table-row-data-column" data-type="resizeble">
      ${col}
      <div class="excel__table-row-data-column-resize" data-resize="col">
      </div>  
    </div>
  `
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="excel__table-row-info-resize" data-resize="row"></div>'
    : ''
  return `
    <div class="excel__table-row">
      <div class="excel__table-row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="excel__table-row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 10) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // формируем первую строку с заголовками - A, B, С... и т.д
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  // формируем последующие строки 1,2,3... + ячейки таблицы для них
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
