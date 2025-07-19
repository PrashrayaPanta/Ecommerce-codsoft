import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import http from "../../http";
import { FromStorage } from "../../library";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../../store";

const Layout = () => {
  const [open, setOpened] = useState(false);

  const dispatch = useDispatch();
  const [openBrandItem, setopenBrandItem] = useState(false);

  const handleClicked = () => {
    setOpened(!open);
  };

  const handleClickedForBrandItem = () => {
    setopenBrandItem(!openBrandItem);
  };

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.value);

  // console.log(categories, brands);

  const getCategoriesData = async () => {
    try {
      setLoading(true);

      const { data } = await http.get("/api/categories");

      setCategories(data?.Categories);

      //Promise Method
      // http
      //   .get("/api/categories")
      //   .then(({ data }) => setCategories(data.Categories))
      //   .catch(() => {})
      //   .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBrandsData = async () => {
    try {
      setLoading(true);

      const { data } = await http.get("/api/brands");

      setCategories(data.brands);

      //Promise Method
      // http
      //   .get("/api/categories")
      //   .then(({ data }) => setCategories(data.Categories))
      //   .catch(() => {})
      //   .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, [categories]);

  useEffect(() => {
    getBrandsData();
  }, [brands]);

  const getUserProfile = async () => {
    const token = FromStorage("customerPartToken");

    const { data } = await http.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUser(data.user));

    // console.log(user);

    // .then(({ data }) => {
    //   console.log(data.user);
    //   dispatch(setUser(data.user));
    //   // dispatch(setUser(data));
  };

  useEffect(() => {
    try {
      setLoading(true);
      if (!user) {
        const token = FromStorage("customerPartToken");
        console.log(token);
        if (token) {
          getUserProfile();
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  }, [user]);

  return (
    <div>
      <header>
        {/* <!-- Top Nav Bar --> */}
        <div className="sm:flex sm:justify-between sm:items-center sm:px-2 text-white bg-black p-2">
          <nav>
            <ul className="sm:flex gap-4">
              <li className="">
                <a
                  href="tel:+123-456-7890"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 me-2 fill-white"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z" />
                  </svg>
                  +123-456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:mail@ecom.com"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 me-2 fill-current"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                  mail@ecom.com
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="sm:flex sm:gap-2">
              {user ? (
                <>
                  <li className="">
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center"
                    >
                    <i class="fa-solid fa-user-pen me-1"></i>
                     <span> Dashboard</span>
                    </Link>
                  </li>
                  

                  <li className="">
                    <Link
                      to="/logout"
                      className=" flex items-center "
                    >
                    <i class="fa-solid fa-right-from-bracket me-1"></i>
                    <span>Logout</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <Link
                      to="/register"
                      className="flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 me-2 fill-current"
                        viewBox="0 0 640 512"
                      >
                        <path d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm-58.5 32a173.4 173.4 0 0 0-58.7 10.1C46.4 314.8 0 374.2 0 444.8c0 30.4 25.6 55.2 57.1 55.2h301.8c-2.5-7.9-3.9-16.3-3.9-25 0-62.1 25.1-118.3 65.7-159.2a172.7 172.7 0 0 0-58.7-10.1zm468.6 19.8-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0L288 469.9V512h42.1l267.9-267.9c9.4-9.4 9.4-24.6 0-33.9zM633 268.9l-37.9-37.9c-9.4-9.4-24.6-9.4-33.9 0l-46.1 46.1 71.8 71.8 46.1-46.1c9.4-9.4 9.4-24.6 0-33.9z" />
                      </svg>
                      Register
                    </Link>
                  </li>

                  <li className="sm:before:content-['|'] sm:flex">
                    <Link
                      to="/login"
                      className="flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 me-2 fill-white"
                      >
                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                      Login
                    </Link>
                  </li>
                </>
              )}
              {/* <li className="">
                <Link
                  to="/register"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 me-2 fill-current"
                    viewBox="0 0 640 512"
                  >
                    <path d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm-58.5 32a173.4 173.4 0 0 0-58.7 10.1C46.4 314.8 0 374.2 0 444.8c0 30.4 25.6 55.2 57.1 55.2h301.8c-2.5-7.9-3.9-16.3-3.9-25 0-62.1 25.1-118.3 65.7-159.2a172.7 172.7 0 0 0-58.7-10.1zm468.6 19.8-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0L288 469.9V512h42.1l267.9-267.9c9.4-9.4 9.4-24.6 0-33.9zM633 268.9l-37.9-37.9c-9.4-9.4-24.6-9.4-33.9 0l-46.1 46.1 71.8 71.8 46.1-46.1c9.4-9.4 9.4-24.6 0-33.9z" />
                  </svg>
                  Register
                </Link>
              </li>

              <li className="sm:before:content-['|'] sm:flex">
                <Link to="/login" className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 me-2 fill-white"
                  >
                    <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                  </svg>
                  Login
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>

        <div className="md:flex  md:items-center md:justify-between px-2">
          <Link to="/" className=" block text-center">
            E-Commerce
          </Link>

          <div className="md:w-1/3 md:items-center md:justify-between">
            <div className="relative">
              <form action="">
                <input
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  className="w-full px-2 py-2 rounded border-1 focus:outline-none focus:border-blue-400 "
                />
                <button className="absolute right-2 top-2 cursor-pointer">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              <nav>
                <ul className="justify-around gap-2 hidden md:flex">
                  <li>
                    <a href="">Home</a>
                  </li>

                  <li className="group relative">
                    <a
                      href="#"
                      className="flex items-center"
                      onClick={handleClicked}
                    >
                      Categories
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 fill-none stroke-current stroke-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>
                    <ul className="absolute left-0  hidden group-hover:block bg-white border shadow-lg z-2">
                      {categories.map((category) => (
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {category.name}
                          </a>
                        </li>
                      ))}

                      {/* <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Fashion
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Book
                        </a>
                      </li> */}
                    </ul>
                  </li>

                  <li className="group relative">
                    <a href="#" className="flex items-center">
                      Brands
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 fill-none stroke-current stroke-3"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <ul className="absolute left-0  hidden group-hover:block bg-white border shadow-lg z-2">
                      {brands.map((brand) => (
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {brand.name}
                          </a>
                        </li>
                      ))}
                      {/* <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Samsung
                        </a>
                      </li> */}
                      {/* <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Apple
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Microsoftuiohjkb
                        </a>
                      </li> */}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex gap-3 justify-center  items-center">
            <a href="#" className="flex items-center gap-1 hover:fill-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
              <span className="font-semibold">0</span>
            </a>
            <Link to="/cart" className="flex items-center gap-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" w-5 h-5"
                viewBox="0 0 448 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
              </svg>

              <span className="font-semibold">2</span>
            </Link>

            <a className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" w-5 h-5"
                viewBox="0 0 576 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0 112.5L0 422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4l0-309.9c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64l-64 0 0-64zm64-208c0 35.3-28.7 64-64 64l0-64 64 0zM512 304l0 64-64 0c0-35.3 28.7-64 64-64zM448 96l64 0 0 64c-35.3 0-64-28.7-64-64z" />
              </svg>
              <span className="font-semibold">$4,000</span>
            </a>
          </div>
        </div>

        {/* Sheet Here */}

        <Sheet className="md:hidden">
          <SheetTrigger>
            <a href="#" className="md:hidden block px-1">
              {/* Hamberg Menu icon that rigger oofcanvas*/}
              <svg
                className="w-6 h-6 stroke-current"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </a>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <nav>
                  <ul className="gap-2 md:hidden flex flex-col">
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li className="group relative">
                      <a
                        href="#"
                        className="flex items-center"
                        onClick={handleClicked}
                      >
                        Categories
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-4 w-4 fill-none stroke-current stroke-3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </a>

                      {open && (
                        <ul className=" bg-white border shadow-lg">
                          {categories.map((category) => (
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {category.name}
                              </a>
                            </li>
                          ))}
                          {/*                        
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Electronics
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Fashion
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Book
                            </a>
                          </li> */}
                        </ul>
                      )}
                    </li>

                    <li className="group relative">
                      <a
                        href="#"
                        className="flex items-center"
                        onClick={handleClickedForBrandItem}
                      >
                        Brands
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-4 w-4 fill-none stroke-current stroke-3"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </a>

                      {openBrandItem && (
                        <ul className=" bg-white border shadow-lg">
                          {brands.map((brand) => (
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {brand.name}
                              </a>
                            </li>
                          ))}
                          {/* <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Apple
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Microsoftuiohjkb
                            </a>
                          </li> */}
                        </ul>
                      )}
                    </li>
                  </ul>
                </nav>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </header>

      <Outlet />

      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center sm:text-left">
              <a
                href="index.html"
                className="text-2xl font-righteous text-gray-300 hover:text-white"
              >
                E-Commerce
              </a>
              <address className="mt-4 text-gray-400">
                221B Baker Street
                <br />
                London, England
              </address>
              <div className="mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold mb-4">Who are we?</h4>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                imperdiet vel ligula vel sodales. Aenean vel ullamcorper purus,
                ac pharetra arcu. Nam enim velit, ultricies eu orci nec, aliquam
                efficitur sem. Quisque in sapien a sem vestibulum volutpat at eu
                nibh.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded mb-4 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                  placeholder="Enter your email..."
                  required
                />
                <button className="w-full py-2 border border-white text-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
