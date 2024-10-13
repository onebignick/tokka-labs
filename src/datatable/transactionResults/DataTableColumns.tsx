"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { DataTableRowActions } from "../DataTableRowOptions";
import { Transaction } from "../../types/transaction";

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "timeStamp",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Timestamp" />),
        cell: ({ row }) => {
            return (
                row.getValue("timeStamp")
            );
        }
    },
    {
        accessorKey: "value",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Value" />),
        cell: ({ row }) => {
            return (
                row.getValue("value")
            );
        }
    },
    {
        accessorKey: "hash",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Transaction Hash" />),
        cell: ({ row }) => {
            return (
                row.getValue("hash")
            );
        }
    },
    {
        accessorKey: "from",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="From Address" />),
        cell: ({ row }) => {
            return (
                row.getValue("from")
            );
        }
    },
    {
        accessorKey: "to",
        header: ({ column }) => (<DataTableColumnHeader column={column} title="To Address" />),
        cell: ({ row }) => {
            return (
                row.getValue("to")
            );
        }
    },
    {
        id: "actions",
        cell: () => <div className="w-full flex justify-end"><DataTableRowActions /></div>,
    }
];