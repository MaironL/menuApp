import { useGlobalContext } from 'context';
import { useParams } from 'react-router-dom';

const useVOM = () => {
  const { menuList } = useGlobalContext();
  const { menus } = useParams();

  const menuSelected = menuList.find((menu) => menu.name === menus);
  const vOm = menuSelected !== undefined && menuSelected.meatOrVegan.vOm;

  return { vOm };
};

export default useVOM;
