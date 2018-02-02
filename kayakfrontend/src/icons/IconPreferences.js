import React,{Component} from 'react';
class IconPreferences extends Component{
    render() {
        return(
            <svg 
                className="hotel" 
                xmlns="http://www.w3.org/2000/svg" 
                width={this.props.width} 
                height={this.props.height}
                viewBox="0 0 32 32" 
                aria-labelledby={this.props.icontitle}>
            <title id={this.props.icontitle}></title>
            <path class="colorable svg-dark-grey-default" stroke={this.props.color} fill="none" d="M9.54,20.66l-1.92-.8-2,1.28A0.5,0.5,0,0,1,5,21.07L2.91,19a0.5,0.5,0,0,1-.07-0.61l1.3-2a15.59,15.59,0,0,1-.8-1.92L1,13.93a0.5,0.5,0,0,1-.38-0.48V10.53A0.5,0.5,0,0,1,1,10l2.34-.5a15.59,15.59,0,0,1,.8-1.92l-1.28-2A0.5,0.5,0,0,1,2.93,5L5,2.91a0.5,0.5,0,0,1,.61-0.07l2,1.3a15.59,15.59,0,0,1,1.92-.8L10.07,1A0.5,0.5,0,0,1,10.55.62h2.92A0.5,0.5,0,0,1,14,1l0.5,2.34a15.59,15.59,0,0,1,1.92.8l2-1.28a0.5,0.5,0,0,1,.61.07L21.09,5a0.5,0.5,0,0,1,.07.61l-1.3,2a15.59,15.59,0,0,1,.8,1.92L23,10.07a0.5,0.5,0,0,1,.38.48v2.92A0.5,0.5,0,0,1,23,14l-2.34.5a15.59,15.59,0,0,1-.8,1.92l1.28,2a0.5,0.5,0,0,1-.07.61L19,21.09a0.5,0.5,0,0,1-.61.07l-2-1.3a15.59,15.59,0,0,1-1.92.8L13.93,23a0.5,0.5,0,0,1-.48.38H10.53A0.5,0.5,0,0,1,10,23Z"></path>
            <circle class="colorable svg-dark-grey-default" stroke={this.props.color} fill="none" cx="12" cy="12" r="4"></circle>    
            </svg>
        )
    }
}

export default IconPreferences;