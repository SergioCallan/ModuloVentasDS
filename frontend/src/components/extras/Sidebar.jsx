import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AvailableContext } from '../../context/AvailableContext';


const Sidebar = ({ open, onClose}) => {
  const navigate= useNavigate()
  const {locked,setLocked} = useContext(AvailableContext)

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      
      <List>
        <ListItemButton onClick={()=>navigate("/buscarcliente")}>
          <ListItemText primary="Opciones ligadas al cliente" />
        </ListItemButton>
        <ListItemButton disabled={locked} onClick={()=>navigate("/")}>
          <ListItemText primary="Agregar Planes y Productos" />
        </ListItemButton>
        <ListItemButton disabled={locked} onClick={()=>navigate("/reporte")}>
          <ListItemText primary="Reportes" />
        </ListItemButton>
        <ListItemButton onClick={()=>{
          setLocked(true)
          navigate("/principal")}}>
          <ListItemText primary="Menu Principal" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;