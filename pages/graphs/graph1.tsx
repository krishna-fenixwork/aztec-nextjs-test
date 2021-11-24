import dynamic from "next/dynamic";
import Link from 'next/link';

const G6Neo = dynamic(() => import("../../components/graphs/g6-neo/g6-neo"), { ssr: false });

const Graph1 = () => {
    return (
        <>
            {/* <Link href="/"><a>Go back</a></Link> */}
            <G6Neo />
        </>
    )
}

export default Graph1;