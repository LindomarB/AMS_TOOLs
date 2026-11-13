import React, { useContext } from "react";
import AppContext from "../../context/appContext/AppContext";
import Card from "../../Interface/card/Card";
import wiproLogo from "../../../images/wipro-logo.png";
import style from "./About.module.css";
import versions from "../../../data/versions";
import { CSSTransition } from "react-transition-group";

function About(props) {
    const appCtx = useContext(AppContext);
    const lexicon = appCtx.lexicon.theme.about;

    const handleOnClose = () => {
        props.setShowAbout(false);
    }

    const currentYear = new Date().getFullYear();
    const currentVersion = versions[versions.length - 1];

    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={300}
            classNames={{
                enter: style.enter,
                enterActive: style.enterActive,
                exit: style.exit,
                exitActive: style.exitActive
            }}
        >
            <div className={style.backdrop}>
                <Card className={style.About}>
                    <button className={`${style.closeButton} material-icons`} onClick={handleOnClose}>close</button>
                    <h2>CTI Tool</h2>
                    <div className={style.versionContainer}>
                        <p className={style.version}>
                            {`${lexicon.version}: ${currentVersion.version}`}
                        </p>
                        <p className={style.version}>
                            {`${appCtx.lexicon.date}: ${currentVersion.date}`}
                        </p>
                    </div>
                    <div className={style.staff}>
                        <div className={style.staffMember}>
                            <p>{lexicon.projectManager}</p>
                            <p>Fernando Guerra Filho</p>
                        </div>
                        <div className={style.staffMember}>
                            <p>{lexicon.designerDeveloper}</p>
                            <p>Dereck Rukopf Grimm</p>
                        </div>
                    </div>
                    <p>{`${lexicon.developedBy}`}</p>
                    <a href="https://www.wipro.com" target="_blank">
                        <img className={style.logo} src={wiproLogo}/>
                    </a>
                    <small className={style.copyRight}> 
                        &#169;{`${currentYear} CTI Tool`}<br/>{`${lexicon.rights}`}
                    </small>
                </Card>
            </div>
        </CSSTransition>
    );
}

export default About;