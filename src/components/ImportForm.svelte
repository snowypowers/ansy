<script lang="ts">
  import { accounts } from "./stores";
  import { wallet } from "@cityofzion/neon-core";

  let password = "";
  let privateKey = "";

  export function importAccount() {
    if (!privateKey) {
      alert("Please input a private key!");
      return;
    }
    try {
      const acct = new wallet.Account(privateKey);
      if (password) {
        if (acct.tryGet("encrypted")) {
          acct.decrypt(password);
        } else [acct.encrypt(password)];
      }
      $accounts = [...$accounts, acct];
    } catch (e) {
      alert(e);
    }
  }
</script>

<div class="flex flex-col justify-items-center">
  <p class="m-1">Import an existing key</p>
  <input
    class="input flex-grow"
    bind:value={privateKey}
    type="text"
    placeholder="Private Key"
  />
  <input
    class="input flex-grow"
    bind:value={password}
    type="password"
    placeholder="Password (Optional)"
  />
  <button class="btn" id="convert" on:click={importAccount}>Convert</button>
</div>
