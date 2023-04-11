<script>
  import cover_page_logo from "../images/cover_page.png";
  import "../icons/icofont/icofont.min.css";
  import { appStore, database } from "../store";
  import { db } from "../fb";
  import { ref, set, onValue, update } from "firebase/database";
  //import { Diamonds } from "svelte-loading-spinners"
  import Skeleton from "svelte-skeleton/Skeleton.svelte";
  appStore.set({ title: "BRUR Materials" });

  let models;
  $: {
    database.subscribe((value) => {
      models = value.assignments;
    });
  }

  const viewCount = async (index) => {
    try {
      await update(ref(db, "cover_pages/assignment/" + index), {
        view: models[index].view + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };
</script>

<div class="menu">
  <div class="menu_head">
    <div class="head_one">
      <div class="logo"><img src={cover_page_logo} alt="" /></div>
      <div class="title">Coverpages</div>
    </div>
    <div style="display:none" class="head_two">See all</div>
  </div>
  {#if models.length > 0}
    <div class="menu_items">
      {#each models as model, index}
        <a
          on:click={() => viewCount(index)}
          href="/assignment/{index + 1}_{model.name}"
          ><div class="item">
            <div class="image_demo"><img src={model.photo} alt="" /></div>
            <div class="item_menu">
              <div class="item_name">{model.name}</div>
              <!-- <div class="menu_button"><i class="icofont-eye-open"></i> View</div> -->
              <!-- <div class="menu_button"><i class="icofont-angry-monster"></i> Generate</div> -->
            </div>
            <div class="count_menu">
              <div class="count">
                <i class="icofont-eye-open" />
                {model.view}
              </div>
              <div class="count">
                <i class="icofont-download" />
                {model.download}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="flex">
      <Skeleton height="180" width="360"
        ><rect width="120" height="180" x="0" y="0" rx="12" ry="12" /></Skeleton
      >
      <Skeleton height="180" width="360"
        ><rect width="120" height="180" x="0" y="0" rx="12" ry="12" /></Skeleton
      >
      <Skeleton height="180" width="360"
        ><rect width="120" height="180" x="0" y="0" rx="12" ry="12" /></Skeleton
      >
    </div>
  {/if}
</div>

<style>
  .item_name {
    font-weight: bold;
    color: #1e1e1f;
    margin-top: 5px;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  /* .spinner{
        display: flex;
        justify-content: center; 
        align-items: center;
        height: 100%;
        align-items: center;
    } */
  .menu {
    padding: 5px;
    background: rgba(255, 255, 255, 0.24);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.4px);
    -webkit-backdrop-filter: blur(6.4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    /* min-height: 200px;      */
    position: relative;
  }

  .menu .menu_head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 18px;
    font-weight: bold;
    padding: 10px;
  }

  .head_one {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .head_two {
    font-weight: 400;
    font-size: 14px;
    text-decoration: underline;
  }

  .menu_head .title {
    color: #4e4c4c;
  }

  .menu .menu_head img {
    height: 20px;
  }

  .menu_items {
    display: flex;
    padding: 10px;
    justify-content: flex-start;
    gap: 10px;
    min-width: 200px;
    overflow-x: scroll;
  }

  .menu_items img {
    height: 200px;
    display: flex;
    border: 1px solid #eee;
    border-radius: 10px;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.24);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.4px);
    -webkit-backdrop-filter: blur(6.4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .item_menu {
    display: flex;
    gap: 10px;
    font-size: 15px;
    justify-content: space-between;
    position: relative;
  }

  /* .menu_button{
        background: linear-gradient(45deg, #6e2bda, #bb11ca);
        color: #fff;
        padding: 5px;
        border-radius: 7px;
        font-weight: 700;
        cursor: pointer;
    }   */

  .count_menu {
    display: flex;
    justify-content: space-between;

    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    color: #333;
    /* padding-left: 5px;
    padding-right: 5px; */
    padding-bottom: 2px;
    border-radius: 10px;
    align-items: center;
    margin-top: 3px;
  }

  .count {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: bold;
  }

  @media screen and (max-width: 580px) {
    /* .menu_button {
            font-size: 14px;
        } */

    .menu_items img {
      height: 150px;
      min-width: 110px;
    }
  }

  .image_demo{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
