import React from 'react'
import Box from '@material-ui/core/Box'
import PassportBtn from './PassportBtn'
import { Field, FieldArray, WrappedFieldArrayProps } from 'redux-form'
import { TextareaAutosize } from './MaterialReduxForm'

const Comments = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((comment, index) => (
            <Field
                component={TextareaAutosize}
                label="Дополнительно"
                fullWidth
                key={index}
                name={comment}
            />
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

const RemovableComment = () => {
    return <FieldArray name="comments" component={Comments} />
}

export default RemovableComment
