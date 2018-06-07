import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux';

import Hoc from '../../hoc'
import {
    Row, Col, Button,
    Calendar, SmallCalendar,
    CancelVisitModal, NewVisitModal, NewMessageModal, ReceptionsScheduleModal, WarningModal
} from 'appdoc-component'

import * as actions from '../../store/actions'

import './styles.css'

import {findTimeInterval} from '../../helpers/timeInterval'
import {timePeriod} from './mock-data'

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditorMode: false,
            currentDate: new Date(),
            interval: null,
            view: '',
            newVisitModal: false,


            newVisitData: {
                date: null,
                patients: [],
            },
            cancelModal: false,
            newMessageModal: false,
            receptionsScheduleModal: false,
            warningModal: false,
            receptionData: {
                dates: [],
                currentSched: {},
            }
        }
    };

    setIntervalAndView = (date, view) => {
        const {start, end} = findTimeInterval(date, view);
        this.state.isEditorMode ? this.props.onGetAllIntervals(start, end) : this.props.onGetAllVisits(start, end);
        
        this.setState({
            interval: {
                start,
                end,
            },
            view,
        })
    }

    componentDidMount(){
        this.setIntervalAndView(this.state.currentDate, 'week');

    }

    componentWillUnmount(){
        this.props.clearReceptions();
    }

    dateChangeHandler = (date) => {
        const {start, end} = findTimeInterval(date, this.state.view);
        this.state.isEditorMode ? this.props.onGetAllIntervals(start, end) : this.props.onGetAllVisits(start, end);
        
        this.setState({
            currentDate: date,
            interval: {
                start,
                end,
            }
        })

    };

    onAddVisit = (info) => {
        this.props.patients.length === 0 ? 
            this.props.onGetDocPatients() : null;

        this.setState({
            newVisitModal: true,
            newVisitData: {
                ...this.state.newVisitData,
                date: info.start,
            }
        })
    };

    closeNewVisitModal = () => {
        this.setState({
            newVisitModal: false,
        })
    };

    onSaveNewVisit = (obj) => {
        this.props.onAddNewVisit(obj, this.state.interval.start, this.state.interval.end);
        this.setState({
            newVisitModal: false,
        })
    };

    onPatientEmail = () => {
        this.setState({newMessageModal: true,})
    };

    closeNewMessage = () => {
        this.setState({newMessageModal: false,})
    };

    onSendNewMessage = (info) => {
        this.props.onSendMessage(info)
        this.setState({newMessageModal: false,})
    };

    changeToEditorMode = (isEditorMode) => {
        let mode = isEditorMode ? 'month' : 'week';
        const {start, end} = findTimeInterval(this.state.currentDate, mode);
        isEditorMode ? this.props.onGetAllIntervals(start, end) : this.props.onGetAllVisits(start, end);

        this.setState({
            view: mode,
            interval: {
                start,
                end,
            },
        });
        this.setState({isEditorMode});
    };

    closeReceptionSchedule = () => {
        this.setState({
            receptionsScheduleModal: false,
            receptionData: {
                ...this.state.receptionData,
                dates: [],
            }
        })
    };

    onSaveReceptionSchedule = (interval) => {
        this.props.onAddInterval(interval, this.state.interval.start,this.state.interval.end);
        //this.props.onGetAllIntervals(this.state.interval.start,this.state.interval.end);
        this.setState({
            receptionsScheduleModal: false,
            receptionData: {
                ...this.state.receptionData,
                dates: [],
            }
        })
    };

    openReceptionSchedule = (date, schedule) => {
        if(schedule){
            this.setState({
                receptionData: {
                    ...this.state.receptionData,
                    currentSched: schedule
                }
            })
        }
        if (date.length !== 0) {
            this.setState({
                receptionsScheduleModal: true,
                receptionData: {
                    ...this.state.receptionData,
                    dates: [].concat(this.state.receptionData.dates, date)
                }
            })
        }
    };

    eventDeleteHandler =(id) => {
        this.props.onEventDelete(id);
        this.setState({warningModal: true});
    }

    render() {
        const {dates, currentSched} = this.state.receptionData;
        let editorBtn, calendar, timeSetCall = [], timeSetReception = [];

        //console.log(this.props.intervals, this.props.min, this.props.max)
        
        if ('time' in currentSched || 'emergencyTime' in currentSched){
            timeSetCall = currentSched.time.map(item => {
                return {
                    defaultStartValue: moment(item.start),
                    defaultEndValue: moment(item.end),
                }
            });
            timeSetReception = currentSched.emergencyTime.map(item => {
                return {
                    defaultStartValue: moment(item.start),
                    defaultEndValue: moment(item.end),
                }
            });

        }

        if (this.state.isEditorMode) {
            editorBtn = (<Button btnText='Вернуться к графику'
                                 onClick={() => this.changeToEditorMode(false)}
                                 type='yellow'
                                 icon='arrow2_left'/>);
            calendar = (<Calendar receptionNum={23}
                                  selectable
                                  editor
                                  onMonthSelect={(date, schedule) => this.openReceptionSchedule(date, schedule)}
                                  schedules={this.props.schedules}
                                  date={this.state.currentDate}
                                  onNavigate={this.dateChangeHandler}
            />)
        }
        else {
            editorBtn = (<Button btnText='Редактор графика'
                                 onClick={() => this.changeToEditorMode(true)}
                                 type='yellow'
                                 icon='setting_edit'/>)
            calendar = (<Calendar receptionNum={this.props.visits.length}
                                  selectable
                                  onSelectEvent={this.props.onSelectEvent}
                                  onSelectSlot={(slot) => this.onAddVisit(slot)}
                                  defaultView="week"
                                  onView = {(view) => {
                                      this.setIntervalAndView(this.state.currentDate, view);
                                  }}
                                  date={this.state.currentDate}
                                  onNavigate={this.dateChangeHandler}
                                  step={5}
                                  events={this.props.visits}
                                  //intervals={this.props.intervals}
                                  min={new Date(this.props.min*1000)}
                                  max={new Date(this.props.max*1000)}
                                  onPopoverClose={this.eventDeleteHandler}
                                  onPopoverEmail={this.onPatientEmail}
            />)
        }

        return (
            <Hoc>
                <Row style={{marginBottom: 25,}}>
                    <Col span={19} className='schedule-title'>
                        График работы
                    </Col>
                    <Col span={5}
                         className='schedule-editBtn'>
                        {editorBtn}
                    </Col>
                </Row>
                <Row >
                    <Col span={19}>
                        {calendar}
                    </Col>
                    <Col span={5} style={{textAlign: 'center'}}>
                        <Button
                            btnText='Отменить приемы'
                            className={'cancel_rec'}
                            onClick={() => this.setState({cancelModal: true})}
                            size='link'
                            type='link'
                            icon='circle_close'
                            svg
                        />
                        <SmallCalendar date={this.state.currentDate}
                                       onChange={this.dateChangeHandler}/>
                    </Col>
                </Row>
                <CancelVisitModal visible={this.state.cancelModal}
                                  {...this.props.cancelData}
                                  onSave={(obj) => {
                                      this.props.onCloseCancelModal(obj);
                                      this.setState({cancelModal: false, warningModal: true});
                                    }}
                                  onCancel={() => this.setState({cancelModal: false})}
                />
                <NewVisitModal visible={this.state.newVisitModal}
                               {...this.state.newVisitData}
                               patients={this.props.patients}
                               onCancel={this.closeNewVisitModal}
                               onSave={(info) => this.onSaveNewVisit(info)}
                />
                <NewMessageModal visible={this.state.newMessageModal}
                                 {...this.props.chosenData}
                                 onCancel={this.closeNewMessage}
                                 onSend={info => this.onSendNewMessage(info)}
                />
                <ReceptionsScheduleModal visible={this.state.receptionsScheduleModal}
                                         dateSet={{
                                             defaultStartValue: moment(dates[0]),
                                             defaultEndValue: moment(dates[dates.length - 1]),
                                         }}
                                         selOptions={timePeriod}
                                         timeSetCall={timeSetCall}
                                         timeSetReception={timeSetReception}
                                         onCancel={this.closeReceptionSchedule}
                                         onSave={(info) => this.onSaveReceptionSchedule(info)}
                />
                <WarningModal visible={this.state.warningModal}
                            onClick={() => this.setState({warningModal: false})}
                            message='Изменения всупят в силу после проверки администратором'/>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        patients: state.patients.docPatients,

        visits: state.schedules.visits,
        intervals: state.schedules.visIntervals,
        min: state.schedules.min,
        max: state.schedules.max,
        schedules: state.schedules.schedules,
        chosenData: state.schedules.chosenData,
        cancelData: state.schedules.cancelData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDocPatients: () => dispatch(actions.getDocPatients()),

        onGetAllIntervals: (start, end) => dispatch(actions.getAllIntervals(start, end)),
        clearReceptions: () => dispatch(actions.clearIntervals()),
        onAddInterval: (obj, start, end) => dispatch(actions.addInterval(obj, start, end)),

        onAddNewVisit: (obj, start, end) => dispatch(actions.addVisit(obj, start, end)),
        onGetAllVisits: (start,end) => dispatch(actions.getAllVisits(start,end)),

        onSendMessage: (mess) => dispatch(actions.sendMessage(mess)),
        onCloseCancelModal: (obj) => dispatch(actions.cancelEventsRange(obj)),

        onSelectEvent: (event) => dispatch(actions.selectEvent(event)),
        onEventDelete: () => dispatch(actions.deleteEvent()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);