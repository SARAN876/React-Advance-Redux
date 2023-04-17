import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData=()=>{
    return async(dispatch) =>{
        const  fetchData=async()=>{
        const response=await fetch(
            'https://react-hook-project-e2030-default-rtdb.firebaseio.com/cart.json'
        );
        if(!response.ok){
            throw new Error('Could not fetch cart data!')
        }
        const data=await response.json();

        return data;
        }
        try {
         const cartData= await  fetchData();
         dispatch(cartActions.replaceCart(
           { 
            items:cartData.items || [],
            totalQuantity:cartData.totalQuantity
            }
         ));

        }
        catch(error){
            dispatch(uiActions.showNotification({
                state:'error..',
                title:'Error!.',
                message:'Fetching cart data failed',
              }));
        }
    }
};

export  const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
            state:'pending..',
            title:'sending...',
            message:'sending cart data..',
          }));
          const sendRequest =async()=>{

              const response=await fetch(
                  'https://react-hook-project-e2030-default-rtdb.firebaseio.com/cart.json', {
                      method: 'PUT',
                      body: JSON.stringify(
                      {  items:cart.items,
                        totalQuantity:cart.totalQuantity}
                        ),
                    });
                    if(!response.ok){
                        throw new Error('sending cart data failed')
                    }  
                };
                try {
                    await sendRequest();

                    dispatch(
                        uiActions.showNotification({
                        state:'success..',
                        title:'success!.',
                        message:'sending cart data successfully',
                      }));
                } catch (error){
                    dispatch(uiActions.showNotification({
                        state:'error..',
                        title:'Error!.',
                        message:'sending cart data failed',
                      }));
                }
            };
        };