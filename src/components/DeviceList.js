import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import DeviceItem from './DeviceItem';
import Loading from './Loading';
import useData from '../hooks/useData';
import { Context } from '../App';


export default observer (function DeviceList() {
  const {currentPage, limit} = useContext(Context);
  const devices = useData();
  let page = currentPage;
  page -= 1;
  const start = limit * page;
  const end = start + limit;
  const currentPageData = devices.slice(start, end);

    return (
      <div>
        <div className='d-flex flex-wrap'>
          {currentPageData ? 
            currentPageData.map((device) => (
                <DeviceItem key={device.id} device={device} />
                ))
            :
            <Loading />
          }
        </div>
      </div>
    )
  })