<!-- Wallet Card consisting of public and private sides -->
<script lang="ts">
  import { accounts } from "./stores";
  import PublicCard from "./PublicCard.svelte";
  import PrivateCard from "./PrivateCard.svelte";
  import Nep2Card from "./Nep2Card.svelte";
  export const cardTypes = [PublicCard, PrivateCard, Nep2Card];
  let account = undefined;
  export const cards = {
    left: 0,
    right: 1,
  };

  export function changeLeft() {
    if (cards.left === cardTypes.length - 1) {
      cards.left = 0;
      return;
    }
    cards.left++;
  }

  export function changeRight() {
    if (cards.right === cardTypes.length - 1) {
      cards.right = 0;
      return;
    }
    cards.right++;
  }

  export function remove() {
    $accounts = $accounts.filter((a) => a !== account);
  }
  export { account };
</script>

<article class="flex justify-center">
  <div class="print:hidden">
    <button class="btn px-2" on:click={changeLeft}>N</button>
  </div>
  <svelte:component this={cardTypes[cards.left]} {account} />
  <svelte:component this={cardTypes[cards.right]} {account} />
  <div class="flex flex-col justify-start print:hidden">
    <button class="btn px-2" on:click={changeRight}>N</button>
    <button class="btn-red px-2" on:click={remove}>X</button>
  </div>
</article>
