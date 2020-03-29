import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}))

type Props = {
	imageClassName?: string
}

const SideBackgroundWrapper: React.FC<Props> = ({
	imageClassName,
	children,
}) => {
	const classes = useStyles()
	imageClassName = imageClassName || classes.image

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={imageClassName} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				{children}
			</Grid>
		</Grid>
	)
}

export default SideBackgroundWrapper
