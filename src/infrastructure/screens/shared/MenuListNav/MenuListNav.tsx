import S from './menuListNav.module.scss';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useMenuList } from './menuListNavHook';
import { useGlobalContext } from 'context';
import { Link } from 'react-router-dom';

const MenuListNav = () => {
  const { getMenu } = useMenuList();
  const { menuList } = useGlobalContext();
  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      className={`d-flex flex-lg-column px-4 px-lg-0 pt-lg-5 ${S.navCont}`}
    >
      <h2 className='text-center text-light fs-3 m-0 mb-lg-4'>Menu List</h2>
      <div className='position-relative d-flex flex-lg-column'>
        <Button
          onClick={getMenu}
          className='me-4 mx-lg-auto mb-lg-4 rounded-pill'
          variant='warning'
        >
          Create menu
        </Button>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className={`bg-dark rounded-3 ${S.CollapseCont}`}>
          <Nav className='d-flex flex-column me-auto px-3 py-3 px-lg-2 text-start'>
            {menuList.map((menu, i) => {
              const { name } = menu;
              return (
                <Link
                  to={name}
                  className={`fw-bold border-bottom mb-2 ${S.link}`}
                  key={i}
                >
                  {name}
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MenuListNav;
