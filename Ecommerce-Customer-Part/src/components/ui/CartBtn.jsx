import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store";
import { toast } from "react-toastify";

import { FromStorage, ToStorage } from "../../library";

const CartBtn = ({ quantity = 1, product, location }) => {


  console.log(typeof quantity, product);

  console.log("i am from page", location?.pathname);

  const cart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  const handleAddToCart = () => {


    let temp = {...cart};

    let qty = quantity;


    console.log(typeof qty);
    
    //   // console.log(temp);

    let price =
      product?.discountedPrice > 0
        ? parseInt(product?.discountedPrice)
        : parseInt(product?.initialPrice);

    // let qty = qty;

    // console.log(product._id);

    // console.log(cart[product._id]);


    //same product item on  cart
    if (product._id in temp) {

      console.log(temp)
      // console.log("Cart ma j item cha taile feri tehi item cart ma halna lais");

      qty = qty + temp[product._id].qty;

    }



    console.log("Bhita chalena");



    console.log(typeof qty);
    
    


    // get the Total Price of each product item or items
    let total = qty * price;

    temp = {

      //get the previous product item as well
      ...temp,

      [product._id]: {
        product,
        price,
        total,
        qty: qty,
      },
    };


    // console.log(temp);



    // ToStorage("cartItems", JSON.stringify(temp), true);
    

    dispatch(setCart(temp));
    toast.success("succesfully added to cart");
  };

  return (
    <>
      <button
        class={`w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center `}
        onClick={handleAddToCart}
      >
        <i class="fas fa-cart-plus mr-2"></i> Add to cart
      </button>
    </>
  );
};

export default CartBtn;
