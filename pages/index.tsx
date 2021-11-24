import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router'
import { getUser } from '../services/common_services';
import { SIMULATION, WELCOME } from '../routes';

// import './onboarding/styles.css';

const Index = () => {
    
    useEffect(() => {
        if (typeof window !== 'undefined' && !!getUser() && window.location.pathname === '/') {
            router.push(SIMULATION)
        } else {
            if (window.location.pathname !== '/') {
                router.push(window.location.pathname)
            } else {
                router.push(WELCOME)
            }
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Index