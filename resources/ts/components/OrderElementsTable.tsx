import React from 'react'
import { Field, FieldArray, WrappedFieldArrayProps, FormSection } from 'redux-form'
import renderTextField from './MaterialReduxForm/TextField'
import renderSelect from './MaterialReduxForm/Select'
import PassportBtn from './PassportBtn'
import { Grid, FormControl, InputLabel, MenuItem, Box } from '@material-ui/core'

type OrderElementsFieldPropType = {
    name: string
}

const OrderElementsRow: React.FC<OrderElementsFieldPropType> = ({ name = 'orderElement' }) => (
    <>
        <FormSection name={name} container item component={Grid} xs={12} spacing={2}>
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
            <Grid item xs={12} sm={6} md={2}>
                <Field name="brighness" label="Красочность" component={renderTextField} type="number" />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Field name="colorInterpretation" label="Расшифровка цвета" component={renderTextField} type="text" />
            </Grid>
        </FormSection>
    </>
)

const OrderElementsTable = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((order, index) => (
            <OrderElementsRow key={index} name={`${order}Element`} />
        ))}

        <Box display="flex" width="100%" justifyContent="flex-end" mr={1}>
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

const OrderElementsForm: React.FC = () => <FieldArray name="orders" component={OrderElementsTable} />

export default OrderElementsForm
