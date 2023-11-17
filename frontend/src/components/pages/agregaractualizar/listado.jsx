import ListPhone from './ListPhone';
import ListInternet from './ListInternet';
import { useNavigate} from 'react-router-dom';
import { Card , Button} from '@mui/material';
const PhoneListStrategy = () => {
    return (
      <div>
            <Card
            sx={{
              mt: 5,
              p:2,
              borderRadius:2,
              display: 'grid',
          }}
          elevation={6}
          style={{
            marginBottom: ".7rem",
          }}>
            <ListPhone/>
            </Card>
      </div>
    );
  };

const InternetListStrategy = () => {
    return (
      <div>
        <Card
            sx={{
              mt: 5,
              p:2,
              borderRadius:2,
              display: 'grid',
          }}
          elevation={6}
          style={{
            marginBottom: ".7rem",
          }}>
            <ListInternet/>
            </Card>
      </div>
    );
  };

const Phone = ({ listStrategy }) => {
    return (
      <div>
        {listStrategy()}
      </div>
    );
  };

  const Internet = ({ listStrategy }) => {
    return (
      <div>
        {listStrategy()}
      </div>
    );
  };

  const Listado = () => {
    const navigate =  useNavigate();
    const handleRegresar = () => {
      navigate('/');
    };
    return (
      <div>
        <h1> Lista Total de Productos</h1>
        <Button variant="contained" color="success" onClick={handleRegresar} style={{marginLeft: '20px'}}>
      Regresar
    </Button>
        <Phone listStrategy={PhoneListStrategy} />
        <Internet listStrategy={InternetListStrategy} />
      </div>
    );
  };

export default Listado;