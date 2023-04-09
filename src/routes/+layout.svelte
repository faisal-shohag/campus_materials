
<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js"
    integrity="sha512-w3u9q/DeneCSwUDjhiMNibTRh/1i/gScBVp2imNVAMCt6cUHIw6xzhzcPFIaL3Q1EbI2l+nu17q2aLJJLo4ZYg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
</svelte:head>

<script>
    import '../app.css'
    import logo from '../images/logo.png'
    import {appStore, database} from '.././store';
    import { fly } from 'svelte/transition'
    import { backOut } from 'svelte/easing';
    import { page } from '$app/stores'
    import { onMount } from 'svelte';
    import {db} from '../fb'
    import { ref, set, onValue, update} from 'firebase/database';
    

   let title;
    appStore.subscribe(value=>{
        title = value.title;   
    });

    onMount(()=>{
        onValue(ref(db, 'cover_pages/assignment'), (snap) => {
        database.set({assignments: snap.val()})
    })
    })
    
 

//     db.ref('cover_pages/assignment').on('value', snap=>{
//       database.set({assignments: snap.val()})
//    });


</script>




<div class="header">
    <div class="logo"><img src={logo} alt=""/></div>
   {#key $page}
   <div in:fly={{
    x: 100,
    delay: 100,
    easing: backOut
  }} class="title">{title}</div>
   {/key}
    
</div>
<div class="margin"></div>
<div class="nav_and_body">
    <slot />
</div>
