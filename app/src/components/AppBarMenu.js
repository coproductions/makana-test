import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@material-ui/core';
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

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ColorAvatar {...me} />
      </IconButton>
      <Menu id="profile-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setShowColorPicker(true)}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <SpringModal open={showColorPicker} handleClose={() => setShowColorPicker(false)}>
        <ColorPicker />
      </SpringModal>
    </div>
  );
};

export default AppBarMenu;
