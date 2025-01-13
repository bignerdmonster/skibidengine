import Link from "next/link";

export default function HomePage() {
  return (
    <main className="">
       <div className="min-h-screen">
        <header className="shadow">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-800">Skibidengine</div>
            <nav className="space-x-4">
              <a href="#" className="text-700 hover:text-900">Home</a>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to the Skibidengine</h1>
            <p className="text-lg text-gray-700 mb-8">
              Skibidi framework
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </main>
        <footer className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 text-center text-gray-700">
            &copy; Jarvis, generate me a front page for my website 
          </div>
        </footer>
      </div>
    </main>
  );
}
