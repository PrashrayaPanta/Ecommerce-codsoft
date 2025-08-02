import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../http";
import { FromStorage } from "../library";
import LoadingComponent from "../components/ui/LoadingComponent";

export function Dashboard() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [open, setOpened] = useState(false);

  // const [openBrandItem, setopenBrandItem] = useState(false);

  // const handleClicked = () => {
  //   setOpened(!open);
  // };

  // const handleClickedForBrandItem = () => {
  //   setopenBrandItem(!openBrandItem);
  // };

  const token = FromStorage("customerPartToken");

  useEffect(() => {
    const getOrderLists = async () => {
      try {
        setLoading(true);

        const { data } = await http.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(data.orders);
      } catch (error) {
      } finally {
        setLoading(false);
      }

      // console.log(data);

      // console.log(response);
    };

    getOrderLists();
  }, []);

  console.log(orders);

  // console.log(orders);

  return (
    <>
      <div className="flex justify-center p-2 items-center mb-3">
        <Tabs defaultValue="account" className="w-full max-w-2xl">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="order">Order</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-new">New password</label>
                  <input
                    type="email"
                    className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-new">New password</label>
                  <input
                    type="email"
                    className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400"
                    placeholder="Enter Your Email"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-current">Current password</label>
                  <input
                    type="email"
                    className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-new">New password</label>
                  <input
                    type="email"
                    className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400"
                    placeholder="Enter Your Email"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="order">
            {/* <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-current">Current password</label>
                  <input type="email" className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400" placeholder="Enter Your Email" />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-new">New password</label>
                  <input type="email" className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400" placeholder="Enter Your Email" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card> */}
            {loading ? (
              <LoadingComponent />
            ) : orders.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Product Name</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Each Price</th>
                    <th className="px-4 py-2 border">Total Price</th>
                    <th className="px-4 py-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.items.map((item, idx) => (
                      <tr
                        key={`${order._id}-${idx}`}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 border">
                          {item.product_id.name}
                        </td>
                        <td className="px-4 py-2 border">{item.quantity}</td>
                        <td className="px-4 py-2 border">
                          Rs. {item.product_id.initialPrice}
                        </td>
                        <td className="px-4 py-2 border">
                          Rs. {item.quantity * item.product_id.initialPrice}
                        </td>
                        <td className="px-4 py-2 border">{order.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-600 text-lg mt-6">
                No Orders
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
