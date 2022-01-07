<script lang="ts">
  import { accounts } from '../components/stores';

  import Footer from '../components/Footer.svelte';
  import WalletCard from '../components/WalletCard.svelte';
  import GenerateForm from '../components/GenerateForm.svelte';
  import ImportForm from '../components/ImportForm.svelte';
  import Tabs from '../components/Tabs.svelte';
  import SimpleButton from '../components/SimpleButton.svelte';

  export function print() {
    window.print();
  }

  export let tabItems = [
    {
      label: 'Generate',
      component: GenerateForm,
      value: 1
    },
    {
      label: 'Import',
      component: ImportForm,
      value: 2
    }
  ];
</script>

<a class="ribbon print:hidden" href="https://github.com/snowypowers/ansy"
  ><img
    style="position: absolute; top: 0; right: 0; border: 0"
    src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
    alt="Fork me on GitHub"
    data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
  /></a
>
<main>
  <div class="mt-12 mb-4 sm:mt-6 print:hidden">
    <h1 class="text-7xl text-green-700 text-center">Ansy</h1>
  </div>

  <div class="container mx-auto print:hidden">
    <p class="text-center">Paper wallet for Neo3</p>
    <div class="mx-auto max-w-prose">
      <Tabs items={tabItems} />
    </div>
  </div>
  <div>
    {#each $accounts as account, i (account.address)}
      <WalletCard {account} />
      {#if (i + 1) % 5 === 0}
        <hr class="page-break" />
      {/if}
    {/each}
  </div>
  <div class="flex flex-col items-center print:hidden">
    <div class="w-3/5 md:w-1/2">
      <SimpleButton on:click={print}>Print!</SimpleButton>
    </div>
    <Footer />
  </div>
</main>
