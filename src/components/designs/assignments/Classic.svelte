<script>
  import brur from "../../../images/brur.jpeg";
  import toast, { Toaster } from "svelte-french-toast";
  import {generatePDF} from "../../../model"
  export let myinfo = {
    //your info
    name: "",
    id: "",
    year: "",
    semester: "",
    session: "",
    dept: "",

    //course info
    assignment_on: "",
    course_code: "",
    course_title: "",

    //teacher_info
    teacher_name: "",
    teacher_dept: "",
    teacher_rank: "",

    //other
    submission_date: "",
    color: "#B12BAA",
  };

  let screenSize;
  $: {
    if (screenSize <= 600) {
      assignment.classList.add("zoom50");
    }
  }

  let assignment;
  export async function generate() {
    generatePDF(assignment, screenSize, myinfo);
  }
</script>

<svelte:window bind:innerWidth={screenSize} />
<Toaster />
<div bind:this={assignment} class="assignment">
  <div class="credit">brurcoverpage.netlify.app</div>
  <div class="abody">
    <div class="logoandtitle">
      <div class="alogo"><img alt="" src={brur} /></div>
      <div class="auni">
        Begum Rokeya University, Rangpur
        <div class="moto">Knowledge is power</div>
      </div>
    </div>
    <!-- <div class="atitle1">Department of<br><span class="deptName d1">{myinfo.dept}</span></div> -->
    <div style="background: {myinfo.color};" class="assignment_name">
      Assignment on {myinfo.assignment_on}
    </div>
    <div class="act">
      Course Code: <span class="acode">{myinfo.course_code}</span><br />Course
      Title: <span class="atitle">{myinfo.course_title}</span>
    </div>

    <div class="box_wrap">
      <div class="box box_left">
        <div class="box_title">Submitted By</div>
        <div class="box_info">
          <div class="box_info_item"><b>Name:</b> {myinfo.name}</div>
          <div class="box_info_item"><b>ID:</b> {myinfo.id}</div>
          <div class="box_info_item"><b>Semester:</b> {myinfo.semester}</div>
          <div class="box_info_item"><b>Year:</b> {myinfo.year}</div>
          <div class="box_info_item"><b>Session:</b> {myinfo.session}</div>
          <div class="box_info_item">
            Department of <b>{myinfo.dept}</b>, BRUR
          </div>
        </div>
      </div>

      <div class="box box_right">
        <div class="box_title">Submitted To</div>
        <div class="box_info">
          <div class="box_info_item"><b>Name:</b> {myinfo.teacher_name}</div>
          <div class="box_info_item">
            <b>Designation:</b>
            {myinfo.teacher_rank}
          </div>
          <div class="box_info_item">
            Department of <b>{myinfo.teacher_dept}</b>, BRUR
          </div>
        </div>
      </div>
    </div>

    <div class="subdate">Submission Date: {myinfo.submission_date}</div>
  </div>
</div>

<!-- <a class="link" bind:this={link} id="download">Download</a>
  <div class="image_prev" bind:this={image_prev}></div> -->

<style>
  .box_wrap {
    position: relative;
    margin-top: 50px;
  }

  .box {
    padding: 10px;
    border: 2px solid #6494ed;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    text-align: left;
  }

  .box_info_item {
    font-size: 18px;
  }

  .box_title {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
  }

  .box_left,
  .box_right {
    position: absolute;
  }

  .box_left {
    top: 30px;
  }

  .box_right {
    top: 350px;
    right: 0;
  }

  .subdate {
    margin-top: 700px;
    font-weight: bold;
    font-size: 17px;
    background: #6494ed;
    padding: 10px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .assignment {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: Hind Siliguri;
    background: #fff;
    margin-top: 10px;
    border-radius: 10px;
    max-width: 50em;
    padding: 1em 1em 1em 1em;
    margin: 0em auto;
    /* zoom: 50%; */
    position: relative;
  }

  .logoandtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    position: relative;
    gap: 10px;
  }

  .moto {
    font-size: 17px;
    position: absolute;
    right: 1%;
    font-style: italic;
  }

  .auni::before {
    content: "";
    position: absolute;
    height: 2px;
    width: 66.5%;
    background: #222;
    bottom: -65%;
  }

  .abody {
    text-align: center;
    width: 90%;
  }

  .alogo {
    margin-top: 50px;
  }
  .alogo img {
    height: 100px;
  }

  .auni {
    font-size: 30px;
    font-weight: bold;
    line-height: 1em;
    position: relative;
  }

  .assignment_name {
    background: #6494ed;
    padding: 10px;
    font-size: 18px;
    /* border-radius: 5px; */
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.867);
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .act {
    font-size: 19px;
    margin-top: 30px;
    font-weight: bold;
  }

  /* .d1{
       font-size: 29px;
   } */

  .abody {
    display: block;
  }
</style>
