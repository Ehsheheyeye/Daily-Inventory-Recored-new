// script.js

// Utility functions for date and time
function updateTimeAndDate() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}

let entryNo = 1;
let records = [];
let locations = [
  "DSK", "Aasha homeopathy", "Acme IT Solutions", "Audio Video Care", "BAP Computers", 
  "Bhurani Computers", "Boy's Town", "CA Chafekar", "Chakaradhar engineering", "Chip com", 
  "Crucial Service Center", "Fins Solutions", "Gangagiri Ambad", "Gangagiri Ashok Nagar", 
  "Great Eastern", "Hotel Ayodhya", "Hotel BLVD", "Hotel Curry Leaves Accounts", 
  "Hotel Curry Leaves Bavan", "Hotel Curry Leaves Jehan", "Hotel Grand Curry Leaves", 
  "Hotel Mazali", "HP Service Center", "Infowave Computer", "Ira diagnosis", "IT Solutions", 
  "Jay Shiv Om industry", "Korus Computers", "Mayur", "Meera Home", "MHB Colony", 
  "Moule Petrolum", "Multitech Services", "Nate", "Nice Computers", "Om Hardware", 
  "Om Sonography", "Orbital", "Parshwa", "Prime Graphite", "Prime Graphite D62", 
  "Rahul sir", "Raka Infosys", "Ravi Raka", "RP Tech", "Rx Service Center", 
  "Saikrupa Industries", "San Computek", "Sankal Hospital", "Sapat Tea", "Satguru Trasport", 
  "SBI Ashok Nagar", "SH Jadhav", "Shree Enterprises", "Shreenath Engineering", 
  "Varad Agency", "Vighnaharata Sales", "Winar Enterprises", "Hindavi Trasport", 
  "Total Computer Solutions", "Ajju Da Dhabha", "Hotel Amrut Garden", "Jay Lab Satpur", 
  "Dhandai Enterprises", "Nitin Electicals", "Perfect Computers", "Kamgar Kalyan", 
  "Kamgar Kalyan Cidco", "Quest Computers", "Abhay Steel", "Abhay Products", 
  "Mahalaxmi Pathswanshta Satpur", "Vijay Nagar Nagari Pathswanshta", "Datasoft Computers", 
  "Korus Infotech", "Korus Computech", "Slidewell", "Bhor Chemical Vilholi", 
  "Dagau teli", "Savex Computers", "Indial Tools", "Kuber Petrolum", "Shiva associate", 
  "Gemini", "Gargi Medical", "Shree Chatrapati Vidyalay", "KVIC", "Yash Photo Studio", 
  "HDFC Bank", "Canara Bank", "Megatech Computers", "Ishwari Multipurpose", 
  "Hotel Sailila", "Pragati Padamashree", "Hi-Tech Traders", "CA Nikhil Shabara", 
  "Satyam Sales", "Nakshtra Engineering", "Chetana Engineering", "Media Shopee", 
  "Usha Infotech", "Yash Computers", "Aquil Media", "Ambika Sweets Ashok Nagar", 
  "Vivo Service Center", "Drawing Class", "Om Electric mart", "Raj Sports", 
  "Shree Krushna Enterprises", "Diamond Traders", "SR Enterprises", "Manish Gifts", 
  "Tapari", "Vishwakarama Hardware", "Madhur sweets", "DCC Computers", "Fabrication", 
  "Deshmukh Home", "Deshmukh Kirana", "Bhonsala College", "Slidewell A6", "Slidewell E2", 
  "Suyog Collection", "YCMOU", "Vaishnavi Mobile", "Sarvadnya stationery", 
  "YCMOU Gangapur", "Shell Petrol pump", "Plot", "Perfect Computer Godown", 
  "Sushila Hospital", "Sarthak Hospital", "New Suyog Collection"
];

let editIndex = null; // Track index for editing

function autoSuggest() {
  const input = document.getElementById('client-location');
  const suggestions = document.getElementById('suggestions');
  const filter = input.value.toUpperCase();
  
  suggestions.innerHTML = '';
  if (filter) {
    const filteredLocations = locations.filter(location => location.toUpperCase().startsWith(filter));
    filteredLocations.forEach(location => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = location;
      suggestionItem.onclick = () => {
        input.value = location;
        suggestions.style.display = 'none';
      };
      suggestions.appendChild(suggestionItem);
    });
    suggestions.style.display = filteredLocations.length ? 'block' : 'none';
  } else {
    suggestions.style.display = 'none';
  }
}

function saveRecord() {
  const clientLocation = document.getElementById('client-location').value;
  const workDescription = document.getElementById('work-description').value;

  if (clientLocation && workDescription) {
    const now = new Date();
    const record = {
      entryNo: editIndex !== null ? records[editIndex].entryNo : entryNo,
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      clientLocation,
      workDescription,
    };

    if (editIndex !== null) {
      records[editIndex] = record;
      editIndex = null;
    } else {
      records.push(record);
      entryNo++;
    }

    document.getElementById('entry-number').textContent = entryNo;
    document.getElementById('client-location').value = '';
    document.getElementById('work-description').value = '';
  } else {
    alert("Please input data");
  }
}

function showPreviousRecords() {
  document.getElementById('main-screen').style.display = 'none';
  document.getElementById('previous-records-screen').style.display = 'block';

  const recordsList = document.getElementById('records-list');
  recordsList.innerHTML = '';

  let currentDate = '';

  records.forEach((record, index) => {
    if (record.date !== currentDate) {
      recordsList.innerHTML += `<div class="record-date">${record.date}</div>`;
      currentDate = record.date;
    }
    recordsList.innerHTML += `
      <div class="record">
        <div>
          <p>Entry No - ${record.entryNo} (${record.time})</p>
          <p>${record.clientLocation}</p>
          <p>${record.workDescription}</p>
        </div>
        <span class="edit-icon" onclick="editRecord(${index})">✏️</span>
      </div>
    `;
  });
}

function editRecord(index) {
  const record = records[index];
  document.getElementById('client-location').value = record.clientLocation;
  document.getElementById('work-description').value = record.workDescription;
  document.getElementById('entry-number').textContent = record.entryNo;
  editIndex = index;
  showMainScreen();
}

function showMainScreen() {
  document.getElementById('previous-records-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
}

function exportToExcel() {
  alert("Export to Excel functionality coming soon.");
}

updateTimeAndDate();
