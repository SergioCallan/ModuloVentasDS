import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose ,isActived}) => {
  const navigate= useNavigate()

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton onClick={()=>navigate("/buscarcliente")}>
          <ListItemText primary="Opciones ligadas al cliente" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate("/")}>
          <ListItemText primary="Agregar Planes y Productos" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate("/reporte")}>
          <ListItemText primary="Reportes" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;