import React,{Component} from 'react';
import Slider from 'react-slick';
import Paper from 'material-ui/Paper';
import sf from '../icons/sf.png';
import ny from '../icons/ny.jpg';
import la from '../icons/la.jpg';
import lv from '../icons/lv.jpg';
import seattle from '../icons/seattle.jpg';
import sd from '../icons/sandiego.jpg';
class CustomSlider extends Component{

    cards4 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={sf} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>Washington </label> </div>
                </Paper>
            </div>
        )
    }

    cards2 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={ny} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>New York </label> </div>
                </Paper>
            </div>
        )
    }

    cards3 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={la} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>Los Angeles </label> </div>
                </Paper>
            </div>
        )
    }
    cards1 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={lv} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>Las Vegas </label> </div>
                </Paper>
            </div>
        )
    }

    cards5 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={seattle} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>Seattle </label> </div>
                </Paper>
            </div>
        )
    }

    cards6 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={sd} style={{height:"90%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}>San Diego </label> </div>
                </Paper>
            </div>
        )
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3   
        };
        return (
            <div className="col-md-12">
                <Slider {...settings}>
                    {this.cards1()}
                    {this.cards2()}
                    {this.cards3()}
                    {this.cards4()}
                    {this.cards5()}
                    {this.cards6()}
                    
                </Slider>
            </div>
        )
    }
}

const style = {
    height: 300,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default CustomSlider;