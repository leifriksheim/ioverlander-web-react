/* Components */
import HomePage from '../components/HomePage/HomePage'
import FindByCountry from '../components/FindByCountry/FindByCountry'
import PlaceDetails from '../components/PlaceDetails/PlaceDetails'
import BlogDetails from '../components/BlogDetails/BlogDetails'
import CountryPlacesList from '../components/CountryPlacesList/CountryPlacesList'
import Login from '../components/Login/Login'
import UserRegistration from '../components/UserRegistration/UserRegistration'
import CheckInList from '../components/CheckInList/CheckInList'
import StaticPage from '../components/StaticPage/StaticPage'
import CheckIn from '../components/CheckIn/CheckIn'
import CreateNewPlace from '../components/CreateNewPlace/CreateNewPlace'
import ResetPassword from '../components/ResetPassword/ResetPassword'
import EditAccount from '../components/EditAccount/EditAccount'

/* Actions */
import { placesByCountryAction } from '../actions/placesByCountry'
import { placeDetailsAction } from '../actions/placeDetailsAction'
import { blogDetailsAction, blogDetailsFromEditAction } from '../actions/blogDetailsAction'
import { blogCheckInsAction } from '../actions/blogCheckInsAction'
import { searchForPlacesAction } from '../actions/searchForPlacesAction'
import { getStaticContentAction } from '../actions/getStaticContentAction'
import { checkResetTokenAction } from '../actions/checkResetToken'
import { getPlaceTypesFromAPI } from '../actions/getPlaceTypes'

/* Routes */
const routes = {
  'homepage': {
    'path': '/',
    'type': 'GET',
    'title': 'iOverlander - Find your next destination',
    'handler': HomePage,
    'action': getPlaceTypesFromAPI
  },
  'find_by_country': {
    'path': '/countries/places_by_country',
    'type': 'GET',
    'title': 'Find Places by Country - iOverlander',
    'handler': FindByCountry,
    'action': placesByCountryAction
  },
  'login_form': {
    path: '/users/sign_in',
    type: 'GET',
    title: 'iOverlander - Login',
    handler: Login
  },
  'password_reset': {
    path: '/users/reset_password',
    type: 'GET',
    title: 'iOverlander - Reset your password',
    handler: ResetPassword,
    action: checkResetTokenAction
  },
  'registration_form': {
    path: '/users/sign_up',
    type: 'GET',
    title: 'iOverlander - Register',
    handler: UserRegistration
  },
  'edit_account_form': {
    path: '/users/edit',
    type: 'GET',
    title: 'iOverlander - Edit Account',
    handler: EditAccount,
    role_required: 'user',
    action: blogDetailsFromEditAction
  },
  'new_place': {
    'path': '/places/new',
    'type': 'GET',
    'handler': CreateNewPlace,
    'title': 'Add new Place | iOverlander',
    'role_required': 'user',
    'action': placeDetailsAction
  },
  'place_details': {
    'path': '/places/:id',
    'type': 'GET',
    'handler': PlaceDetails,
    'action': placeDetailsAction
  },
  'blog_details': {
    'path': '/blogs/:id',
    'type': 'GET',
    'handler': BlogDetails,
    'action': blogDetailsAction
  },
  'blog_check_ins': {
    'path': '/blogs/:id/check_ins/:page',
    'type': 'GET',
    'handler': CheckInList,
    'action': blogCheckInsAction
  },
  'country_places_list': {
    'path': '/country_places_list/:country/:page',
    'type': 'GET',
    'handler': CountryPlacesList,
    'action': searchForPlacesAction
  },
  'static_pages': {
    'path': '/static/:pageName',
    'type': 'GET',
    'handler': StaticPage,
    'action': getStaticContentAction
  },
  'check_in': {
    'path': '/check_ins/new',
    'type': 'GET',
    'handler': CheckIn,
    'action': placeDetailsAction,
    'title': 'Check-in | iOverlander',
    'role_required': 'user'
  }
}

export default routes
