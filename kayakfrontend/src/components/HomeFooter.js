import React,{Component} from 'react';
import foot from '../images/footer.PNG'

class HomeFooter extends Component{
    render() {
        return(
            <div className="col-md-12" style={divstyle}>
                <div className="row" style={textstyle}>
                    <div className="col-md-3" >
                        <div className="row" style={{marginBottom:'18px'}}>
                            Company
                        </div>
                        <div className="row" style={rowstyle}>
                            About
                        </div>
                        <div className="row" style={rowstyle}>
                            Careers
                        </div>
                        <div className="row" style={rowstyle}>
                            Mobile
                        </div>
                        <div className="row" style={rowstyle}>
                            Blog
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div className="row" style={{marginBottom:'18px'}}>
                            Contact
                        </div>
                        <div className="row" style={rowstyle}>
                            Help/FAQ
                        </div>
                        <div className="row" style={rowstyle}>
                            Press
                        </div>
                        <div className="row" style={rowstyle}>
                            Partners
                        </div>
                        <div className="row" style={rowstyle}>
                            Hotel Owners
                        </div>
                    </div>
                    <div className="col-md-3" >
                        <div className="row" style={{marginBottom:'18px'}}>
                            More
                        </div>
                        <div className="row" style={rowstyle}>
                            Airline Fees
                        </div>
                        <div className="row" style={rowstyle}>
                            Airlines
                        </div>
                        <div className="row" style={rowstyle}>
                            Low Fare Tips
                        </div>
                        <div className="row" style={rowstyle}>
                            Direct Routes
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row" style={{marginBottom:'18px'}}>
                            Site/Currency
                        </div>
                        <div className="row" style={rstyle}>
                            <div style={flag}>
                            </div>
                            United States
                        </div>
                        <div className="row" style={rstyle}>
                        <div style={flag1}>{"$    USD"}</div>   
                        </div>
                    </div>
                </div>
                <div className="row">
                    <img src={foot} style={{width:'100vw'}}/>
                </div>
            </div>
        )
    }
}
const flag={
    backgroundImage: "url("+"https://a1.r9cdn.net/res/images/horizon/common/layout/a-small-flag-sprite.png?)",
    backgroundPosition:"0 0",
    width:'18px',
    height:'14px',
    backgroundRepeat:'no-repeat',
    margin:'4px',
    display:'inline-flex'
}
const flag1={
    
    width:'18px',
    height:'14px',
    display:"inline",
    margin:'4px'
}
const divstyle={
    backgroundColor:'#0f0f0f',
    height:'547px',
    marginTop:'0px'
}
const rstyle={
    border:'1px solid #717585',
    borderRadius:'3px',
    marginBottom:'10px',
    height:'35px',
    width:'100%',
    lineHeight:'21px',
    verticalAlign: 'middle',
    //display:'inline-flex',
    padding:'5px'
}
const rowstyle={
    marginBottom:'8px',
    fontWeight: '400',
}
const textstyle={
    fontFamily: '"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    color: '#fff',
    display: 'block',
    letterSpacing: 'normal',
    textRendering: 'auto',
    fontSize:'11px',
    margin:'40px 300px 15px 300px'
}
export default HomeFooter;