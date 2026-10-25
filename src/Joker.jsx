import { useEffect, useState } from "react";
import "./Joker.css";

export default function Joker() {
    const [joke, setJoke] = useState({ setup: "Summoning a joke...", punchline: "Hold tight!" });
    const [loading, setLoading] = useState(false);
    const URL = "https://official-joke-api.appspot.com/random_joke";

    const getNewJoke = async () => {
        setLoading(true);
        let res = await fetch(URL);
        let jsonResponse = await res.json();
        
        // Slight delay so the out-animation can play before the new joke pops in
        setTimeout(() => {
            setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
            setLoading(false);
        }, 300);
    };

    useEffect(() => {
        getNewJoke();
    }, []);

    return (
        <div className="joker-wrapper">
            <div className="joke-card">
                <h3 className="joke-header">
                    <span className="bouncing-emoji">🤡</span> Seriously Good Nonsense
                </h3>
                
                {/* The 'key' prop forces React to remount this div, re-triggering the pop animation */}
                <div className={`joke-content ${loading ? 'hide' : 'pop'}`} key={joke.setup}>
                    <h1 className="joke-setup">{joke.setup}</h1>
                    <h2 className="joke-punchline">✨ {joke.punchline} ✨</h2>
                </div>
                
                <button className="joke-btn" onClick={getNewJoke} disabled={loading}>
                    {loading ? "Cooking..." : "Gimme Another!"}
                </button>
            </div>
        </div>
    );
}