"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";



const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().min(3),
    password: z.string().min(3)
  })
}

const AuthForm = ({type} : {type: FormType}) => {

  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-in') {
        toast.success("Sign In successful!")
        router.push('/')
       
      } else {

        const {name, email, password} = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signInWithPopup({
          uid: userCredentials.user.uid,
          name,
          email, 
          password
        })

       if(!result?.success) {
        toast.error(result.message);
        return;
       }
        toast.success("Account created successfully. Please sign in to continue.")
        router.push('/sign-in')
      }
    } catch (error) {
      console.log(error);
      toast.error(`Oops! An error occurred: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Vexel</h2>
        </div>
        <h3>Prepare for professional interviews powered by AI</h3>
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
          {!isSignIn &&  (
            <FormField 
            control={form.control} 
            name="name" label="Name" 
            placeholder="Enter your name" 
            type="text"/>
          )}
           <FormField 
            control={form.control} 
            name="email" label="Email" 
            placeholder="Enter your email address" 
            type="email"/>

          <FormField 
            control={form.control} 
            name="password" label="Password" 
            placeholder="Enter your password" 
            type="password"/>

          <Button className="btn" type="submit">
            {isSignIn ? 'Sign In' : 'Create an account'}
          </Button>
        </form>
      </Form>

      <p className="text-center">
        {isSignIn ? 'No account yet?' : "Already have an account?"}
        <Link  href={!isSignIn ? '/sign-in' : '/sign-up'}
        className="font-semibold text-user-primary ml-1"
       >
          {!isSignIn ? 'Sign In' : 'Sign Up'}
        </Link>
      </p>
      </div>
    </div>
  );
};

export default AuthForm;
