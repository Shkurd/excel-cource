const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, rowIndex) {
  return function(_, colIndex) {
    const width = getWidth(state, colIndex)
    return `
    <div class="excel__table-row-data-cell"
      contenteditable
      data-col="${colIndex}"
      data-row="${rowIndex}"
      data-type="cell"
      data-id="${rowIndex}:${colIndex}"
      style="width:${width}">
    </div>
  `
  }
}

function toColumn({col, index, width}) {
  return `
    <div class="excel__table-row-data-column"
     data-type="resizeble"
     data-col="${index}"
     style="width:${width}">
      ${col}
      <div class="excel__table-row-data-column-resize" data-resize="col">
      </div>
    </div>
  `
}

function createRow(index, content, state) {
  const resizer = index
    ? '<div class="excel__table-row-info-resize" data-resize="row"></div>'
    : ''
  const height = getHeight(state, index)
  return `
    <div class="excel__table-row"
     data-type="resizeble"
      data-row="${index}"
      style="height:${height}"
      >
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

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

// function withHeightFrom(state) {
//   return function(row, index) {
//     return {
//       row, index, height: getHeight(state.colState, index)
//     }
//   }
// }

export function createTable(rowsCount = 10, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  // формируем первую строку с заголовками - A, B, С... и т.д
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  // формируем последующие строки 1,2,3... + ячейки таблицы для них
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col)=>toCell(row, col))
        .map(toCell(state.colState, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
