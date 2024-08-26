import { useEffect, useState } from "react";

function SelectedVideoOpen(props) {
    const [quizz, setQuizData] = useState([]);
    const [selectType,setSelectType] = useState("quiz");
    const [modalText, setModalText] = useState("");

    useEffect(() => {
        const userData = async () => {
            try {
                console.log(props.path);
                const response = await fetch('http://localhost:8000/getQuiz/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "video_path": props.path }),
                });
                if (!response.ok) {
                    throw new Error('Http Response Error');
                }
                const data = await response.json();
                setModalText(() => data)
            } catch (error) {
                console.error(error);
            }
        }
        userData()
    }, []);

    return <>
        <div className="container text-center mt-5">
            <video src={props.videoOpend} style={{ width: '70vw' }} controls autoPlay></video>
            <button className="btn btn-primary mx-2" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setSelectType('transcript')}>
                Get Transcript Of the entire video
            </button>
            <button className="btn btn-success mx-2" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setSelectType('quiz')}>
                Get Quizz To see how much you learned
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-2" id="staticBackdropLabel">Quiz</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <pre>
                                {selectType == 'quiz' ? modalText.quiz : modalText.transcript}
                            </pre>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SelectedVideoOpen;