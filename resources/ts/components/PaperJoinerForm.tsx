import React from 'react'
import { useDispatch } from 'react-redux'
import { resetSection, Field, FormSection, WrappedFieldProps } from 'redux-form'
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
import { Select, TextField, Checkbox } from './MaterialReduxForm'
import { paperJoinersNames } from '../store/consts'

const PaperJoinerForm = (): JSX.Element => {
    const dispatch = useDispatch()
    const checkboxesGroupName = 'paper_joiner_checks'

    const clearSectionInputs = (blockName: PaperJoinerName) => {
        /**
         * Uncheck all checkboxes before checking new one
         * this is basically radiobtn behavior but with
         * opportunity to uncheck all inputs
         */
        dispatch(resetSection('passport', checkboxesGroupName))
        dispatch(resetSection('passport', 'paper_joiner'))
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
                <FormSection name="paper_joiner">
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
                            <Field name="type" component={Select}>
                                <MenuItem value="файловая">Файловая</MenuItem>
                                <MenuItem value="овальная">Овальная</MenuItem>
                            </Field>
                        </FormControl>

                        <Field fullWidth component={TextField} label="Толщина" type="number" name="width" />
                        <Field fullWidth component={TextField} label="Сползание" type="number" name="drift" />
                    </ConnectedHiddenBlock>
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
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="spring"
                    >
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
                    <ConnectedHiddenBlock
                        NamesMap={PaperJoiners}
                        checkboxGroupName={checkboxesGroupName}
                        blockName="packet"
                    >
                        <Field fullWidth component={TextField} label="Цвет люверсов" type="text" name="grommet_color" />
                        <Field fullWidth component={TextField} label="Цвет ручек" type="text" name="hands_color" />
                    </ConnectedHiddenBlock>
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
                            <Field name="position" component={Select}>
                                <MenuItem value="up">Сверху</MenuItem>
                                <MenuItem value="left">Слева</MenuItem>
                            </Field>
                        </FormControl>
                    </ConnectedHiddenBlock>
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
                </FormSection>{' '}
            </Grid>
        </Grid>
    )
}

export default PaperJoinerForm
