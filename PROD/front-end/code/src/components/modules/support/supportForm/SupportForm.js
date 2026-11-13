import React from "react";
import Card from "../../../Interface/card/Card";
import Text from "../../../Interface/Text/Text";
import Header from "../../../Interface/header/Header";
import Page from "../../../Interface/page/Page";
import style from './SupportForm.module.css';

function SupportForm(props) {
    return (
        <Page>
            <Card className={style.SupportForm} >
                <div 
                    className={style.image}
                    style={{
                        backgroundImage: `${props.imageGradient? `linear-gradient(${props.imageGradient}), `: ''}url(${props.image})`,
                        ...props.imageStyle || {}
                    }}
                />
                <div className={style.form}>
                    {props.header &&
                        <Header text={props.header} icon={props.headerIcon} color='theme'/>
                    }
                    {props.title &&
                        <Text size={24} weight={600}>
                            {props.title}
                        </Text>
                    }
                    <div className={style.inputsContainer}>
                        {props.children}
                    </div>
                </div>
            </Card>
        </Page>
    );
}

export default SupportForm;