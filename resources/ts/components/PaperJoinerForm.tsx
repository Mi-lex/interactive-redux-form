import React from 'react'
import { useDispatch } from 'react-redux'
import { resetSection, clearFields, Field, FormSection, WrappedFieldProps } from 'redux-form'
import { PaperJoinerName } from '../store/types'
import { PaperJoiners } from '../store/enums'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import { Select, TextField } from './MaterialReduxForm'
import { paperJoinersNames } from '../store/consts'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

type CheckProps = WrappedFieldProps &
    CheckboxProps & {
        changeAction: () => void
    }

const renderCheckBox: React.FC<CheckProps> = props => {
    const {
        input,
        changeAction,
        value,
        meta: { touched, invalid, error },
    } = props

    const changeCheckboxHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        changeAction()
        input.onChange(ev.target.checked)
    }
    return (
        <>
            <Checkbox
                {...input}
                checked={input.value ? true : false}
                onChange={changeCheckboxHandler}
                color="primary"
                value={value}
            />
            {touched && error && <span className="error_msg">{error}</span>}
        </>
    )
}

const PaperJoinerForm = (): JSX.Element => {
    const dispatch = useDispatch()

    const clearSectionInputs = () => {
        /**
         * Uncheck all checkboxes before checking new one
         * this is basicallly radiobtn behaviour but with
         * opportunity to uncheck all inputs
         */
        clearFields('passport', true, false, 'paper_joiner.spring')
        dispatch(resetSection('passport', 'paper_joiner'))
    }

    return (
        <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={6} md={5}>
                <FormSection name="paper_joiner">
                    <FormGroup>
                        {/* Чекбоксы баттоны: скрепка, пакет и т.д.  */}
                        {paperJoinersNames.map((joinerName: PaperJoinerName) => (
                            <FormControlLabel
                                key={joinerName}
                                control={
                                    <Field
                                        component={renderCheckBox}
                                        changeAction={clearSectionInputs}
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
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="paper_clip">
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
                        <Field name="type" component={Select}>
                            <MenuItem value="файловая">Файловая</MenuItem>
                            <MenuItem value="овальная">Овальная</MenuItem>
                        </Field>
                    </FormControl>

                    <Field fullWidth component={TextField} label="Толщина" type="number" name="width" />
                    <Field fullWidth component={TextField} label="Сползание" type="number" name="drift" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="termo">
                    <Field fullWidth component={TextField} label="Корешок" type="text" name="spine_width" />
                    <FormControlLabel
                        control={<Field component={Checkbox} name="flaps_cover" />}
                        label="Обложка с клапаном"
                    />
                    <FormControlLabel
                        control={<Field component={Checkbox} name="flush_with_block" />}
                        label="Вровень с блоком"
                    />
                    <FormControlLabel control={<Field component={Checkbox} name="braces" />} label="Укрепить скобами" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="spring">
                    <Field fullWidth component={TextField} label="Цвет" type="text" name="color" />
                    <FormControl fullWidth>
                        <InputLabel>Положение</InputLabel>
                        <Field name="position" component={Select}>
                            <MenuItem value="up">Сверху</MenuItem>
                            <MenuItem value="left">Слева</MenuItem>
                        </Field>
                    </FormControl>
                    <Field
                        fullWidth
                        component={TextField}
                        label="Обложка &gt; блока"
                        type="number"
                        name="cover_block_difference"
                    />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="packet">
                    <Field fullWidth component={TextField} label="Цвет люверсов" type="text" name="grommet_color" />
                    <Field fullWidth component={TextField} label="Цвет ручек" type="text" name="hands_color" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="glue_bonding">
                    <FormControl fullWidth>
                        <InputLabel>Тип клея</InputLabel>
                        <Field name="type" component={Select}>
                            <MenuItem value="sitol">Sitol</MenuItem>
                        </Field>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Место склеивания</InputLabel>
                        <Field name="position" component={Select}>
                            <MenuItem value="up">Сверху</MenuItem>
                            <MenuItem value="left">Слева</MenuItem>
                        </Field>
                    </FormControl>
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock NamesMap={PaperJoiners} checkboxGroupName="paper_joiner" blockName="special">
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
            </Grid>
        </Grid>
    )
}

export default PaperJoinerForm
