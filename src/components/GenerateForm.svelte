<script lang="ts">
  import { wallet } from "@cityofzion/neon-core";
  import { accounts } from "./stores";

  let password = "";

  export function generateAccount() {
    const newAccount = new wallet.Account();
    if (password) {
      newAccount.encrypt(password);
    }
    $accounts = [...$accounts, newAccount];
  }
</script>

<div class="flex flex-col justify-items-center">
  <p class="m-1">Generate a new Private Key</p>
  <div class="flex space-x-2">
    <input
      class="input"
      bind:value={password}
      type="password"
      placeholder="Password (Optional)"
    />
    <button
      class="btn"
      on:click={generateAccount}
      >Generate!
    </button>
  </div>
  <div class="flex m-2 justify-center">
    <p class="rounded-lg text-center bg-yellow-200 bg-opacity-25 py-1 px-4">
      Warning: Encryption will take a while
    </p>
  </div>
</div>
