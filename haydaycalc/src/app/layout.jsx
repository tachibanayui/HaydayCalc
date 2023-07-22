/** @type {import('next').Metadata}*/
export const metadata = {
    title: {
        default: "Hayday Calculator",
        template: "%s | Hayday Calculator",
    },
    description: "Various tools to simplify planning and playing Hayday",
}

const RootLayout = ({ children }) => {
    return <>{children}</>
}

export default RootLayout
