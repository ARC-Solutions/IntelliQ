'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/lib/storage-helper';

import { Button } from '@/components/ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface CookieConsentProps {
    className?: string;
}

const formSchema = z.object({
    essential: z.boolean(),
    marketing: z.boolean().default(false).optional(),
    analytics: z.boolean().default(false).optional(),
});

const CookieConsent = ({ className }: CookieConsentProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            essential: true,
            marketing: false,
            analytics: false,
        },
    });
    const acceptAllCookies = () => {
        form.setValue('essential', true);
        form.setValue('marketing', true);
        form.setValue('analytics', true);

        form.handleSubmit(onSubmit)();
    };

    const rejectAllCookies = () => {
        form.setValue('marketing', false);
        form.setValue('analytics', false);

        form.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        if (data.analytics) {
            setCookieConsent(true);
        }
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };

    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [cookieConsent, setCookieConsent] = useState(getLocalStorage('cookie_consent', false));

    useEffect(() => {
        const storedCookieConsent = getLocalStorage('cookie_consent', false);
        setCookieConsent(storedCookieConsent);
        setIsVisible(!storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied';

        window.gtag('consent', 'update', {
            analytics_storage: newValue,
        });

        setLocalStorage('cookie_consent', cookieConsent);

        //For Testing
        //console.log('Cookie Consent: ', cookieConsent);
    }, [cookieConsent]);

    if (!isVisible) return null;

    // removes component from the dom after 1sec
    // why?
    // because performance
    const removeComponent = () => {
        setIsFadingOut(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    return (
        <div
            className={cn(
                'fixed inset-x-0 bottom-5 z-50 px-4 sm:bottom-5 sm:left-auto sm:right-5 sm:px-0',
                className,
            )}
        >
            <Card
                className={`relative mx-auto max-w-md rounded-lg p-4 shadow-lg ${isFadingOut ? 'animate-fade-out' : ''}`}
            >
                <div className='flex items-start justify-between'>
                    <p className='flex-grow text-sm'>
                        By clicking “Accept Cookies”, you agree to the storing of cookies on your
                        device to enhance site navigation, analyze site usage, and assist in our
                        marketing efforts. View our Cookie Policy for more information.
                    </p>
                    <Button
                        className='ml-4 h-6 w-6 rounded-full border-none'
                        variant='outline'
                        size='icon'
                        onClick={() => {
                            removeComponent();
                        }}
                    >
                        <CrossCircledIcon className='h-6 w-6' />
                    </Button>
                </div>
                <div className='mt-4 flex flex-col md:flex-row md:gap-3'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className='mb-2 w-full md:mb-0 md:w-auto'
                                variant='outline'
                                onClick={() => setIsFadingOut(true)}
                            >
                                Cookie Settings
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='flex h-svh flex-col border-none sm:h-auto sm:border-solid'>
                            <div className='flex flex-col overflow-auto'>
                                <DialogHeader className='space-y-4'>
                                    <DialogTitle className='text-left text-2xl'>
                                        Cookie Settings
                                    </DialogTitle>
                                    <hr className='my-4' />
                                    <DialogDescription className='text-left'>
                                        IntelliQ uses cookies to offer you a better experience. See
                                        Cookie Policy for more details.
                                    </DialogDescription>
                                    <div className='flex gap-3'>
                                        <DialogClose asChild>
                                            <Button
                                                variant='outline'
                                                className='h-14 w-40 text-left text-base'
                                                onClick={() => {
                                                    rejectAllCookies();
                                                    removeComponent();
                                                }}
                                            >
                                                Reject all cookies
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button
                                                className='h-14 w-40 break-normal text-left text-base'
                                                onClick={() => {
                                                    acceptAllCookies();
                                                    removeComponent();
                                                }}
                                            >
                                                Allow all cookies
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogHeader>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    {/*preferences in the center*/}
                                    {/*className='flex flex-col flex-grow justify-center'*/}
                                    <div className='flex-grow space-y-4'>
                                        <h3 className='text-lg font-medium'>Manage Preferences</h3>
                                        <div className='mt-4'>
                                            <FormField
                                                control={form.control}
                                                name='essential'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-row items-center justify-between'>
                                                        <div className='space-y-0.5'>
                                                            <FormLabel className='text-base font-semibold'>
                                                                Essential
                                                            </FormLabel>
                                                            <FormDescription className='text-sm'>
                                                                Essential for the site to function.
                                                                Always On.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                disabled
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <hr className='my-4' />
                                            <FormField
                                                control={form.control}
                                                name='marketing'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-row items-center justify-between'>
                                                        <div className='space-y-0.5'>
                                                            <FormLabel className='text-base font-semibold'>
                                                                Marketing
                                                            </FormLabel>
                                                            <FormDescription className='text-sm'>
                                                                Used for targeted advertising.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <hr className='my-4' />
                                            <FormField
                                                control={form.control}
                                                name='analytics'
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-row items-center justify-between'>
                                                        <div className='space-y-0.5'>
                                                            <FormLabel className='text-base font-semibold'>
                                                                Analytics
                                                            </FormLabel>
                                                            <FormDescription className='text-sm'>
                                                                Used to measure usage and improve
                                                                your experience.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <hr className='my-4 mb-0' />
                                    <DialogFooter className='mt-4 flex justify-end space-x-2'>
                                        <DialogClose asChild>
                                            <Button
                                                className='h-10 w-20 text-base'
                                                type='submit'
                                                onClick={() => removeComponent()}
                                            >
                                                Save
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                        <Button
                            className='w-full md:w-auto'
                            variant='default'
                            onClick={() => {
                                acceptAllCookies();
                                removeComponent();
                            }}
                        >
                            Accept Cookies
                        </Button>
                    </Dialog>
                </div>
            </Card>
        </div>
    );
};

export default CookieConsent;
