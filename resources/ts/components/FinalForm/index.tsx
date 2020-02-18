import React from 'react'
import PostprintForm from './components/PostprintForm'
import PaperJoinerForm from './components/PaperJoinerForm'
import Grid from '@material-ui/core/Grid'

const FinalForm: React.FC = () => {
    return (
        <>
            <PaperJoinerForm />
            <PostprintForm />
        </>
    )
}

export default FinalForm
