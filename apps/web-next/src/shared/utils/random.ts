export const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const getRandomColor = () => {
  const colors = [
    { r: 86, g: 177, b: 196, a: 1 },
    { r: 72, g: 44, b: 196, a: 1 }
  ]
  return colors.at(randomInteger(0, colors.length - 1))
}
