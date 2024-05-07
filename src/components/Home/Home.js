import "./Home.css";

export const Home = () => {
    return (
        <>
        <section className="homepage">
            <div className="welcome-page">
                <h1 className="welcome-message">Welcome to MovieRate</h1>
                <h5 className="welcome-message">The unofficial Movie social media</h5>
            </div>
            <div className="cinema">
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2luZW1hfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="cinema" className="start-pic"/>
            </div>
        </section>
        </>
    );
}