import { createSlice } from "@reduxjs/toolkit"

const panelSlice = createSlice({
  name: "panel",
  initialState: {
    isTimerStarted: false,
    timer: 0,
    smile: "smile-standart",
  },
  reducers: {
    setSmileOpen(state) {
      state.smile = "smile-open"
    },
    setSmileGameOver(state) {
      state.smile = "smile-gameOver"
    },
    setSmilePressed(state) {
      state.smile = "smile-pressed"
    },
    setSmileStandart(state) {
      state.smile = "smile-standart"
    },
    setSmileWin(state) {
      state.smile = "smile-win"
    },
    clearTimer(state) {
      state.timer = 0
    },
    startTimer(state) {
      state.isTimerStarted = true
    },
    incTimer(state) {
      state.timer += state.timer <= 999 ? 1 : 0
    },
    stopTimer(state) {
      state.isTimerStarted = false
    },
  },
})

export const {
  clearTimer,
  incTimer,
  startTimer,
  stopTimer,
  setSmileGameOver,
  setSmileOpen,
  setSmilePressed,
  setSmileStandart,
  setSmileWin,
} = panelSlice.actions

export default panelSlice.reducer
