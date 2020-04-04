import React from 'react'
import { Field } from 'redux-form'
import TextField from './MaterialReduxForm/TextField'

const Details = () => {
	const variant = 'standard'

	return (
		<>
			<Field
				fullWidth
				component={TextField}
				name="is_cut"
				type="text"
				variant={variant}
				label="Обрезной"
			/>
			<Field
				fullWidth
				component={TextField}
				name="circulation"
				type="text"
				variant={variant}
				label="Тираж"
			/>
			{/* Повтор - номер повторяемого заказа */}
			<Field
				fullWidth
				component={TextField}
				name="similar_order_id"
				type="number"
				variant={variant}
				label="Повтор"
			/>
		</>
	)
}

export default Details
