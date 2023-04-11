<script>
    import brur from "../../../images/brur.jpeg";
    import toast, { Toaster } from "svelte-french-toast";
    import {generatePDF, textMe} from "../../../model"
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
        <div class="head">
            <div class="logo"><img src={brur} alt=""/></div>
            <div class="title">BEGUM ROKEYA UNIVERSITY, RANGPUR(BRUR)</div>
        </div>

        <div style="margin-top: 80px;" class="info">
            <div class="title font-now-bold">Project Report on</div>
            <div class="topic">{textMe(myinfo.assignment_on, "[YOUR REPORT TOPIC GOES HERE...]")}</div>
            <div class="course"><b>Course Title: </b>{textMe(myinfo.course_title, "[COURSE TITLE]")}</div>
            <div class="course"><b>Course Code: </b>{textMe(myinfo.course_code, "[COURSE CODE]")}</div>
        </div>

        <div class="info">
            <div class="title font-now-bold">Submitted To</div>
            <div class="teacher">{textMe(myinfo.teacher_name, "[COURSE TEACHER]")}</div>
            <div class="teacher"><b>{textMe(myinfo.teacher_rank, "[DESIGNATION]")}</b></div>
            <div class="teacher">Dept. of <b>{textMe(myinfo.teacher_dept, "[TEACHER'S DEPT.]")}, </b>BRUR</div>
        </div>

        <div class="info">
            <div class="title font-now-bold">Submitted By</div>
            <div class="name">{textMe(myinfo.name, "[YOUR NAME]")}</div>
            <div class="id"><b>ID: {textMe(myinfo.id, "[YOUR ID]")}</b></div>
            <div class="id"><b>{textMe(myinfo.year, "[YOUR YEAR]")}</b> Year, <b>{textMe(myinfo.semester, "[YOUR SEMISTER]")}</b> Semester</div>
            <div class="other"><b>Session: </b>{textMe(myinfo.session, "[YOUR SESSION]")}</div>
            <div class="other">Dept. of <b>{textMe(myinfo.dept, "[YOUR DEPT.]")}, </b>BRUR</div>
        </div>

        <div class="subdate">Submission: {textMe(myinfo.submission_date, "[SUBMISSION DATE]")}</div>
    </div>
  </div>
  
  <!-- <a class="link" bind:this={link} id="download">Download</a>
  <div class="image_prev" bind:this={image_prev}></div> -->
  
  <style>
    .assignment {
      display: flex;
      justify-content: center;
      width: 100%;
      font-family: Now;
      background: #fff;
      margin-top: 10px;
      border-radius: 10px;
      max-width: 50em;
      padding: 1em 1em 1em 1em;
      margin: 0em auto;
      position: relative;
    }
    /* .abody {
      gap: 50px;
    } */

    .head{
        display: flex;
        flex-direction: row;
        gap: 30px;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
    }

    .head .title{
        font-size: 25px;
        font-weight: bold;
        width: 380px;
        line-height: 2rem;
        
    }

    .head img{
        height: 100px;
    }

    .info{
        text-align: center;
        margin-top: 90px;
        font-size: 23px;
        line-height: 2rem;
    }

    .info .title{
        font-size: 24px;
        margin-bottom: 10px;
    }

    .course{
        font-size: 17px;
    }
    .subdate {
      margin-top: 15px;
      /* font-weight: bold; */
      font-size: 18px;
      text-align: center;
      margin-top: 80px;
    }
  </style>
  