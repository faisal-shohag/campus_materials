<script>
  import {database, appStore} from '../../../store';
  import Modern, { generate } from "../../../components/designs/assignments/Modern.svelte";
  import Classic, { generate_classic } from "../../../components/designs/assignments/Classic.svelte";
  import Payra, { generate_payra } from '../../../components/designs/assignments/Payra.svelte';
  import { page } from '$app/stores'
  import {db} from '../../../fb'
  import { ref, set, onValue, update} from 'firebase/database';
  
  const params = $page.params.assignmentId
  let assignmentId = params.split('_')[0];
  let assignment_title = params.split('_')[1]
  appStore.set({ title: `Assignment: ${assignment_title}`});
  let modelsData;
   
  $:{
    database.subscribe(value=>{
        modelsData = value.assignments;
    });
   }

 const models = {
  "1": {
      func: generate,
      model: Modern,

  },
  "2": {
     func: generate_classic,
     model: Classic
  },
  "3": {
    func: generate_payra,
    model: Payra
  }
 }
  

  let info = {
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
    color: '#652BB1'
  }

   
  let container;

  let width;
  let flex = 'no_flex';
  $: {
     if(width>700){
      flex = 'do_flex';
      container.style.margin = "0 0";
      // container.style.padding = "1em 1em 0 0";
      container.style.minWidth="30em"
     }else{
      flex: 'no_flex';
     }
  }


  const downloadCount = async (index)=>{
        try{
            await update(ref(db, 'cover_pages/assignment/'+index), {
                download: modelsData[index].download + 1
            })
        } catch(err){
            console.log(err);
        }
   }


  
</script>

<svelte:window bind:innerWidth={width}/>

<div class={flex}>
<div class="container" bind:this={container}>
  <form>
      <h4>Your Information</h4>
      <div class="input-group">
        <input type="text" placeholder="Name" bind:value={info.name}/>
      </div>

      <div class="input-group">
        <input type="number" placeholder="ID" bind:value={info.id}/>
      </div>

      <div class="input-group">
        <input type="text" placeholder="Department" bind:value={info.dept}/>
      </div>

      <div class="input-group">
        <input type="text" placeholder="Session" bind:value={info.session}/>
      </div>
     
      <div class="col-half">
        <div class="sub">Year: </div>
      <div class="input-group">
        <input id="year_1" type="radio" name="year" value="1st" bind:group={info.year}/>
        <label for="year_1">1<sup>st</sup></label>

        <input id="year_2" type="radio" name="year" value="2nd" bind:group={info.year}/>
        <label for="year_2">2<sup>nd</sup></label>

        <input id="year_3" type="radio" name="year" value="3rd" bind:group={info.year}/>
        <label for="year_3">3<sup>rd</sup></label>

        <input id="year_4" type="radio" name="year" value="4th" bind:group={info.year}/>
        <label for="year_4">4<sup>th</sup></label>

      </div>
    </div>
   
    <div class="col-half">
      <div class="sub">Semster: </div>
    <div class="input-group">
      <input id="sem_1" type="radio" name="sem" value="1st" bind:group={info.semester}/>
      <label for="sem_1">1<sup>st</sup></label>

      <input id="sem_2" type="radio" name="sem" value="2nd" bind:group={info.semester}/>
      <label for="sem_2">2<sup>nd</sup></label>
    </div>
  </div>

  <h4>Course Information</h4>

  <textarea placeholder="Assignment on..." bind:value={info.assignment_on}></textarea>
  <div class="input-group">
    <input type="text" placeholder="Course Code" bind:value={info.course_code}/>
  </div>
  <div class="input-group">
    <input type="text" placeholder="Course Title" bind:value={info.course_title}/>
  </div>

  <h4>Teacher Information</h4>
  <div class="input-group">
    <input type="text" placeholder="Teacher's name" bind:value={info.teacher_name}/>
  </div>
  <div class="input-group">
    <input type="text" placeholder="Teacher's Department" bind:value={info.teacher_dept}/>
  </div>
  <div class="col-half">
    <div class="input-group">
      <select bind:value={info.teacher_rank}>
        <option value="" disabled selected>Select Teacher's Rank</option>
       <option value="Professor">Professor</option>
       <option value="Associate Professor">Associate Professor</option>
       <option value="Assistant Professor">Assistant Professor</option>
       <option value="Lecturer">Lecturer</option>
       <option value="Instructor">Instructor</option>
       <option value="Head of Department">Head of Department</option>
      </select>
    </div>
  </div>
  
 
  <h4>Other</h4>
  <div class="col-half">
    <div class="sub">Submission Date: </div>
  <div class="input-group">
    <input id="date" type="date" name="date" placeholder="Date..." min="2023-03-01" max="2080-12-31" bind:value={info.submission_date} required/>
    <label for="date">mm/dd/yyyy</label>
   </div>
  </div>
  <div class="col-half .color">
  <div class="sub">Color: </div>
    <div class="input-group color">
    <input type="color" id="colorpicker" name="color" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" bind:value={info.color}   required> 
    </div>
  </div>
 
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <center><div on:click={()=>{generate_classic(info); downloadCount(parseInt(assignmentId)-1)}} class="btn"><a href="#!">Generate</a></div></center>
  </form>
</div>


<!-- <Classic myinfo={{...info}}/> -->

 <svelte:component this={models[assignmentId].model} myinfo={{...info}} />
</div>

