import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem button>
          <ListItemText primary="Opciones ligadas al cliente" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Agregar Planes y Productos" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reportes" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;