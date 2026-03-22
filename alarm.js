let alarms = [];

const alarmsDiv = document.getElementById('alarms');
const alarmAudio = document.getElementById('alarmAudio');

function addAlarm(){
  const time = document.getElementById('alarmTime').value;
  const label = document.getElementById('alarmLabel').value || "Alarm";
  const sound = document.getElementById('alarmSound').value;

  if(!time) { alert("Select a valid time!"); return; }

  const alarm = { time, label, sound, id: Date.now() };
  alarms.push(alarm);
  renderAlarms();
}

function renderAlarms(){
  alarmsDiv.innerHTML = '';
  alarms.forEach(alarm => {
    const div = document.createElement('div');
    div.className = 'alarm';
    div.innerHTML = `
      <span>${alarm.time} - ${alarm.label}</span>
      <button onclick="deleteAlarm(${alarm.id})">Delete</button>
    `;
    alarmsDiv.appendChild(div);
  });
}

function deleteAlarm(id){
  alarms = alarms.filter(a => a.id !== id);
  renderAlarms();
}

// Check every second
setInterval(()=>{
  const now = new Date();
  const currentTime = now.toTimeString().substr(0,5); // HH:MM
  alarms.forEach(alarm=>{
    if(alarm.time === currentTime){
      triggerAlarm(alarm);
    }
  });
}, 1000);

function triggerAlarm(alarm){
  alarmAudio.src = alarm.sound;
  alarmAudio.play();
  alert(`⏰ ${alarm.label}!`);
  // For snooze, you can add logic to re-add alarm after 5 min
}