<script lang="ts">
    export interface Column<T = any> {
        key: keyof T | ((item: T) => string);
        header: string;
        format?: (value: any) => string;
    }

    interface Props<T = any> {
        rows: Array<T>;
        columns: Array<Column<T>>;
    }

    let { rows, columns }: Props = $props();

    function getCellValue<T>(row: T, column: Column<T>): string {
        let value;
        if (typeof column.key === "function") {
            value = column.key(row);
        } else {
            value = row[column.key as keyof T];
        }

        return column.format ? column.format(value) : String(value);
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
                </tr>
            </thead>
            <tbody class="[&>tr]:hover:preset-tonal-primary">
                {#each rows as row}
                    <tr>
                        {#each columns as column}
                            <td>
                                <a href="/notes/{row.id}">
                                    {getCellValue(row, column)}
                                </a>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
