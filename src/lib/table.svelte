<script lang="ts">
    import type { Component } from "svelte";

    export interface Column<T = any> {
        key: keyof T | ((item: T) => string);
        header: string;
        format?: (value: any) => string;
        isAction?: boolean;
    }

    interface Action<T = any> {
        label: string;
        url: string | ((item: T) => string);
        method: "GET" | "POST";
        icon?: Component;
        variant?: string;
    }

    interface Props<T = any> {
        rows: Array<T>;
        columns: Array<Column<T>>;
        actions?: Array<Action<T>>;
        actionColumn?: {
            header: string;
        };
    }

    let {
        rows,
        columns,
        actions = [],
        actionColumn = { header: "Actions" },
    }: Props = $props();

    function getCellValue<T>(row: T, column: Column<T>): string {
        let value;
        if (typeof column.key === "function") {
            value = column.key(row);
        } else {
            value = row[column.key as keyof T];
        }

        return column.format ? column.format(value) : String(value);
    }

    function handleAction<T>(action: Action<T>, row: T) {
        if (!action.action) return;
        action.action(row);
    }
</script>

<div
    class="card bg-noise bg-surface-50-950 border-[1px] border-surface-200-800 justify-center items-center p-8"
>
    <h2 class="h3">Recent notes</h2>
    <div class="table-wrap">
        <table class="table caption-bottom">
            <thead>
                <tr>
                    {#each columns as column}
                        <th>{column.header}</th>
                    {/each}
                    {#if actions.length > 0}
                        <th>{actionColumn.header}</th>
                    {/if}
                </tr>
            </thead>
            <tbody class="[&>tr]:hover:preset-tonal">
                {#each rows as row}
                    <tr>
                        {#each columns as column}
                            <td>
                                {#if !column.isAction}
                                    <a href="/notes/{row.id}">
                                        {getCellValue(row, column)}
                                    </a>
                                {/if}
                            </td>
                        {/each}
                        {#if actions.length > 0}
                            <td class="flex gap-2">
                                {#each actions as action}
                                    {#if action.method === "GET"}
                                        <a
                                            href={typeof action.url ===
                                            "function"
                                                ? action.url(row)
                                                : action.url}
                                        >
                                            {#if action.icon}
                                                <action.icon size="16" />
                                            {:else}
                                                {action.label}
                                            {/if}
                                        </a>
                                    {:else}
                                        <form
                                            action={typeof action.url ===
                                            "function"
                                                ? action.url(row)
                                                : action.url}
                                            method="POST"
                                        >
                                            <button
                                                class={`text-${action.variant}`}
                                            >
                                                {#if action.icon}
                                                    <action.icon size="16" />
                                                {:else}
                                                    {action.label}
                                                {/if}
                                            </button>
                                        </form>
                                    {/if}
                                {/each}
                            </td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
