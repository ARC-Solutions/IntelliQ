'use client';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useCookieConsent from '@/hooks/cookie-consent';

interface CookieConsentProps {
    className?: string;
}

const CookieConsent = ({ className }: CookieConsentProps) => {
    const { isFadingOut, isVisible, removeComponent, setAnalyticsConsent, setIsFadingOut } =
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
                className={`relative mx-auto max-w-md rounded-lg shadow-lg ${isFadingOut ? 'animate-fade-out' : ''}`}
            >
                <CardHeader>
                    <CardTitle>We use Cookies</CardTitle>
                    <CardDescription>
                        By continuing to use this website, you agree to essential analytics for
                        smooth service operation.
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col justify-end md:flex-row md:gap-3'>
                    <Button
                        className='mb-2 w-full border-primary text-primary hover:bg-primary md:mb-0 md:w-auto'
                        variant='outline'
                        onClick={() => setIsFadingOut(true)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='w-full md:w-auto'
                        variant='default'
                        onClick={() => {
                            setAnalyticsConsent(true);
                            removeComponent();
                        }}
                    >
                        Continue
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CookieConsent;
