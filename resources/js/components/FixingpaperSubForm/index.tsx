import React from 'react';
import { Field } from 'redux-form';
import FixingpapeTypeBlock from '../../containers/FixingpapeTypeBlock';
import PassportRadioBtn from '../PassportRadioBtn';
import { FixingPapersType, FixingPapersTypeString } from '../../store/types';
import { fixingPapersTypeList } from '../../store/consts';
import ReduxCreatableSelect from '../ReduxCreatableSelect';
import { inputOptions } from '../../store/data';

const FixingpaperSubForm = (): JSX.Element => {
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
                <FixingpapeTypeBlock blockName="paperClip">
                    <div className="field">
                        автомат
                        <Field name="paperClip.auto" component="input" type="checkbox" value="auto" />
                    </div>
                    <div className="field">
                        ручная
                        <Field name="paperClip.manual" component="input" type="checkbox" value="manual" />
                    </div>
                    <div className="field">
                        количество
                        <Field name="paperClip.quantity" component="input" type="number" placeholder="000" />
                    </div>
                    <div className="field">
                        <Field name="paperClip.type" component="select">
                            <option value="file">Файловая</option>
                        </Field>
                    </div>
                    <div className="field">
                        толщина
                        <Field name="paperClip.width" component="input" type="number" />
                    </div>
                    <div className="field">
                        сползание
                        <Field name="paperClip.driftSize" component="input" type="number" />
                    </div>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="termo">
                    <div className="field">
                        корешок
                        {/* Question mark */}
                        <Field name="termo.spine" component="input" type="text" />
                    </div>
                    <div className="field">
                        Обложка с клапаном
                        {/* Question mark */}
                        <Field name="termo.cover_with_klapan" component="input" type="checkbox" />
                    </div>
                    <div className="field">
                        <Field
                            name="termo.position"
                            className="!later"
                            placeholder="вровень с блоком"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.termoPosition}
                        />
                    </div>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="spring">
                    <div className="field">
                        <label htmlFor="springColor">цвет</label>
                        <Field name="spring.color" id="springColor" component="input" type="text" />
                    </div>
                    <div className="field">
                        <Field name="spring.position" component="select">
                            <option value="left">слева</option>
                            <option value="right">справа</option>
                        </Field>
                    </div>
                    <div className="field">
                        обложка &gt; блока
                        <Field name="spring.coverBiggerThanBlock" component="input" type="number" />
                    </div>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="packet">
                    <div className="field">
                        <Field
                            name="packet.type"
                            className="!later"
                            placeholder="люверсы"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.packetTypes}
                        />
                        <Field
                            name="packet.handles"
                            className="!later"
                            placeholder="ручки"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.packetHandles}
                        />
                    </div>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="splice">
                    <div className="field">
                        <Field
                            name="splice.material"
                            className="!later"
                            placeholder="клей"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.spliceMaterials}
                        />
                        <Field
                            name="splice.position"
                            className="!later"
                            placeholder="сверху"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.splicePositions}
                        />
                    </div>
                </FixingpapeTypeBlock>
            </div>
        </div>
    );
};

export default FixingpaperSubForm;
