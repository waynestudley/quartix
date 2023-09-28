import React, { useState, useEffect } from 'react'
import Inspections from './components/Inspections'
import { updateExpression } from '@babel/types'

interface Vehicle {
  id: number
  description: string
  type: string
  inspections: number[]
  registration: string
}

interface Inspection {
  id: number
  name: string
  allowedTypes: string[]
}

// Set data for vehicles and inspection types
const vehiclesData: Vehicle[] = [
  { id: 1, description: 'VW Golf (C)', type: 'car', inspections: [101], registration: 'ABC 123'},
  { id: 2, description: 'Transit (V)', type: 'van', inspections: [], registration: 'AH03 RPP'},
  { id: 3, description: 'DAF (L)', type: 'lorry', inspections: [107,104], registration: 'CA51 NOI'},
  { id: 4, description: 'Crafter (V)', type: 'van', inspections: [], registration: 'QU4R TIX'},
  { id: 5, description: 'Tesla (C)', type: 'car', inspections: [], registration: 'WS62 BBM'},
  { id: 6, description: 'Quest (V)', type: 'van', inspections: [], registration: 'RJ17 OAS'},
  { id: 7, description: 'Scania (L)', type: 'lorry', inspections: [], registration: 'OX11 OAN'},
  { id: 8, description: 'HiAce (V)', type: 'van', inspections: [], registration: 'GU17 EEG'},
  { id: 9, description: 'Mini (C)', type: 'car', inspections: [], registration: 'SP3C IAL'},
  { id: 10, description: 'Express (V)', type: 'van', inspections: [], registration: 'VA21 QUZ'},
  { id: 11, description: 'Volvo Penta (L)', type: 'lorry', inspections: [], registration: 'FJ18 JMB'},
  { id: 12, description: 'Focus (C)', type: 'car', inspections: [], registration: 'ABC 124'}
]

const inspectionsData: Inspection[] = [
  { id: 101, name: 'Any', allowedTypes: ['any'] },
  { id: 102, name: 'Car & Van', allowedTypes: ['car', 'van'] },
  { id: 103, name: 'Car & Lorry', allowedTypes: ['car', 'lorry'] },
  { id: 104, name: 'Van & Lorry', allowedTypes: ['lorry', 'van'] },
  { id: 105, name: 'Car only', allowedTypes: ['car'] },
  { id: 106, name: 'Van only', allowedTypes: ['van'] },
  { id: 107, name: 'Lorry only', allowedTypes: ['lorry'] },
]

