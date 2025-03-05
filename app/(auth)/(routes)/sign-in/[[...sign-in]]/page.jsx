import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white border-t-2">
      <div className="lg:grid lg:min-h-[calc(100vh-10vh)] lg:grid-cols-12">
        <section className="relative hidden lg:flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/image-1.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to QuickDrive
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              ✨ A beautiful platform to securely store, share, and access your
              files anytime.
            </p>
          </div>
        </section>

        <main className="flex flex-1 items-center justify-center px-8 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl  lg:max-w-3xl flex flex-col items-center lg:mt-10">
            <div className="relative flex flex-col text-cneter items-center mb-2 lg:hidden">
              <h1 className="mt-0 text-2xl text-center font-bold text-black sm:text-3xl md:text-4xl">
                Welcome to QuickDrive
              </h1>

              <p className="mt-2 text-center leading-relaxed text-black">
                ✨ A beautiful platform to securely store, share, and access
                your files anytime.
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
