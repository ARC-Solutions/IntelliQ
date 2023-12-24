'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useAuth} from '@/contexts/UserContext';
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {useRef, useState} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {toast} from 'react-toastify';
import {useMotionTemplate, useSpring} from 'framer-motion';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const SignUpCard = () => {
    const [isANewUser, setIsAnewUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {signinUsingEmail, signupUsingEmail, signinUsingOAuth} = useAuth();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (isGoogleOAuth: boolean = false) => {
        if (isGoogleOAuth) {
            try {
                signinUsingOAuth();
                return;
            } catch (error) {
                toast.error('Failed to initiate Google sign in.');
                return;
            }
        }

        const email = emailRef.current?.value as string;
        const password = passwordRef.current?.value as string;
        const confirmPassword = confirmPasswordRef.current?.value as string;

        if (!email || !password || (isANewUser && !confirmPassword)) {
            toast.error('Please fill out all the fields');
            return;
        }

        if (isANewUser) {
            confirmPassword === password
                ? signupUsingEmail({email, password})
                : toast.error('Your Password does not match');
        } else {
            signinUsingEmail({email, password});
        }
    };
    const mouseX = useSpring(0, {stiffness: 500, damping: 100});
    const mouseY = useSpring(0, {stiffness: 500, damping: 100});

    function onMouseMove({currentTarget, clientX, clientY}: any) {
        const {left, top} = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    let maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = {
        maskImage,
        WebkitMaskImage: maskImage,
        // // Adjusted background color with lower alpha, for example 0.5 for 50% transparency
        // backgroundColor: 'rgba(200, 182, 255, 0.09)'
    };

    return (
        <div onMouseMove={onMouseMove}
             className='relative w-auto sm:w-[450px] duration-700 hover:bg-violet-800/10 group hover:border-violet-400/50'>
            {/*<div className='pointer-events-none'>*/}
            {/*    <div*/}
            {/*        className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"/>*/}
            {/*    /!* Background with motion effect *!/*/}
            {/*    <motion.div*/}
            {/*        className="absolute inset-0 z-10  bg-gradient-to-br opacity-100  via-violet-500/30  transition duration-1000 group-hover:opacity-50"*/}
            {/*        style={style}*/}
            {/*    />*/}
            {/*    <motion.div*/}
            {/*        className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"*/}
            {/*        style={style}*/}
            {/*    />*/}
            {/*</div>*/}

            <Tabs defaultValue="signup" className='w-auto sm:w-[450px]'>
                <TabsList
                    className='grid w-full grid-cols-2 border-none rounded-lg shadow-[0_0px_20px_-4px_rgba(0,0,0,0.24)] shadow-primary bg-[#0e0e0e]'>
                    <TabsTrigger
                        value='signup'
                        className="data-[state=active]:bg-[#c8b6ff]"
                    >
                        Sign Up
                    </TabsTrigger>
                    <TabsTrigger
                        value='signin'
                        className="data-[state=active]:bg-[#c8b6ff]"
                    >
                        Sign In
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='signin'>
                    <Card
                        className='w-auto sm:w-[450px] border-none rounded-lg p-4 shadow-[0_0px_20px_-4px_rgba(0,0,0,0.24)] shadow-primary'>
                        <CardHeader className='pb-5'>
                            <CardTitle className='text-3xl'>ARC-Solutions</CardTitle>
                            <CardDescription className='pt-1 pb-2 text-xl'>Let&apos;s Sign You In</CardDescription>
                            <Button
                                onClick={() => handleSubmit(true)}
                                className='bg-[#fafafa] hover:bg-[#fafafa]/90 active:bg-[#fafafa]/80 p-5'
                            >
                                <div className='text-3xl place-content-center'>
                                    <FcGoogle size=''/>
                                </div>
                            </Button>
                            <div className='border-b-[0.5px] border-white pt-1 pb-1 border-opacity-70'></div>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(false);
                                }}
                            >
                                <div>
                                    <div className='mb-5'>
                                        <div className='mb-1.5'>
                                            <Label htmlFor='email' className='font-thin'>
                                                Email Address
                                            </Label>
                                        </div>
                                        <Input
                                            type='email'
                                            id='email'
                                            placeholder='Enter your Email Address'
                                            ref={emailRef}
                                            className='placeholder:text-white font-medium placeholder:opacity-70 border-2'
                                        />
                                    </div>
                                    <div className='relative mb-5'>
                                        <div className='mb-1.5'>
                                            <Label htmlFor='password' className='font-thin'>
                                                Your Password
                                            </Label>
                                        </div>
                                        <Input
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter your Password'
                                            ref={passwordRef}
                                            className='placeholder:text-white font-medium placeholder:opacity-70 border-2 pr-8'
                                        />
                                        <Button
                                            type='button'
                                            className='absolute bottom-1 right-1 h-7 w-7'
                                            size='icon'
                                            variant='ghost'
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full text-center font-[550] rounded-none text-xl p-5 active:bg-primary/80'
                                    onClick={() => setIsAnewUser(isANewUser)}
                                >
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='signup'>
                    <Card
                        className='w-auto sm:w-[450px] border-none rounded-lg p-4 shadow-[0_0px_20px_-4px_rgba(0,0,0,0.24)] shadow-primary'>
                        <CardHeader className='pb-5'>
                            <CardTitle className='text-3xl'>ARC-Solutions</CardTitle>
                            <CardDescription className='pt-1 pb-2 text-xl'>Let&apos;s Sign You Up</CardDescription>
                            <Button
                                onClick={() => handleSubmit(true)}
                                className='bg-[#fafafa] hover:bg-[#fafafa]/90 active:bg-[#fafafa]/80 p-5'
                            >
                                <div className='text-3xl place-content-center'>
                                    <FcGoogle size=''/>
                                </div>
                            </Button>
                            <div className='border-b-[0.5px] border-white pt-1 pb-1 border-opacity-70'></div>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(false);
                                }}
                            >
                                <div>
                                    <div className='mb-5'>
                                        <div className='mb-1.5'>
                                            <Label htmlFor='email' className='font-thin'>
                                                Email Address
                                            </Label>
                                        </div>
                                        <Input
                                            type='email'
                                            id='email'
                                            placeholder='Enter your Email Address'
                                            ref={emailRef}
                                            className='placeholder:text-white font-medium placeholder:opacity-70 border-2'
                                        />
                                    </div>
                                    <div className='relative mb-5'>
                                        <div className='mb-1.5'>
                                            <Label htmlFor='password' className='font-thin'>
                                                Your Password
                                            </Label>
                                        </div>
                                        <Input
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter your Password'
                                            ref={passwordRef}
                                            className='placeholder:text-white font-medium placeholder:opacity-70 border-2 pr-8'
                                        />
                                        <Button
                                            type='button'
                                            className='absolute bottom-1 right-1 h-7 w-7'
                                            size='icon'
                                            variant='ghost'
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                    <div className='relative mb-5'>
                                        <div className='mb-1.5'>
                                            <Label htmlFor='confirmPassword' className='font-thin'>
                                                Confirm Password
                                            </Label>
                                        </div>
                                        <Input
                                            id='confirmPassword'
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder='Confirm your Password'
                                            ref={confirmPasswordRef}
                                            className='placeholder:text-white font-medium placeholder:opacity-70 border-2 pr-8'
                                        />
                                        <Button
                                            type='button'
                                            className='absolute bottom-1 right-1 h-7 w-7'
                                            size='icon'
                                            variant='ghost'
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full text-center font-[550] rounded-none text-xl p-5 active:bg-primary/80'
                                    onClick={() => setIsAnewUser(!isANewUser)}
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SignUpCard;