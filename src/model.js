
export const  generatePDF = async(assignment, screenSize, info) =>{
    if (screenSize <= 600) {
        assignment.classList.remove("zoom50");
        assignment.classList.add("zoom0");
      }
        console.log("Loading...");
        try {
          await html2pdf(assignment, {
            filename: `${info.id}_${info.course_title}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
          });
          if (screenSize <= 600) {
            assignment.classList.remove("zoom0");
            assignment.classList.add("zoom50");
          }
        } catch (err) {
        //   toast.error(`Something went wrong...!`);
          console.log(err);
        }
}

export const textMe = (text, msg) => {
    return text == "" ? msg : text;
}
