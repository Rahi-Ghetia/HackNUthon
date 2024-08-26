// import './App.css';
import { useState, useEffect } from 'react';


function VideosTemplates(props) {

    const [scaleSize, setScaleSize] = useState('1');
    const openVid = (event, ele) => {
        event.preventDefault();
        console.log('apindansasndpasinapinanaspnsanpdsndap');
        props.setVideoOpen(`http://127.0.0.1:8000/${ele.videosurl}`)
        console.log('ainioasndan ',ele.videospath);
        props.setVideoOpenPath(() => ele.videospath)
        props.setPage('video')
    }
    return (
        <div className="container-fluid">
            <div className="row p-2">
                {props.videos.map((ele) => {
                    return (<>
                        <div className="col-lg-3 col-12 p-3 rounded p-0 m-0" id={'content' + ele.title}>
                            <a href="" onClick={(e) => openVid(e, ele)} className='text-dark text-center' style={{ textDecoration: "none" }}>
                                <div className="container-fluid bg-secondary-subtle p-0 rounded text-center pb-2" style={{ transitionDelay: '.5', transform: `scale(${scaleSize})` }} onMouseEnter={() => setScaleSize('1')} onMouseLeave={() => setScaleSize('1')}>
                                    <img width="100%" height="250px" className='rounded-top m-0' src={`http://127.0.0.1:8000/${ele.thumbnail}`} alt='thumbnail' />
                                    <br />
                                    <h4>{ele.uploadedBy}</h4>
                                    <h6>{ele.title}</h6>
                                </div>
                            </a>
                        </div>
                    </>
                    );
                })}
            </div>
        </div>
    );
}

export default VideosTemplates;
