import React from 'react';

interface VehiclesProps {
  selectedVehicle: object;
  VehicleData: object[];
  removeInspection: (vehicleId: number, inspectionId: number) => void;
}

const Vehicles: React.FC<VehiclesProps> = ({ selectedVehicle, inspectionsData, removeInspection }) => {
  return (
    <div className="Vehicles">
      {selectedVehicle && (
        <>

          <div className="sub-title">Inspections for {selectedVehicle?.description} - ({selectedVehicle?.registration})</div>
          <ul>
            {selectedVehicle?.inspections.map((inspectionId: number) => {
              // Find the inspection object with a matching ID
              const matchingInspection = inspectionsData.find(
                (inspection) => inspection.id === inspectionId
              );

              // Render the inspection name if found, or a fallback text
              return (
                <li key={inspectionId}>
                  {matchingInspection ? matchingInspection?.name : 'Unknown Inspection'}
                  <button
                    className="none"
                    onClick={() => removeInspection(selectedVehicle.id, inspectionId)}
                  >
                  Remove
                </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Vehicles;

