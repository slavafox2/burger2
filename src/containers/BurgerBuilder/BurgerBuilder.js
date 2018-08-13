import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/a/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props)
    //     this.state  = {...}
    // }
    state = {
        // ingredients: null,
        // totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    componentDidMount() {
        console.log(this.props);
        
        // axios.get('https://burger-28984.firebaseio.com/ingredients.json')
        //     .then(response => { this.setState({ingredients: response.data}); })
        //     .catch(error => { this.setState({error: true}); });
    };
    updatePurchaseState = (ingredients) => {
        // const ingredients = { ...this.state.ingredients };  //not work with ald statement
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        // this.setState({ purchasable: sum > 0 });
        return sum > 0
    };
    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState( updatedIngredients );
    // };

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState( updatedIngredients );
    // };
    purchaseHandler = () => {
        this.setState({purchasing: true});
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };
    purchaseContinueHandler = () => {

        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('/checkout');
    };


    render() {
        // const disabledInfo = { ...this.state.ingredients };
        const disabledInfo = { ...this.props.ings };  // buind with the redux store through "mapStateToProps"
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>the ingredients can't be showed-loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        // ingredientAdded={this.addIngredientHandler}
                        // ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // purchasable={this.state.purchasable}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        // price={this.state.totalPrice} 
                        price={this.props.price} 
                    />
                </Aux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                // price={this.state.totalPrice}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));




// purchaseContinueHandler = () => {

    // this.setState({loading: true});
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //         name: 'Max Schwarzmüller',
    //         address: {
    //             street: 'Teststreet 1',
    //             zipCode: '41351',
    //             country: 'Germany'
    //         },
    //         email: 'test@test.com'
    //     },
    //     deliveryMethod: 'fastest'
    // };

    // axios.post('/orders.json',order)
    //     .then(respons => {
    //         this.setState({loading: false, purchasing: false});
    //     })
    //     .catch(error => {this.setState({loading: false, purchasing: false}); });