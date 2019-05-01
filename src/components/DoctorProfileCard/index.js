import React from 'react'
import PropTypes from 'prop-types'

import ProfileAvatar from '../ProfileAvatar'
import RatePanel from '../RatePanel'
import Hoc from "../Hoc"
import './styles.css'

class DoctorProfileCard extends React.Component{

    shouldComponentUpdate(nextProps){
        return (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.timesRated !== nextProps.timesRated)
                    || (this.props.img !== nextProps.img)
                    || (this.props.name !== nextProps.name)
                    || (this.props.isShort !== nextProps.isShort)
    }

    render(){
        
        const {short, name, specialty, isUser} = this.props;
        let specialtyOneArray =[];
        specialty.map((elem)=> {
            specialtyOneArray.push(...elem)
        });
        let spec = specialtyOneArray.length ?  specialtyOneArray.map(function(elem) {
            return elem.toUpperCase();
        }): "";
        if(spec.length > 5) {
            
            spec = spec.slice(0, 4).join(", ") + "..."
        } else {
            
            spec = spec ? spec.join(", ") : spec;
        }

        console.log('spec :', spec);
        const rootClass = short ?
            (isUser ?
            "patientProfileCard-short" : "doctorProfileCard-short")
            : (isUser ?
                "patientProfileCard" : "doctorProfileCard");

        return (
            <div className={rootClass}>
                <ProfileAvatar owner="doctor" {...this.props} short={short} size={(short ? 'medium' : 'large')}/>
                <div className={'doctorProfileCard-name'}>{name}</div>
                {
                    isUser ? null : (
                        <Hoc>
                            <div className={'doctorProfileCard-specialty'}>{spec}</div>
                            <RatePanel {...this.props} disable={true}/>
                        </Hoc>
                    )
                }
            </div>
        )
    }
}

DoctorProfileCard.propTypes = {
    name: PropTypes.string,
    specialty: PropTypes.array,
    short: PropTypes.bool,
    rateValue: PropTypes.number,
    timesRated: PropTypes.number,
    isUser: PropTypes.bool,
};

DoctorProfileCard.defaultProps = {
    name: '',
    specialty: [],
    short: false,
    isUser: false,
};

export default DoctorProfileCard;
