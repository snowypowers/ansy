<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul class="flex flex-wrap border-b-2 list-none">
  {#each items as item}
    <li class={activeTabValue === item.value ? 'active' : ''}>
      <span on:click={handleClick(item.value)}>{item.label}</span>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div class="mb-10 p-5 border border-t-0 rounded rounded-t-none bg-white">
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}

<style>
  li {
    margin-bottom: -1px;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
