export const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomColor = () => {
  const colors = ["#56B1C4FF", "#482CC4FF"];
  return colors.at(randomInteger(0, colors.length - 1));
};
