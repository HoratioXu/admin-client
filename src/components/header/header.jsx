import React, {Component} from 'react';

import './header.less'

export default class Header extends Component{

    render(){
        return(
            <div className='header'>
                <div className='header-top'>
                    <span>Welcom, admin</span>
                    <a href='javascript:'>Log out</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>Home</div>
                    <div className='header-bottom-right'>
                        <span>1234554654</span>
                        <img src='https://www.clipartmax.com/png/middle/249-2493418_award-day-forecast-sun-sunny-weather-winter-icon-sunny-weather-icon.png' alt='weather' />
                        <span>Sunny</span>
                    </div>
                </div>
            </div>
        )
    }
}
