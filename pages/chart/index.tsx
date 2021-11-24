import dynamic from "next/dynamic";
import Link from 'next/link';

const Chart = dynamic(() => import("../../components/chart"), { ssr: false });

function Foo() {
    return (
        <>
            {/* <Link href="/"><a>Go back</a></Link> */}
            <Chart />
        </>
    )
}

export default Foo;