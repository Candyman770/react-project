import React,{Suspense,useEffect} from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import './App.module.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const AsyncCheckout=React.lazy(()=>import('./containers/Checkout/Checkout'));
const AsyncOrders=React.lazy(()=>import('./containers/Orders/Orders'));
const AsyncAuth=React.lazy(()=>import('./containers/Auth/Auth'));

const App=props=>{
	const {onTryAutoSignup}=props;
	useEffect(()=>{
		onTryAutoSignup();
	},[onTryAutoSignup])
		let routes=(
			<Switch>
				<Route path="/auth" render={(props)=><AsyncAuth {...props}/>} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
		if(props.isAuthenticated){
			routes=(
				<Switch>
					<Route path="/checkout" render={(props)=><AsyncCheckout {...props}/>} />
		      		<Route path="/orders" render={(props)=><AsyncOrders {...props}/>} />
		      		<Route path="/logout" component={Logout} />
		      		<Route path="/auth" render={(props)=><AsyncAuth {...props}/>} />
		      		<Route path="/" exact component={BurgerBuilder} />
		      		<Redirect to="/" />
				</Switch>
			);
		}
		return (
	    <div >
	      <Layout>
	      	<Suspense fallback={<Spinner />}>{routes}</Suspense>
	      </Layout>
	    </div>
  		);
}
const mapStateToProps=state=>{
	return{
		isAuthenticated:state.auth.token!==null
	};
};

const mapDispatchToProps=dispatch=>{
	return{
		onTryAutoSignup:()=>dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
