"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
})

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(values.password !== values.confirmPassword) {
      toast.error("Passwords do not match")
      return;
    }

    try {
      setIsLoading(true);
      const token = searchParams.get("token");

      if(!token) {
        toast.error("Invalid token")
      }

      const { error } = await authClient.resetPassword({ 
        newPassword: values.password, 
        token: token ?? ""
      })

      if(!error) { 
        toast.success("Password reset successfully");
        router.push('/sign-in')
      } 
      else { 
        toast.error(error?.message)
      }
    } catch(error) {
      console.error((error as Error)?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">New password</FormLabel>
                    
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
                
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                      
                  <FormControl>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
            
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Icon name="LoaderCircle" className="animate-spin" /> : "Reset account password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
