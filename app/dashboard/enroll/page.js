 "use client"
import { db } from "@/config/firebase.config";
import { Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    phone: yup.string().matches(/^[0-9]{11}$/, "Phone number must be 11 digits").required("Phone number is required"),
    examType: yup.string().oneOf(["Jamb", "Waec", "Neco"]).required("Exam type is required"),
    examDate: yup.date().required("Exam date is required"),
    subject: yup.array().min(1, "Atleast one subject must be selected").required(),
 })
 const mySubject = ["English","Mathematics","Biology","Chemistry", "Physics", "Further Mathematics", "Literature", "Government", "Economics", "Accounting", "Commerce", "Agric Science", "Geography", "History"];
 
export default function Enroll () {
    const [loading, setLoading] = useState(false);
    const{data : session} = useSession();
    console.log(session);
     const {handleChange, handleSubmit,touched,errors,values,setFieldValue } = useFormik({
        initialValues: {
            fullName: "",
            phone: "",
            examType: "",
            examDate: "",
            subject: [],
        },
    onSubmit:async(values,{resetForm})=>{
        try {
            setLoading(true)
            await addDoc(collection(db,"enrollments"),{
                user: session?.user?.id,
                fullName: values.fullName,
                phoneNunber: values.phone,
                examType: values.examType,
                examDate: values.examDate,
                selectedSubject: values.subject,
                timecreated: new Date(),
            })
            alert("student enrolled successfully")
            resetForm();
            setLoading(false)
        }
        catch(error){
            console.error("Error submitting form", error);
            alert("Failed to enroll student, please try agian.");
            setLoading(false);
        }
    }, 
        validationSchema: schema,

     });
     const handleSubjectChange = (selectedSubject) => {
        if(values.subject.includes(selectedSubject)) {
            setFieldValue("subject",values.subject.filter((s)=> s !== selectedSubject))
        }else {
            setFieldValue("subject", [...values.subject, selectedSubject])
        }
     }

    return (
        <main className="min-h-screen flex justify-center py-6 px-4">
            <Card sx={{width: 380}}>
                 <CardHeader sx={{textAlign: "center"}} title="Enroll Student" subheader="Registeration form"/>
                 <CardContent>
                       <form onSubmit={handleSubmit} className="py-2 flex flex-col gap-3 px-2">
                          <div>
                              <TextField 
                               fullWidth
                               type="text"
                               label="FullName"
                               id="fullName"
                               value={values.fullName}
                               onChange={handleChange}
                               placeholder="Enter Full Name"
                               size="small"
                              />
                              {touched.fullName && errors.fullName ? <span className="text-red-500 text-xs">{errors.fullName}</span> : null}
                          </div>
                          <div>
                             <TextField
                              fullWidth
                              type="tel"
                              label="Phone Number"
                              id="phone"
                              value={values.phone}
                              onChange={handleChange}
                              placeholder="08077....."
                              size="small"
                             />
                             {touched.phone && errors.phone ? <span className="text-red-500 text-xs">{errors.phone}</span> : null}
                          </div>
                          <FormControl>
                             <InputLabel id="examType-label">Exam Type</InputLabel>
                             <Select
                              labelId="examType-label"
                              name="examType"
                              value={values.examType}
                              onChange={handleChange}
                              size="small"
                              label="Exam Type"
                              id="examType"
                             >
                                 <MenuItem value="Jamb">Jamb</MenuItem>
                                 <MenuItem value="Waec" >Waec</MenuItem>
                                 <MenuItem value="Neco">Neco</MenuItem>
                             </Select>
                             {touched.examType && errors.examType ? <span className="text-red-500 text-xs">{errors.examType}</span> : null}
                          </FormControl>
                          <div>
                            <TextField
                             fullWidth
                             type="date"
                             label="Exam Date"
                             id="examDate"
                             value={values.examDate}
                             onChange={handleChange}
                             placeholder="Enter exam date"
                             size="small"
                             InputLabelProps={{shrink: true}}
                            />
                            {touched.examDate && errors.examDate ? <span className="text-red-500 text-xs">{errors.examDate}</span> : null}
                          </div>
                          <p className="mt-2 text-gray-600 text-center">Select Subjects</p>
                          <FormGroup sx={{
                             display: "grid",
                             gridTemplateColumns: "1fr 1fr"
                          }}> 
                            {mySubject.map(subj =>
                             <FormControlLabel
                              key={subj}
                              control={
                               <Checkbox 
                               checked={values.subject.includes(subj)} 
                               onChange={()=>handleSubjectChange(subj)}/>} 
                              label={subj} 
                              />
                              
                             )}
                             {touched.subject && errors.subject ? <span className="text-red-500 text-xs">{errors.subject}</span> : null}
                          </FormGroup>
                          <button type="submit" className="w-full h-9 cursor-pointer rounded bg-blue-500 font-semibold text-white">
                           {loading ? "Enrolling..." : "Enroll"}
                            </button>
                       </form>
                 </CardContent>
            </Card>
        </main>
    )
}