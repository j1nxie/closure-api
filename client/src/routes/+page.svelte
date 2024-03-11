<script lang="ts">
    import { writable } from "svelte/store";
    import TopBar from "$lib/TopBar.svelte";

    const label = writable("fetch current events");
    const url = writable("https://closure.rylie.moe/api/event");
    const clicked = writable(false);

    async function handleClick() {}

    function handleDropdownClick() {
        $clicked = !$clicked;
    }

    function handleEventButtonClick() {
        $clicked = !$clicked;

        $label = "fetch current events";
        $url = "https://closure.rylie.moe/api/event";
    }

    function handleStatusButtonClick() {
        $clicked = !$clicked;

        $label = "fetch current status";
        $url = "https://closure.rylie.moe/api/status";
    }
</script>

<TopBar />

<div class="mx-auto max-w-4xl min-w-full pt-3 pb-5">
    <h1 class="mb-2 text-center text-3xl font-bold">ClosureAPI</h1>
    <div class="md:flex md:items-center justify-center mb-6">
        <div class="md:flex md:items-center max-w-1/2 md:flex-col">
            <div class="md:min-w-72">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    disabled={true}
                    placeholder={$url}
                    id="api-selector"
                />
            </div>
            <div class="md:flex md:flex-row">
                <button
                    class="block text-gray-500 font-bold focus:outline-none bg-green-200 p-3 text-center mt-2 rounded-tl rounded-bl hover:bg-green-300"
                    on:click={handleClick}
                >
                    {$label}
                </button>
                <button
                    class="dropdown-button bg-green-200 p-3 text-center mt-2 rounded-br rounded-tr focus:outline-none text-gray-500 hover:bg-green-300"
                    on:click={handleDropdownClick}
                ></button>
            </div>
            <div
                class={`min-w-40 z-10 flex flex-col ${$clicked ? "absolute" : "hidden"}`}
                style="top: 14.5rem;"
            >
                <button
                    class="px-3 py-4 hover:bg-gray-400"
                    on:click={handleEventButtonClick}
                >
                    get events
                </button>
                <button
                    class="px-3 py-4 hover:bg-gray-400"
                    on:click={handleStatusButtonClick}
                >
                    get status
                </button>
            </div>
        </div>
    </div>
</div>
