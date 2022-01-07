<script lang="ts">
  import { accounts } from './stores';
  import { wallet } from '@cityofzion/neon-core';
  import SimpleButton from './SimpleButton.svelte';
  import SimpleInput from './SimpleInput.svelte';

  let password = '';
  let privateKey = '';

  let buttonText = 'Convert';
  let buttonDisabled = false;

  function disableButton(text) {
    buttonText = text;
    buttonDisabled = true;
  }

  function enableButton() {
    buttonText = 'Convert';
    buttonDisabled = false;
  }

  export async function importAccount() {
    if (!privateKey) {
      alert('Please input a private key!');
      return;
    }
    try {
      const acct = new wallet.Account(privateKey);
      if (password) {
        if (acct.tryGet('encrypted')) {
          disableButton('Decrypting...');
          await acct.decrypt(password);
        } else {
          disableButton('Encrypting...');
          await acct.encrypt(password);
        }
      }
      $accounts = [...$accounts, acct];
      enableButton();
    } catch (e) {
      alert(e);
      enableButton();
    }
  }
</script>

<div class="flex flex-col justify-items-center bg-white">
  <p class="m-1">Import an existing key</p>
  <SimpleInput bind:value={privateKey} type="text" placeholder="Private Key" />
  <SimpleInput bind:value={password} type="password" placeholder="Password (Optional)" />
  <SimpleButton on:click={importAccount} disabled={buttonDisabled}>{buttonText}</SimpleButton>
</div>
