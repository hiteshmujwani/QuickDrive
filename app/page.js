import Header from "./_components/Header";

export default function Home() {
  return (
    <>
      <section className="">
        <Header />
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[calc(100vh-10vh)] lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              <span className="font-extrabold text-purple-700">
                Store, Share,
              </span>
              and <span className="font-extrabold text-purple-700">Access</span>
              <strong className="font-extrabold  sm:block">
                {" "}
                Your Files Effortlessly
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Upload, organize, and access your files instantly with our
              seamless cloud storage. Stay connected and in control, whether
              you're at home, work, or on the go.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-sm bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:ring-3 focus:outline-hidden sm:w-auto transition-all"
                href="/files"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
