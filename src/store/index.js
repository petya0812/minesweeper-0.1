import { configureStore } from "@reduxjs/toolkit"
import fieldReduser from "./fieldSlice"
import panelSlice from "./panelSlice"

export default configureStore({
  reducer: {
    field: fieldReduser,
    panel: panelSlice,
  },
})
