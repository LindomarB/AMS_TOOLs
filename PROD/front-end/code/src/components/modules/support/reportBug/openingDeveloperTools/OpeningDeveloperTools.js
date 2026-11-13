import React from "react";
import Text from "../../../../Interface/Text/Text";
import Modal from "../../../../Interface/modal/Modal";
import Button from "../../../../Interface/buttons/button/Button";
import style from './OpeningDeveloperTools.module.css';
import Icon from "../../../../Interface/icons/icon/Icon";

function OpeningDeveloperTools(props) {
    return (
        <Modal
            className={style.OpeningDeveloperTools}
            title='How to open browser developer tools'
            titleIcon={{name: 'support'}}
            // subtitle='Send us a question to be added to our FAQ'
            onClose={props.onClose}
        >
            <div className={style.container}>
                <div className={style.imageContainer}>
                    <img className={style.image} src='/images/misc/open developer tools step 1.svg'/>
                    <Text color='grey' align='center'>
                        Go to 'more tools' in the browser menu or press CTRL + SHIFT + I to open the developer tools.
                    </Text>
                </div>
                <Icon className={style.icon} name='forward' color='grey'/>
                <div className={style.imageContainer}>
                    <img className={style.image} src='/images/misc/open developer tools step 2.svg'/>
                    <Text color='grey' align='center'>
                        Access the 'console' tab on the screen that will open to see if there is some error messages.
                    </Text>
                </div>
            </div>
            <Button
                className={style.button}
                color='blue'
                icon='approve'
                onClick={props.onClose}
            >
                I Got It
            </Button>
        </Modal>
    );
}

export default OpeningDeveloperTools;