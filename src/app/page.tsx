import React from "react";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import TaskList from "./ui/TaskList";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
          <header>
            <Header />
          </header>
          <main className="flex-grow p-6">
            {/* <TaskForm /> */}
            <TaskList />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
    );
};

export default Home;
