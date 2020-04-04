import React from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { Checkbox, TextField } from '../components/MaterialReduxForm'

const selector: Function = formValueSelector('passport')

const DeliveryBlock = () => {
	const requiredDelivery = useSelector((state) =>
		selector(state, 'delivery.should_be_delivered'),
	)

	return (
		<>
			<FormControl fullWidth style={{ marginBottom: 6 }}>
				<FormControlLabel
					className="coloredLabel"
					control={
						<Field name="delivery.should_be_delivered" component={Checkbox} />
					}
					label="Доставить"
				/>
			</FormControl>
			<Field
				component={TextField}
				disabled={!requiredDelivery}
				name="delivery.address"
				label="Адрес"
				type="text"
				fullWidth
				rows={6}
				multiline
				variant="outlined"
			/>
		</>
	)
}

export default DeliveryBlock
