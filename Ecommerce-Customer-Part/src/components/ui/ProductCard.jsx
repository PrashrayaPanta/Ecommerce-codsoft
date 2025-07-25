import { Link } from "react-router-dom";
import { imgURL } from "../../library";
import CartBtn from "./CartBtn";

const ProductCard = ({ product, location }) => {
  console.log(product);

  console.log(location);

  console.log(product.images[0].url);

  return (
    <>
      <div className="">
        <Link
          class=" shadow-md rounded-md text-center p-4 bg-red-500"
          to={`/product/${product._id}`}
        >
          <img
            src={imgURL(product.images?.[0]?.public_id)}
            alt="Sony Alpha DSLR Camera"
            class="w-full object-contain h-50"
          />
        </Link>

        <div className="text-white text-center">
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            {/* Sony Alpha DSLR Camera */}
            {product.name}
          </h2>

          {product?.discountedPrice > 0 ? (
            <>
              <p class="line-through  font-semibold text-lg">
                ${product.initialPrice}
              </p>
              <p class="font-bold text-lg ">${product.discountedPrice}</p>
            </>
          ) : (
            <p class=" font-bold text-lg mt-5">${product.initialPrice}</p>
          )}

          <div
            className={`flex justify-center  ${
              product.discountedPrice <= 0 ? "mt-6" : "mt-2"
            }`}
          >
            {/* <button class="text-black hover:text-white flex px-4 py-2 border rounded-md hover:bg-black transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l2-8h6l2 8"
            />
          </svg>
          <span>Add to cart</span> */}

            {/* <button class="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
          <i class="fas fa-cart-plus mr-2"></i> Add to cart
        </button> */}

            {/* </button> */}

            <CartBtn product={product} location={location} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
