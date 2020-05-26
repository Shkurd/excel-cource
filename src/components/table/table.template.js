const CODES = {
  A: 65,
  Z: 90
}
/*
function toCell(rowIndex, colIndex) {
  return `
    <div class="excel__table-row-data-cell"
     contenteditable data-col="${colIndex}" data-row="${rowIndex}"> </div>
  `
}
*/

function toCell(rowIndex) {
  return function(_, colIndex) {
    return `
    <div class="excel__table-row-data-cell"
      contenteditable
      data-col="${colIndex}"
      data-row="${rowIndex}"
      data-type="cell"
      data-id="${rowIndex}:${colIndex}">
    </div>
  `
  }
}

function toColumn(col, index) {
  return `
    <div class="excel__table-row-data-column" data-type="resizeble"
     data-col="${index}">
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
    <div class="excel__table-row" data-type="resizeble">
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
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col)=>toCell(row, col))
        .map(toCell(row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
