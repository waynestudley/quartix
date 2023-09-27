import React, { useState } from 'react';

interface Vehicle {
  id: number;
  description: string;
  type: string;
  inspections: Inspection[];
}

interface Inspection {
  id: number;
  name: string;
  allowedTypes: string[];
}

const vehiclesData: Vehicle[] = [
  { id: 1, description: 'Car', type: 'car', inspections: [] },
  { id: 2, description: 'Van', type: 'van', inspections: [] },
  { id: 3, description: 'Lorry', type: 'lorry', inspections: [] },
  { id: 4, description: 'Van', type: 'van', inspections: [] },
  { id: 5, description: 'Car', type: 'car', inspections: [] },
  { id: 6, description: 'Van', type: 'van', inspections: [] },
  { id: 7, description: 'Lorry', type: 'lorry', inspections: [] },
  { id: 8, description: 'Van', type: 'van', inspections: [] },
  { id: 9, description: 'Car', type: 'car', inspections: [] },
  { id: 10, description: 'Van', type: 'van', inspections: [] },
  { id: 11, description: 'Lorry', type: 'lorry', inspections: [] },
  { id: 12, description: 'Van', type: 'van', inspections: [] },
];

const inspectionsData: Inspection[] = [
  { id: 101, name: 'Inspection 1', allowedTypes: ['any'] },
  { id: 102, name: 'Inspection 2', allowedTypes: ['any'] },
  { id: 103, name: 'Inspection 3', allowedTypes: ['lorry'] },
  { id: 104, name: 'Inspection 4', allowedTypes: ['car'] },
  { id: 105, name: 'Inspection 5', allowedTypes: ['van'] },
];

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
  const [inspections] = useState<Inspection[]>(inspectionsData);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

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
      console.log(selectedVehicle.inspections.length)
    }
  };

  // const removeInspection = (vehicleId: number, inspectionId: number) => {
  //   const updatedVehicles = vehicles.map((vehicle) => {
  //     if (vehicle.id === vehicleId) {
  //       return {
  //         ...vehicle,
  //         inspections: vehicle.inspections.filter(
  //           (inspection) => inspection.id !== inspectionId
  //         ),
  //       };
  //     }
  //     return vehicle;
  //   });
  //   setVehicles(updatedVehicles);
  // };

  // Function to handle selecting a vehicle
  const selectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="main">
      <div className="title">Vehicle Inspection Demo</div>
        <h2>Vehicles</h2>
        <div className='flex-container buttonList'>
        <div className="buttonList">
          {vehicles.map((vehicle) => (
            <div className='flex-container' key={vehicle.id}>
              <button className={`badge-top-right ${selectedVehicle ? 'active' : ''}`} data-count={selectedVehicle?.inspections.length} onClick={() => selectVehicle(vehicle)}>{vehicle.description}</button>
              {selectedVehicle ? 'active' : ''}
              {/* <ul>
                {vehicle.inspections.map((inspection) => (
                  <li key={inspection.id}>
                    {inspection.name}{' '}
                    <button onClick={() => removeInspection(vehicle.id, inspection.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Available Inspections</h2>
        <div className='flex-container buttonList'>
        <div className="buttonList">
          {inspections.map((inspection) => (
            <div key={inspection.id}>
              <button onClick={() => setSelectedInspection(inspection)}>{inspection.name}</button>
            </div>
          ))}
        </div>
        </div>
        {selectedInspection && (
          <button onClick={attachInspection}>Attach to Vehicle</button>
        )}
      </div>
    </div>
  );
};

export default App;













import React, { useState } from 'react';

interface Vehicle {
  id: number;
  description: string;
  type: string;
  inspections: Inspection[];
}

interface Inspection {
  id: number;
  name: string;
  allowedTypes: string[];
}

const vehiclesData: Vehicle[] = [
  { id: 1, description: 'VW Golf (c)', type: 'car', inspections: [] },
  { id: 2, description: 'Transit (v)', type: 'van', inspections: [] },
  { id: 3, description: 'DAF (l)', type: 'lorry', inspections: [] },
  { id: 4, description: 'Crafter (l)', type: 'van', inspections: [] },
  { id: 5, description: 'Tesla P90 (c)', type: 'car', inspections: [] },
  { id: 6, description: 'Quest (v)', type: 'van', inspections: [] },
  { id: 7, description: 'Scania (l)', type: 'lorry', inspections: [] },
  { id: 8, description: 'HiAce (v)', type: 'van', inspections: [] },
  { id: 9, description: 'Mini (c)', type: 'car', inspections: [] },
  { id: 10, description: 'Express (v)', type: 'van', inspections: [] },
  { id: 11, description: 'Volvo (l)', type: 'lorry', inspections: [] },
  { id: 12, description: 'Focus (c)', type: 'car', inspections: [] },
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

  // Function to handle sorting based on criteria
  const handleSort = (criteria: React.SetStateAction<string>) => {
    const sorted = [...sortedData];
    if (criteria === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    } else if (criteria === 'name') {
      sorted.sort((a, b) => a.description.localeCompare(b.description));
    }
    // setSortCriteria(criteria);
    setSortedData(sorted);
  };

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

  return (
    <div className="main">
      <div className="title">Vehicle Inspection Demo</div>
      <div className="sub-title">Vehicles</div>
      <a href="" onClick={() => handleSort('type')}>Sort by Type</a>
      <button onClick={() => handleSort('name')}>Sort by Name</button>
       {sortedData.map((vehicle) => (
        
          <div className="button-container">
            <div className='flex-container' key={vehicle.id}>
              <button
                className={`badge-top-right ${selectedVehicle && vehicle.inspections.length > 0 ? 'active' : 'none'}`}
                data-count={vehicle.inspections.length > 0 ? vehicle.inspections.length : null}
                onClick={() => selectVehicle(vehicle)} onMouseOver={() => showInspectionsPopup(vehicle)}>
                {vehicle.description}
              </button>
            </div>
          </div>
        ))}
      <div>
        <h2>Available Inspections</h2>
        <div className='flex-container buttonList'>
        <div className="buttonList">
          {inspections.map((inspection) => (
            <div key={inspection.id}>
              <button className='none' onClick={() => setSelectedInspection(inspection)}>{inspection.name}</button>
            </div>
          ))}
        </div>
        </div>
        {selectedInspection && (
          <button className='none'onClick={attachInspection}>Attach to Vehicle</button>
        )}
      </div>
      <div className="popup">
        asdasdasd
      </div>
    </div>
  );
};

export default App;
