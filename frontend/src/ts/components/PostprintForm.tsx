import React from 'react'
import { Field, FormSection } from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import {
	bookfoldingOptions,
	foilOptions,
	laminationOptions,
	postPrintActionNames,
	varnishOptions,
} from '../store/constants'
import { PostPrintActions } from '../store/enums'
import { PostPrintActionName } from '../store/types'
import ConnectedHiddenBlock from './ConnectedHiddenBLock'
import { Checkbox, Select, TextField } from './MaterialReduxForm'
import RemovableComment from './RemovableComment'

const PostprintForm: React.FC = () => {
	const checkboxesGroupName = 'post_actions_checks'
	const blockUpperSectionName = 'post_actions'

	return (
		<Grid container item xs={12} md={6} spacing={1}>
			<Grid item xs={6}>
				<FormSection name={checkboxesGroupName}>
					<FormGroup>
						{/* Радио баттоны: скрепка, пакет и т.д.  */}
						{postPrintActionNames.map((postAction: PostPrintActionName) => (
							<FormControlLabel
								key={postAction}
								control={<Field component={Checkbox} name={postAction} />}
								label={PostPrintActions[postAction]}
								className="coloredLabel"
							/>
						))}
					</FormGroup>
				</FormSection>
			</Grid>
			<Grid item xs={6}>
				<FormSection name={blockUpperSectionName}>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="creasing"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Биговать */}
						<Field
							fullWidth
							component={TextField}
							label="Доли"
							type="text"
							name="parts"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="book_folding"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Фальцевать */}
						<FormControl fullWidth>
							<InputLabel>Вид</InputLabel>
							<Field
								name="type"
								component={Select}
								options={bookfoldingOptions}
							/>
						</FormControl>
						<Field
							fullWidth
							component={TextField}
							label="Цвет"
							type="text"
							name="color"
						/>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="lamination"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Ламинировать */}
						<FormControl fullWidth>
							<InputLabel>Вид ламинации</InputLabel>
							<Field
								name="type"
								component={Select}
								options={laminationOptions}
							/>
						</FormControl>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="revarnishing"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Лакировать */}
						<FormControl fullWidth>
							<InputLabel>Лак</InputLabel>
							<Field
								name="varnish_type"
								component={Select}
								options={varnishOptions}
							/>
						</FormControl>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="embossing"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Тиснить фольгой */}
						<FormControl fullWidth>
							<InputLabel>Тип фольги</InputLabel>
							<Field
								name="foil_type"
								component={Select}
								options={foilOptions}
							/>
						</FormControl>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="stamp_cut"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Вырубить штампом */}
						<Field
							fullWidth
							component={TextField}
							label="Штамп"
							type="text"
							name="name"
						/>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="perforation"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Перфорация */}
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
					<ConnectedHiddenBlock
						NamesMap={PostPrintActions}
						blockName="hot_stamp"
						checkboxGroupName={checkboxesGroupName}
					>
						{/* Конгрев*/}
						<FormControl fullWidth>
							<InputLabel>??</InputLabel>
							<Field name="type" component={Select}>
								<MenuItem value="?">??</MenuItem>
							</Field>
						</FormControl>
						<Field
							fullWidth
							component={TextField}
							label="Элементы"
							type="text"
							name="elements"
						/>
						<RemovableComment />
					</ConnectedHiddenBlock>
				</FormSection>
			</Grid>
		</Grid>
	)
}

export default PostprintForm
