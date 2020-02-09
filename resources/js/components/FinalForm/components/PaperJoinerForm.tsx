import React from 'react';
import { Field } from 'redux-form';
import PaperJoinerBlock from './PaperJoinerBlock';
import RadioBtn from '../../RadioBtn';
import { PaperJoiners, PaperJoinerName } from '../../../store/types';
import { paperJoinersNames } from '../../../store/consts';
import ReduxCreatableSelect from '../../ReduxCreatableSelect';
import { inputOptions } from '../../../store/data';
import CheckBox from '../../CheckBox';
import FieldLabel from '../../FieldLabel';
import Grid from '@material-ui/core/Grid';

const PaperJoinerForm = (): JSX.Element => {
    return (
        <Grid container spacing={5}>
            <Grid item xs={6} md={4}>
                {/* Радио баттоны: скрепка, пакет и т.д.  */}
                {paperJoinersNames.map((joinerName: PaperJoinerName) => (
                    <RadioBtn
                        key={joinerName}
                        className="passInputmb"
                        groupName="paperJoiner"
                        label={PaperJoiners[joinerName]}
                        name={joinerName}
                    />
                ))}
            </Grid>
            {/* Блоки, появляющиеся в зависимости от радио баттона */}
            <Grid item xs={6}>
                <PaperJoinerBlock blockName="paperClip">
                    <CheckBox name="auto" label="автомат" className="passInputmb" />
                    <CheckBox name="manual" label="ручная" className="passInputmb" />
                    <FieldLabel labelText="количество">
                        <Field
                            name="quantity"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                            placeholder="000"
                        />
                    </FieldLabel>
                    <Field className="passInputBorder passInputSize passInputmb w-100" name="type" component="select">
                        <option value="file">Файловая</option>
                    </Field>
                    <FieldLabel labelText="толщина">
                        <Field
                            name="width"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                    <FieldLabel labelText="сползание">
                        <Field
                            name="driftSize"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                </PaperJoinerBlock>
                <PaperJoinerBlock blockName="termo">
                    <FieldLabel labelText="корешок">
                        <Field
                            name="spine"
                            className="passInputBorder passInputSize w-50"
                            component="input"
                            type="text"
                        />
                    </FieldLabel>
                    <CheckBox name="klapanCover" className="passInputmb" label="обложка с клапаном" />
                    <Field
                        name="position"
                        placeholder="вровень с блоком"
                        component={ReduxCreatableSelect}
                        options={inputOptions.ositions}
                    />
                </PaperJoinerBlock>
                <PaperJoinerBlock blockName="spring">
                    <Field
                        name="color"
                        className="passInputmb"
                        placeholder="цвет"
                        component={ReduxCreatableSelect}
                        options={{}}
                    />
                    <Field
                        name="position"
                        className="passInputmb"
                        component={ReduxCreatableSelect}
                        placeholder="слева"
                        options={inputOptions.ositions}
                    />
                    <FieldLabel labelText="обложка &gt; блока">
                        <Field
                            name="coverBlockRatio"
                            className="passInputBorder passInputSize w-25"
                            component="input"
                            type="number"
                        />
                    </FieldLabel>
                </PaperJoinerBlock>
                <PaperJoinerBlock blockName="packet">
                    <Field
                        name="type"
                        className="passInputmb"
                        placeholder="люверсы"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.ypes}
                    />
                    <Field
                        name="handles"
                        className="passInputmb"
                        placeholder="ручки"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.andles}
                    />
                </PaperJoinerBlock>
                <PaperJoinerBlock blockName="splice">
                    <Field
                        name="material"
                        className="passInputmb"
                        placeholder="клей"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.aterials}
                    />
                    <Field
                        name="position"
                        className="passInputmb"
                        placeholder="сверху"
                        component={ReduxCreatableSelect}
                        isClearable={true}
                        options={inputOptions.ositions}
                    />
                </PaperJoinerBlock>
            </Grid>
        </Grid>
    );
};

export default PaperJoinerForm;
