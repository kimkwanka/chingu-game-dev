import React from 'react';

const getPaddedStr = (num) => {
  let str = num.toString();
  if (str.length < 2) {
    str = `0${str}`;
  }
  return str;
};

const formatTime = (hour, minutes, offset) => {
  let timeVal = +(hour + (offset / 3600));
  let day = '';
  let ampm = 'am';
  let minutesStr = ':00';

  let minutesSum = (timeVal % 1) * 60 + minutes;

  if (minutesSum >= 60) {
    minutesSum -= 60;
    timeVal += 1;
  }
  minutesStr = `:${getPaddedStr(minutesSum)}`;

  if (timeVal < 0) {
    timeVal += 12;
    ampm = 'pm';
    day = ' (previous day)';

    if (timeVal < 0) {
      timeVal += 12;
      ampm = 'am';
    }
    if (timeVal < 0) {
      timeVal += 12;
      ampm = 'pm';
      day = ' (day before previous day)';
    }
  } else if (timeVal >= 12) {
    timeVal -= 12;
    ampm = 'pm';

    if (timeVal >= 12) {
      timeVal -= 12;
      ampm = 'am';
      day = ' (next day)';
    }
    if (timeVal >= 12) {
      timeVal -= 12;
      ampm = 'pm';
      day = ' (next day)';
    }
  }
  if (timeVal % 1 !== 0) {
    timeVal -= (timeVal % 1);
  }
  if (timeVal === 0) {
    timeVal = 12;
  }

  return `${timeVal}${minutesStr} ${ampm}${day}`;
};
const formatOffset = (offset) => {
  const hour = offset - (offset % 1);
  const minutes = (offset % 1) > 0 ? `:${(offset % 1) * 60}` : '';
  return `${hour}${minutes}`;
};
class TimeZones extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: 9,
      minutes: 0,
      open: false,
      timeStr: '',
    };
  }
  handleChange = (e) => {
    const tmp = e.target.value.toLowerCase();
    const matches = tmp.match(/([0-9]{1,2})(:([0-9]{2,2}))\s*(am|pm)/i);
    // console.log(matches);
    if (matches && typeof +matches[1] === 'number' && typeof +matches[3] === 'number' && (matches[4] === 'am' || matches[4] === 'pm')) {
      // AM: 12, 1, 2, ..., 10, 11 PM: 12, 1, 2 ...
      let hour = +matches[1];
      const ampm = matches[4];
      let minutes = +matches[3];

      if (minutes >= 60) {
        minutes -= 60;
        hour += 1;
      }
      const minutesStr = `:${getPaddedStr(minutes)}`;

      if (hour >= 12 || hour < 0) {
        hour = 0;
      }

      if (ampm === 'pm') {
        hour += 12;
      }
      const open = this.state.open;
      this.state = {
        hour: hour - e.target.getAttribute('data-offset'),
        minutes: +matches[3],
        open,
        timeStr: '',
      };
      this.forceUpdate();

      if (hour > 12) {
        hour -= 12;
        // ampm = (ampm === 'am') ? 'pm' : 'am';
      } else if (hour === 0) {
        hour = 12;
        // ampm = (ampm === 'am') ? 'pm' : 'am';
      }
      e.target.value = `${hour}${minutesStr} ${ampm}`;
    }
  }
  handleClick = () => {
    const open = !this.state.open;
    this.state = Object.assign({}, this.state, { open });
    this.forceUpdate();
  }
  getValue = (tm) => {
    const val = formatTime(this.state.hour, this.state.minutes, tm.timeZoneOffset);
    this.state.timeStr += `${tm.name}: ${val}\n`;
    return val;
  }
  render() {
    const handleChange = this.handleChange;
    const tZ = [];
    if (this.state.open) {
      this.props.teamMembers.forEach((tm) => {
        const offsetStr = formatOffset(tm.timeZoneOffset / 3600);
        const timeZoneOffset = (tm.timeZoneOffset > 1) ? `UTC +${offsetStr}` : `UTC ${offsetStr}`;
        tZ.push(
          (<div className="timeZoneInputDiv">
            <label htmlFor={tm.name}>{tm.name} ({timeZoneOffset})</label>
            <input onChange={handleChange} id={tm.name} type="text" data-offset={tm.timeZoneOffset / 3600} value={this.getValue(tm)} />
          </div>),
        );
      });
    }
    const timeZoneConverterResults = (!this.state.open) ? null : (
      <div className="TimeZonesResultsDiv">
        <p>To share the results just copy this string:</p>
        <p>{this.state.timeStr}</p>
      </div>
    );
    return (
      <div className="TimeZones">
        <div className="TimeZonesDiv">
          {tZ}
        </div>
        {timeZoneConverterResults}
        <div className="TimeZonesButtonDiv">
          <button className="TimeZonesButton" onClick={this.handleClick}>TimeZone Converter</button>
        </div>
      </div>
    );
  }
}
TimeZones.propTypes = {
  teamMembers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TimeZones;

