import React,{useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout=props=>{
	const [showSideDrawer,setSideDrawer]=useState(false);
	const sideDrawerClosedHandler=()=>{
		setSideDrawer(false);
	}
	const sideDrawerToggleHandler=()=>{
		setSideDrawer(!showSideDrawer);
	}
		return (
			<Aux>
				<Toolbar 
					isAuth={props.isAuthenticated}
					drawerToggleClicked={sideDrawerToggleHandler}/>
				<SideDrawer 
					isAuth={props.isAuthenticated}
					closed={sideDrawerClosedHandler}
					open={showSideDrawer}/>
				<main className={classes.Content}>
					{props.children}
				</main>
			</Aux>
		)
}
const mapStateToProps=state=>{
	return{
		isAuthenticated:state.auth.token!==null
	};
};
export default connect(mapStateToProps,null)(Layout);