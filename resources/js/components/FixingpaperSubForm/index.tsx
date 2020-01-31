import React from 'react';
import FixingpapeTypeBlock from '../../containers/FixingpapeTypeBlock';
import PassportRadioBtn from '../PassportRadioBtn';
import { FixingPapersType, FixingPapersTypeString } from '../../store/types';
import { fixingPapersTypeList } from '../../store/consts';

const FixingpaperSubForm = () => {
    return (
        <div className="col row">
            <div className="col">
                {/* Радио баттоны: скрепка, пакет и т.д.  */}
                {fixingPapersTypeList.map((type: FixingPapersTypeString) => (
                    <PassportRadioBtn
                        key={type}
                        groupName="fixingPaperType"
                        label={FixingPapersType[type]}
                        name={type}
                    />
                ))}
            </div>
            {/* Блоки, появляющиеся в зависимости от радио баттона */}
            <div className="col">
                <FixingpapeTypeBlock name="paperClip">
                    <h1>hey</h1>
                </FixingpapeTypeBlock>
            </div>
        </div>
    );
};

export default FixingpaperSubForm;
