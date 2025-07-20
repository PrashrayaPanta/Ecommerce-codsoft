import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import the Swiper component
// import SwiperComponentForLatestProducts from "../components/ui/swiper1";

import SwiperComponent from "../components/ui/swiper";
import ProductCard from "../components/ui/ProductCard";
import http from "../http";
import LoadingComponent from "../components/ui/LoadingComponent";

const Home = () => {
  const [Latestproducts, setLatestProducts] = useState([]);

  const [Loading, setLoading] = useState(false);

  console.log("I am home page");

  console.log("Hello K xa");
  // const latestProducts = [
  //   {
  //     name: "Sony Alpha DSLR Camera",
  //     initialPrice: 1000,
  //     discountedPrice: 500,
  //     finalPrice: 500,
  //     image: "../image-1.jpg",
  //   },

  //   {
  //     name: "Optoma 4K HDR Projector",
  //     initialPrice: 2000,
  //     discountedPrice: 0,
  //     image: "../image-2.jpg",
  //   },

  //   {
  //     name: "Sony Alpha DSLR Camera",
  //     initialPrice: 1000,
  //     discountedPrice: 500,
  //     finalPrice: 500,
  //     image: "../image-3.jpg",
  //   },
  // ];

  // const [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const getLatestProducts = async () => {
      try {
        setLoading(true);
        const { data } = await http.get("/api/products/latestproducts");

        console.log(data.products);

        console.log("I am get latest Products");

        setLatestProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      // setLoading(true);
    };

    getLatestProducts();
  }, []);

  // console.log(products);

  return (
    <div className="">
      {/* Use the Swiper component */}
      <SwiperComponent />

      <h1 classNameName="font-bold text-lg">Latest Products</h1>

      {/* <SwiperComponentForLatestProducts/> */}

      {Loading ? (
        <LoadingComponent />
      ) : (
        <div className="grid  grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-blue-400">
          {/* <!-- Sony Camera Card --> */}

          {Latestproducts.length > 0 ? (
            <>
              {Latestproducts.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </>
          ) : (
            <h1>Data Not Found</h1>
          )}

          {/* <div className="bg-white shadow-md rounded-md text-center p-4">
          <img
            src="../image-2.jpg"
            alt="Sony Alpha DSLR Camera"
            className="w-full"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Sony Alpha DSLR Camera
          </h2>
          <p className="line-through text-gray-400 font-semibold text-lg">
            $500
          </p>
          <p className="text-2xl font-bold text-gray-900 ">$500</p>

          <div classNameName=" flex justify-center bg-red-600">
            <button className=" text-black hover:text-white flex px-4 py-2 border rounded-md hover:bg-black transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l2-8h6l2 8"
                />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div> */}

          {/* Optoma 4K HDR Projector */}

          {/* <div className="bg-white shadow-md rounded-md text-center p-4">
          <img
            src="../image-2.jpg"
            alt="Sony Alpha DSLR Camera"
            className="w-full"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Sony Alpha DSLR Camera
          </h2>
          <p className="line-through text-gray-400 font-semibold text-lg bg-pink-700">
            $500
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-4">$500</p>

          <div classNameName="mt-5 flex justify-center bg-amber-300">
            <button className=" text-black hover:text-white flex px-4 py-2 border rounded-md hover:bg-black transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l2-8h6l2 8"
                />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div> */}

          {/* Optoma 4K HDR Projector */}
          {/* <div className="bg-white shadow-md rounded-md p-6  text-center">
          <img
            src="../image-1.jpg"
            alt="Optoma 4K HDR Projector"
            className="w-full"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Optoma 4K HDR Projector
          </h2>
          <p className="text-2xl font-bold text-gray-900 mb-4">$1,500</p>
          <button className="mt-auto flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l2-8h6l2 8"
              />
            </svg>
            Add to cart
          </button>
        </div> */}

          {/* Optoma 4K HDR Projector */}

          {/* <div className="bg-white shadow-md rounded-md p-6  text-center">
          <img
            src="../image-1.jpg"
            alt="Optoma 4K HDR Projector"
            className="w-full"
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Optoma 4K HDR Projector
          </h2>
          <p className="text-2xl font-bold text-gray-900 mb-4">$1,500</p>
          <button className="mt-auto flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13l2-8h6l2 8"
              />
            </svg>
            Add to cart
          </button>
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Home;
