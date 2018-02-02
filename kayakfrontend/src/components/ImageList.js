import React,{Component} from 'react';

import img1 from '../images/h3.png';
import img2 from '../images/h2.png';
import img3 from '../images/h1.png';

import '../index.css';

class ImageList extends Component{
    render() {
        return(
            <div>
                <div className="col-md-4">
                    <div className="row" style={dstyle}>
                        <div className="col-md-12">
                            <img src={img1} style={{boxShadow:'0 3px 12px 1px rgba(0,0,0,0.26)',cursor:'pointer'}}/>  
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row" style={dstyle}>
                        <div className="col-md-12">
                            <img src={img2} style={{boxShadow:'0 3px 12px 1px rgba(0,0,0,0.26)',cursor:'pointer'}}/>   
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row" style={dstyle}>
                        <div className="col-md-12">
                            <img src={img3} style={{boxShadow:'0 3px 12px 1px rgba(0,0,0,0.26)',cursor:'pointer'}}/> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const dstyle={
    marginTop:'70px',
    marginLeft:'3px',
    marginRight:'3px'
}

export default ImageList;