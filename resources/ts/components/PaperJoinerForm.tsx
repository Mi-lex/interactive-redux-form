import React from 'react'
import { Field, FormSection } from 'redux-form'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import { PaperJoiners, PaperJoinerName } from '../store/types'
import { paperJoinersNames } from '../store/consts'
import { Box, Grid, FormGroup, FormControlLabel, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import renderSelect from './MaterialReduxForm/Select'
import renderCheckbox from './MaterialReduxForm/Checkbox'
import renderTextField from './MaterialReduxForm/TextField'

const PaperJoinerForm = (): JSX.Element => {
    return (
        <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={6} md={5}>
                <FormSection name="paperJoiners">
                    <FormGroup>
                        {/* Чекбоксы баттоны: скрепка, пакет и т.д.  */}
                        {paperJoinersNames.map((joinerName: PaperJoinerName) => (
                            <FormControlLabel
                                key={joinerName}
                                control={<Field component={renderCheckbox} name={joinerName} />}
                                label={PaperJoiners[joinerName]}
                            />
                        ))}
                    </FormGroup>
                </FormSection>
            </Grid>
            {/* Блоки, появляющиеся в зависимости от выделенного чекбокса */}
            <Grid item xs={6}>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="paperClip">
                    <Box display="flex" justifyContent="space-between">
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
                    </Box>
                    <Field fullWidth component={renderTextField} label="Количество" type="number" name="quantity" />

                    <FormControl fullWidth>
                        <InputLabel>Тип</InputLabel>
                        <Field name="packageType" component={renderSelect}>
                            <MenuItem value="file">Файловая</MenuItem>
                        </Field>
                    </FormControl>

                    <Field fullWidth component={renderTextField} label="Толщина" type="number" name="width" />
                    <Field fullWidth component={renderTextField} label="Сползание" type="number" name="driftWidth" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="termo">
                    <Field fullWidth component={renderTextField} label="Корешок" type="text" name="spine" />
                    <FormControlLabel
                        control={<Field component={renderCheckbox} name="klapanCover" />}
                        label="Обложка с клапаном"
                    />
                    <FormControlLabel
                        control={<Field component={renderCheckbox} name="position" />}
                        label="Вровень с блоком"
                    />
                    <FormControlLabel
                        control={<Field component={renderCheckbox} name="braces" />}
                        label="Укрепить скобами"
                    />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="spring">
                    <Field fullWidth component={renderTextField} label="Положение" type="text" name="spine" />
                    <FormControl fullWidth>
                        <InputLabel>Положение</InputLabel>
                        <Field name="position" component={renderSelect}>
                            <MenuItem value="left">Слева</MenuItem>
                            <MenuItem value="right">Справа</MenuItem>
                            <MenuItem value="down">Снизу</MenuItem>
                            <MenuItem value="up">Сверху</MenuItem>
                        </Field>
                    </FormControl>
                    <Field
                        fullWidth
                        component={renderTextField}
                        label="Обложка &gt; блока"
                        type="number"
                        name="coverBlockRatio"
                    />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="packet">
                    <Field fullWidth component={renderTextField} label="Цвет люверсов" type="text" name="luvColors" />
                    <Field fullWidth component={renderTextField} label="Цвет ручек" type="text" name="handsColor" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="splice">
                    <FormControl fullWidth>
                        <InputLabel>Тип клея</InputLabel>
                        <Field name="glueType" component={renderSelect}>
                            <MenuItem value="type1">Тип 1</MenuItem>
                            <MenuItem value="type2">Тип 2</MenuItem>
                            <MenuItem value="type3">Тип 3</MenuItem>
                        </Field>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Место склеивания</InputLabel>
                        <Field name="position" component={renderSelect}>
                            <MenuItem value="left">Слева</MenuItem>
                            <MenuItem value="right">Справа</MenuItem>
                            <MenuItem value="down">Снизу</MenuItem>
                            <MenuItem value="up">Сверху</MenuItem>
                        </Field>
                    </FormControl>
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paperJoiners" blockName="special">
                    <Field
                        fullWidth
                        multiline
                        component={renderTextField}
                        label="Описание"
                        type="text"
                        name="description"
                        rows="8"
                        variant="outlined"
                    />
                </ConnectedHiddenBlock>
            </Grid>
        </Grid>
    )
}

export default PaperJoinerForm
