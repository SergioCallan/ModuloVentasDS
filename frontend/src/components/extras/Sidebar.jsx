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
          <ListItemText primary="Generar Nueva Venta" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Anular una Venta" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Facturación" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;