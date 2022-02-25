import S from './menuListNav.module.scss';
import { Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';

const MenuListNav = () => {
  const [isLog, setIslog] = useState(true);

  if (!isLog) {
    return (
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        className='d-flex flex-lg-column px-4 px-lg-0'
      >
        <h2 className='text-center text-light fs-3 m-0 mb-lg-4'>Menu List</h2>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        className={`d-flex flex-lg-column px-4 px-lg-0 pt-lg-5 ${S.navCont}`}
      >
        <h2 className='text-center text-light fs-3 m-0 mb-lg-4'>Menu List</h2>
        <div className='position-relative d-flex flex-lg-column'>
          <Button className='me-4 mx-lg-auto mb-lg-4 rounded-pill' variant='warning'>
            Nuevo Menu
          </Button>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className={`bg-dark rounded-3 ${S.CollapseCont}`}>
            <Nav className='d-flex flex-column me-auto px-3 py-3 px-lg-2 text-start'>
              <Nav.Link className='fw-bold border-bottom' href='#home'>
                Primer Menu
              </Nav.Link>
              <Nav.Link className='fw-bold border-bottom' href='#link'>
                Segundo Menu
              </Nav.Link>
              <Nav.Link className='fw-bold border-bottom' href='#asd'>
                Tercer Menu
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
};

export default MenuListNav;
