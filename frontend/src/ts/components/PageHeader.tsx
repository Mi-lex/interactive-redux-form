import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleDrawer } from '../store/modules/drawer/actions'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'
import authActionCreator from '../store/modules/auth/actions'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	}),
)

const PageHeader: React.FC = (props) => {
	const { children } = props
	const dispatch = useDispatch()

	const toggle = () => {
		dispatch(toggleDrawer())
	}

	const logout = () => {
		dispatch(authActionCreator.logout())
	}

	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl,
	] = React.useState<null | HTMLElement>(null)

	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const menuId = 'account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Мой профиль</MenuItem>
			<MenuItem onClick={logout}>Выйти</MenuItem>
		</Menu>
	)

	const mobileMenuId = 'account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Сообщения</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Оповещения</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Профиль</p>
			</MenuItem>
		</Menu>
	)

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						onClick={toggle}
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<div className={classes.grow}>{children}</div>
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 7 new notifications" color="inherit">
							<Badge badgeContent={7} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	)
}

export default PageHeader
