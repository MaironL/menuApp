import { useGlobalContext } from 'context';
import { useParams } from 'react-router-dom';

const useDishesList = () => {
  const { menuList } = useGlobalContext();
  const { menus } = useParams();

  const menuSelected = menuList.find((menu) => menu.name === menus);

  const dishes = menuSelected !== undefined && menuSelected.dishes;

  return { dishes };
};

export default useDishesList;