const App: React.FC = () => {
  // Create a hook states to track inspection/vehicle/counts etc
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData)
  const [inspections] = useState<Inspection[]>(inspectionsData)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedInspection, setSelectedInspection] = useState<number | null>(null)
  const [sortedData, setSortedData] = useState([...vehiclesData])
  const [sortCriteria, setSortCriteria] = useState('')
  const [selectedVehicleForInspection, setSelectedVehicleForInspection] = useState<Vehicle | null>(null)
  const [isDivVisible, setIsDivVisible] = useState<boolean[]>(Array(sortedData.length).fill(false))
  const [inspectionCounts, setInspectionCounts] = useState<{ [key: number]: number }>({})
  const [showModal, setShowModal] = useState(false)


  const toggleDivVisibility = (index: number, visible: boolean) => {
    console.log(visible)
    const updatedVisibility = [...isDivVisible]
    updatedVisibility[index] = !visible
    setIsDivVisible(updatedVisibility)

  }

  const toggleModal = () => setShowModal(!showModal)

  const attachInspection = () => {
  if (selectedVehicle && selectedInspection) {
    // Find the corresponding Inspection object by ID
    const matchingInspection = inspections.find((insp) => insp.id === selectedInspection)

     console.log('Matching Inspection:', matchingInspection, selectedVehicleForInspection)

    if (
      matchingInspection &&
      (matchingInspection.allowedTypes.includes('any') ||
        matchingInspection.allowedTypes.includes(selectedVehicle.type))
    ) {
      const updatedVehicles = vehicles.map((vehicle) => {
        if (vehicle.id === selectedVehicle.id) {
          console.log('Updating Vehicle:', vehicle)

          // Check if the inspection ID is already in the inspections array
          if (!vehicle.inspections.includes(matchingInspection.id)) {
            // If not, add it to the array
            return {
              ...vehicle,
              inspections: [...vehicle.inspections, matchingInspection.id],
            }
          } else {
            // If it's a duplicate, show an alert
            alert('This inspection is already attached to the selected vehicle.')
            return vehicle // Return the vehicle unchanged
          }
        }
        return vehicle
      })

      // After updating the vehicles, calculate the updated inspection count
      const updatedCounts = { ...inspectionCounts }
      updatedCounts[selectedVehicle.id] = updatedVehicles.find((v) => v.id === selectedVehicle.id)?.inspections.length || 0
      setInspectionCounts(updatedCounts)

      console.log('Updated Vehicles:', updatedVehicles)
      setVehicles(updatedVehicles)
    } else {
      alert('Cannot attach this inspection to the selected vehicle.')
    }
    setSelectedInspection(null)
  }
  console.log(toggleDivVisibility)
}

  const selectVehicle = (vehicle: Vehicle) => {
    console.log(vehicle, vehiclesData)
    setSelectedVehicle(vehicle)
    setSelectedVehicleForInspection(vehicle)
    setShowModal(false)
  }

  const removeInspection = (vehicleId: number, inspectionId: number) => {
  const updatedVehicles = vehicles.map((vehicle) => {
    if (vehicle.id === vehicleId) {
      // Filter the inspections and create a new vehicle object without the removed inspection
      const updatedInspections = vehicle.inspections.filter(
        (inspection) => inspection !== inspectionId
      );
      return {
        ...vehicle,
        inspections: updatedInspections,
      };
    }
    return vehicle;
  });
  // Find the updated vehicle for the selectedVehicle
  const updatedSelectedVehicle = updatedVehicles.find(
    (vehicle) => vehicle.id === selectedVehicle.id
  );

  setSelectedVehicle(updatedSelectedVehicle); // Update the selectedVehicle state
  setShowModal(false);
  setVehicles(updatedVehicles); // Update the  vehicles state

  console.log(vehiclesData, selectedVehicle)
};

  // Function to handle sorting based on criteria
  const handleSort = (criteria: string) => {
    const sorted = [...sortedData]
    if (criteria === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type))
    } else if (criteria === 'name') {
      sorted.sort((a, b) => a.description.localeCompare(b.description))
    } else if (criteria === 'registration') {
      sorted.sort((a, b) => a.registration.localeCompare(b.registration))
    }
    setSortCriteria(criteria)
    setSortedData(sorted)
  }

  // Keep track of sortedData
  useEffect(() => {
    setSortedData([...vehicles])
  }, [vehicles])

  // Keep track of vehicle inspection count
  useEffect(() => {
    const initialCounts: { [key: number]: number } = {}
    vehicles.forEach((vehicle) => {
      initialCounts[vehicle.id] = vehicle.inspections.length
    })
    setInspectionCounts(initialCounts)
  }, [])

  return (
    <div className="main">
      <div className="title">Vehicle Inspections</div>
      <div className="sub-title">Vehicles</div>
      
      <div className="flex-container sort-by">
        <div className="sortby">Sort by:</div>
        <div className={`${sortCriteria === 'type' ? 'selected' : ''}` } onClick={() => handleSort('type')}>Type</div>
        <div className={`${sortCriteria === 'name' ? 'selected' : ''}` } onClick={() => handleSort('name')}>Name</div>
        <div className={`${sortCriteria === 'registration' ? 'selected' : ''}` } onClick={() => handleSort('registration')}>Registration</div>
        {/* <div className={`${sortCriteria === 'allowed' ? 'selected' : ''}` } onClick={() => handleSort('allowed')}>Allowed Type</div> */}
        
      </div>
      <div className="flex-container vehicles">Double click any 'badged' vehicle to view/amend its inspections</div>

      <div className="flex-container vehicles">
      {sortedData.map((vehicle) => (
        <div key={vehicle.id}>
          <button
            title={inspectionCounts[vehicle.id] > 0 ? 'Doube-click for Inspections' : ''}
            className={`badge-top-right ${vehicle.inspections.length > 0 ? 'active' : 'none'} ${selectedVehicle?.id === vehicle?.id ? 'vehicle-select' : ''}`}
            data-count={inspectionCounts[vehicle.id] > 0 ? inspectionCounts[vehicle.id] : ''}
            onClick={() => selectVehicle(vehicle)}
            onDoubleClick={vehicle.inspections.length > 0 ? toggleModal : null}
          >
            <p></p>
            <strong>{vehicle.description}</strong>
            <p>{vehicle.registration }</p>
          </button>

        </div>
      ))}

      </div>
        


      <div>
        <div className="sub-title">Available Inspections</div>
        <div className='flex-container '>

          {inspections.map((inspection) => (
            <div key={inspection.id}>
              <button
                className={`none ${inspection.id === selectedInspection ? 'inspection-select' : ''} `}
                onClick={() => {
                  if (inspection) {
                    const id = inspection.id
                    setSelectedInspection(id)
                  }
              }}> {inspection.name}</button>

            </div>
          ))}

        </div>
        <div className='select-inspection'>
          <div className='attach-inspection'>
            {selectedInspection && (
              <button className='none attach-inspection' onClick={attachInspection}>Attach to Vehicle</button>
            )}
          </div>
        </div>
      </div>


      

      {showModal && (
        <>
          <div
            key={selectedVehicle.id}
            className={`popup ${selectedVehicle.id}`}
            style={{ display: isDivVisible[selectedVehicle.id] ? 'block' : 'none'}}>
          </div>
          <div onClick={toggleModal}>
          <Inspections onClick={toggleModal}
            selectedVehicle={selectedVehicle}
            inspectionsData={inspectionsData}
            removeInspection={removeInspection}
          />
          </div>
        </>
      )}

    </div>
  )
}

export default App
