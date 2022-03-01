import { LogForm } from 'infrastructure/componentes';
import { useGlobalContext } from 'context';
import AppRouters from './infrastructure/routes/AppRouters';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const App = () => {
  const {
    state,
    loginLoading,
    LogInSuccess: { isLog },
  } = useGlobalContext();

  useEffect(() => {
    localStorage.setItem('MenuAppstate', JSON.stringify(state));
  }, [state]);
  if (!isLog) {
    return (
      <main
        className={`d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-dark`}
      >
        {loginLoading ? <Spinner animation='border' variant='primary' /> : <LogForm />}
      </main>
    );
  } else {
    return <AppRouters />;
  }
};

export default App;
