import { Flex, Box } from "@chakra-ui/react"
import Game from "./Game"
import Panel from "./Panel"

function App() {
  return (
    <Flex
      w='100vw'
      h='100vh'
      justify='center'
      align='center'
      backgroundColor='#fefefe'
    >
      <Box
        backgroundColor='#bdbdbd'
        p='7px'
        borderLeft='2px solid #fdfdfd'
        borderTop='2px solid #fdfdfd'
        borderBottom='2px solid #838383'
        borderRight='2px solid #838383'
      >
        <Panel />
        <Game />
      </Box>
    </Flex>
  )
}

export default App
