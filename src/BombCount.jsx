import { Box, Flex, Image } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { BOMB_COUNT } from "./helpers"

function BombCount() {
  const flagCount = useSelector(({ field }) => field.flagCount)
  const bomb_count = BOMB_COUNT - flagCount
  return (
    <Box>
      <Flex>
        <Image
          src={`./img/digit-${(bomb_count - (bomb_count % 100)) / 100}.png`}
        />
        <Image
          src={`./img/digit-${
            ((bomb_count % 100) - (bomb_count % 10)) / 10
          }.png`}
        />
        <Image src={`./img/digit-${bomb_count % 10}.png`} />
      </Flex>
    </Box>
  )
}

export default BombCount
