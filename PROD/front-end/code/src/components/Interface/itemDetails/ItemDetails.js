import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import AppContext from "../../context/appContext/AppContext";
import Button from "../buttons/button/Button";
import Card from "../card/Card";
import style from "./ItemDetails.module.css";

function ItemDetails(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const icons = appCtx.icons;

    const handleOnClickBack = () => {
        navigate(props.backPath || -1);
    }

    return (
        <Card className={style.ItemDetails}>
            <div className={style.header}>
                <h2>{props.title}</h2>
                <div className={style.headerRightContent}>
                    {props.headerRightContent}
                    <Button
                        icon={icons.leftArrow}
                        onClick={handleOnClickBack}
                    />
                </div>
            </div>
            <div className={style.content}>
                {props.children}
            </div>
        </Card>
    );
}

export default ItemDetails;