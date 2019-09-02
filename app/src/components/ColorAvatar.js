import React from 'react';
import Avatar from '@material-ui/core/Avatar';

// needs to be a class comp because of tooltip

class ColorAvatar extends React.Component {
  render() {
    return (
      <Avatar className={this.props.className || ''} style={{ background: this.props.profileColor }}>
        {this.props.name[0].toUpperCase()}
      </Avatar>
    );
  }
}
export default ColorAvatar;
