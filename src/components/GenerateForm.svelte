<script>
  import { wallet } from '@cityofzion/neon-core';
  import { accounts } from './stores';
  import SimpleButton from './SimpleButton.svelte';
  import SimpleInput from './SimpleInput.svelte';

  let password = '';
  let buttonText = 'Generate!';
  let buttonDisabled = false;
  function toggleButton(enable) {
    if (enable) {
      buttonDisabled = false;
      buttonText = 'Generate!';
    } else {
      buttonDisabled = true;
      buttonText = 'Encrypting...';
    }
  }

  async function generateAccount() {
    const newAccount = new wallet.Account();
    if (password) {
      toggleButton(false);
      await newAccount.encrypt(password);
      toggleButton(true);
    }
    $accounts = [...$accounts, newAccount];
  }
</script>

<div class="flex flex-col justify-items-center bg-white">
  <p class="m-1">Generate a new Private Key</p>
  <div class="flex space-x-4">
    <div class="w-3/4 grow">
      <SimpleInput bind:value={password} type="password" placeholder="Password (Optional)" />
    </div>
    <div class="w-1/4">
      <SimpleButton on:click={generateAccount} disabled={buttonDisabled}>{buttonText}</SimpleButton>
    </div>
  </div>
  <div class="flex m-2 justify-center">
    <p class="rounded-lg text-center bg-yellow-200 bg-opacity-25 py-1 px-4">
      Warning: Encryption will take a while
    </p>
  </div>
</div>
