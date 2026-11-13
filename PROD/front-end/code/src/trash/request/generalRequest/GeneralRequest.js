import React, { useContext, useState } from 'react';
import AppContext from '../../../context/appContext/AppContext';
import Icon from '../../../Interface/icons/icon/Icon';
import ConfirmationPopBox from '../../popBox/confirmation/ConfirmationPopBox';
import Processing from '../../../Interface/loaders/processing/Processing';
import style from './GeneralRequest.module.css';
import CancelRequestButton from '../CancelRequestButton/CancelRequestButton';

function GeneralRequest(props) {
    const appCtx = useContext(AppContext);
    
    const icons = appCtx.icons;
    const request = props.request;

    const handleOnRespondRequest = async (requestId, response) => {
        props.onRespondRequest(requestId, response);
    }

    let requestDescription = null;

    switch(request.type) {
        case 'access':
            requestDescription = <p className={style.description}>{'Request access to '}<span>{request.data.tool}</span></p>
            break;
        case 'approver change':
            requestDescription = <p className={style.description}>{'Change approver from '}<span>{request.data.previousApprover.name}</span>{' to '}<span>{request.data.newApprover.name}</span></p>
            break;
        case 'role change':
            requestDescription = <p className={style.description}>{'Change role from '}<span>{request.data.previousRole}</span>{' to '}<span>{request.data.newRole}</span>{' and approver from '}<span>{request.data.previousApprover.name}</span>{' to '}<span>{request.data.newApprover.name}</span></p>
            break;
        case 'cti application':
            requestDescription = <p className={style.description}>{'Permission to create resolutions for '}<span>{request.data.application}</span></p>
            break;
    }

    return (
        <div className={`${style.GeneralRequest}`}>
            {request.status === 'pending' &&
                <Icon {...icons.pending} className={style.statusIcon} style={{color: 'var(--blue)'}}/>
            }
            {request.status === 'approved' &&
                <Icon {...icons.approve} className={style.statusIcon} style={{color: 'var(--green)'}}/>
            }
            {request.status === 'refused' &&
                <Icon {...icons.refuse} className={style.statusIcon} style={{color: 'var(--red)'}}/>
            }
            {request.status === 'canceled' &&
                <Icon {...icons.cancel} className={style.statusIcon} style={{color: 'var(--red)'}}/>
            }
            <div className={style.requestInfo}>
                <div className={style.header}>
                    <p className={style.requestType}>{request.type}</p>
                    <p className={style.date}>Requested on {new Date(request.meta.createdOn).toLocaleDateString()}</p>
                    {request.status === 'approved' && 
                        <p className={style.date}>Approved on {new Date(request.meta.approvedOn).toLocaleDateString()}</p>
                    }
                    {request.status === 'refused' && 
                        <p className={style.date}>Refused on {new Date(request.meta.refusedOn).toLocaleDateString()}</p>
                    }
                    {request.status === 'canceled' && 
                        <p className={style.date}>Canceled on {new Date(request.meta.canceledOn).toLocaleDateString()}</p>
                    }
                    {props.beingProcessed && 
                        <div className={style.headerRight}>
                            <Processing />
                        </div>
                    }
                    {!props.beingProcessed && request.status === 'pending' && props.viewer === 'requester' &&
                        <div className={style.headerRight}>
                            <CancelRequestButton onClickYes={() => handleOnRespondRequest(request._id, 'canceled')} />
                        </div>
                    }
                    {!props.beingProcessed && request.status === 'pending' && props.viewer === 'approver' &&
                        <div className={style.buttonsContainer}>
                            <ConfirmationPopBox 
                                buttonClassName={`${style.button} ${style.refuse}`}
                                icon='refuse'
                                question='Do you really want to refuse this request?'
                                onClickYes={() => handleOnRespondRequest(request._id, 'refused')}
                            />
                            <ConfirmationPopBox 
                                buttonClassName={`${style.button} ${style.approve}`}
                                icon='approve'
                                question='Do you really want to approve this request?'
                                onClickYes={() => handleOnRespondRequest(request._id, 'approved')}
                            />
                        </div>
                    }
                </div>
                {requestDescription}
            </div>
        </div>
    );
}

export default GeneralRequest;