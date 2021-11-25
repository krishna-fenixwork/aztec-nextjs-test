import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../../firebase/config_s';

const HomePage = () => {

    const router = useRouter()

    const onLogout = () => {
        auth.signOut();
        localStorage.clear()
        router.push('/')
    }


    return (
        <div className="layout__container">
            <Head>
                <title>Bossnet Home</title>
            </Head>
            <section className="headingMd">
                <p style={{textAlign: 'center'}}>Next.JS and GraphQl</p>
                <p>                     
                    <Link href="/dashboard/simulation">
                        <a>Simulation</a>
                    </Link>
                    <br />
                    <Link href="/chart">
                        <a>Simple amchart integration</a>
                    </Link>                                  
                    <br />
                    <Link href="/graphs/graph1">
                        <a>G6 and Neo4j integration</a>
                    </Link>
                    <br />                    
                    <Link href="/reporting/static">
                        <a>Reporting Static</a>
                    </Link>
                    <br />
                    <Link href="/reporting/standard">
                        <a>Reporting Standard</a>
                    </Link>
                </p>
                <button className="btn btn-primary" onClick={onLogout}>Logout</button>
            </section>
        </div>
    )
}

export default HomePage;