import { createStore, applyMiddleware, compose } from 'redux'
import routes from '../config/routes'
import ReduxThunk from 'redux-thunk'
import debugLib from 'debug'

const debug = debugLib('Reduxible:Store')

const applicationStore = (state, action) => {
  if (action.type !== 'SET_USER') {
    debug(`Action ${action.type} dispatched`)
  }

  // This is special as it overrides the WHOLE state
  if (action.type === 'RESTORE_STATE') {
    return Object.assign({}, state, action.state)
  }

  // This is special as we need to do a nested assignment
  if (action.type === 'CURRENT_ROUTE') {
    return Object.assign({}, state, {
      currentRoute: Object.assign({}, state.currentRoute, action.route)
    })
  }

  if (action.type === 'SHOW_MAP_LOADER') {
    return Object.assign({}, state, {
      showLoadingWheel: action.showLoadingWheel,
      tilesToLoad: action.tilesToLoad,
      tilesLoaded: action.tilesLoaded
    })
  }

  // # # # # # FORM VALIDATION START # # # # # # # #
  if (action.type === 'CREATE_VALIDATED_FORM') {
    const newObj = {}
    newObj[action.form] = {}
    Object.keys(action.fields).forEach((field) => {
      newObj[action.form][field] = action.fields[field]
    })
    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newObj)
    })
  }

  if (action.type === 'FORM_FIELD_CHANGE') {
    const newFormValues = Object.assign({}, state.formState)
    newFormValues[action.form][action.field].value = action.value

    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_FIELD_FOCUS') {
    const newFormValues = Object.assign({}, state.formState)
    newFormValues[action.form][action.field].touched = true

    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_VALIDATE') {
    const newFormValues = Object.assign({}, state.formState)

    Object.keys(newFormValues[action.form]).filter((f) => {
      return newFormValues[action.form][f].hasOwnProperty('value')
    }).forEach((f) => {
      newFormValues[action.form][f].error = action.fields[f]
    })

    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_VALIDATE_SINGLE') {
    const newFormValues = Object.assign({}, state.formState)

    newFormValues[action.form][action.field].error = action.error

    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_TOUCH_ALL') {
    const newFormValues = Object.assign({}, state.formState)

    Object.keys(newFormValues[action.form]).filter((f) => {
      return newFormValues[action.form][f].hasOwnProperty('value')
    }).forEach((f) => {
      newFormValues[action.form][f].touched = true
    })

    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_VALIDATE_START') {
    const newFormValues = Object.assign({}, state.formState)
    newFormValues[action.form].isValidating = true
    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }

  if (action.type === 'FORM_VALIDATE_COMPLETE') {
    const newFormValues = Object.assign({}, state.formState)
    newFormValues[action.form].isValidating = false
    return Object.assign({}, state, {
      formState: Object.assign({}, state.formState, newFormValues)
    })
  }
  // # # # # # FORM VALIDATION END # # # # # # # #

  if (action.type) {
    delete action.type
    return Object.assign({}, state, action)
  }

  return state
}

export default function () {
  return createStore(applicationStore, {
    routes: routes,
    showLoadingWheel: false,
    mapMarkers: [],
    formState: {},
    tilesToLoad: 0,
    tilesLoaded: 0
  }, compose(
    applyMiddleware(ReduxThunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ))
}
