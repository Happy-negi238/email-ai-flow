
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-500">
          Email & Calendar Management Simplified
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-zinc-900 md:text-7xl">
          Manage Emails and Calendar
          <span className="block text-blue-500">
            From One Unified Workspace
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
          Connect your inbox and calendar to organize meetings, track
          conversations, schedule events, and stay productive without switching
          between multiple apps.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
            Get Started
          </button>

          <button className="rounded-xl border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 w-fit rounded-xl bg-blue-50 p-3">📧</div>

            <h3 className="mb-2 text-xl font-semibold">
              Smart Email Management
            </h3>

            <p className="text-zinc-600">
              Organize conversations, track important messages, and never miss
              critical updates.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 w-fit rounded-xl bg-blue-50 p-3">📅</div>

            <h3 className="mb-2 text-xl font-semibold">Calendar Integration</h3>

            <p className="text-zinc-600">
              View meetings, create events, and manage your schedule in one
              place.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 w-fit rounded-xl bg-blue-50 p-3">⚡</div>

            <h3 className="mb-2 text-xl font-semibold">Productivity First</h3>

            <p className="text-zinc-600">
              Reduce context switching and focus on work that actually matters.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
