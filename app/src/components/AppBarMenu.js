import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { useUserQuery } from '../hooks';
import { useMutation } from 'react-apollo';
import { LOG_OUT } from '../operations';
import { useErrorHandler } from '../hooks';
import SpringModal from './SpringModal';
import ColorPicker from './ColorPicker';
import ColorAvatar from './ColorAvatar';

const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { me } = useUserQuery();
  const [logout, { error }] = useMutation(LOG_OUT);
  useErrorHandler(error);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeModal = () => {
    setShowColorPicker(false);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ColorAvatar {...me} />
      </IconButton>
      <Menu id="profile-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setShowColorPicker(true)}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <SpringModal open={showColorPicker} handleClose={closeModal}>
        <ColorPicker closeModal={closeModal} />
      </SpringModal>
    </div>
  );
};

export default AppBarMenu;
