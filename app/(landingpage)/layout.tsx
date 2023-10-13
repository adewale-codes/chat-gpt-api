import Head from 'next/head';

export default function PublicPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <title>Brytatutors official website</title>
                <meta property="og:title" content="Brytatutors official website" key="title" />
            </Head>
            <main>{children}</main>
        </>
    );
}