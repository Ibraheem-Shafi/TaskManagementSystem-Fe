import React from 'react';
import Header from './GeneralComponents/Header';
import Footer from './GeneralComponents/Footer';

function Home() {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen p-6">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MyApp</h1>
          <p className="text-lg text-gray-700">
            Your one-stop solution for managing tasks efficiently and staying organized.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Easy Task Management</h3>
              <p className="text-gray-600">
                Organize your tasks with just a few clicks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Stay in Sync</h3>
              <p className="text-gray-600">
                Access your to-do list from anywhere.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Customizable Categories</h3>
              <p className="text-gray-600">
                Organize tasks into categories for better management.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
