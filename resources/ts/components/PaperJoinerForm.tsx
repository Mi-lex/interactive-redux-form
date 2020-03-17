import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, FormSection, formValueSelector, resetSection, clearFields } from 'redux-form'

import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import { paperClipTypeOptions, paperJoinersNames, positionOptions } from '../store/consts'
import { PaperJoiners } from '../store/enums'
import { PaperJoinerName } from '../store/types'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import { Checkbox, Select, TextField } from './MaterialReduxForm'
import { RootState } from '../store/rootReducer'

const selector: Function = formValueSelector('passport')

const PaperJoinerForm = (): JSX.Element => {
    const activePaperChecks = useSelector(state => selector(state, 'paper_joiner_checks')) || {}

    const activeChecks = Object.entries(activePaperChecks).filter(([_, value]) => value)

    const dispatch = useDispatch()
    const checkboxesGroupName = 'paper_joiner_checks'
    const blockUpperSectionName = 'paper_joiner'

    const clearChecks = (currentCheck: PaperJoinerName) => {
        return (checked: boolean) => {
            /**
             * Uncheck active checkbox before checking new one
             * this is basically radiobtn behavior but with
             * opportunity to uncheck all inputs
             */
            if (activeChecks.length > 0) {
                const activeChecksNames = activeChecks.map(([name, _]) => `${checkboxesGroupName}.${name}`)
                const correspondingBlocks = activeChecks.map(([name, _]) => `${blockUpperSectionName}.${name}`)
                // dispatch(clearFields('passport', false, false, `${checkboxesGroupName}`))
                dispatch(clearFields('passport', false, false, ...activeChecksNames))
                dispatch(clearFields('passport', false, false, ...correspondingBlocks))
            }
        }
    }

    return (
        <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={6} md={5}>
                <FormSection name={checkboxesGroupName}>
                    <FormGroup>
                        {/* Чекбоксы-баттоны: скрепка, пакет и т.д.  */}
                        {paperJoinersNames.map((joinerName: PaperJoinerName) => (
                            <FormControlLabel
                                key={joinerName}
                                control={
                                    <Field
                                        component={Checkbox}
                                        changeAction={clearChecks(joinerName)}
                                        name={joinerName}
                                    />
                                }
                                label={PaperJoiners[joinerName]}
                            />
                        ))}
                    </FormGroup>
                </FormSection>
            </Grid>
            {/* Блоки, появляющиеся в зависимости от выделенного чекбокса */}
            <Grid item xs={6}>
                <FormSection name={blockUpperSectionName}>
                    {/* Скрепка */}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="paper_clip"
                    >
                        <Box display="flex" justifyContent="space-between">
                            <FormControlLabel
                                style={{ marginRight: 8, marginBottom: 0 }}
                                control={<Field component={Checkbox} name="автомат" />}
                                label="Автомат"
                            />
                            <FormControlLabel
                                style={{ marginRight: 8, marginBottom: 0 }}
                                control={<Field component={Checkbox} name="ручная" />}
                                label="Ручная"
                            />
                        </Box>
                        <Field fullWidth component={TextField} label="Количество" type="number" name="quantity" />
                        <FormControl fullWidth>
                            <InputLabel>Тип</InputLabel>
                            <Field name="type" component={Select} options={paperClipTypeOptions} />
                        </FormControl>
                        <Field fullWidth component={TextField} label="Толщина" type="number" name="width" />
                        <Field fullWidth component={TextField} label="Сползание" type="number" name="drift" />
                    </ConnectedHiddenBlock>
                    {/* Термо */}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="termo"
                    >
                        <Field fullWidth component={TextField} label="Корешок" type="text" name="spine_width" />
                        <FormControlLabel
                            control={<Field component={Checkbox} name="flaps_cover" />}
                            label="Обложка с клапаном"
                        />
                        <FormControlLabel
                            control={<Field component={Checkbox} name="flush_with_block" />}
                            label="Вровень с блоком"
                        />
                        <FormControlLabel
                            control={<Field component={Checkbox} name="braces" />}
                            label="Укрепить скобами"
                        />
                    </ConnectedHiddenBlock>
                    {/* Пружина*/}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="spring"
                    >
                        <Field fullWidth component={TextField} label="Цвет" type="text" name="color" />
                        <FormControl fullWidth>
                            <InputLabel>Положение</InputLabel>
                            <Field name="position" options={positionOptions} component={Select} />
                        </FormControl>
                        <Field
                            fullWidth
                            component={TextField}
                            label="Обложка &gt; блока"
                            type="number"
                            name="cover_block_difference"
                        />
                    </ConnectedHiddenBlock>
                    {/* Пакет */}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="packet"
                    >
                        <Field fullWidth component={TextField} label="Цвет люверсов" type="text" name="grommet_color" />
                        <Field fullWidth component={TextField} label="Цвет ручек" type="text" name="hands_color" />
                    </ConnectedHiddenBlock>
                    {/* Проклейка */}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="glue_bonding"
                    >
                        <FormControl fullWidth>
                            <InputLabel>Тип клея</InputLabel>
                            <Field name="type" component={Select}>
                                <MenuItem value="sitol">Sitol</MenuItem>
                            </Field>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Место склеивания</InputLabel>
                            <Field name="position" options={positionOptions} component={Select} />
                        </FormControl>
                    </ConnectedHiddenBlock>
                    {/* Спец. обработка */}
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="special"
                    >
                        <Field
                            fullWidth
                            multiline
                            component={TextField}
                            label="Описание"
                            type="text"
                            name="description"
                            rows="8"
                            variant="outlined"
                        />
                    </ConnectedHiddenBlock>
                </FormSection>
            </Grid>
        </Grid>
    )
}

export default PaperJoinerForm
