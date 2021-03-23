<script lang="ts">
  import { toCanvas } from "qrcode";
  import { onMount } from "svelte";

  let canvas;
  let label = "default";
  let data = "";
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

<div class="qr-block">
  <div class="qr" on:dblclick={toggleCanvas}>
    <canvas
      class="qr flex-shrink"
      class:hide={!showCanvas}
      bind:this={canvas}
    />
    <span class="qr" class:hide={showCanvas}> {data}</span>
  </div>
  <p>{label}</p>
</div>

<style>
  .qr-block {
    display: inline-block;
    border: 3px black;
    text-align: center;
    padding: 0;
    flex: auto;
  }

  .qr {
    margin: 0 auto;
  }

  .hide {
    display: none;
  }

  span {
    word-wrap: break-word;
    font-family: monospace;
  }
</style>
