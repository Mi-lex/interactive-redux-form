import React from 'react';
import { Field } from 'redux-form';
import FixingpapeTypeBlock from '../containers/FixingpapeTypeBlock';
import RadioBtn from './RadioBtn';
import { FixingPapersType, FixingPapersTypeString } from '../store/types';
import { fixingPapersTypeList } from '../store/consts';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';
import CheckBox from './CheckBox';
import FieldLabel from './FieldLabel';

const FixingpaperSubForm = (): JSX.Element => {
    return (
        <div className="row">
            <div className="col-4">
                {/* Радио баттоны: скрепка, пакет и т.д.  */}
                {fixingPapersTypeList.map((type: FixingPapersTypeString) => (
                    <RadioBtn
                        key={type}
                        className="passInputmb"
                        groupName="fixingPaperType"
                        label={FixingPapersType[type]}
                        name={type}
                    />
                ))}
            </div>
            {/* Блоки, появляющиеся в зависимости от радио баттона */}
            <div className="col-6">
                <FixingpapeTypeBlock blockName="paperClip">
                    <CheckBox name="paperClip.auto" label="автомат" className="passInputmb" />
                    <CheckBox name="paperClip.manual" label="ручная" className="passInputmb" />
                    <FieldLabel labelText="количество">
                        <Field
                            name="paperClip.quantity"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                            placeholder="000"
                        />
                    </FieldLabel>
                    <Field
                        className="passInputBorder passInputSize passInputmb w-100"
                        name="papaerClip.type"
                        component="select"
                    >
                        <option value="file">Файловая</option>
                    </Field>
                    <FieldLabel labelText="толщина">
                        <Field
                            name="paperClip.width"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                    <FieldLabel labelText="сползание">
                        <Field
                            name="paperClip.driftSize"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="termo">
                    <FieldLabel labelText="корешок">
                        <Field
                            name="termo.spine"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="text"
                        />
                    </FieldLabel>
                    <CheckBox name="paperClip.klapanCover" className="passInputmb" label="обложка с клапаном" />
                    <Field
                        name="termo.position"
                        placeholder="вровень с блоком"
                        component={ReduxCreatableSelect}
                        options={inputOptions.termoPositions}
                    />
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="spring">
                    <Field
                        name="spring.color"
                        className="passInputmb"
                        placeholder="цвет"
                        component={ReduxCreatableSelect}
                        options={{}}
                    />
                    <Field
                        name="spring.position"
                        className="passInputmb"
                        component={ReduxCreatableSelect}
                        placeholder="слева"
                        options={inputOptions.springPositions}
                    />
                    <FieldLabel labelText="обложка &gt; блока">
                        <Field
                            name="spring.coverBiggerThanBlock"
                            className="passInputBorder passInputSize w-25"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="packet">
                    <Field
                        name="packet.type"
                        className="passInputmb"
                        placeholder="люверсы"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.packetTypes}
                    />
                    <Field
                        name="packet.handles"
                        className="passInputmb"
                        placeholder="ручки"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.packetHandles}
                    />
                </FixingpapeTypeBlock>
                <FixingpapeTypeBlock blockName="splice">
                    <Field
                        name="splice.material"
                        className="passInputmb"
                        placeholder="клей"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.spliceMaterials}
                    />
                    <Field
                        name="splice.position"
                        className="passInputmb"
                        placeholder="сверху"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.splicePositions}
                    />
                </FixingpapeTypeBlock>
            </div>
        </div>
    );
};

export default FixingpaperSubForm;
