import { getLocalStorage, setLocalStorage } from '@/lib/storage-helper';
import { useEffect, useState } from 'react';

const useCookieConsent = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [cookieConsent, setCookieConsent] = useState(getLocalStorage('cookie_consent', false));

    useEffect(() => {
        const storedCookieConsent = getLocalStorage('cookie_consent', false);
        setCookieConsent(storedCookieConsent);
        setIsVisible(!storedCookieConsent);
    }, []);

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied';

        window.gtag('consent', 'update', {
            analytics_storage: newValue,
        });

        setLocalStorage('cookie_consent', cookieConsent);

        //For Testing
        console.log('Cookie Consent: ', cookieConsent);
    }, [cookieConsent]);

    const removeComponent = () => {
        setIsFadingOut(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    return { isFadingOut, isVisible, removeComponent, setCookieConsent, setIsFadingOut };
};

export default useCookieConsent;
