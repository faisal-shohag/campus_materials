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
            <div class="title">Begum Rokeya University</div>
        </div>
        <div class="assignment_content">
        
            <div class="assignment_on">
                {textMe(myinfo.assignment_on, "[YOUR ASSIGNMENT TOPIC GOES HERE...]")}
            </div>

            <div class="course">
                <div>Course: <span>{textMe(myinfo.course_title, "[COURSE TITLE]")}</span></div>
                <div>Course Code: <span>{textMe(myinfo.course_code, "[COURSE CODE]")}</span></div>
            </div>

            <div class="submitted_by">
                <div>{textMe(myinfo.name, "[YOUR NAME]")}</div>
                <div>ID: <span>{textMe(myinfo.id, "[YOUR ID]")}</span></div>
                <div><span>{textMe(myinfo.year, "[YEAR]")}</span> Year <span>{textMe(myinfo.semester, "[SM]")}</span> Semester</div>
                <div>Session: <span>{textMe(myinfo.session, "[SESSION]")}</span></div>
                <div class="inst">Dept. of <span>{textMe(myinfo.dept, "[YOUR DEPT.]")}</span>, BRUR</div>
            </div>

            <div class="submitted_to">
                <div>{textMe(myinfo.teacher_name, "[TEACHER'S NAME]")}</div>
                <div><span>{textMe(myinfo.teacher_rank, "[DESIGNATION]")}</span></div>
                <div class="inst">Dept. of <span>{textMe(myinfo.teacher_dept, "[TEACHER'S DEPT.]")}</span>, BRUR</div>
            </div>

       
    </div>
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
      /* border-radius: 10px; */
      max-width: 50em;
      padding: 1em 1em 1em 1em;
      margin: 0em auto;
      position: relative;
      background: url(../../../images/template_bg/R23_bg.png);
      background-size: cover;
      /* height: 100%; */
      height: 1122px;
    }
    /* .abody {
      gap: 50px;
    } */

    .head{
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
        /* margin-top: 60px; */
        position: absolute;
        left: 5%;
        top: 3%;
    }

    .head .title{
        font-size: 40.3px;
        font-weight: bold;
        width: 380px;
        /* line-height: 2rem; */
        color: #D9D9D9;
        
    }

    .head img{
        height: 100px;
    }

    .assignment_content{
        /* position: relative; */
        /* width: 100%; */
        height: 100%;
    }

    .assignment_content span{
        color: #BC1823;
    }

    .assignment_on{
        position: absolute;
        width: 60%;
        text-align: center;
        top: 38%;
        left: 38%;
        font-size: 18px;
        color: #fff;
        font-family: Now;
        font-weight: bold;
    }

    .course{
        position: absolute;
        font-size: 17px;
        top: 47%;
        left: 50%;
        text-align: center;
        line-height: 2rem;
    }

    .submitted_by{
        position: absolute;
        font-size: 18px;
        top: 73%;
        left: 36%;
        line-height: 2rem;
        font-weight: bold;
    }

    .submitted_to{
        position: absolute;
        font-size: 18px;
        top: 73%;
        left: 72%;
        line-height: 2rem;
        font-weight: bold;
    }

    .inst{
        width: 200px;
        font-size: 16px;
        font-weight: normal;
    }
    

   
  </style>
  