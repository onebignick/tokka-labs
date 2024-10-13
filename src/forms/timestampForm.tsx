"use client"
import React, { useEffect, useState } from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time";

interface Props {
    transactionQuery: string[]
    setTransactionQuery: React.Dispatch<React.SetStateAction<string[]>>
}

const transactionHashFormSchema = z.object({
    startTime: z.date(),
    endTime: z.date(),
})

export default function TimestampForm({transactionQuery, setTransactionQuery}: Props) {
    const [timerange, setTimerange] = useState<number[]>([])
    const form = useForm<z.infer<typeof transactionHashFormSchema>>({
        resolver: zodResolver(transactionHashFormSchema),
    })

    function onSubmit(values: z.infer<typeof transactionHashFormSchema>) {
        // const startTimestamp = values.startTime.getTime()/1000;
        // const endTimestamp = values.endTime.getTime()/1000;

        // setTimerange([startTimestamp, endTimestamp])
        const newQuery = transactionQuery;
        newQuery[0] = "20850190"
        newQuery[1] = "20893217"
        setTransactionQuery(newQuery);
    }

    // useEffect(() => {
    //     const getBlockNumber = async () => {
    //         const response = await fetch("/api/block/time?" + new URLSearchParams({
    //             startTimestamp: timerange[0].toString(),
    //             endTimestamp: timerange[1].toString(),
    //         }))
    //         const result = await response.json();
    //         console.log(result)
    //     }
    //     getBlockNumber();
    // }, [timerange])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Search by Timestamp Range
                </CardTitle>
            </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <DateTimePicker value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <DateTimePicker value={field.value} onChange={field.onChange}/>
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