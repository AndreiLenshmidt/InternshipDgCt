export function randomizer(
  images: Array<string | ArrayBuffer | null>,
  size: Array<string>,
  level: number
) {
  const numbers: Array<number> = [];
  const results = [];

  for (const item of size[level]) {
    let num = getRandomNumber(1001);
    while (numbers.includes(num)) {
      num = getRandomNumber(1001);
    }
    numbers.push(num);
    results.push({
      img: images[+item],
      turned: false,
      openCloseToggle: false,
      disabled: false,
      id: num,
    });
  }
  results.sort((itemA, itemB) => itemA.id - itemB.id);
  return results;
}

const getRandomNumber = (num: number) => {
  return Math.floor(Math.random() * num);
};
