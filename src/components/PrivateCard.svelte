<script lang="ts">
  import { wallet } from "@cityofzion/neon-core";
  import Qr from "./Qr.svelte";
  import Card from "./Card.svelte";

  let account: wallet.Account;
  export { account };
</script>

<Card>
  <header class=" text-center font-mono">{account.label}</header>
  <div class="flex">
    <Qr data={account.privateKey} label="HEX" />
    <Qr data={account.WIF} label="WIF" />
  </div>
</Card>
