'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import FormFields from '@/components/cookie-banner/form-fields';
import { ContentsFooter, DialogContents } from '@/components/cookie-banner/dialog-contents';
import useCookieConsent from '@/hooks/cookie-consent';

interface CookieConsentProps {
    className?: string;
}

const formSchema = z.object({
    essential: z.boolean(),
    marketing: z.boolean().default(false).optional(),
    analytics: z.boolean().default(false).optional(),
});

export type FormData = z.infer<typeof formSchema>;

const CookieConsent = ({ className }: CookieConsentProps) => {
    const form = useForm<FormData>({
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

    const { isFadingOut, isVisible, removeComponent, setCookieConsent, setIsFadingOut } =
        useCookieConsent();

    if (!isVisible) return null;

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
                        <DialogContent className='h-svh flex flex-col border-none sm:h-auto sm:border-solid'>
                            <DialogContents
                                removeComponent={removeComponent}
                                rejectAllCookies={rejectAllCookies}
                                acceptAllCookies={acceptAllCookies}
                            />
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormFields form={form} />
                                    <hr className='my-4 mb-0' />
                                    <ContentsFooter removeComponent={removeComponent} />
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
