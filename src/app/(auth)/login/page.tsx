import LoginForm from "./LoginForm";

export const metadata = {
  title: "Connexion | EasyProject",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black p-4">
      <LoginForm />
    </div>
  );
}
