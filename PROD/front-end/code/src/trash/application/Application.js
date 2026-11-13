import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import AppContext from "../../../context/appContext/AppContext";
import Button from "../../../Interface/buttons/button/Button";
import Card from "../../../Interface/card/Card";
import style from "./Application.module.css";

function ItemDetails(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    const icons = appCtx.icons;

    const handleOnClickBack = () => {
        navigate(props.backPath || -1);
    }

    const info = props.fieldsOrder.map((order, idx) => {
        const infoFields = order.map(field => (
            <div key={field} className={style.infoField}>
                <h3>{props.fields[field].title}</h3>
                <p>{props.fields[field].content || "—"}</p>
            </div>
        ));

        return (
            <div key={idx} className={style.infoContainer}>
                {infoFields}
            </div>
        );
    });

    return (
        <Card className={style.ItemDetails}>
            <div className={style.header}>
                <Button
                    icon={icons.back}
                    onClick={handleOnClickBack}
                />
                <h2>{props.title}</h2>
            </div>
            <div className={style.info}>
                {info}
            </div>
        </Card>
    );
}

export default ItemDetails;