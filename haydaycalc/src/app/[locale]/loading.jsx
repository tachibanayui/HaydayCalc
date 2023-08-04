const LoadingPage = () => {
    return (
        <main className="fill flex-center">
            <div
                className="spinner-grow text-secondary"
                role="status"
                style={{ width: "10vh", height: "10vh" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </main>
    )
}

export default LoadingPage
