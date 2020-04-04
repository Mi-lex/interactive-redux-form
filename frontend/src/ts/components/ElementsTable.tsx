import React from 'react'
import {
	Field,
	FieldArray,
	FormSection,
	WrappedFieldArrayProps,
} from 'redux-form'
import {
	Box,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	Typography,
} from '@material-ui/core'
import RemoveRow from '@material-ui/icons/DeleteForever'
import AddRow from '@material-ui/icons/PlaylistAdd'

import { printOptions } from '../store/consts'
import Select from './MaterialReduxForm/Select'
import TextField from './MaterialReduxForm/TextField'

type ElementsFieldPropType = {
	name: string
}

const ElementsRow: React.FC<ElementsFieldPropType> = ({ name }) => (
	<FormSection name={name}>
		<Grid
			container
			item
			xs={12}
			style={{ marginLeft: 0, marginRight: 0 }}
			spacing={2}
		>
			<Grid item xs={6} md={2}>
				<Field
					name="name"
					label="Часть"
					fullWidth
					component={TextField}
					type="text"
				/>
			</Grid>
			<Grid item xs={6} md={2}>
				<Field
					name="stripes"
					label="Полос"
					fullWidth
					component={TextField}
					type="number"
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={2}>
				<Field
					name="material"
					label="Материал"
					fullWidth
					component={TextField}
					type="text"
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={2}>
				<FormControl fullWidth>
					{/* офсет, цифра, уф-принтер, плоттер, без печати */}
					<InputLabel>Печать</InputLabel>
					<Field name="print_type" component={Select} options={printOptions} />
				</FormControl>
			</Grid>
			<Grid item xs={12} md={2}>
				<Field
					name="brightness"
					fullWidth
					label="Красочность"
					component={TextField}
					type="text"
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Field
					name="color_interpretation"
					fullWidth
					label="Расшифровка"
					component={TextField}
					type="text"
				/>
			</Grid>
		</Grid>
	</FormSection>
)

const ElementsTable = ({
	fields,
}: WrappedFieldArrayProps<string>): JSX.Element => (
	<>
		{fields.map((order, index) => (
			<ElementsRow key={index} name={`${order}`} />
		))}

		<Box
			display="flex"
			width="100%"
			justifyContent="space-between"
			alignItems="center"
			pt={1}
			style={{ color: 'grey' }}
		>
			<Typography variant="body1" style={{ marginLeft: 5 }}>
				{!fields.length && 'Добавить элементы заказа'}
			</Typography>
			<div>
				<IconButton
					aria-label="добавить строку"
					onClick={(): void => {
						fields.push('')
					}}
					color="inherit"
				>
					<AddRow fontSize="small" />
				</IconButton>
				<IconButton
					aria-label="удалить строку"
					onClick={(): void => {
						fields.pop()
					}}
					color="inherit"
				>
					<RemoveRow fontSize="small" />
				</IconButton>
			</div>
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
		mb={2}
	>
		<FieldArray name="elements" component={ElementsTable} />
	</Box>
)

export default ElementsForm
