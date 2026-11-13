import React from 'react';
import Icon from '../../../../../../Interface/icons/icon/Icon';
import Text from '../../../../../../Interface/Text/Text';
import style from './AwayMode.module.css';

function AwayMode(props) {
    const startDate = new Date(props.member.settings.awayMode.startDate);
    const endDate = new Date(props.member.settings.awayMode.endDate);
    const started = props.member.status === 'away';
    const message = props.member.settings.awayMode.message;

    const period = {
        from: startDate.toLocaleDateString(),
        to: endDate.toLocaleDateString()
    };
    const text = started? `Away from ` : `Will be away from `;

    return (
        <div className={style.AwayMode}>
            <div>
                {!started &&
                    <Icon name='away' size={32} color='purple' border invertColor/>
                }
                <Text weight={500}>
                    {text}
                    <Text span weight={700}>{period.from}</Text>
                    {` to `}
                    <Text span weight={700}>{period.to}</Text>
                </Text>
            </div>
            {message &&
                <Text className={style.awayMessage} color='grey'>"{message}"</Text>
            }
        </div>
    );
}

export default AwayMode;