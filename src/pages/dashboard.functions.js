import {storage} from '@core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="dashboard__table-record">
      <a href="#excel/${id}">${model.title}</a>
      <b>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </b>
    </li>
  `
}

// excel:123123
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p> Вы пока ни создали ни одной таблицы </p>`
  }

  return `
    <div class="dashboard__view">
      <div class="dashboard__table-header">
          <span>
              Название
          </span>
          <span>
              Дата Открытия
          </span>
      </div>
      <ul class="dashboard__table-list">
        ${keys.map(toHTML).join('')}
      </ul>
    </div>
  `
}
