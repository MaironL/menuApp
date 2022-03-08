import { useGlobalContext } from 'context';
import { useParams } from 'react-router-dom';

const useMenusList = () => {
  const { menuList } = useGlobalContext();
  const { menus } = useParams();
  const menuSelected = menuList.find((menu) => menu.name === menus);
  const dishesList = menuSelected !== undefined && menuSelected.dishesInMenu;
  const menuDishes = dishesList
    ? dishesList
    : [
        {
          id: 0,
          title: '',
          image: '',
          imageType: '',
          readyInMinutes: 0,
          healthScore: 0,
          vegan: false,
          pricePerServing: 0,
          servings: 0,
          dairyFree: false,
          glutenFree: false,
        },
      ];

  return { menuDishes };
};

export default useMenusList;
