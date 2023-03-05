import { useEffect, useState } from "react"
import { Box, Image } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { MINE, SIZE } from "./helpers"
import {
  openCell,
  openEmptyCells,
  rightClick,
  gameOver,
  restartGame,
} from "./store/fieldSlice"
import {
  setSmileGameOver,
  setSmileOpen,
  setSmileStandart,
} from "./store/panelSlice"

export default function Cell({ x, y }) {
  const dispatch = useDispatch()
  const field = useSelector(({ field }) => field.field)
  const openCount = useSelector(({ field }) => field.openCount)
  const isGameStarted = useSelector(({ field }) => field.isGameStarted)

  const value = field[y * SIZE + x][0]
  const [image, setImage] = useState(field[y * SIZE + x][1])

  // обноваление картинки при изменении поля
  useEffect(() => {
    returnImage()
  }, [field])
  function returnImage() {
    setImage(field[y * SIZE + x][1])
  }

  // Левый клик
  function handleClick() {
    if (!isGameStarted || field[y * SIZE + x][2] === true) {
      return
    }
    dispatch(openCell({ x, y }))
    if (value !== MINE) {
      dispatch(openEmptyCells({ x, y }))
    }
    if (value === MINE) {
      if (openCount === 0) {
        dispatch(restartGame({ x, y }))
      } else {
        dispatch(setSmileGameOver())
        dispatch(gameOver({ x, y }))
      }
    }
  }

  // Правый клик
  function handleRightClick(e) {
    e.preventDefault()
    if (!isGameStarted) return
    dispatch(rightClick({ x, y }))
  }

  return (
    <Box>
      {
        <Image
          onMouseDown={(e) => {
            if (
              e.button === 0 &&
              field[y * SIZE + x][2] === false &&
              isGameStarted
            ) {
              dispatch(setSmileOpen())
              setImage(0)
            }
          }}
          onMouseOverCapture={(e) => {
            if (
              e.buttons === 1 &&
              isGameStarted &&
              field[y * SIZE + x][2] === false
            ) {
              dispatch(setSmileOpen)
              setImage(0)
            }
          }}
          onMouseLeave={() => {
            returnImage()
          }}
          onMouseUp={(e) => {
            returnImage()
            if (e.button === 0) {
              handleClick()
            }
            if (isGameStarted && value !== MINE) {
              dispatch(setSmileStandart())
            }
          }}
          onDragStart={(e) => {
            e.preventDefault()
          }}
          onClick={() => handleClick()}
          onContextMenu={(e) => handleRightClick(e)}
          src={`../img/${image}.png`}
        />
      }
    </Box>
  )
}
