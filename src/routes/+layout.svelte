<script>
  import "../app.css";
  import logo from "../images/logo.png";
  import github from '../images/github.png';
  import { appStore, database } from ".././store";
  import { fly } from "svelte/transition";
  import { backIn, backOut } from "svelte/easing";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { db } from "../fb";
  import { ref, set, onValue, update } from "firebase/database";
  
  let title;
  appStore.subscribe((value) => {
    title = value.title;
  });

  let start = false;

  onMount(() => {
    onValue(ref(db, "cover_pages/assignment"), (snap) => {
      database.set({ assignments: snap.val() });
    });
    start = true;
  });


</script>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js"
    integrity="sha512-w3u9q/DeneCSwUDjhiMNibTRh/1i/gScBVp2imNVAMCt6cUHIw6xzhzcPFIaL3Q1EbI2l+nu17q2aLJJLo4ZYg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"
  ></script>
</svelte:head>

<div class="header">
  <div class="logo"><img src={logo} alt="" /></div>
  {#key $page}
    <div
      in:fly={{
        x: 100,
        delay: 100,
        easing: backOut,
      }}
      class="title"
    >
      {title}
    </div>
  {/key}
</div>
<div class="margin" />
<div class="nav_and_body">
  <slot />
</div>


<a href="https://github.com/faisal-shohag/campus_materials"><div class="footer">
{#if start}
{#key $page}
<div in:fly={{
    y: 20,
    easing: backOut,
    delay: 100,
    duration: 500
    }} class="img"><img src={github} alt=""/></div>
   <div in:fly={{
        x: -20,
        easing: backOut,
        delay: 300,
        duration: 600
        }} class="author">F|S</div>
    {/key}
  {/if}

</div></a>
