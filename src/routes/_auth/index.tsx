import { useTransition } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { getSession, signIn } from "@/lib/auth";
import InputField from "@/components/custom/InputField";
import Logo from "@/components/icons/Logo";
import { Meteors } from "@/components/magicui/meteors";

export const Route = createFileRoute("/_auth/")({
  component: Index,
  beforeLoad: async () => {
    const session = await getSession();
    if (session.data?.user) {
      return redirect({
        to: "/app",
      });
    }
  },
});

const signInSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
});

type signInType = z.infer<typeof signInSchema>;

function Index() {
  const [isLoading, startSignin] = useTransition();

  const form = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: signInType) {
    startSignin(async () => {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/app",
      });

      if (error) {
        toast.error(error.message);
      }
    });
  }

  function onGoogleLogin() {
    startSignin(async () => {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/app",
      });

      if (error) {
        toast.error(error.message);
      }
    });
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 relative overflow-x-hidden">
      <Meteors />
      <Logo className="absolute top-10" width={150} />

      <Card className="relative overflow-hidden">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <CardHeader>SignIn</CardHeader>
        <CardContent className="w-80">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputField label="Email" name="email" />
              <InputField label="Password" name="password" type="password" />
              <Button type="submit" isLoading={isLoading}>
                Signin
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Button onClick={onGoogleLogin} disabled>Entrar com o google</Button>
    </div>
  );
}
