import { PlateDetails } from 'infrastructure/componentes';
import { Modal } from 'react-bootstrap';

interface IplateDeatilsModal {
  show: any;
  setShow: any;
}

const PlateDeatilsModal = ({ show, setShow }: IplateDeatilsModal) => {
  return (
    <>
      <Modal size='sm' show={show} onHide={() => setShow(false)} centered>
        <Modal.Header className='py-1' closeButton></Modal.Header>
        <Modal.Body className='pt-0'>
          <PlateDetails />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PlateDeatilsModal;
