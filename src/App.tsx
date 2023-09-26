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
  { id: 1, description: 'Car 1', type: 'car', inspections: [] },
  { id: 2, description: 'Van 1', type: 'van', inspections: [] },
  { id: 3, description: 'Lorry 1', type: 'lorry', inspections: [] },
];

const inspectionsData: Inspection[] = [
  { id: 101, name: 'Inspection 1', allowedTypes: ['any', 'car'] },
  { id: 102, name: 'Inspection 2', allowedTypes: ['any', 'van'] },
  { id: 103, name: 'Inspection 3', allowedTypes: ['any', 'lorry'] },
  { id: 104, name: 'Inspection 4', allowedTypes: ['car', 'lorry'] },
];

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
  const [inspections] = useState<Inspection[]>(inspectionsData);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null); // Added selectedVehicle state
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
    }
  };

  const removeInspection = (vehicleId: number, inspectionId: number) => {
    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.id === vehicleId) {
        return {
          ...vehicle,
          inspections: vehicle.inspections.filter(
            (inspection) => inspection.id !== inspectionId
          ),
        };
      }
      return vehicle;
    });
    setVehicles(updatedVehicles);
  };

  // Function to handle selecting a vehicle
  const selectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div>
      <h1>Vehicle Inspection App</h1>
      <div>
        <h2>Vehicles</h2>
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.description} ({vehicle.type})
              <button onClick={() => selectVehicle(vehicle)}>Select</button> {/* Added Select button */}
              <ul>
                {vehicle.inspections.map((inspection) => (
                  <li key={inspection.id}>
                    {inspection.name}{' '}
                    <button onClick={() => removeInspection(vehicle.id, inspection.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Available Inspections</h2>
        <ul>
          {inspections.map((inspection) => (
            <li key={inspection.id}>
              {inspection.name}{' '}
              <button onClick={() => setSelectedInspection(inspection)}>Attach</button>
            </li>
          ))}
        </ul>
        {selectedInspection && (
          <button onClick={attachInspection}>Attach to Vehicle</button>
        )}
      </div>
    </div>
  );
};

export default App;
