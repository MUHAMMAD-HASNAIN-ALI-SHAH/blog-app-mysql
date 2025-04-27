import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import useAuthStore from "../store/auth";

const SignupComponent = ({
  close,
  setAuthModal,
}: {
  close: () => void;
  setAuthModal: (state: string) => void;
}) => {
  const { signup, authLoader } = useAuthStore();

  const form = useForm({
    initialValues: { username: "", email: "", password: "" },
    validate: {
      username: (value) =>
        value.length < 3 || value.length > 16
          ? "Username must be between 3 and 16 characters"
          : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleSubmit = async () => {
    const values = form.values;
    const getResult = await signup(values);
    if (getResult === 1) {
      close();
    }
  };

  return (
    <form className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <h1 className="text-2xl font-bold pb-2">Signup to create an account</h1>
      <p className="">Please enter your details</p>

      <TextInput
        mt="sm"
        label="Username"
        placeholder="Username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <TextInput
        mt="sm"
        label="Password"
        placeholder="Password"
        type="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <div className="flex justify-between items-center mt-3">
        <p className="pt-3">
          Already have an account{" "}
          <button
            onClick={() => setAuthModal("signin")}
            className="text-blue-700"
          >
            Signin
          </button>{" "}
        </p>

        <button disabled={!!authLoader} className="btn btn-primary" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupComponent;
