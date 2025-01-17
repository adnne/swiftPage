import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'app/NodeElement/NodeElementSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})