import { getLocalStorage, setLocalStorage } from '@/lib/storage-helper';
import { useEffect, useState } from 'react';

const useCookieConsent = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [analyticsConsent, setAnalyticsConsent] = useState(getLocalStorage('analytics_consent', false));

    useEffect(() => {
        const storedCookieConsent = getLocalStorage('analytics_consent', false);
        setAnalyticsConsent(storedCookieConsent);
        setIsVisible(!storedCookieConsent);
    }, []);

    useEffect(() => {
        const newValue = analyticsConsent ? 'granted' : 'denied';

        window.gtag('consent', 'update', {
            analytics_storage: newValue,
        });

        setLocalStorage('analytics_consent', analyticsConsent);

        //For Testing
        console.log('Cookie Consent: ', analyticsConsent);
    }, [analyticsConsent]);

    const removeComponent = () => {
        setIsFadingOut(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    return { isFadingOut, isVisible, removeComponent, setAnalyticsConsent, setIsFadingOut };
};

export default useCookieConsent;
