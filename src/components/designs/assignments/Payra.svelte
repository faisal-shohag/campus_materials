<script>
    import { onMount } from 'svelte';
  
      import brur from '../../../images/brur.jpeg'
      import toast, {Toaster}  from "svelte-french-toast"
      export let myinfo = {
      //your info
      name: '',
      id: '',
      year: '',
      semester: '',
      session: '',
      dept: '',
  
      //course info
      assignment_on: '',
      course_code: '',
      course_title: '',
  
      //teacher_info
      teacher_name: '',
      teacher_dept: '',
      teacher_rank: '',
  
      //other
      submission_date: '',
      color: '#B12BAA'
    }
    let screenSize;
 $: {
    if(screenSize>700){
        assignment.style.maxWidth="55em"
        assignment.style.padding="0 0 0 0"
        assignment.style.margin="0 0"
    }
  }
  </script>
  
  <script context="module">
    let assignment;
    let screenSize;

  
  
    export let generate_payra = async(info) =>{

    
    let check = Object.values(info).some(item=>item==='')
    if(check){
      toast.error("Please fill all the fields!", {
        style: 'background: #333; color: #eee'
      })
    }else {  
           if(screenSize<=600) {
            assignment.style="zoom: 0%";
            }
            console.log('Loading...');
            try{
                 await html2pdf(assignment, {
                filename: `${info.id}_${info.course_title}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2},
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
            });
            if(screenSize<=600) {
             assignment.style="zoom: 50%";
            }
            } catch(err) {
                toast.error(`Something went wrong...!`)
                console.log(err);
            }
           
        
    }
    // let getCanvas;
    // html2canvas(assignment, {
    //     onrendered: (canvas)=>{
    //         image_prev.append(canvas);
    //         getCanvas = canvas;
    //         console.log(getCanvas);
    //         canvas.style.width = "100%";
    //         link.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    //         console.log(link.href);
    //     }
    // })
  
    // let imageData = getCanvas.toDataURL("image/png")
    // let newData = imageData.replace(/^data:image/," data: application/octet-stream");
    // link.attr("download", "Assignment.png").attr("href", newData);
  }
   
  </script>
  <svelte:window bind:innerWidth={screenSize}/>
  <Toaster/>
  <div bind:this={assignment} class="assignment">
      <div class="abody">
        <div class="logoandtitle">
      <div class="alogo"><img alt="" src={brur}/></div>
      <div class="auni">Begum Rokeya University, Rangpur</div>
    </div>
      <!-- <div class="atitle1">Department of<br><span class="deptName d1">{myinfo.dept}</span></div> -->
        <div style="background: {myinfo.color};" class="assignment_name">Assignment on {myinfo.assignment_on}</div>
        <div class="act">Course Code: <span class="acode">{myinfo.course_code}</span><br>Course Title: <span class="atitle">{myinfo.course_title}</span></div>
        
        <div class="box_wrap">
        <div class="box box_left">
            <div class="box_title">Submitted By</div>
            <div class="box_info">
                <div class="box_info_item"><b>Name:</b> {myinfo.name}</div>
                <div class="box_info_item"><b>ID:</b> {myinfo.id}</div>
                <div class="box_info_item"><b>Semester:</b> {myinfo.semester}</div>
                <div class="box_info_item"><b>Year:</b> {myinfo.year}</div>
                <div class="box_info_item"><b>Session:</b> {myinfo.session}</div>
                <div class="box_info_item">Department of <b>{myinfo.dept}</b>, BRUR</div>
            </div>
        </div>

        <div class="box box_right">
            <div class="box_title">Submitted To</div>
            <div class="box_info">
                <div class="box_info_item"><b>Name:</b> {myinfo.teacher_name}</div>
                <div class="box_info_item"><b>Designation:</b> {myinfo.teacher_rank}</div>
                <div class="box_info_item">Department of <b>{myinfo.teacher_dept}</b>, BRUR</div>
            </div>
        </div>
    </div>
        
        <div class="subdate">Submission Date: {myinfo.submission_date}</div>
        
      </div>
  </div>
  
  <!-- <a class="link" bind:this={link} id="download">Download</a>
  <div class="image_prev" bind:this={image_prev}></div> -->
  
  <style>

    .box_wrap{
        position: relative;
        margin-top: 50px;
    }

      .box{
        padding: 10px;
        border: 2px solid #6494ed;
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        text-align: left;
      }

      .box_info_item{
        font-size: 18px;
      }

      .box_title{
        text-align: center;
        font-weight: bold;
        font-size: 22px;
      }

      .box_left, .box_right{
        position: absolute;
      }

      .box_left{
        top: 30px;
      }

      .box_right{
        top: 250px;
        right: 0;
      }

      .subdate{
       margin-top: 400px;
       font-weight: bold;
       font-size: 17px;
       background: #6494ed;
       padding: 10px;
       border-bottom-left-radius: 30px;
       border-top-right-radius: 30px;
       box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   }

      
      .assignment{
      display: flex;
      justify-content: center;
      width: 100%;
      font-family: Hind Siliguri;
      background: #fff;
      margin-top: 10px;
      border-radius: 10px;
      size: 7in 9.25in;
      /* margin: 27mm 16mm 27mm 16mm; */
       
      }

      .logoandtitle{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        position: relative;
        gap: 10px;
        /* height: 80px; */
        margin-top: 20px;
      }

      /* .moto{
        font-size: 17px;
        position: absolute;
        right: 1%;
        font-style: italic;
      } */

      /* .auni::before{
        content: '';
        position: absolute;
        height: 2px;
        width: 66.5%;
        background: #222;
        bottom: -65%;
      } */
  
      @media only screen and (max-width: 540px) {
      .assignment {
          zoom: 50%;
       }
      }
  

  
  .abody{
      text-align: center;
      width: 90%;
      border: 2px solid #6494ed;
      padding: 10px;
  }
  
  
    .alogo img{
        height: 80px;
    }

    .auni{
     font-size: 25px;
     font-weight: bold;
     line-height: 1em;
     position: relative;
    }
  

  
    .assignment_name{
        background: #6494ed;
        padding: 10px;
        font-size: 18px;
        /* border-radius: 5px; */
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.867);
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 30px;
        border-top-right-radius: 30px;
    }
  
    .act{
     font-size: 19px;
     margin-top: 30px;
     font-weight: bold;
    }
  
   
  
   /* .d1{
       font-size: 29px;
   } */
  
   .abody{
     display: block;
   }
  
  
  </style>