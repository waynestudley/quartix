import React, { useState } from 'react';

interface Vehicle {
  id: number;
  description: string;
  type: string;
  inspections: Inspection[];
  registration: string;
}

interface Inspection {
  id: number;
  name: string;
  allowedTypes: string[];
}

const vehiclesData: Vehicle[] = [
  { id: 1, description: 'VW Golf (c)', type: 'car', inspections: [], registration: 'ABC 123'},
  { id: 2, description: 'Transit (v)', type: 'van', inspections: [], registration: 'AH03 RPP'},
  { id: 3, description: 'DAF (l)', type: 'lorry', inspections: [], registration: 'CA51 NOI'},
  { id: 4, description: 'Crafter (l)', type: 'van', inspections: [], registration: 'QU4R TIX'},
  { id: 5, description: 'Tesla (c)', type: 'car', inspections: [], registration: 'WS62 BBM'},
  { id: 6, description: 'Quest (v)', type: 'van', inspections: [], registration: 'RJ17 OAS'},
  { id: 7, description: 'Scania (l)', type: 'lorry', inspections: [], registration: 'OX11 OAN'},
  { id: 8, description: 'HiAce (v)', type: 'van', inspections: [], registration: 'GU17 EEG'},
  { id: 9, description: 'Mini (c)', type: 'car', inspections: [], registration: 'SP3C IAL'},
  { id: 10, description: 'Express (v)', type: 'van', inspections: [], registration: 'VA21 QUZ'},
  { id: 11, description: 'Volvo (l)', type: 'lorry', inspections: [], registration: 'FJ18 JMB'},
  { id: 12, description: 'Focus (c)', type: 'car', inspections: [], registration: 'ABC 124'}
  
];

const inspectionsData: Inspection[] = [
  { id: 101, name: 'Any', allowedTypes: ['any'] },
  { id: 102, name: 'Car & Van', allowedTypes: ['car', 'van'] },
  { id: 103, name: 'Car only', allowedTypes: ['lorry'] },
  { id: 104, name: 'Van only', allowedTypes: ['van'] },
  { id: 105, name: 'Lorry only', allowedTypes: ['lorry'] },
];

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
  const [inspections] = useState<Inspection[]>(inspectionsData);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [sortedData, setSortedData] = useState([...vehiclesData]);
  const [sortCriteria, setSortCriteria] = useState('');

  const attachInspection = () => {
    if (selectedVehicle && selectedInspection) {
      const updatedVehicles = vehicles.map((vehicle) => {
        
        if (vehicle.id === selectedVehicle.id) {
          if (
            selectedInspection.allowedTypes.includes('any') ||
            selectedInspection.allowedTypes.includes(vehicle.type)
          ) {
            return {
              ...vehicle,
              inspections: [...vehicle.inspections, selectedInspection],
            };
          } else {
            alert('Cannot attach this inspection to the selected vehicle.');
          }
        }
        return vehicle;
        
      });
      setVehicles(updatedVehicles);
      setSelectedInspection(null);
      console.log(selectedVehicle.inspections, '<<<')
    }
  };

  const selectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const showInspectionsPopup = (vehicle: Vehicle) => {
    //const inspectionsList = vehicle.inspections.map((inspection) => inspection.name).join('<br>');
    // const buttonRect = vehicle.target.getBoundingClientRect();
    // inspectionsPopup.style.left = `${buttonRect.left}px`;
    // inspectionsPopup.style.top = `${buttonRect.bottom}px`;
    // inspectionsPopup.style.display = 'block';
    console.log('sas', vehicle)
};

  // Function to handle sorting based on criteria
  const handleSort = (criteria: string) => {
    console.log('SORT')
    const sorted = [...sortedData];
    if (criteria === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    } else if (criteria === 'name') {
      sorted.sort((a, b) => a.description.localeCompare(b.description));
    } else if (criteria === 'registration') {
      sorted.sort((a, b) => a.registration.localeCompare(b.registration));
    }
    setSortCriteria(criteria);
    setSortedData(sorted);
  };

  return (
    <div className="main">
      <div className="title">Vehicle Inspection Demo</div>
      <div className="sub-title">Vehicles</div>
      
      <div className="flex-container sort-by">
        <div className="sortby">Sort by:</div>
        <div className={`${sortCriteria === 'type' ? 'selected' : ''}` } onClick={() => handleSort('type')}>Type</div>
        <div className={`${sortCriteria === 'name' ? 'selected' : ''}` } onClick={() => handleSort('name')}>Name</div>
        <div className={`${sortCriteria === 'registration' ? 'selected' : ''}` } onClick={() => handleSort('registration')}>Registration</div>
        <div className={`${sortCriteria === 'allowed' ? 'selected' : ''}` } onClick={() => handleSort('allowed')}>Allowed Type</div>
      </div>

      <div className="flex-container vehicles">
      {sortedData.map((vehicle) => (
        <div key={vehicle.id}>
          <button
            className={`badge-top-right ${selectedVehicle && vehicle.inspections.length > 0 ? 'active' : 'none'}`}
            data-count={vehicle.inspections.length > 0 ? vehicle.inspections.length : null}
            onClick={() => selectVehicle(vehicle)}
            onMouseOver={() => {
              if (vehicle.inspections.length > 0) {
                showInspectionsPopup(vehicle);
              }
            }}
          >
            <strong>{vehicle.description}</strong>
            <p>{vehicle.registration}</p>
          </button>
        </div>
        ))}

      </div>
        
      <div>
        <div className="sub-title">Available Inspections</div>
        <div className='flex-container'>

          {inspections.map((inspection) => (
            <div key={inspection.id}>
              <button className='none' onClick={() => setSelectedInspection(inspection)}>{inspection.name}</button>
            </div>
          ))}

        </div>
        <div className='flex-container'>
        <button className='attach-inspection none' onClick={attachInspection}>Attach to Vehicle</button>
        </div>
        {/* {selectedInspection && (
          <button className='attach-inspection' onClick={attachInspection}>Attach to Vehicle</button>
        )} */}
      </div>
      <div className="popup">
        asdasdasd
      </div>
    </div>
  );
};

export default App;
