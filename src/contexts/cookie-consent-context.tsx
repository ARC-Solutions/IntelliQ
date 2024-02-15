import React, { createContext, useContext, useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

interface CookieConsentContextData {
    cookieConsent: boolean;
    setCookieConsent: React.Dispatch<React.SetStateAction<boolean>>;
}

const cookieConsentContext = createContext<CookieConsentContextData | null>(null);

export const CookieConsentProvider = ({ children }: Props) => {
    const [cookieConsent, setCookieConsent] = useState(false);

    return (
        <cookieConsentContext.Provider value={{ cookieConsent, setCookieConsent }}>
            {children}
        </cookieConsentContext.Provider>
    );
};

export const useCookieConsent = (): CookieConsentContextData => {
    const context = useContext(cookieConsentContext);
    if (!context) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
};