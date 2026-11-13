import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DB from "../../../../data/DB";
import getResolutionText from "../../../../functions/ctiTool/getResolutionText";
import AppContext from "../../../context/appContext/AppContext";
import Resolution from "../../../cti-tool/resolution/Resolution";
import CopyButton from "../../../Interface/buttons/copyButton/CopyButton";
import ItemDetails from "../../../Interface/itemDetails/ItemDetails";

function ResolutionDetails(props) {
    const appCtx = useContext(AppContext);
    const params = useParams();

    const lexicon = appCtx.lexicon.routes.ctiTool.resolution;

    const resolutionData = DB.resolutions.find(resolution => resolution._id == params.id);

    const handleOnEditSection = () => {

    }

    return (
        <ItemDetails 
            title={lexicon.title}
            headerRightContent={
                <CopyButton text={getResolutionText(resolutionData)} notApplyDefaultStyle>
                    {appCtx.lexicon.routes.ctiTool.ctiCategorization.form.copyResolution}
                </CopyButton>
            }
        >
            <Resolution data={resolutionData} onEditSection={handleOnEditSection}/>
        </ItemDetails>
    );
}

export default ResolutionDetails;