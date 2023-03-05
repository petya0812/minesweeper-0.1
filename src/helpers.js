const MINE = -1
const SIZE = 16 // настраиваем размер поля (всегда квадратное)
const BOMB_COUNT = 40 // указываем количество бомб (меньше чем кол-во ячеек)

function createField(size = SIZE, block_x, block_y, bombCount = BOMB_COUNT) {
  function addBomdCount(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (
          !(i === x && j === y) &&
          i >= 0 &&
          j >= 0 &&
          i < size &&
          j < size &&
          field[j * size + i] !== MINE
        ) {
          field[j * size + i] += 1
        }
      }
    }
  }

  const field = new Array(size * size).fill(0)

  for (let i = 0; i < bombCount; ) {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)

    if (field[y * size + x] === MINE || (x === block_x && y === block_y))
      continue

    field[y * size + x] = MINE
    addBomdCount(x, y)

    i += 1
  }

  for (let i = 0; i < field.length; i++) {
    field[i] = [field[i], "closed", false] // [Значение ячейки, маска ячейки, открыта ли ячейка]
  }

  return field
}

export { createField, MINE, SIZE, BOMB_COUNT }
