import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect,withRouter} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Checkout =props=>{
	/*state={
		ingredients:null,
		totalPrice:0
	}
	initState=()=>{
		const queryInit=new URLSearchParams(this.props.location.search);
		const ingredientsInit={};
		let priceInit=0;
		for(let param of queryInit.entries()){
			if(param[0]==='price'){
				priceInit=param[1];
			}
			else{
				ingredientsInit[param[0]]=+param[1];
			}
			
		}
		return{ingredients:ingredientsInit,totalPrice:priceInit};
	}
	state=this.initState();*/
	props.onInitPurchase();
	
	const checkoutCancelledHandler=()=>{
		props.history.goBack();
	}
	const checkoutContinuedHandler=()=>{
		props.history.replace('/checkout/contact-data');
	}

		let summary=<Redirect to="/" />
		if(props.ings){
			const purchasedRedirect=props.purchased?<Redirect to="/" />:null
			summary=<div>
						{purchasedRedirect}
						<CheckoutSummary 
							ingredients={props.ings}
							checkoutCancelled={checkoutCancelledHandler}
							checkoutContinued={checkoutContinuedHandler}/>
						<Route 
						path={props.match.path+'/contact-data'} 
					    component={ContactData} />
				    </div>
		}
		return summary;
}

const mapStateToProps=state=>{
	return{
		ings:state.burgerBuilder.ingredients,
		purchased:state.order.purchased
	}
};
const mapDispatchToProps=dispatch=>{
	return{
		onInitPurchase:()=>dispatch(actions.purchaseInit())
	}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Checkout));