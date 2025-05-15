import React from "react"; // Capitalize "React" to follow convention
import Page from "./components/Page";

const App = () => {
    return (
        <div>
            <h1>Task Manager</h1>
            <p>Manage your tasks efficiently!</p>
            <Page />
        </div>
    );
};

export default App;