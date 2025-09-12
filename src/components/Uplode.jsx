// import React from 'react'
import { useState } from 'react'
import WalkingAnime from '../mineComponents/WalkingAnime'
import supabase from '../supabase'
const Uplode = () => {
  const [file,setFile] =useState(null);
  const [subject,setSubject] =useState('');
  const [group,setGroup] =useState('');
  const [sem,setSem] =useState('1st sem');
  const [loading,setLoading] = useState(false)
  const [errormsg,setErrormsg] = useState('')
  const [fileerr,setFileErr] = useState('')
  const [subjectErr,setSubjectErr] = useState('')
  const [groupErr,setGroupErr] = useState('')


  const handalUplode = async () =>{

    setLoading(true)
    console.log(file,subject,group,sem);
    if(!file){
      setFileErr('select a file')
    }else if(subject === ''){
      setSubjectErr('enter subject name')
      setFileErr('')
    }else if(group === ''){
      setSubjectErr('')
      setGroupErr('enter group')
    }else{
      setSubjectErr('');
      setGroupErr('')

      try{
          const cleanName = file.name.replace(/\s+/g, '_'); // replaces spaces with underscores
          const fileName = `${cleanName}-${Date.now()}`; 
          console.log(fileName);
          
          
          const {error:storageError} = await supabase.storage.from('files').upload(fileName,file);
          if(storageError){
            console.log(storageError);
          }

          const {data:fileurlData,error:fileError} = await supabase.storage.from('files').getPublicUrl(fileName)
          if(fileError){
            console.log(fileError);
            
          }
          console.log('fileurldata',fileurlData);
          
          const fileurl = fileurlData.publicUrl;

          
        const {data,error} = await supabase.from('pdfinfo').insert([{subject,group,sem,fileurl, filename: fileName}])

        if(error){
          console.log(error.message);
          setErrormsg(error.message)
        }
        console.log(data);


      }catch(err){
        console.log(err);
        
      }
      
      
      
      setFile(null)
      setSubject('')
      setGroup('')
      setSem('')
      setErrormsg('')
      }

  setLoading(false)

  }

  return (
    <div className='uplodeFormDiv'>
      <h1>Uplode Files</h1>
      <hr />
      <div className='uplodeForm'>
        <div className='walkingAnimeInUplode'>
          <WalkingAnime />
        </div>
        <input type="file" name="file" id="fileinp" required onChange={(e)=>setFile(e.target.files[0])}/>
          {fileerr?<span>{fileerr}</span>:null}
        <input type="text" placeholder='subject' name='file-name' id='subjectName' required onChange={(e)=>setSubject(e.target.value)} value={subject} />
        {subjectErr?<span>{subjectErr}</span>:null}
        <input type="text" placeholder='Group' name='Group' id='Group' required onChange={(e)=>setGroup(e.target.value.toUpperCase())} value={group} />
        {groupErr?<span>{groupErr}</span>:null}
        <div>
          <label htmlFor="semester">Semester : </label>
        <select id='semester' value={sem} required onChange={(e)=>setSem(e.target.value)}>
          {/* <option defaultChecked >--select--</option> */}
          <option value="1st sem">1st sem</option>
          <option value="2nd sem">2nd sem</option>
          <option value="3rd sem">3rd sem</option>
          <option value="4th sem">4th sem</option>
          <option value="5th sem">5th sem</option>
          <option value="6th sem">6th sem</option>
        </select>
        </div>
        <button onClick={handalUplode}>{loading?'uploading...':'uplode'}</button>
        {errormsg?<span>{errormsg}</span>:null}
      </div>
    </div>
  )
}

export default Uplode
