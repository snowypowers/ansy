<script lang="ts">
  import type { wallet } from '@cityofzion/neon-core';
  import Qr from './Qr.svelte';
  import Card from './Card.svelte';

  let account: wallet.Account;
  export { account };
</script>

<Card>
  <header class="text-center font-mono">{account.label}</header>
  <div class="flex justify-around">
    <Qr data={account.address} label="Address" />
    <Qr data={account.publicKey} label="Public Key" />
  </div>
</Card>
