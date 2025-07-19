

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
import { useState } from "react";

export function Dashboard() {
  const [open, setOpened] = useState(false);

  const [openBrandItem, setopenBrandItem] = useState(false);

  const handleClicked = () => {
    setOpened(!open);
  };

  const handleClickedForBrandItem = () => {
    setopenBrandItem(!openBrandItem);
  };
  return (
    <>
   
      <div className="flex justify-center p-2 items-center mb-3">
        <Tabs defaultValue="account" className="w-full max-w-2xl">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
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
                  <input type="email" className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400" placeholder="Enter Your Email" />
                </div>
                <div className="grid gap-3">
                  <label htmlFor="tabs-demo-new">New password</label>
                  <input type="email" className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400" placeholder="Enter Your Email" />
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>

  
    </>
  );
}
