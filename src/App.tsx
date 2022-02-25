import { LogForm } from 'infrastructure/componentes';
import { useState } from 'react';
import AppRouters from './infrastructure/routes/AppRouters';

const App = () => {
  const [isLog, setIsLog] = useState(true);

  if (!isLog) {
    return (
      <main
        className={`d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-secondary`}
      >
        <LogForm />
      </main>
    );
  } else {
    return <AppRouters />;
  }
};

export default App;
