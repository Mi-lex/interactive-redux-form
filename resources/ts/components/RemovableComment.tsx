import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { Field, FieldArray, WrappedFieldArrayProps } from 'redux-form'
import { TextareaAutosize } from './MaterialReduxForm'
import AddComment from '@material-ui/icons/PlaylistAdd'
import RemoveComment from '@material-ui/icons/DeleteForever'

const Comments = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((comment, index) => (
            <Field component={TextareaAutosize} label="Дополнительно" fullWidth key={index} name={comment} />
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
    return <FieldArray name="additonal" component={Comments} />
}

export default RemovableComment
