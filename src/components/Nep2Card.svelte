<script lang="ts">
  import { wallet } from "@cityofzion/neon-core";
  import { onMount } from "svelte";

  import Card from "./Card.svelte";
  import Qr from "./Qr.svelte";

  let account: wallet.Account;
  let hasEncrypted = false;

  onMount(() => {
    try {
      account.encrypted;
      hasEncrypted = true;
    } catch {
      hasEncrypted = false;
    }
  });

  export { account, hasEncrypted };
</script>

<Card>
  <header class="text-center font-mono">{account.label}</header>
  <div class="flex justify-center">
    {#if hasEncrypted}
      <Qr data={account.encrypted} label="NEP2" />
    {:else}
      <p class="text-xl">No encrypted key provided!</p>
    {/if}
  </div>
</Card>
