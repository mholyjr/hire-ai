import { Link, useForm, Head } from "@inertiajs/react";
import classNames from "classnames";
import React from "react";
import useRoute from "@/Hooks/useRoute";
import AuthenticationCard from "@/Components/AuthenticationCard";
import { GoogleLogin } from "@/Components/GoogleLogin";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: "",
    password: "",
    remember: "",
  });

  const [usePassword, setUsePassword] = React.useState(false);

  React.useEffect(() => {
    setUsePassword(!!form.data.email);
  }, [form.data.email]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route("login"), {
      onFinish: () => form.reset("password"),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Login" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData("email", e.currentTarget.value)}
            error={form.errors.email}
            required
            autoFocus
          />
        </div>
        {usePassword && (
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={form.data.password}
              onChange={e => form.setData("password", e.currentTarget.value)}
              required
              autoComplete="current-password"
              error={form.errors.password}
            />
          </div>
        )}
        <Button
          className={classNames("w-full mt-4", {
            "opacity-25": form.processing,
          })}
          disabled={form.processing}
        >
          Log in
        </Button>
        <div className="relative my-8">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>
        <div className="block mt-4">
          <GoogleLogin />
        </div>
        {/* <div className="mt-4">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={form.data.remember === "on"}
                  onChange={e =>
                    form.setData(
                      "remember",
                      e.currentTarget.checked ? "on" : "",
                    )
                  }
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
            </div> */}

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
          {canResetPassword && (
            <div>
              <Link
                href={route("password.request")}
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="flex items-center justify-end">
            <Link
              href={route("register")}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Need an account?
            </Link>
          </div>
        </div>
      </form>
    </AuthenticationCard>
  );
}
