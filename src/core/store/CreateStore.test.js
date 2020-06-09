// jest не понмает путей алиаса вебпака начинающегося с "@" и вообще import-ов
// поэтому так, как ниже написать не получится
// import {CreateStore} from '@core/store/CreateStore'

import {CreateStore} from './CreateStore'

// Тестируем работоспособность jest-а

describe('TEST', () => {
  // ТЕСТ 1
  test('test', () => {
    expect(1).toBe(1)
  })
})

// вспомогательный элемент
const initialState = {
  count: 0
}

// вспомогательный элемент для теста ниже
const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

// описание теста для класса CreateStore

describe('createStore', () => {
  let store
  let handler

  beforeEach(() => {
    store = new CreateStore(reducer, initialState)
    handler = jest.fn()
  })

  // ТЕСТ 2
  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    // toBeDefined() идентична .not.toUndefined(), просто другой синтаксис
    expect(store.getState).not.toBeUndefined()
  })
  // ТЕСТ 3
  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })
  // ТЕСТ 4
  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })
  // ТЕСТ 5
  test('should change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })
  // ТЕСТ 6
  test('should NOT change state if action don\'t exists', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'})
    expect(store.getState().count).toBe(0)
  })
  // ТЕСТ 7
  test('should call subscribe(fn)', () => {
    store.subscribe(handler)

    store.dispatch({type: 'ADD'})

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })
  // ТЕСТ 8
  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })
  // ТЕСТ 9
  test('should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
