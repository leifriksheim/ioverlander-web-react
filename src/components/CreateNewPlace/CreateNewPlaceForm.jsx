import React, { PropTypes } from 'react'
import { UpdatePlaceDetailsForm, FIELDS, validateFields } from '../CheckIn/Forms/PlaceDetails'
import createValidatedForm from '../Validation/ValidatedForm'

export default createValidatedForm(UpdatePlaceDetailsForm, FIELDS, validateFields)
