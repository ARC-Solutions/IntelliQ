'use client';

import Script from 'next/script';
import * as gtag from '../utils/gtag.js';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

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

const formSchema = z.object({
    essential: z.boolean(),
    analytics: z.boolean().default(false),
});

interface CookieConsentProps {
    className?: string;
}

const GoogleAnalytics = ({ className }: CookieConsentProps) => {
    const [cookieConsent, setCookieConsent] = useLocalStorage('cookie_consent', false);
    const [mounted, setMounted] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            essential: true,
            analytics: false,
        },
    });

    const acceptAllCookies = () => {
        form.setValue('essential', true);
        form.setValue('analytics', true);
        form.handleSubmit(onSubmit)();
    };

    const rejectAllCookies = () => {
        form.setValue('analytics', false);
        form.handleSubmit(onSubmit)();
    };

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setCookieConsent(data.analytics);
    };

    if (!mounted) return null;

    return (
        <>
            {cookieConsent && (
                <>
                    <Script
                        strategy='afterInteractive'
                        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    />
                    <Script
                        id='gtag-init'
                        strategy='afterInteractive'
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gtag.GA_TRACKING_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </>
            )}

            {!cookieConsent && showBanner && (
                <div
                    className={cn(
                        'fixed inset-x-0 bottom-5 z-50 px-4 sm:bottom-5 sm:left-auto sm:right-5 sm:px-0',
                        className,
                    )}
                >
                    <Card className='relative mx-auto max-w-md rounded-lg p-4 shadow-lg'>
                        <div className='flex items-start justify-between'>
                            <p className='flex-grow text-sm'>
                                We use cookies to enhance site navigation and analyze site usage.
                                View our Cookie Policy for more information.
                            </p>
                            <Button
                                className='ml-4 h-6 w-6 rounded-full border-none'
                                variant='outline'
                                size='icon'
                                onClick={() => setShowBanner(false)}
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
                                    >
                                        Cookie Settings
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='h-svh flex flex-col border-none sm:h-auto sm:border-solid'>
                                    <DialogHeader className='space-y-4'>
                                        <DialogTitle className='text-left text-2xl'>
                                            Cookie Settings
                                        </DialogTitle>
                                        <hr className='my-4' />
                                        <DialogDescription className='text-left'>
                                            We use cookies to improve your experience. Choose your
                                            cookie preferences below.
                                        </DialogDescription>
                                        <div className='flex gap-3'>
                                            <DialogClose asChild>
                                                <Button
                                                    variant='outline'
                                                    className='h-14 w-40 text-left text-base'
                                                    onClick={rejectAllCookies}
                                                >
                                                    Reject analytics
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    className='h-14 w-40 break-normal text-left text-base'
                                                    onClick={acceptAllCookies}
                                                >
                                                    Allow analytics
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                            <div className='flex-grow space-y-4'>
                                                <h3 className='text-lg font-medium'>
                                                    Manage Preferences
                                                </h3>
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
                                                                        Essential for the site to
                                                                        function. Always On.
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
                                                        name='analytics'
                                                        render={({ field }) => (
                                                            <FormItem className='flex flex-row items-center justify-between'>
                                                                <div className='space-y-0.5'>
                                                                    <FormLabel className='text-base font-semibold'>
                                                                        Analytics
                                                                    </FormLabel>
                                                                    <FormDescription className='text-sm'>
                                                                        Used to measure usage and
                                                                        improve your experience.
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={
                                                                            field.onChange
                                                                        }
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
                                                    >
                                                        Save
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                            <Button
                                className='w-full md:w-auto'
                                variant='default'
                                onClick={acceptAllCookies}
                            >
                                Accept Cookies
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

export default GoogleAnalytics;
