<script>
  export let type;
  export let placeholder;
  export let value;
</script>

{#if type === 'password'}
  <input
    class="w-full rounded-lg bg-gray-50 border focus:outline-none focus:border-green-500 p-1"
    type="password"
    bind:value
    {placeholder}
  />
{:else}
  <input
    class="w-full rounded-lg bg-gray-50 border focus:outline-none focus:border-green-500 p-1"
    type="text"
    bind:value
    {placeholder}
  />
{/if}
