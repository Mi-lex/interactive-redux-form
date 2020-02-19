import React from 'react'
import { Field, FieldArray, WrappedFieldArrayProps, FormSection } from 'redux-form'
import renderTextField from './MaterialReduxForm/TextField'
import renderSelect from './MaterialReduxForm/Select'
import PassportBtn from './PassportBtn'
import { Grid, FormControl, InputLabel, MenuItem, Box } from '@material-ui/core'

type OrderElementsFieldPropType = {
    name: string
}

const OrderElementsRow: React.FC<OrderElementsFieldPropType> = () => (
    <FormSection name="OrderElement">
        <Grid container item xs={12} style={{ marginLeft: 0, marginRight: 0 }} spacing={2}>
            <Grid item xs={6} md={2}>
                <Field name="name" label="Часть" fullWidth component={renderTextField} type="text" />
            </Grid>
            <Grid item xs={6} md={2}>
                <Field name="stripes" label="Полос" fullWidth component={renderTextField} type="number" />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Field name="wrapMaterial" label="Материал" fullWidth component={renderTextField} type="text" />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                    {/* офсет, цифра, уф-принтер, плоттер, без печати */}
                    <InputLabel>Печать</InputLabel>
                    <Field name="packageType" component={renderSelect}>
                        <MenuItem value="noPrinting">Без печати</MenuItem>
                        <MenuItem value="offset">Оффсет</MenuItem>
                        <MenuItem value="digital">Цифровая</MenuItem>
                        <MenuItem value="ultraviolet">Уф-принтер</MenuItem>
                        <MenuItem value="plotter">Плоттер</MenuItem>
                    </Field>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
                <Field name="brighness" fullWidth label="Красочность" component={renderTextField} type="number" />
            </Grid>
            <Grid item xs={12} md={2}>
                <Field
                    name="colorInterpretation"
                    fullWidth
                    label="Расшифровка"
                    component={renderTextField}
                    type="text"
                />
            </Grid>
        </Grid>
    </FormSection>
)

const OrderElementsTable = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((order, index) => (
            <OrderElementsRow key={index} name={`${order}Element`} />
        ))}

        <Box display="flex" width="100%" justifyContent="flex-end" pt={1} pr={2}>
            <PassportBtn
                size="sm"
                iconName={'newRow'}
                onClick={(): void => {
                    fields.push('')
                }}
            />
            <PassportBtn
                size="sm"
                iconName={'deleteRow'}
                onClick={(): void => {
                    fields.pop()
                }}
            />
        </Box>
    </>
)

const OrderElementsForm: React.FC = () => (
    <Box
        borderTop="1px solid rgba(0, 0, 0, 0.12)"
        py={1}
        width="100%"
        borderBottom="1px solid rgba(0, 0, 0, 0.12)"
        borderRadius={4}
    >
        <FieldArray name="orders" component={OrderElementsTable} />
    </Box>
)

export default OrderElementsForm
