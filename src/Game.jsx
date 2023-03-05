import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Flex } from "@chakra-ui/react"
import { BOMB_COUNT, SIZE } from "./helpers"
import { winGame } from "./store/fieldSlice"
import { setSmileWin, startTimer, stopTimer } from "./store/panelSlice"
import Cell from "./Cell"

export default function Game() {
  const dispatch = useDispatch()
  const isGameStarted = useSelector(({ field }) => field.isGameStarted)
  const openCount = useSelector(({ field }) => field.openCount)
  const iterator = new Array(SIZE).fill(0)

  useEffect(() => {
    if (!isGameStarted) {
      dispatch(stopTimer())
    }
    if (openCount > 0 && isGameStarted) {
      dispatch(startTimer())
    }
    if (openCount >= SIZE * SIZE - BOMB_COUNT) {
      dispatch(winGame())
      dispatch(setSmileWin())
    }
  }, [openCount, dispatch, isGameStarted])

  return (
    <Flex
      flexDirection='column'
      borderLeft='2px solid #838383'
      borderTop='2px solid #838383'
      borderBottom='2px solid #fdfdfd'
      borderRight='2px solid #fdfdfd'
    >
      {iterator.map((_, i) => {
        return (
          <Flex key={i}>
            {iterator.map((_, j) => {
              return <Cell key={j} x={j} y={i} />
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}
