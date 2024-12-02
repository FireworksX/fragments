export const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const getRandomColor = () => {
  const colors = ['rgba(86,177,196,1)', 'rgba(72,44,196,1)']
  return colors.at(randomInteger(0, colors.length - 1))
}
