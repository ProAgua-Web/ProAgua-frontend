"use client"

import { ColumnHeader } from "@/components/widgets/column-header"
import { StatusHeader } from "./header-status"
import ActionsCell from "@/components/widgets/action-cell"
import OkIcon from "@/components/icons/OkIcon"
import DangerIcon from "@/components/icons/DangerIcon"

export const columns = [
    {
        accessorKey: "id",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }: { row: any }) => {
            const id = row.getValue("id")
            return <div className="font-semibold">{String(id).padStart(4, "0")}</div>
        },
    },
    {
        accessorKey: "amostragem",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Ciclo de Amostragem" />
        ),
        cell: ({ row }: { row: any }) => {
            const amostragem = row.getValue("amostragem")
            return <div className="w-font-semibold">{amostragem}</div>
        },
    },
    {
        accessorKey: "ponto.edificacao.codigo",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Cód. Edificação" />
        ),
        filter: 'text',

    },
    {
        accessorKey: "ponto.edificacao.campus",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Campus" />
        ),
        cell: ({ row }: { row: any }) => {
            const campus = row.getValue("ponto.edificacao.campus")
            return <>{campus == "OE" ? "Oeste" : "Leste"}</>
        }
    },
    {
        accessorKey: "ponto.localizacao",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Ponto" />
        ),
    },
    {
        accessorKey: "ponto.tombo",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Tombo" />
        ),
    },
    {
        accessorKey: "quantidade_coletas",
        header: ({ column }: { column: any }) => (
            <ColumnHeader column={column} title="Qnt. de coletas" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
            <StatusHeader column={column} title="Status" />
        ),
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status")
            return <div className="font-semibold">
                {status ? <OkIcon width="1.5rem" /> : <DangerIcon width="1.5rem" />}
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const id = row.getValue("id");
            return <ActionsCell
                row={row}
                onDelete={() => {
                    // MedicoDAO.delete(row.getValue("id"));
                    window.location.reload();
                }}
                onEdit={() => {
                    // window.location.href = `/doctors/edit/${id}`;
                    alert("Edit not implemented");
                }
                }
            />;
        },
    },
]