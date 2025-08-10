import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useParams } from "react-router-dom";
import Star from "../components/ui/Star";
import http from "../http";
import { FromStorage, imgURL } from "../library";
import { useSelector } from "react-redux";
import CartBtn from "../components/ui/CartBtn";

const Product = () => {
  const location = useLocation();

  console.log(location.pathname);

  const [quantity, setQuantity] = useState(1);

  console.log(quantity);

  console.log(typeof quantity);

  // console.log(qty);

  const token = FromStorage("customerPartToken");

  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const [avgrating, setavgRating] = useState(0);

  const [ratestar, setRateStar] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  useEffect(() => {
    const productDetails = async () => {
      const { data } = await http.get(`/api/products/${id}`);

      //  console.log(data);

      setProduct(data.product);
    };

    productDetails();
  }, [id]);

  const handleReview = (e) => {
    setLoading(true);
    e.preventDefault();

    const PostReviewData = async () => {
      setLoading(true);
      e.preventDefault();

      try {
        const response = await http.post(
          `/api/products/${id}/reviews`,
          { comment, rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response);

        const { data } = await http.get(`/api/products/${id}`);

        setProduct(data.product);

        setComment("");

        setRating(0);

        // console.log(response1.data.product);
      } catch (error) {
      } finally {
        setLoading(false);
      }

      // console.log(response);
    };

    PostReviewData();
  };

  useEffect(() => {
    let total = 0;

    let stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // console.log(product.reviews);

    if (product.reviews?.length > 0) {
      for (let review of product.reviews) {
        total = total + review.rating;
        stars[review.rating] += 1;
      }

      //calualting the percentage for each star rating

      for (let k in stars) {
        stars[k] = (stars[k] / product.reviews?.length) * 100;
      }
      setavgRating(total / product?.reviews.length);

      setRateStar(stars);
    } else {
      setavgRating(0);
    }
  }, [product]);
  console.log(product);

  return (
    <div>
      <main class="px-4 py-8">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="flex flex-col lg:flex-row gap-8">
            {/* Img part */}
            <div class="lg:w-5/12">
              <div class="mb-4 border-2 border-gray-200 rounded-xl overflow-hidden">
                {/* <img src="../image-1.jpg" alt="" srcset="" /> */}

                {/* {product?.images?.[0]?.public_id && (
                  <img
                    src={imgURL(product.images[0].public_id)}
                    alt="Product Image"
                  />
                )} */}

                <img
                  src={imgURL(product?.images?.[0]?.public_id)}
                  alt=""
                  srcset=""
                />

                {/* <div className="border-2 border-dashed rounded-xl w-full h-96 bg-[url(`../image-1.jpg`)] bg-cover bg-no-repeat   hover:cursor-zoom-in hover:bg-size-[150%]"></div> */}
              </div>
              {/* <div class="grid grid-cols-4 gap-2">
                        <div class="cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-alien-green transition" 
                             onclick="changeImage('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')">
                            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-20"></div>
                        </div>
                        <div class="cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-alien-green transition" 
                             onclick="changeImage('https://images.unsplash.com/photo-1593118247619-e2d6f056869e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')">
                            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-20"></div>
                        </div>
                        <div class="cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-alien-green transition" 
                             onclick="changeImage('https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')">
                            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-20"></div>
                        </div>
                        <div class="cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-alien-green transition" 
                             onclick="changeImage('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')">
                            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-20"></div>
                        </div>
                    </div> */}
            </div>

            <div class="lg:w-5/12">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p class="text-gray-600 mb-4">
                By{" "}
                <a href="#" class="text-blue-600 hover:underline">
                  {product.brandName}
                </a>
              </p>
              <div class="h-px bg-gray-200 my-6"></div>

              <ul class="space-y-3 mb-6">
                {/* <li class="flex items-start">
                  <span class="text-alien-green mr-2 mt-1">✓</span>
                  <span>
                    Processor 8th Generation Intel Core i9-8950HK (6-Core, 12MB
                    Cache, Overclocking up to 5.0GHz)
                  </span>
                </li> */}
                <li class="flex items-start">
                  <span>
                   {product.summary}
                  </span>
                </li>
                {/* <li class="flex items-start">
                  <span class="text-alien-green mr-2 mt-1">✓</span>
                  <span>
                    Hard Drive 1TB SSD RAID 0 (2x 512GB PCIe NVME M.2 SSDs) +
                    1TB (+8GB SSHD) Hybrid Drive
                  </span>
                </li> */}
                {/* <li class="flex items-start">
                  <span class="text-alien-green mr-2 mt-1">✓</span>
                  <span>
                    17.3" Full HD display 1920 x 1080 resolution boasts
                    impressive color and clarity. IPS technology for wide
                    viewing angles.
                  </span>
                </li> */}
                {/* <li class="flex items-start">
                  <span class="text-alien-green mr-2 mt-1">✓</span>
                  <span>
                    Video Card NVIDIA® GeForce® RTX 2080 with 8GB GDDR6
                  </span>
                </li> */}
              </ul>
            </div>

            <div class="lg:w-2/12">
              <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div class="mb-4">
                  {product.discountedPrice > 0 ? (
                    <>
                      <p class="text-3xl font-bold text-gray-900">
                        {product.discountedPrice}
                      </p>
                      <p class="text-gray-500 line-through">
                        {product.initialPrice}
                      </p>
                    </>
                  ) : (
                    <p class="text-3xl font-bold text-gray-900">
                      {product.initialPrice}
                    </p>
                  )}
                </div>

                <div class="mb-6">
                  <label class="block text-gray-700 mb-2">Quantity</label>
                  <div class="flex border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      type="number"
                      value={quantity}
                      class="w-full px-3 py-2 text-center border-0 focus:ring-0"
                      onChange={({ target }) =>
                        setQuantity(parseInt(target.value))
                      }
                    />
                  </div>
                </div>

                <div class="space-y-3">
                  {/* <button class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
                    <i class="fas fa-cart-plus mr-2"></i> Add to cart
                  </button> */}
                  <CartBtn
                    product={product}
                    location={location}
                    quantity={quantity}
                  />
                  <button class="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center">
                    <i class="fas fa-heart mr-2 text-red-500"></i> Add to
                    wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div class="flex flex-col lg:flex-row gap-8 mb-8">
          <div class="lg:w-7/12 bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-alien-green pb-2">
              Details
            </h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  OPERATING SYSTEM
                </h3>
                <p class="text-gray-700">
                  <span class="font-medium">
                    Available with Windows 10 Home:
                  </span>
                  Gaming is better than ever on Windows 10, with games in 4K,
                  DirectX 12, and streaming your gameplay*.
                </p>
              </div>

              <div class="h-px bg-gray-200"></div>

              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  CONSIDER THE GAME CHANGED
                </h3>
                <p class="text-gray-700">
                  The Alienware Area-51m is unlike any mobile gaming machine
                  ever created. With unprecedented desktop-level processing
                  power, CPU and GPU upgradability, advanced cooling and a
                  premium, revolutionary design, a true desktop-gaming
                  experience is now available in the form of a laptop.
                </p>
              </div>

              <div class="h-px bg-gray-200"></div>

              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  DESKTOP POWER PACKED INTO A LAPTOP
                </h3>
                <p class="text-gray-700 mb-4">
                  The Area-51m features a host of firsts for peak performance
                  and power. It’s our first-ever Alienware laptop to feature
                  8-core, 16-thread Intel® processors, giving it a whole new
                  level of compute power versus other gaming laptops. Engineered
                  with desktop processors, the CPU is enabled with up to 125%
                  rated power, allowing high-end overclocking. This results in
                  higher performance for megatasking, CPU-intensive gaming, as
                  well as day-to-day applications.
                </p>
                <p class="text-gray-700 mb-4">
                  Lose yourself in vivid, uninterrupted gaming thanks to NVIDIA®
                  GeForce RTX™ graphics with full-throttle power and up to 30W
                  of overclocking headroom—all on an immersive 144Hz G-SYNC 17"
                  Full HD display. Users can overclock their settings via the
                  new Alienware Command Center.
                </p>
                <p class="text-gray-700">
                  The Area-51m is also our first-ever Alienware laptop to
                  support up to 64GB of DDR4 memory, ensuring you have enough
                  RAM for even the most performance-intensive tasks.
                </p>
              </div>

              <div class="h-px bg-gray-200"></div>

              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  UNPRECEDENTED UPGRADEABILITY
                </h3>
                <p class="text-gray-700 mb-4">
                  Gamers have made it clear that they’ve noticed a lack of CPU
                  and GPU upgradability in gaming laptops.
                </p>
                <p class="text-gray-700 mb-4">
                  The Area-51m was engineered with this in mind, finally
                  allowing gamers to harness power comparable to even the
                  highest-performance desktop, and taking advantage of latest
                  technologies from NVIDIA® such as ray tracing, DLSS, and AI
                  enhanced graphics.
                </p>
                <p class="text-gray-700">
                  CPU upgrades can be done using standard desktop-class
                  processors, while GPU upgrades can be done via onboard
                  graphics module replacement or with the Alienware Graphics
                  Amplifier.
                </p>
              </div>
            </div>
          </div>

          <div class="lg:w-5/12">
            <div class="bg-white rounded-xl shadow-lg p-6 h-full">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-alien-green pb-2">
                Ratings & Reviews
              </h2>

              <div class="flex items-center mb-8">
                <div class="text-center mr-6">
                  <div class="text-4xl font-bold text-gray-900">
                    {avgrating.toFixed(2)}
                  </div>
                  <div class="text-gray-600">
                    {product?.reviews?.length || 0}{" "}
                  </div>
                </div>
                <div class="flex-1">
                  {/* {
                      [5, 4, 3, 2, 1].map((k, index) =>(

                        <div class="flex items-center mb-2 bg-red-500">
                        <span class="w-8 text-gray-600">5★</span>
                        <div class="w-full bg-blue-200 rounded-full h-2.5 mx-2">
                          <div
                            class="bg-gray-800 h-2.5 rounded-full"
                            style={{ width: ratestar[k] + "%" }}
                            aria-valuenow={ratestar[k] + "%"}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                              {ratestar[k].toFixed(1) + "%"}
                          </div>
                        </div>
                        <span class="w-8 text-gray-600">
                          {k}
                        </span>
                      </div>

                      ))


                  } */}

                  {[5, 4, 3, 2, 1].map((k, index) => (
                    <div class="flex items-center mb-2">
                      <span class="w-8 text-gray-600">{k}★</span>
                      <div class="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                        <div
                          class="bg-gray-800 h-2.5 rounded-full"
                          // style={{ width: "40%" }}
                          // style={{width:"40%"}}

                          style={{ width: ratestar[k] + "%" }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <span class="w-8 text-gray-600">
                        {ratestar[k].toFixed(1) + "%"}
                      </span>
                    </div>
                  ))}

                  {/* <div class="flex items-center mb-2">
                    <span class="w-8 text-gray-600">4★</span>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                      <div
                        class="bg-gray-800 h-2.5 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    <span class="w-8 text-gray-600">30%</span>
                  </div>
                  <div class="flex items-center mb-2">
                    <span class="w-8 text-gray-600">3★</span>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                      <div
                        class="bg-gray-800 h-2.5 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <span class="w-8 text-gray-600">15%</span>
                  </div>
                  <div class="flex items-center mb-2">
                    <span class="w-8 text-gray-600">2★</span>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                      <div
                        class="bg-gray-800 h-2.5 rounded-full"
                        style={{ width: "7%" }}
                      ></div>
                    </div>
                    <span class="w-8 text-gray-600">7%</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-8 text-gray-600">1★</span>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                      <div
                        class="bg-gray-800 h-2.5 rounded-full"
                        style={{ width: "3%" }}
                      ></div>
                    </div>
                    <span class="w-8 text-gray-600">3%</span>
                  </div> */}
                </div>
              </div>

              <div class="h-px bg-gray-200 my-6"></div>

              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  Add Review
                </h3>
                <form>
                  <div class="mb-4">
                    <textarea
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-alien-green focus:border-transparent"
                      placeholder="Give your review"
                      value={comment}
                      rows="3"
                      onChange={({ target }) => setComment(target.value)}
                    ></textarea>
                  </div>
                  <div class="mb-4">
                    <div class="flex items-center">
                      <span class="mr-2  text-gray-700">Rating:</span>
                      <div class="flex space-x-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            index={index}
                            rating={rating}
                            setRating={setRating}
                          />
                        ))}
                      </div>
                    </div>
                    <h1>{rating}</h1>
                  </div>
                  <button
                    class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                    onClick={handleReview}
                  >
                    Add Review
                  </button>
                </form>
              </div>

              <div class="h-px bg-gray-200 my-6"></div>

              <div class="space-y-4">
                {product.reviews?.length > 0 ? (
                  <>
                    {product?.reviews?.map((review) => (
                      <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex justify-between mb-2">
                          <span class="font-semibold">
                            {review?.DoneBy?.username}
                          </span>
                          <div class="flex text-yellow-400">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                          </div>
                        </div>
                        <p class="text-gray-700 mb-3">{review?.comment}</p>
                        <p class="text-gray-500 text-sm">
                          <i class="fas fa-clock mr-1"></i>
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <h1>No Review</h1>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-center text-gray-900 mb-8">
            Similar Products
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div class="p-4">
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4"></div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">
                  Sony Alpha DSLR Camera
                </h3>
                <div class="mb-4">
                  <span class="text-gray-500 line-through">$500</span>
                  <span class="text-xl font-bold text-gray-900">$450</span>
                </div>
                <button class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
                  <i class="fas fa-cart-plus mr-2"></i> Add to cart
                </button>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div class="p-4">
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4"></div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">
                  Optoma 4K HDR Projector
                </h3>
                <div class="mb-4">
                  <span class="text-xl font-bold text-gray-900">$1,500</span>
                </div>
                <button class="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
                  <i class="fas fa-cart-plus mr-2"></i> Add to cart
                </button>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div class="p-4">
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4"></div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">
                  HP Envy Specter 360
                </h3>
                <div class="mb-4">
                  <span class="text-gray-500 line-through">$2,800</span>
                  <span class="text-xl font-bold text-gray-900">$2,500</span>
                </div>
                <button class="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
                  <i class="fas fa-cart-plus mr-2"></i> Add to cart
                </button>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div class="p-4">
                <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4"></div>
                <h3 class="font-semibold text-lg text-gray-900 mb-2">
                  Dell Alienware Area 51
                </h3>
                <div class="mb-4">
                  <span class="text-xl font-bold text-gray-900">$4,500</span>
                </div>
                <button class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center">
                  <i class="fas fa-cart-plus mr-2"></i> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
