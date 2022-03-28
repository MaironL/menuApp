import S from './menuListNav.module.scss';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useMenuList, useDelEditMenu } from './menuListNavHook';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useGlobalContext } from 'context';
import { Link } from 'react-router-dom';

const MenuListNav = () => {
  const { getMenu } = useMenuList();
  const { delEditMenu } = useDelEditMenu();
  const { menuList } = useGlobalContext();
  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      className={`d-flex flex-lg-column px-4 px-lg-0 pt-lg-5 ${S.navCont}`}
    >
      <h2 className='text-center text-light fs-3 m-0 mb-lg-4'>Menu List</h2>
      <div className={`position-relative d-flex flex-lg-column ${S.fullCont}`}>
        <Button
          onClick={getMenu}
          className='me-4 mx-lg-auto mb-lg-4 rounded-pill'
          variant='warning'
        >
          Create menu
        </Button>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className={`bg-dark rounded-3 ${S.CollapseCont}`}>
          <Nav className='d-flex flex-column me-auto px-3 py-3 px-lg-0 text-start w-100'>
            {menuList.map((menu, i) => {
              const { name, id } = menu;
              return (
                <div
                  key={i}
                  className='d-flex justify-content-between align-items-center mb-3 '
                >
                  <Link to={`/${name}`} className={`fw-bold border-bottom ${S.link}`}>
                    {name}
                  </Link>
                  <BsFillCaretRightFill
                    className={`text-warning fs-3 pb-1 pt-0 ${S.delEditBtn}`}
                    onClick={() => delEditMenu(id)}
                  />
                </div>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MenuListNav;
