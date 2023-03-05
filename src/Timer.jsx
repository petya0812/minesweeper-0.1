import { Box, Flex, Image } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { incTimer } from "./store/panelSlice"

function Timer() {
  const dispatch = useDispatch()
  const timer = useSelector(({ panel }) => panel.timer)
  const isTimerStarted = useSelector(({ panel }) => panel.isTimerStarted)

  useEffect(() => {
    if (isTimerStarted) {
      const timerInterval = setInterval(() => {
        dispatch(incTimer())
      }, 1000)
      return () => {
        clearInterval(timerInterval)
      }
    }
    return
  }, [dispatch, timer, isTimerStarted])

  return (
    <Box>
      <Flex>
        <Image
          src={`./img/digit-${(timer-timer%100)/100}.png`}
        />
        <Image src={`./img/digit-${((timer % 100) - (timer % 10))/10}.png`} />
        <Image src={`./img/digit-${timer % 10}.png`} />
      </Flex>
    </Box>
  )
}

export default Timer
