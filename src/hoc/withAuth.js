
import { withRouter } from 'react-router-dom'
import { UseAuth } from './../customHooks'

const WithAuth = (props) => UseAuth(props) && props.children;

export default withRouter(WithAuth);