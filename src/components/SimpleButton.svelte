<script lang="ts">
  export let disabled = false;
</script>

<button
  on:click
  {disabled}
  class="w-full focus:outline-none bg-white rounded-lg border-2 p-1"
  class:border-green-700={!disabled}
  class:hover:border-green-800={!disabled}
>
  <slot>Click Me!</slot>
</button>
