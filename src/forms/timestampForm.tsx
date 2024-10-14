"use client"
import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";

interface Props {
    transactionQuery: string[]
    setTransactionQuery: React.Dispatch<React.SetStateAction<string[]>>
}

const transactionHashFormSchema = z.object({
    startTime: z.date(),
    endTime: z.date(),
    page: z.coerce.number().int(),
    offset: z.coerce.number().int(),
})

export default function TimestampForm({transactionQuery, setTransactionQuery}: Props) {
    const [loading, setLoading] = React.useState(false);
    const [timerange, setTimerange] = useState<number[]>([])
    const form = useForm<z.infer<typeof transactionHashFormSchema>>({
        resolver: zodResolver(transactionHashFormSchema),
    })

    function onSubmit(values: z.infer<typeof transactionHashFormSchema>) {
        setLoading(true)
        const startTimestamp = values.startTime.getTime()/1000;
        const endTimestamp = values.endTime.getTime()/1000;

        setTimerange([startTimestamp, endTimestamp, values.page, values.offset])
    }

    useEffect(() => {
        const getBlockNumber = async () => {
            const response = await fetch("/api/block/time?" + new URLSearchParams({
                startTimestamp: timerange[0].toString(),
                endTimestamp: timerange[1].toString(),
            }))
            const result = await response.json();
            const newQuery = [...transactionQuery];
            newQuery[0] = result[0].toString();
            newQuery[1] = result[1].toString();
            newQuery[2] = timerange[2].toString();
            newQuery[3] = timerange[3].toString();
            setTransactionQuery(newQuery);
            setLoading(false);
        }
        if (timerange[0] && timerange[1]) {
            console.log("searching for " + timerange[0].toString() + timerange[1].toString());
            getBlockNumber();
            console.log("done searching");
        }
    }, [timerange])

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
                    <FormField
                        control={form.control}
                        name="page"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Page</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} type="number"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="offset"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Items per query</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} type="number"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
                </form>
            </Form>
        </CardContent>
        </Card>
    )
}