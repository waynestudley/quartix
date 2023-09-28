import React, { useState, useEffect } from 'react';

interface InspectionsProps {
  selectedVehicle: object
  inspectionsData: object[]
  removeInspection: (vehicleId: number, inspectionId: number) => void
}

const Inspections: React.FC<InspectionsProps> = ({ selectedVehicle, inspectionsData, removeInspection }) => {
  const [inspectionCount, setInspectionCount] = useState(selectedVehicle.inspections.length);

  useEffect(() => {
    setInspectionCount(selectedVehicle.inspections.length);
  }, [selectedVehicle, selectedVehicle.inspections]);

  return (
    <div className="Inspections">
      {selectedVehicle && (
        <>

          <div className="sub-title">Inspections for {selectedVehicle?.description} - ({selectedVehicle?.registration})</div>
          <ul>
            {selectedVehicle?.inspections.map((inspectionId: number) => {
              // Find the inspection object with a matching ID
              const matchingInspection = inspectionsData.find(
                (inspection) => inspection.id === inspectionId
              )

              // Render the inspection name if found, or a fallback text
              return (
                <li key={inspectionId}>
                  {matchingInspection ? matchingInspection?.name : 'Unknown Inspection'}
                  <button
                    className="none"
                    onClick={() => removeInspection(selectedVehicle.id, inspectionId)}>
                  
                  Remove
                </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default Inspections

