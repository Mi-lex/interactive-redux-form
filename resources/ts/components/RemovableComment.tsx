import React from 'react'
import { Field, FieldArray, WrappedFieldArrayProps } from 'redux-form'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import RemoveComment from '@material-ui/icons/DeleteForever'
import AddComment from '@material-ui/icons/PlaylistAdd'

import { TextField } from './MaterialReduxForm'

const Comments = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((comment, index) => (
            <Field component={TextField} multiline label="Дополнительно" fullWidth key={index} name={comment} />
        ))}
        <Box display="flex" width="100%" justifyContent="flex-end" pt={1}>
            <IconButton
                aria-label="добавить строку"
                onClick={(): void => {
                    fields.push('')
                }}
                color="primary"
            >
                <AddComment fontSize="small" />
            </IconButton>
            <IconButton
                aria-label="удалить строку"
                onClick={(): void => {
                    fields.pop()
                }}
                color="primary"
            >
                <RemoveComment fontSize="small" />
            </IconButton>
        </Box>
    </>
)

const RemovableComment = () => {
    return <FieldArray name="additional" component={Comments} />
}

export default RemovableComment
