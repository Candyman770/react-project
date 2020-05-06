import React,{useState,useEffect,useCallback} from 'react';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import {useDispatch,useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';


export const BurgerBuilder =props=>{
	/*state={
		purchasing:false,
		loading:false,
		error:false
	}*/
	const [purchasing,setPurchasing]=useState(false);

	const dispatch=useDispatch();
	const ings=useSelector(state=>{
		return state.burgerBuilder.ingredients;
	})
	const price=useSelector(state=>state.burgerBuilder.totalPrice);
	const isAuthenticated=useSelector(state=>state.auth.token!==null);
	const error=useSelector(state=>state.burgerBuilder.error);

	const onIngredientAdded=(ingName)=>dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved=(ingName)=>dispatch(actions.removeIngredient(ingName));
	const onInitIngredients=useCallback(()=>dispatch(actions.initIngredients()),[dispatch]);
	const onSetAuthRedirectPath=(path)=>dispatch(actions.setAuthRedirectPath(path));

	useEffect(()=>{
		//console.log(this.props);
		onInitIngredients();
		/*axios.get('https://react-my-burger-aa110.firebaseio.com/ingredients.json')
			.then(response=>{
				this.setState({ingredients:response.data});
			})
			.catch(error=>{
				this.setState({error:true});
			});*/
	},[onInitIngredients]);
	const updatePurchaseState=(ingredients)=>{
		const sum=Object.keys(ingredients)
			.map(igKey=>{
				return ingredients[igKey];
			})
			.reduce((sum,el)=>{
				return sum+el;
			},0);
		return sum>0;
	}
	/*addIngredientHandler=(type)=>{
		const oldCount=this.state.ingredients[type];
		const updatedCount=oldCount+1;
		const updatedIngredients={
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceAddition=INGREDIENT_PRICES[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice+priceAddition;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}
	removeIngredientHandler=(type)=>{
		const oldCount=this.state.ingredients[type];
		if(oldCount<=0){
			return;
		}
		const updatedCount=oldCount-1;
		const updatedIngredients={
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceDeduction=INGREDIENT_PRICES[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice-priceDeduction;
		this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}*/
	const purchaseHandler=()=>{
		if(isAuthenticated){
			setPurchasing(true);
		}else{
			onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}
	const purchaseCancelHandler=()=>{
		setPurchasing(false);
	}
	const purchaseContinueHandler=()=>{
		//alert('you continue');
		/*const queryParams=[];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price='+this.state.totalPrice)
		const queryString=queryParams.join('&');*/
		props.history.push({
			pathname:'/checkout'
			/*search:'?'+queryString*/
		});
	}
		const disabledInfo={
			...ings
		};
		for(let key in disabledInfo){
			disabledInfo[key]=disabledInfo[key]<=0
		}
		let orderSummary=null;
		let burger=error?<p>Ingredients Cant be loaded</p>:<Spinner />;
		if(ings){
			burger=(
			<Aux>
				<Burger ingredients={ings}/>
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					price={price}
					purchasable={updatePurchaseState(ings)}
					ordered={purchaseHandler}
					isAuth={isAuthenticated} />
			</Aux>);
			orderSummary=(
				<OrderSummary 
				ingredients={ings}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinue={purchaseContinueHandler}
				price={price}/>
			);
		}
		/*if(state.loading){
			orderSummary=<Spinner />
		}*/
		return (
			<Aux>
				<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
}
/*const mapStateToProps=state=>{
	return {
		ings:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.totalPrice,
		error:state.burgerBuilder.error,
		isAuthenticated:state.auth.token!==null
	};
}
const mapDispatchToProps=dispatch=>{
	return{
		onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
		onInitIngredients:()=>dispatch(actions.initIngredients()),
		onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
	};
}*/

export default errorHandler(BurgerBuilder,axios);