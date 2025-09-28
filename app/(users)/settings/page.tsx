import { auth } from "@/auth";

const SettingPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="text-center text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-400">Settings</h1>
      <p className="text-gray-300 mt-2">
        Welcome, <span className="font-semibold">{session.user?.email}</span>
      </p>

      {/* Debug session data */}
      <pre className="mt-4 p-4 bg-black/40 border border-gray-700 rounded-lg text-sm text-green-400">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default SettingPage;
