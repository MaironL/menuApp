import { useMenusList } from '.';

function useMenuDetails() {
  const { menuDishes } = useMenusList();

  //Getting the healsScore of the dishes in menu and the total sum of them
  const healthScore = menuDishes.map((dishData) => dishData.healthScore);
  const totalHealScore = healthScore.reduce(function (a, b) {
    return a + b;
  }, 0);

  //Getting the readyInMinutes of the dishes in menu and the total sum of them
  const readyInMinutes = menuDishes.map((dishData) => dishData.readyInMinutes);
  const totalReadyInMinutes = readyInMinutes.reduce(function (a, b) {
    return a + b;
  }, 0);

  //Getting the total price of the dishes in menu and the total sum of them
  const price = menuDishes.map(
    (dishData) => dishData.pricePerServing * dishData.servings
  );
  const totalPrice = price
    .reduce(function (a, b) {
      return a + b;
    }, 0)
    .toFixed(2);

  const totalDishData = {
    totalHealScore,
    totalReadyInMinutes,
    totalPrice,
  };

  return { totalDishData };
}

export default useMenuDetails;
