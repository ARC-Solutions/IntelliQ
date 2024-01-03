'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {Button} from "@/components/ui/button"
import { LuCookie } from "react-icons/lu";


const CookieConsent = () => {
    return (
        <Card key="1" className="w-auto sm:w-[450px] sm:fixed sm:bottom-5 sm:right-5 animate-fade-in">
            <CardHeader className="border-b border-dark-gray-300 pb-4">
                <div className="flex items-center">
                    <LuCookie className="mr-2 text-2xl"/>
                    <CardTitle>Cookie Preferences</CardTitle>
                </div>
                <CardDescription>
                    Manage your cookie settings. You can enable or disable different types of cookies below.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <div className="flex justify-between items-center space-y-2">
                    <div>
                        <Label htmlFor="essential">Essential Cookies</Label>
                        <p className="text-dark-gray-500 text-sm">
                            These cookies are necessary for the website to function and cannot be switched off.
                        </p>
                    </div>
                    <Switch className="ml-auto" id="essential" checked={true} disabled aria-readonly/>
                </div>
                <div className="flex justify-between items-center space-y-2">
                    <div>
                        <Label htmlFor="analytics">Analytics Cookies</Label>
                        <p className="text-dark-gray-500 text-sm">
                            These cookies allow us to count visits and traffic sources, so we can measure and improve the performance
                            of our site.
                        </p>
                    </div>
                    <Switch
                        className="ml-auto"
                        id="analytics"
                    />
                </div>
            </CardContent>
            <div className="border-t border-dark-gray-300 mt-4" />
            <CardFooter className='pt-6'>
                <Button className="ml-auto" type="submit">
                    Save Preferences
                </Button>
            </CardFooter>
        </Card>
    )
};

export default CookieConsent;