// import './App.css';
import { useState, useEffect } from 'react';

function AskForContent(props) {

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const emptyAlertData = () => {
        setAlertMessage(() => "")
        setShowAlert(() => false)
        console.log(alertMessage, showAlert);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (title == undefined || title == null || title == "") {
            setAlertMessage(() => 'Title must not be empty');
            setShowAlert(() => true);
        } else if (desc == undefined || desc == null || desc == "") {
            setAlertMessage(() => 'Description must not be empty');
            setShowAlert(() => true);
        } else if (selectedThumbnail == undefined || selectedThumbnail == null || selectedThumbnail == "") {
            setAlertMessage(() => 'Please select a Thumbnail');
            setShowAlert(() => true);
        } else if (selectedFile == undefined || selectedFile == null || selectedFile == "") {
            setAlertMessage(() => 'Please select a Video');
            setShowAlert(() => true);
        } else {
            const formData = new FormData();
            formData.append('username', props.username);
            formData.append('title', title);
            formData.append('description', desc)
            formData.append('thumbnail', selectedThumbnail)
            formData.append('file', selectedFile);


            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:8000/postNewVideo/', {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error('Http Response Error');
                    }
                } catch (error) {
                    console.error(error);
                }

                const getData = async () => {
                    try {
                      const response = await fetch('http://127.0.0.1:8000/getAllContents/');
                      if (!response.ok) {
                        throw new Error('Http Response Error');
                      }
                      const data = await response.json();
                      props.setContent(() => data)
                    } catch (error) {
                      console.error(error);
                    }
                  }
                  getData()
            }
            userData()
            setTitle("");
            setDesc("")
            setSelectedFile(null)
            setSelectedThumbnail(null)
        }
    }

    return (
        <div className="container-fluid">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        {showAlert &&
                            <div className="alert alert-danger alert-dismissible fade show text-bold fs-5 text-center p-2" role="alert" >
                                {alertMessage}
                                <button type="button" className="btn-close fs-6" data-bs-dismiss="alert" aria-label="Close" onClick={emptyAlertData}></button>
                            </div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2 offset-1 col-4 text-bold fs-2">
                        Title
                    </div>
                    <div className="col-lg-8 col-6">
                        <input type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-2 offset-1 col-2 text-bold fs-2">
                        Description
                    </div>
                    <div className="col-lg-8 col-6">
                        <textarea name="" className='form-control' value={desc} onChange={(e) => setDesc(e.target.value)} id="" cols="10" rows="5"></textarea>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-2 offset-1 col-2 text-bold fs-2">
                        Thumbnail
                    </div>
                    <div className="col-lg-8 col-6">
                        <input type="file" className='form-control' accept='image/*' onChange={(e) => setSelectedThumbnail(e.target.files[0])} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-2 offset-1 col-2 text-bold fs-2">
                        Video
                    </div>
                    <div className="col-lg-8 col-6">
                        <input type="file" className='form-control' accept='video/*' onChange={(e) => setSelectedFile(e.target.files[0])} />
                    </div>
                </div>
                <div className="row col-4 offset-4">
                    <button className="btn btn-success" type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AskForContent;
