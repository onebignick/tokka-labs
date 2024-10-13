"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowOptions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/Product";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Id" />),
        cell: ({ row }) => {
            return (
                <Button variant="link" asChild>
                    <Link href={`#`}>{row.getValue("id")}</Link>
                </Button>
            );
        }
    },
    {
        accessorKey: "productName",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Product Name" />),
        cell: ({ row }) => {
            return (
                <Button variant="link" asChild>
                    <Link href={`#`}>{row.getValue("productName")}</Link>
                </Button>
            );
        }
    },
    {
        id: "actions",
        cell: () => <div className="w-full flex justify-end"><DataTableRowActions /></div>,
    }
];