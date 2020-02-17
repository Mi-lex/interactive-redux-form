import React from 'react'
import { Field, FormSection } from 'redux-form'
import PaperJoinerBlock from './PaperJoinerBlock'
import RadioBtn from '../../RadioBtn'
import { PaperJoiners, PaperJoinerName } from '../../../store/types'
import { paperJoinersNames } from '../../../store/consts'
import ReduxCreatableSelect from '../../ReduxCreatableSelect'
import { inputOptions } from '../../../store/data'
import CheckBox from '../../CheckBox'
import FieldLabel from '../../FieldLabel'
import { Typography, Grid, FormGroup, FormControlLabel, FormControl, InputLabel, MenuItem } from '@material-ui/core'

import renderSelect from '../../MaterialReduxForm/Select'
import renderCheckbox from '../../MaterialReduxForm/Checkbox'
import renderTextField from '../../MaterialReduxForm/TextField'

const PaperJoinerForm = (): JSX.Element => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6} md={5}>
                <FormSection name="paperJoiners" component={FormGroup}>
                    {/* Радио баттоны: скрепка, пакет и т.д.  */}
                    {paperJoinersNames.map((joinerName: PaperJoinerName) => (
                        <FormControlLabel
                            key={joinerName}
                            control={<Field component={renderCheckbox} name={joinerName} />}
                            label={PaperJoiners[joinerName]}
                        />
                    ))}
                </FormSection>
            </Grid>
            {/* Блоки, появляющиеся в зависимости от выделенного чекбокса */}
            <Grid item xs={6}>
                <PaperJoinerBlock blockName="paperClip">
                    <FormControlLabel
                        style={{ marginRight: 8, marginBottom: 0 }}
                        control={<Field component={renderCheckbox} name="auto" />}
                        label="Автомат"
                    />
                    <FormControlLabel
                        style={{ marginRight: 8, marginBottom: 0 }}
                        control={<Field component={renderCheckbox} name="manual" />}
                        label="Ручная"
                    />
                    <Field fullWidth component={renderTextField} label="Количество" type="number" name="quantity" />

                    <FormControl fullWidth>
                        <InputLabel>Тип</InputLabel>
                        <Field name="packageType" component={renderSelect}>
                            <MenuItem value="file">Файловая</MenuItem>
                        </Field>
                    </FormControl>

                    <Field fullWidth component={renderTextField} label="Толщина" type="number" name="width" />
                    <Field fullWidth component={renderTextField} label="Сползание" type="number" name="driftWidth" />
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
                        options={[]}
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
    )
}

export default PaperJoinerForm
