import "./Navbar.css";

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <h2>Alter Dashboard</h2>
            </div>

            <div className="navbar-right">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />

                <div className="profile">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                    />
                </div>
            </div>
        </header>
    );
}