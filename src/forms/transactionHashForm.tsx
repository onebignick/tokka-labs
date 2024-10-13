"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    setTransactionHash: React.Dispatch<React.SetStateAction<string>>;
}


const transactionHashFormSchema = z.object({
    transactionHash: z.string().min(66, {
        message: "Invalid transaction hash"
    }).max(66, {
        message: "Invalid transaction hash"
    })
})

export default function TransactionHashForm({ setTransactionHash }: Props) {
    const form = useForm<z.infer<typeof transactionHashFormSchema>>({
        resolver: zodResolver(transactionHashFormSchema),
        defaultValues: {
            transactionHash:  ""
        }
    })

    function onSubmit(values: z.infer<typeof transactionHashFormSchema>) {
        setTransactionHash(values.transactionHash);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Search by Transaction Hash
                </CardTitle>
            </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="transactionHash"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Transaction Hash</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter transaction hash here" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
        </CardContent>
        </Card>
    )
}