<style>

  .do_flex{
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .color{
   display: flex;
   font-weight: bold;
   font-size: 15px;
 }
 .color input{
  display: block;
  width: 100px;
  /* float: left; */
  height: 50px;
  margin-left: 10px;
}

  h4{
  color: #C71A37;
}

.sub{
  color: #6E6B6B;
}

.container {
  max-width: 38em;
  padding: 1em 1em 1em 1em;
  margin: 0em auto;
  /* background-color: #fff; */
  /* border-radius: 4.2px; */
  /* box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2); */
  background: rgba(247, 247, 247, 0.24);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.4px);
    -webkit-backdrop-filter: blur(6.4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 20px;
}

.col-half {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* .col-third {
  padding-right: 10px;
  float: left;
  width: 33.33333333%;
}
.col-third:last-of-type {
  padding-right: 0;
} */
@media only screen and (max-width: 540px) {
  .col-half {
    width: 100%;
    padding-right: 0;
  }
}

input,
/* input[type="checkbox"] + label:before, */
select option,
select, textarea, input[type="date"] {
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}

input[type="radio"] + label{
  padding: 10px;
  border: 1px solid #e5e5e5;
}

input[type="date"]{
  /* padding: 10px; */
  border: 1px solid #e5e5e5;
  width: 200px;
  /* position: absolute; */
}

input[type="date"] + label{
  display: none;
  }

@media only screen and (max-width: 540px) {
  input[type="date"] + label{
  display: block;
  position: absolute;
  top: 35%;
  color: #C2C0C0;
  font-size: 15px;
  }
}


input:focus, textarea:focus {
  outline: 0;
  border-color: #C71A37;
}

input[type="radio"] {
  display: none;
}
input[type="radio"] + label,
select {
  display: inline-block;
  /* width: 50%; */
  text-align: center;
  /* float: left; */
  border-radius: 0;
  min-width: 70px;
}
input[type="radio"] + label:first-of-type {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 0px;
}
input[type="radio"] + label:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 10px;
}

input[type="radio"]:checked + label,
input:checked + label:before,
select:focus,
select:active {
  background-color: #C71A37;
  color: #fff;
  border-color: #C71A37;
}
/* input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  position: relative;
  display: block;
  padding-left: 1.6em;
}
input[type="checkbox"] + label:before {
  position: absolute;
  top: 0.2em;
  left: 0;
  display: block;
  width: 1em;
  height: 1em;
  padding: 0;
  content: "";
}
input[type="checkbox"] + label:after {
  position: absolute;
  top: 0.45em;
  left: 0.2em;
  font-size: 0.8em;
  color: #fff;
  opacity: 0;
  font-family: FontAwesome;
  content: "\f00c";
} */
input:checked + label:after {
  opacity: 1;
}
/* select {
  height: 3.4em; 
   line-height: 2;

} */

select:first-of-type {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
select:last-of-type {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
select:focus,
select:active {
  outline: 0;
  /* padding: 10px; */
}
select option  {
  background-color: #C71A37;
  color: #F1EBEB;
}
.input-group {
  /* margin-top: 0.5em; */
  margin-bottom: 0.5em;
  zoom: 1;
  display: flex;
  justify-content: center;
  position: relative;
  /* padding: 10px; */
}


/* .input-group-icon {
  position: relative;
}
.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
} */


.container .btn {
	position: relative;
	top: 0;
	left: 0;
	width: 250px;
	height: 50px;
	margin-top: 2rem;
	margin-bottom: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container .btn a {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.05);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
	/* box-shadow: 0 15px 15px rgba(0, 0, 0, 0.3); */
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 30px;
	padding: 10px;
	letter-spacing: 1px;
	text-decoration: none;
	overflow: hidden;
	color: #be1212;
	font-weight: 400px;
	z-index: 1;
	transition: 0.5s;
	backdrop-filter: blur(15px);
}
.container .btn:hover a {
	letter-spacing: 3px;
  color: #fff;
}
.container .btn a::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	background: linear-gradient(to left, rgba(160, 149, 152, 0.205), transparent);
	transform: skewX(45deg) translate(0);
	transition: 0.5s;
	filter: blur(0px);
}
.container .btn:hover a::before {
	transform: skewX(45deg) translate(200px);
}
.container .btn::before {
	content: "";
	position: absolute;
	left: 50%;
	transform: translatex(-50%);
	bottom: -5px;
	width: 30px;
	height: 10px;
	background: #f00;
	border-radius: 10px;
	transition: 0.5s;
	transition-delay: 0.5;
}
.container .btn:hover::before /*lightup button*/ {
	bottom: 0;
	height: 50%;
	width: 80%;
	border-radius: 30px;
}

.container .btn::after {
	content: "";
	position: absolute;
	left: 50%;
	transform: translatex(-50%);
	top: -5px;
	width: 30px;
	height: 10px;
	background: #f00;
	border-radius: 10px;
	transition: 0.5s;
	transition-delay: 0.5;
}
.container .btn:hover::after /*lightup button*/ {
	top: 0;
	height: 50%;
	width: 80%;
	border-radius: 30px;
}
.container .btn:nth-child(1)::before, /*chnage 1*/
.container .btn:nth-child(1)::after {
	background: #ff1f71;
	box-shadow: 0 0 5px #ff1f71, 0 0 15px #ff1f71, 0 0 30px #ff1f71,
		0 0 60px #ff1f71;
}
.container .btn:nth-child(2)::before, /* 2*/
.container .btn:nth-child(2)::after {
	background: #2db2ff;
	box-shadow: 0 0 5px #2db2ff, 0 0 15px #2db2ff, 0 0 30px #2db2ff,
		0 0 60px #2db2ff;
}
.container .btn:nth-child(3)::before, /* 3*/
.container .btn:nth-child(3)::after {
	background: #1eff45;
	box-shadow: 0 0 5px #1eff45, 0 0 15px #1eff45, 0 0 30px #1eff45,
		0 0 60px #1eff45;
}


</style>
