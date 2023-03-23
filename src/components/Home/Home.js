import styles from "../Home/Home.module.css";

export const Home = () => {
    return (
        <section id ="homepage">
            <div id="weclome-page">
                <h1>Welcome to MovieRate</h1>
                <h5>The unofficial Movie social media</h5>
            </div>
            <div id="cinema">
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2luZW1hfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="cinema" />
            </div>
        </section>
    );
}