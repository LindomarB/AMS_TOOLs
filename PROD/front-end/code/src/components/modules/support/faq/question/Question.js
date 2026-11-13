import React, { useState } from "react";
import style from './Question.module.css';
import Text from "../../../../Interface/Text/Text";
import Icon from "../../../../Interface/icons/icon/Icon";

function Question(props) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className={`${style.Question} ${showAnswer? style.showAnswer : ''}`}>
            <div 
                className={style.wrapper}
                onClick={() => setShowAnswer(curSt => !curSt)}
            >
                <Text className={style.questionText} size={16}>
                    {props.question}
                </Text>
                <Icon 
                    className={style.icon}
                    name={showAnswer? 'expand_less' : 'expand_more'}
                    color='grey'
                />
            </div>
            {showAnswer && 
                <Text className={style.answer} color='grey'>
                    {props.answer}
                </Text>
            }
        </div>
    );
}

export default Question;