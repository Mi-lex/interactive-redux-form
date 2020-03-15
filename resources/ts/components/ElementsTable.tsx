import React from 'react'
import { Field, FieldArray, WrappedFieldArrayProps, FormSection } from 'redux-form'
import TextField from './MaterialReduxForm/TextField'
import Select from './MaterialReduxForm/Select'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { printOptions } from '../store/consts'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import AddRow from '@material-ui/icons/PlaylistAdd'
import RemoveRow from '@material-ui/icons/DeleteForever'

type ElementsFieldPropType = {
    name: string
}

const ElementsRow: React.FC<ElementsFieldPropType> = ({ name }) => (
    <FormSection name={name}>
        <Grid container item xs={12} style={{ marginLeft: 0, marginRight: 0 }} spacing={2}>
            <Grid item xs={6} md={2}>
                <Field name="name" label="Часть" fullWidth component={TextField} type="text" />
            </Grid>
            <Grid item xs={6} md={2}>
                <Field name="stripes" label="Полос" fullWidth component={TextField} type="number" />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Field name="material" label="Материал" fullWidth component={TextField} type="text" />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                    {/* офсет, цифра, уф-принтер, плоттер, без печати */}
                    <InputLabel>Печать</InputLabel>
                    <Field name="print_type" component={Select} options={printOptions} />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
                <Field name="brightness" fullWidth label="Красочность" component={TextField} type="text" />
            </Grid>
            <Grid item xs={12} md={2}>
                <Field name="color_interpretation" fullWidth label="Расшифровка" component={TextField} type="text" />
            </Grid>
        </Grid>
    </FormSection>
)

const ElementsTable = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((order, index) => (
            <ElementsRow key={index} name={`${order}`} />
        ))}

        <Box display="flex" width="100%" justifyContent="flex-end" pt={1} pr={2}>
            <IconButton
                aria-label="добавить строку"
                onClick={(): void => {
                    fields.push('')
                }}
                color="primary"
            >
                <AddRow fontSize="small" />
            </IconButton>
            <IconButton
                aria-label="удалить строку"
                onClick={(): void => {
                    fields.pop()
                }}
                color="primary"
            >
                <RemoveRow fontSize="small" />
            </IconButton>
        </Box>
    </>
)

const ElementsForm: React.FC = () => (
    <Box
        borderTop="1px solid rgba(0, 0, 0, 0.12)"
        py={1}
        width="100%"
        borderBottom="1px solid rgba(0, 0, 0, 0.12)"
        borderRadius={4}
    >
        <FieldArray name="elements" component={ElementsTable} />
    </Box>
)

export default ElementsForm
