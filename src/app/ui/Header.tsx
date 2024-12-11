'use client'
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-around items-center">
        <h1 className="text-xl font-bold">Gestionnaire de Tâches</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-200 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-200 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-200 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
