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
    <div class="alogo"><img alt="" src={brur} /></div>
    <div class="auni">Begum Rokeya University, Rangpur</div>
    <div class="atitle1">
      Department of<br /><span class="deptName d1">{myinfo.dept}</span>
    </div>
    <div style="background: {myinfo.color};" class="assignment_name">
      {myinfo.assignment_on}
    </div>
    <div class="act">
      Course Code: <span class="acode">{myinfo.course_code}</span><br />Course
      Title: <span class="atitle">{myinfo.course_title}</span>
    </div>
    <div class="table">
      <table border="0">
        <tr>
          <td class="atd1">
            <div class="box-title sfrom">Submitted From</div>
            <div class="a">
              <div class="at">Name:</div>
              <div class="aname aa">{myinfo.name}</div>
            </div>
            <div class="a">
              <div class="at">ID:</div>
              <div class="id aa">{myinfo.id}</div>
            </div>
            <div class="a">
              <div class="at">Year:</div>
              <div class="ayear aa">{myinfo.year}</div>
            </div>
            <div class="a">
              <div class="at">Semester:</div>
              <div class="asemester aa">{myinfo.semester}</div>
            </div>
            <div class="a">
              <div class="at">Session:</div>
              <div class="Session aa">{myinfo.session}</div>
            </div>
            <div class="dof">
              Department of <span class="deptName">{myinfo.dept}</span>,<br
              />Begum Rokeya University, Rangpur
            </div>
          </td>
          <td class="atd1">
            <div class="t_td">
              <div class="box-title sto">Submitted To</div>
              <div class="tname">{myinfo.teacher_name}</div>
              <div class="rank">{myinfo.teacher_rank}</div>
              <div class="dof">
                Department of <span class="tdept">{myinfo.teacher_dept}</span
                >,<br />Begum Rokeya University, Rangpur
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="subdate">Submission Date: {myinfo.submission_date}</div>
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

  /* @media only screen and (max-width: 540px) {
    .assignment {
        zoom: 50%;
     }
    } */

  .t_td {
    position: absolute;
    top: 3%;
  }

  .abody {
    text-align: center;
    width: 90%;
  }

  .alogo {
    margin-top: 50px;
  }
  .alogo img {
    height: 180px;
  }

  .auni {
    font-size: 35px;
    font-weight: bold;
  }

  .atitle1 {
    font-size: 27px;
  }

  .deptName {
    font-weight: bold;
  }

  .assignment_name {
    background: #6494ed;
    padding: 10px;
    font-size: 25px;
    border-radius: 5px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.867);
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .act {
    font-size: 26px;
    margin-top: 30px;
    font-weight: bold;
  }

  .a {
    display: flex;
    font-size: 24px;
  }
  .at {
    font-weight: bold;
  }
  .aa {
    margin-left: 10px;
  }

  .dof {
    font-size: 22px;
  }

  .abody table {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    margin-top: 30px;
    border-radius: 10px;
  }
  .abody td {
    border: 1px solid #d8d4d4;
    padding: 10px;
    border-radius: 10px;
  }

  .box-title {
    font-size: 26px;
    font-weight: bold;
    border-bottom: 2px solid;
    width: 200px;
    margin-bottom: 10px;
  }

  .table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  td {
    text-align: left;
  }

  .atd1 {
    width: 53%;
    border-right: 2px solid black;
    position: relative;
  }

  .tname {
    font-size: 25px;
    font-weight: bold;
  }

  .rank {
    font-size: 23px;
  }

  .tdept {
    font-weight: bold;
  }

  .subdate {
    margin-top: 15px;
    font-weight: bold;
    font-size: 23px;
  }

  .d1 {
    font-size: 29px;
  }

  .abody {
    display: block;
  }
</style>
