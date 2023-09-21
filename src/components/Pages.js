import React, { useContext } from 'react';
import { Context } from '../App';
import { Pagination } from 'react-bootstrap';
import useData from '../hooks/useData';


export default function Pages() {
  const devData = useData();
  const {currentPage, setCurrentPage, limit} = useContext(Context);
  const pageCount = Math.ceil(devData.length / limit);
  const pages = [];

  for(let i = 0; i < pageCount; i += 1) {
    pages.push(i + 1)
  }

  return (
    <Pagination className='mt-5'>
        {pages.map(page =>
            <Pagination.Item 
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
            >
                {page}
            </Pagination.Item>    
        )}
    </Pagination>
  )
}
