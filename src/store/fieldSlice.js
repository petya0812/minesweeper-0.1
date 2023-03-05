import { createSlice } from "@reduxjs/toolkit"
import { BOMB_COUNT, createField, MINE, SIZE } from "../helpers"

const fieldSlice = createSlice({
  name: "field",
  initialState: {
    field: createField(),
    openCount: 0,
    isGameStarted: true,
    flagCount: 0,
  },
  reducers: {
    // Перезапуск игры с возможным открытием ячеек
    restartGame(state, action) {
      const { x, y } = action.payload
      function openEmpty(x, y) {
        for (const el of [
          [x, y + 1],
          [x, y - 1],
          [x + 1, y],
          [x - 1, y],
          [x + 1, y + 1],
          [x + 1, y - 1],
          [x - 1, y - 1],
          [x - 1, y + 1],
        ]) {
          const i = el[0]
          const j = el[1]
          if (
            i >= 0 &&
            j >= 0 &&
            i < SIZE &&
            j < SIZE &&
            state.field[j * SIZE + i][0] !== MINE &&
            state.field[j * SIZE + i][2] === false &&
            state.field[j * SIZE + i][1] === "closed"
          ) {
            state.field[j * SIZE + i][1] = String(state.field[j * SIZE + i][0])
            state.field[j * SIZE + i][2] = true
            state.openCount += 1
            if (state.field[j * SIZE + i][0] === 0) {
              openEmpty(i, j)
            }
          }
        }
      }
      state.flagCount = 0
      state.openCount = 0
      if (x !== -1) {
        state.field = createField(SIZE, x, y)
        state.field[y * SIZE + x][1] = String(state.field[y * SIZE + x][0])
        state.field[y * SIZE + x][2] = true
        state.openCount += 1
        openEmpty(x, y)
      } else {
        state.field = createField()
        state.openCount = 0
      }
      state.isGameStarted = true
    },

    // Проигрыш
    gameOver(state, action) {
      state.isGameStarted = false
      const { x, y } = action.payload
      for (let i = 0; i < state.field.length; i++) {
        if (state.field[i][0] === MINE && i !== y * SIZE + x) {
          if (state.field[i][1] === "flag") {
            continue
          }
          state.field[i][2] = true
          state.field[i][1] = "mine-standart"
        } else {
          if (state.field[i][1] === "flag") {
            state.field[i][1] = "mine-wrong"
          }
        }
      }
    },

    // Победа
    winGame(state) {
      console.log("You win!")
      state.isGameStarted = false
      for (let i = 0; i < state.field.length; i++) {
        if (state.field[i][0] === MINE && state.field[i][1] === "closed") {
          state.field[i][1] = "flag"
          state.field[i][2] = true
          state.flagCount += 1
        }
      }
    },

    // Открыть ячейку
    openCell(state, action) {
      const { x, y } = action.payload
      if (state.field[y * SIZE + x][2] === false) {
        if (state.field[y * SIZE + x][0] >= 0) {
          state.field[y * SIZE + x][1] = String(state.field[y * SIZE + x][0])
        } else {
          state.field[y * SIZE + x][1] = "mine-exploded"
        }
        state.openCount += 1
        state.field[y * SIZE + x][2] = true
      }
    },

    // Нажатие правой клавишей мыши
    rightClick(state, action) {
      const { x, y } = action.payload
      if (state.field[y * SIZE + x][2] === false) {
        if (
          state.field[y * SIZE + x][1] === "closed" &&
          state.flagCount < BOMB_COUNT
        ) {
          state.field[y * SIZE + x][1] = "flag"
          state.flagCount += 1
        } else if (state.field[y * SIZE + x][1] === "flag") {
          state.field[y * SIZE + x][1] = "question"
          state.flagCount -= 1
        } else if (state.field[y * SIZE + x][1] === "question") {
          state.field[y * SIZE + x][1] = "closed"
        }
      }
    },

    // Открыть клетки вокруг пустых
    openEmptyCells(state, action) {
      const { x, y } = action.payload
      openEmpty(x, y)
      function openEmpty(x, y) {
        for (const el of [
          [x, y + 1],
          [x, y - 1],
          [x + 1, y],
          [x - 1, y],
          [x + 1, y + 1],
          [x + 1, y - 1],
          [x - 1, y - 1],
          [x - 1, y + 1],
        ]) {
          const i = el[0]
          const j = el[1]
          if (
            i >= 0 &&
            j >= 0 &&
            i < SIZE &&
            j < SIZE &&
            state.field[j * SIZE + i][0] !== MINE &&
            state.field[j * SIZE + i][2] === false &&
            state.field[j * SIZE + i][1] === "closed"
          ) {
            state.field[j * SIZE + i][1] = String(state.field[j * SIZE + i][0])
            state.field[j * SIZE + i][2] = true
            state.openCount += 1
            if (state.field[j * SIZE + i][0] === 0) {
              openEmpty(i, j)
            }
          }
        }
      }
    },
  },
})

export const {
  restartGame,
  openCell,
  openEmptyCells,
  rightClick,
  gameOver,
  winGame,
} = fieldSlice.actions

export default fieldSlice.reducer
