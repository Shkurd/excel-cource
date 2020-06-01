import {TABLE_RESIZE} from './types'

// Pure Function
export function rootReducer(state, action) {
  let prevState
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      console.log(field)
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [field]: prevState} // id, value
    default: return state
  }
}
