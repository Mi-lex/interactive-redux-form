import React from 'react'
import { Field, FormSection } from 'redux-form'
import { Grid, FormGroup, FormControl, FormControlLabel, MenuItem, InputLabel } from '@material-ui/core'
import { postPrintActionNames } from '../../../store/consts'
import { PostPrintActionName, PostPrintActions } from '../../../store/types'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import renderCheckbox from '../../MaterialReduxForm/Checkbox'
import renderSelect from '../../MaterialReduxForm/Select'
import renderTextField from '../../MaterialReduxForm/TextField'

const PostprintForm: React.FC = () => {
    return (
        <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={6}>
                <FormSection name="postprintActions">
                    <FormGroup>
                        {/* Радио баттоны: скрепка, пакет и т.д.  */}
                        {postPrintActionNames.map((postAction: PostPrintActionName) => (
                            <FormControlLabel
                                key={postAction}
                                control={<Field component={renderCheckbox} name={postAction} />}
                                label={PostPrintActions[postAction]}
                            />
                        ))}
                    </FormGroup>
                </FormSection>
            </Grid>
            <Grid item xs={6}>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="lamitation"
                    checkboxGroupName="postprintActions"
                >
                    {/* Ламинировать */}
                    <FormControl fullWidth>
                        <InputLabel>Вид ламинации</InputLabel>
                        <Field name="type" component={renderSelect}>
                            <MenuItem value="glossy">Глянцевая</MenuItem>
                            <MenuItem value="matte">Матовая</MenuItem>
                            <MenuItem value="softtouch">Cофт-тач</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="revanishing"
                    checkboxGroupName="postprintActions"
                >
                    {/* Лакировать */}
                    <FormControl fullWidth>
                        <InputLabel>Лак</InputLabel>
                        <Field name="type" component={renderSelect}>
                            <MenuItem value="glossy">Глянцевый</MenuItem>
                            <MenuItem value="matte">Матовый</MenuItem>
                            <MenuItem value="softtouch">Cофт-тач</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="embossing"
                    checkboxGroupName="postprintActions"
                >
                    {/* Тиснить фольгой */}
                    <FormControl fullWidth>
                        <InputLabel>Вид</InputLabel>
                        <Field name="type" component={renderSelect}>
                            <MenuItem value="holographic">Голографическая</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="stampCut"
                    checkboxGroupName="postprintActions"
                >
                    {/* Вырубить штампом */}
                    <Field fullWidth component={renderTextField} label="Штамп" type="text" name="description" />
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="perforation"
                    checkboxGroupName="postprintActions"
                >
                    {/* Перфорация */}
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="hotStamp"
                    checkboxGroupName="postprintActions"
                >
                    {/* Конгрев*/}
                    <FormControl fullWidth>
                        <InputLabel>??</InputLabel>
                        <Field name="type" component={renderSelect}>
                            <MenuItem value="?">??</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={renderTextField} label="Элементы" type="text" name="description" />
                </ConnectedHiddenBlock>
            </Grid>
        </Grid>
    )
}

export default PostprintForm
