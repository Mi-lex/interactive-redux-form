import React from 'react'
import { Field, FormSection } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { postPrintActionNames } from '../store/consts'
import { PostPrintActionName } from '../store/types'
import { PostPrintActions } from '../store/enums'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import { Checkbox, Select, TextField } from './MaterialReduxForm'
import RemovableComment from './RemovableComment'

const PostprintForm: React.FC = () => {
    return (
        <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={6}>
                <FormSection name="post_actions">
                    <FormGroup>
                        {/* Радио баттоны: скрепка, пакет и т.д.  */}
                        {postPrintActionNames.map((postAction: PostPrintActionName) => (
                            <FormControlLabel
                                key={postAction}
                                control={<Field component={Checkbox} name={postAction} />}
                                label={PostPrintActions[postAction]}
                            />
                        ))}
                    </FormGroup>
                </FormSection>
            </Grid>
            <Grid item xs={6}>
                <ConnectedHiddenBlock NamesMap={PostPrintActions} blockName="creasing" checkboxGroupName="post_actions">
                    {/* Биговать */}
                    <Field fullWidth component={TextField} label="Доли" type="text" name="parts" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="book_folding"
                    checkboxGroupName="post_actions"
                >
                    {/* Фальцевать */}
                    <FormControl fullWidth>
                        <InputLabel>Вид</InputLabel>
                        <Field name="type" component={Select}>
                            <MenuItem value="евро">Евро</MenuItem>
                            <MenuItem value="гармошка">Гармошка</MenuItem>
                            <MenuItem value="оконная">Оконная</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={TextField} label="Цвет" type="text" name="color" />
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="lamitation"
                    checkboxGroupName="post_actions"
                >
                    {/* Ламинировать */}
                    <FormControl fullWidth>
                        <InputLabel>Вид ламинации</InputLabel>
                        <Field name="type" component={Select}>
                            <MenuItem value="glossy">Глянцевая</MenuItem>
                            <MenuItem value="matte">Матовая</MenuItem>
                            <MenuItem value="softtouch">Cофт-тач</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="revarnishing"
                    checkboxGroupName="post_actions"
                >
                    {/* Лакировать */}
                    <FormControl fullWidth>
                        <InputLabel>Лак</InputLabel>
                        <Field name="varnish_type" component={Select}>
                            <MenuItem value="glossy">Глянцевый</MenuItem>
                            <MenuItem value="matte">Матовый</MenuItem>
                            <MenuItem value="softtouch">Cофт-тач</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="embossing"
                    checkboxGroupName="post_actions"
                >
                    {/* Тиснить фольгой */}
                    <FormControl fullWidth>
                        <InputLabel>Тип фольги</InputLabel>
                        <Field name="type" component={Select}>
                            <MenuItem value="glossy">Глянцевая</MenuItem>
                            <MenuItem value="matte">Матовая</MenuItem>
                            <MenuItem value="holographic">Голографическая</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="stamp_cut"
                    checkboxGroupName="post_actions"
                >
                    {/* Вырубить штампом */}
                    <Field fullWidth component={TextField} label="Штамп" type="text" name="name" />
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="perforation"
                    checkboxGroupName="post_actions"
                >
                    {/* Перфорация */}
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
                <ConnectedHiddenBlock
                    NamesMap={PostPrintActions}
                    blockName="hot_stamp"
                    checkboxGroupName="post_actions"
                >
                    {/* Конгрев*/}
                    <FormControl fullWidth>
                        <InputLabel>??</InputLabel>
                        <Field name="type" component={Select}>
                            <MenuItem value="?">??</MenuItem>
                        </Field>
                    </FormControl>
                    <Field fullWidth component={TextField} label="Элементы" type="text" name="elements" />
                    <RemovableComment />
                </ConnectedHiddenBlock>
            </Grid>
        </Grid>
    )
}

export default PostprintForm
