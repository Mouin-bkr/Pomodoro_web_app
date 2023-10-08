import React, { useState, useEffect } from 'react';

function TimerApp() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds (25 * 60)
  const [timerInterval, setTimerInterval] = useState(null);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const [timerDuration, setTimerDuration] = useState(25);
  const [smallBreakDuration, setSmallBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(10);

  const [pomodoro,setPromodoro] = useState('#e5383b'); // pomodoro color
  const [shortBreakColor, setShortBreakColor] = useState('#9a8f97'); // Short break color
  const [longBreakColor, setLongBreakColor] = useState('#0077b6'); // Long break color

  const [breakText, setBreakText] = useState(''); // Text to display under the timer
  // eslint-disable-next-line no-unused-vars
  const [PageTitle,setPageTitle] = useState('Take a rest'); // Initial page title
  
  useEffect(() => {
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById('timer').textContent = timeString;
  
      // Set the browser tab title dynamically
      document.title = `${breakText} - ${timeString}`;
    }
  
    updateTimer();
  }, [timeLeft, breakText]);
  function startTimer() {
    if (!timerInterval) {
      setTimerInterval(setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000));
    }
  }
  

  function pauseTimer() {
    clearInterval(timerInterval);
    setTimerInterval(null);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimeLeft(timerDuration * 60);
    document.body.style.backgroundColor ='#e5383b';
    setBreakText('I think You should get to work ');
  }
  function handlePomodoro() {
    setTimeLeft(smallBreakDuration * 60);
    document.body.style.backgroundColor = pomodoro;
    setBreakText('work time');
    setPageTitle('Work Time');
  }
  function handleSmallBreak() {
    setTimeLeft(smallBreakDuration * 60);
    document.body.style.backgroundColor = shortBreakColor;
    setBreakText('Take a short break!');
    setPageTitle(' Break Time');
  }

  function handleLongBreak() {
    setTimeLeft(longBreakDuration * 60);
    document.body.style.backgroundColor = longBreakColor;
    setBreakText('Take a long break!');
    setPageTitle(' BREAK Time');
  }

  function handleSettingsClick() {
    console.log('Settings button clicked');
    setSettingsModalVisible(true);
  }

  function handleSettingsClose() {
    console.log('Settings button clicked');
    setSettingsModalVisible(false);
  }

  function handleSaveSettings() {
    setSettingsModalVisible(false);
    setTimeLeft(timerDuration * 60);
  }
 
 
  

  return (
    <div className="main-container">
      <div className="container text-center mt-5 banner-container">
      <button className="btn btn-lighty settings-btn" onClick={handleSettingsClick}>
          Settings <span className="fas fa-cog"></span>
        </button>
        <div className="timer-container">
          <div className="timer" id="timer">
            {timeLeft > 0
              ? `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`
              : '00:00'}
          </div>
        </div>
        <div className="button-container">
          <div className="break-buttons-container">
            <button className="btn btn-lighty pomodoro-btn" onClick={() => { handlePomodoro();setTimeLeft(timerDuration * 60); }} >
              Pomodoro
            </button>
            <button className="btn btn-lighty small-break-btn" onClick={() => { handleSmallBreak(); setTimeLeft(smallBreakDuration * 60); }}>
              Small Break
            </button>
            <button className="btn btn-lighty long-break-btn" onClick={() => { handleLongBreak(); setTimeLeft(longBreakDuration * 60); }}>
              Long Break
            </button>
            <button className="btn btn-lighty reset-btn" onClick={resetTimer}>
              Restart
            </button>
          </div>
          </div>
          {timerInterval ? (
            <button className="btn btn-lighty start-btn" onClick={pauseTimer}>
              <span className="pause-icon">&#10073;&#10073;</span> Pause
            </button>
          ) : (
            <button className="btn btn-success start-btn" onClick={startTimer}>
              <span className="pause-icon"></span> Start
            </button>
          )}

      </div>
      <div className="break-text">{breakText}</div> {/* New div to display the text */}

      {settingsModalVisible && (
        <div className="modal fade show d-block" id="settingsModal" tabIndex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleSettingsClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Timer Duration (minutes):</label>
                  <input
                    type="number"
                    className="settings-input"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(e.target.value)}
                  />
                </div>
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Small Break Duration (minutes):</label>
                  <input
                    type="number"
                    className="settings-input"
                    value={smallBreakDuration}
                    onChange={(e) => setSmallBreakDuration(e.target.value)}
                  />
                </div>
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Long Break Duration (minutes):</label>
                  <input
                    type="number"
                    className="settings-input"
                    value={longBreakDuration}
                    onChange={(e) => setLongBreakDuration(e.target.value)}
                  />
                </div>
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Pomodoro Color:</label>
                  <input
                    type="color"
                    className="settings-input"
                    value={pomodoro}
                    onChange={(e) =>setPromodoro(e.target.value)}
                  />
                </div>
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Short Break Color:</label>
                  <input
                    type="color"
                    className="settings-input"
                    value={shortBreakColor}
                    onChange={(e) => setShortBreakColor(e.target.value)}
                  />
                </div>
                <div className="settings-modal-content">
                  <label className="settings-modal-label">Long Break Color:</label>
                  <input
                    type="color"
                    className="settings-input"
                    value={longBreakColor}
                    onChange={(e) => setLongBreakColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleSettingsClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimerApp;
