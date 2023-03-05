import { Flex, Image } from "@chakra-ui/react"
import Timer from "./Timer"
import BombCount from "./BombCount"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { restartGame } from "./store/fieldSlice"
import {
  clearTimer,
  setSmilePressed,
  setSmileStandart,
  stopTimer,
} from "./store/panelSlice"

export default function Panel() {
  const image = useSelector(({ panel }) => panel.smile)
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(restartGame({ x: -1, y: -1 }))
  }

  return (
    <Flex
      p='3px 7px'
      mb='5px'
      justify='space-between'
      align='center'
      backgroundColor='#c0c0c0'
      borderLeft='2px solid #838383'
      borderTop='2px solid #838383'
      borderBottom='2px solid #fdfdfd'
      borderRight='2px solid #fdfdfd'
    >
      <BombCount />
      <Image
        onDragStart={(e) => {
          e.preventDefault()
        }}
        onMouseDown={() => {
          dispatch(setSmilePressed())
        }}
        onMouseLeave={() => {
          if (image === "smile-pressed") {
            dispatch(setSmileStandart())
          }
        }}
        onMouseUp={() => {
          if (image === "smile-pressed") {
            dispatch(setSmileStandart())
          }
        }}
        onClick={() => {
          handleClick()
          dispatch(clearTimer())
          dispatch(stopTimer())
          dispatch(setSmileStandart())
        }}
        src={`./img/${image}.png`}
      />
      <Timer />
    </Flex>
  )
}
