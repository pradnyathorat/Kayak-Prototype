import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import '../index.css';


class CityListItem extends Component{
    render() {
        return(
            <Card >
            <CardHeader
            title={this.props.name}
            actAsExpander={true}
            showExpandableButton={true}
            titleStyle={{
                fontSize:'20px',
                fontWeight:'600',
                fontFamily:'"HelveticaNeue-Bold", Helvetica, Arial, sans-serif',
                color:'#0f0f0f'
            }}
            />
            <CardActions>
                <div className="row" style={{textAlign:'center',color:'#0070E0'}}>
                    <NavLink to="/" style={hlstyle} activeStyle={{color: '#0070E0'}}>    HOTELS    </NavLink>{" • "}
                    <NavLink to="/" style={hlstyle} activeStyle={{color: '#0070E0'}}>    FLIGHTS    </NavLink>{" • "}
                    <NavLink to="/" style={hlstyle} activeStyle={{color: '#0070E0'}}>    CARS    </NavLink>
                </div>
            </CardActions>
            <CardText expandable={true}>
                Search Above For More Details 
            </CardText>
        </Card>
        )
    }
}

const hlstyle={
    fontSize: '14px',
    lineHeight: '16px',
    color: 'blue',
    msFlex: '1',
    textDecoration: 'none',
    marginLeft:'0px',
    marginRight:'0px',
    display:'inline'
    
}
export default CityListItem;