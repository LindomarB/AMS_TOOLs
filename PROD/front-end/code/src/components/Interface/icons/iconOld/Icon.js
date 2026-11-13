import React from 'react';
import ImageIcon from '../imageIcon/ImageIcon';
import MaterialIcon from '../materialIcon/MaterialIcon';
import TextIcon from '../textIcon/TextIcon';

function Icon(props) {
    switch(props.source) {
        case 'material-icons':
            return <MaterialIcon {...props}/>;
        case 'text':
            return <TextIcon {...props}/>;
        case 'image': 
            return <ImageIcon {...props}/>;
        default:
            return null;
    }
}

export default Icon;