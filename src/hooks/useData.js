import { useContext, useEffect } from 'react';
import { Context } from '../App';


export default function useData() {
  const { devices, devData, setDevData, selectedType, selectedBrand, setCurrentPage} = useContext(Context);

    useEffect(() => {
      let currentDevicesData = devData;
      setCurrentPage(1);
      if((selectedBrand.value === 'Всі' && !selectedType) || (selectedBrand.value === 'Всі' && selectedType.value === "Каталог") || (!selectedBrand && selectedType.value === "Каталог") || (selectedBrand.value === 'Всі' && selectedType.value === "Каталог")) {
        currentDevicesData = devices;
      } else if((selectedType && !selectedBrand && selectedType.value !== "Каталог") || (selectedBrand.value === 'Всі' && selectedType)) {
        currentDevicesData = devices.filter(device => device.category === selectedType.value)
      } else if(selectedType && selectedBrand && selectedType.value !== "Каталог") {
        currentDevicesData = devices.filter(device => device.brand === selectedBrand.value && device.category === selectedType.value)
      } else if((!selectedType && selectedBrand) || (selectedType.value === "Каталог" && selectedBrand)) {
        currentDevicesData = devices.filter(device => device.brand === selectedBrand.value)
      };
      setDevData(currentDevicesData);
    }, [selectedType, selectedBrand, devices]);

    return devData;
}