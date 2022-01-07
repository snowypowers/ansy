<script lang="ts">
  import { toCanvas } from 'qrcode';
  import { onMount } from 'svelte';

  let canvas;
  let label = 'default';
  let data = '';
  let showCanvas = true;

  function updateCanvas(newData: string) {
    toCanvas(canvas, newData, { margin: 1, width: 100 }, (err) => {
      if (err) alert(err);
    });
  }

  function toggleCanvas() {
    showCanvas = !showCanvas;
  }

  onMount(() => updateCanvas(data));

  // Reactive bind
  $: if (showCanvas) updateCanvas(data);

  export { label, data, showCanvas };
</script>

<div class="flex flex-col text-center">
  <div class="qr" on:dblclick={toggleCanvas}>
    <canvas class="qr" class:hidden={!showCanvas} bind:this={canvas} />
    <span class="break-all font-mono text-xs" class:hidden={showCanvas}> {data}</span>
  </div>
  <p>{label}</p>
</div>

<style>
  .qr {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
</style>
